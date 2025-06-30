// projectsController.js
const db = require('../db'); // Assumes db connection/pool is exported from this module


exports.addProject = async (req, res) => {
    const { id, investor_id, title, description, reward_amount, deadline, is_tender } = req.body;
    try {
        await db.query(
            `INSERT INTO projects (id, investor_id, title, description, reward_amount, deadline, is_tender)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [id, investor_id, title, description, reward_amount, deadline, is_tender]
        );
        res.status(201).json({ message: 'Project created' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create project' });
    }
};

exports.deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM projects WHERE id = ?', [id]);
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete project' });
    }
};

exports.getProjectById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM projects WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Project not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch project' });
    }
};

exports.getProjectsByInvestor = async (req, res) => {
    const { investor_id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM projects WHERE investor_id = ?', [investor_id]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch projects by investor' });
    }
};

exports.getProjectsByClients = async (req, res) => {
    // Assumes a submissions table with client_id and project_id exists
    const { client_id } = req.params;
    try {
        const [rows] = await db.query(
            `SELECT p.* FROM projects p
             JOIN submissions s ON p.id = s.project_id
             WHERE s.client_id = ?`,
            [client_id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch projects by client' });
    }
};