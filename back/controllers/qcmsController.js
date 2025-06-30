
// qcmsController.js

const db = require('../db');

exports.addQcm = async (req, res) => {
    const { id, title, created_by, niche } = req.body;
    try {
        await db.query(
            `INSERT INTO qcms (id, title, created_by, niche) VALUES (?, ?, ?, ?)`,
            [id, title, created_by, niche]
        );
        res.status(201).json({ message: 'QCM created' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create QCM' });
    }
};

exports.getAllQcm = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM qcms');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch QCMs' });
    }
};

exports.getQcmByNiche = async (req, res) => {
    const { niche } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM qcms WHERE niche = ?', [niche]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch QCMs by niche' });
    }
};

exports.getQcmById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM qcms WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'QCM not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch QCM' });
    }
};

exports.deleteQcm = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM qcms WHERE id = ?', [id]);
        res.json({ message: 'QCM deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete QCM' });
    }
};