const db = require('../db');

// Create and Save a new Submission
exports.create = async (req, res) => {
    const { id, client_id, project_id, github_link, description, points_awarded, status } = req.body;
    try {
        await db.query(
            `INSERT INTO submissions (id, client_id, project_id, github_link, description, points_awarded, status)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [id, client_id, project_id, github_link, description, points_awarded, status || 'submitted']
        );
        res.status(201).json({ message: 'Submission created' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create submission' });
    }
};

// Retrieve all Submissions from the database.
exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM submissions');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch submissions' });
    }
};

// Find a single Submission with an id
exports.getById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM submissions WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Submission not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch submission' });
    }
};

// Update a Submission by the id in the request
exports.update = async (req, res) => {
    const { id } = req.params;
    const { github_link, description, points_awarded, status } = req.body;
    try {
        await db.query(
            `UPDATE submissions SET github_link=?, description=?, points_awarded=?, status=? WHERE id=?`,
            [github_link, description, points_awarded, status, id]
        );
        res.json({ message: 'Submission updated' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update submission' });
    }
};

// Delete a Submission with the specified id in the request
exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM submissions WHERE id = ?', [id]);
        res.json({ message: 'Submission deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete submission' });
    }
};

exports.acceptSubmission = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query(
            `UPDATE submissions SET status = 'accepted' WHERE id = ?`,
            [id]
        );
        res.json({ message: 'Submission accepted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to accept submission' });
    }
};

exports.getWaiting = async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT * FROM submissions WHERE status = 'waiting'`
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch waiting submissions' });
    }
};

exports.getAccepted = async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT * FROM submissions WHERE status = 'accepted'`
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch accepted submissions' });
    }
};