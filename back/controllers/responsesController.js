// responsesController.js
const db = require('../db');

exports.addResponseToQuestion = async (req, res) => {
    const { id, question_id, response_text, is_correct } = req.body;
    try {
        await db.query(
            `INSERT INTO responses (id, question_id, response_text, is_correct) VALUES (?, ?, ?, ?)`,
            [id, question_id, response_text, is_correct || false]
        );
        res.status(201).json({ message: 'Response added to question' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add response' });
    }
};

exports.getQuestionResponses = async (req, res) => {
    const { question_id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM responses WHERE question_id = ?', [question_id]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch responses' });
    }
};

exports.editResponse = async (req, res) => {
    const { id } = req.params;
    const { response_text, is_correct } = req.body;
    try {
        await db.query(
            `UPDATE responses SET response_text = ?, is_correct = ? WHERE id = ?`,
            [response_text, is_correct, id]
        );
        res.json({ message: 'Response updated' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update response' });
    }
};

exports.deleteResponse = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM responses WHERE id = ?', [id]);
        res.json({ message: 'Response deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete response' });
    }
};

exports.checkResponse = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT is_correct FROM responses WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Response not found' });
        res.json({ is_correct: rows[0].is_correct });
    } catch (err) {
        res.status(500).json({ error: 'Failed to check response' });
    }
};