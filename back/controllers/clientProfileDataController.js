const db = require('../config/db'); 

exports.createProfileClient = async (req, res) => {
    const { id, client_id, discipline, qcm_responses, submission_history, skill_score } = req.body;
    try {
        await db.query(
            `INSERT INTO client_profile_data (id, client_id, discipline, qcm_responses, submission_history, skill_score)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [id, client_id, discipline, qcm_responses || '[]', submission_history || '[]', skill_score || 0]
        );
        res.status(201).json({ message: 'Client profile created' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create client profile' });
    }
};

exports.getProfileClient = async (req, res) => {
    const { client_id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM client_profile_data WHERE client_id = ?', [client_id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Profile not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch client profile' });
    }
};

exports.updateProfileClient = async (req, res) => {
    const { client_id } = req.params;
    const { discipline, qcm_responses, submission_history, skill_score } = req.body;
    try {
        await db.query(
            `UPDATE client_profile_data SET discipline=?, qcm_responses=?, submission_history=?, skill_score=? WHERE client_id=?`,
            [discipline, qcm_responses, submission_history, skill_score, client_id]
        );
        res.json({ message: 'Client profile updated' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update client profile' });
    }
};

exports.deleteProfileClient = async (req, res) => {
    const { client_id } = req.params;
    try {
        await db.query('DELETE FROM client_profile_data WHERE client_id = ?', [client_id]);
        res.json({ message: 'Client profile deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete client profile' });
    }
};