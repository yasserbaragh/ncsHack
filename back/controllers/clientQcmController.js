// clientQcmController.js

const db = require('../db');



exports.addQcmClient = async (req, res) => {
    const { id, client_id, qcm_id } = req.body;
    try {
        // Calculate score: count correct answers for this client and qcm
        const [scoreRows] = await db.query(
            `SELECT COUNT(*) AS score
             FROM client_question cq
             JOIN questions q ON cq.question_id = q.id
             WHERE cq.client_id = ? AND q.qcm_id = ? AND cq.is_correct = 1`,
            [client_id, qcm_id]
        );
        const score = scoreRows[0]?.score || 0;

        // Insert into client_qcm
        await db.query(
            `INSERT INTO client_qcm (id, client_id, qcm_id, score, completed_at)
             VALUES (?, ?, ?, ?, NOW())`,
            [id, client_id, qcm_id, score]
        );
        res.status(201).json({ message: 'QCM completed by client', score });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add client QCM' });
    }
};