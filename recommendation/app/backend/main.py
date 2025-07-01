from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict
from sklearn.linear_model import LogisticRegression
import pandas as pd
import joblib
import os
import httpx

app = FastAPI()

MODEL_PATH = "recommendation_model.pkl"
model = None  # Lazy-loaded model

# ---------- Models ----------

class Problem(BaseModel):
    id: str
    required_skill_level: int
    target_disciplines: List[str]

class UserProfile(BaseModel):
    discipline: str
    skill_score: int
    submission_history: Dict[str, int]
    qcm_tags: List[str]

class RecommendationRequest(BaseModel):
    user: UserProfile
    problems: List[Problem]

# ---------- Feature Extraction ----------

def compute_features(user, problem):
    discipline_match = int(user.discipline in problem.target_disciplines)
    skill_gap = user.skill_score - problem.required_skill_level
    past_score = user.submission_history.get(problem.id, 0)
    tag_overlap = len(set(user.qcm_tags) & set(problem.target_disciplines))
    return [skill_gap, discipline_match, tag_overlap, past_score]

# ---------- Prediction Endpoint (via external API data) ----------

@app.get("/predict-from-api")
def predict_from_api():
    global model

    # Step 1: Fetch JSON from your backend (Node/Express)
    try:
        response = httpx.get("http://localhost:3000/api/user-data")
        response.raise_for_status()
        json_data = response.json()
    except Exception as e:
        return {"error": f"Failed to fetch external data: {str(e)}"}

    # Step 2: Parse to RecommendationRequest
    try:
        request_data = RecommendationRequest(**json_data)
    except Exception as e:
        return {"error": f"Invalid data format: {str(e)}"}

    # Step 3: Load model if not already loaded
    if model is None:
        if os.path.exists(MODEL_PATH):
            try:
                model = joblib.load(MODEL_PATH)
            except Exception as e:
                return {"error": f"Model loading failed: {str(e)}"}
        else:
            return {"error": "Model not trained yet."}

    # Step 4: Predict
    results = []
    for prob in request_data.problems:
        x = compute_features(request_data.user, prob)
        try:
            score = float(model.predict_proba([x])[0][1])
        except Exception as e:
            score = sum(x)  # fallback score
        results.append({"problem_id": prob.id, "score": score})

    return {"recommendations": sorted(results, key=lambda x: x["score"], reverse=True)}

@app.get("/train")
def train_model():
    global model

    try:
        # Step 1: Fetch external training data (example endpoint)
        response = httpx.get("http://localhost:3000/api/training-data")
        response.raise_for_status()
        data = response.json()
    except Exception as e:
        return {"error": f"Failed to fetch training data: {str(e)}"}

    try:
        # Step 2: Assume data is a list of rows: [skill_gap, discipline_match, tag_overlap, past_score, success]
        if not isinstance(data, list) or len(data) < 5:
            return {"error": "Not enough valid data to train the model."}

        df = pd.DataFrame(data, columns=["skill_gap", "discipline_match", "tag_overlap", "past_score", "success"])
        X = df[["skill_gap", "discipline_match", "tag_overlap", "past_score"]]
        y = df["success"]

        # Step 3: Train the model
        model = LogisticRegression()
        model.fit(X, y)

        # Step 4: Save the model
        joblib.dump(model, MODEL_PATH)

        return {"message": "Model trained and saved."}

    except Exception as e:
        return {"error": f"Failed to train model: {str(e)}"}