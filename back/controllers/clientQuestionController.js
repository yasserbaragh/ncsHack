const db = require('../db');

exports.addClientQuestion = async (req, res) => {
    const { id, client_id, question_id, selected_response_id } = req.body;
    try {
        // Check if the selected response is correct
        const [respRows] = await db.query(
            'SELECT is_correct FROM responses WHERE id = ?',
            [selected_response_id]
        );
        if (respRows.length === 0) {
            return res.status(404).json({ error: 'Selected response not found' });
        }
        const is_correct = !!respRows[0].is_correct;

        // Insert into client_question
        await db.query(
            `INSERT INTO client_question (id, client_id, question_id, selected_response_id, is_correct)
             VALUES (?, ?, ?, ?, ?)`,
            [id, client_id, question_id, selected_response_id, is_correct]
        );
        res.status(201).json({ message: 'Client question added', is_correct });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add client question' });
    }
};