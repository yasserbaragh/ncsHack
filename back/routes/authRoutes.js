import express from "express";
import { getCurrentUser, loginUser, logoutUser, refreshToken, registerUser } from "../controllers/authController.js";
import { authenticateUser } from "../middleware/authMiddelware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/token", refreshToken);
router.get("/protectroute", authenticateUser);
router.get("/current-user", authenticateUser, getCurrentUser);

export default router; 