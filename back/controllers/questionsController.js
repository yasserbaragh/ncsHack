// controllers/questionsController.js
const db = require('../db');

exports.addQuestionToQcm = async (req, res) => {
    const { id, qcm_id, question_text } = req.body;
    try {
        await db.query(
            `INSERT INTO questions (id, qcm_id, question_text) VALUES (?, ?, ?)`,
            [id, qcm_id, question_text]
        );
        res.status(201).json({ message: 'Question added to QCM' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add question' });
    }
};

exports.deleteQuestion = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM questions WHERE id = ?', [id]);
        res.json({ message: 'Question deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete question' });
    }
};

exports.editQuestion = async (req, res) => {
    const { id } = req.params;
    const { question_text } = req.body;
    try {
        await db.query(
            `UPDATE questions SET question_text = ? WHERE id = ?`,
            [question_text, id]
        );
        res.json({ message: 'Question updated' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update question' });
    }
};

exports.getQcmQeustions = async (req, res) => {
    const { qcm_id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM questions WHERE qcm_id = ?', [qcm_id]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch questions for QCM' });
    }
};