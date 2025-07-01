
const db = require('../config/db'); 

exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM investors');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch investors' });
    }
};

exports.create = async (req, res) => {
    const {
        id, name, type, location,
        invested_in_startups = 0,
        invested_in_tenders = 0,
        accepted_startup_ids = '[]',
        accepted_submission_ids = '[]',
        project_ids = '[]'
    } = req.body;
    try {
        await db.query(
            `INSERT INTO investors (id, name, type, location, invested_in_startups, invested_in_tenders, accepted_startup_ids, accepted_submission_ids, project_ids)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, name, type, location, invested_in_startups, invested_in_tenders, accepted_startup_ids, accepted_submission_ids, project_ids]
        );
        res.status(201).json({ message: 'Investor created' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create investor' });
    }
};

exports.edit = async (req, res) => {
    const { id } = req.params;
    const {
        name, type, location,
        invested_in_startups,
        invested_in_tenders,
        accepted_startup_ids,
        accepted_submission_ids,
        project_ids
    } = req.body;
    try {
        await db.query(
            `UPDATE investors SET name=?, type=?, location=?, invested_in_startups=?, invested_in_tenders=?, accepted_startup_ids=?, accepted_submission_ids=?, project_ids=?
             WHERE id=?`,
            [name, type, location, invested_in_startups, invested_in_tenders, accepted_startup_ids, accepted_submission_ids, project_ids, id]
        );
        res.json({ message: 'Investor updated' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update investor' });
    }
};

exports.getInvestorById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM investors WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Investor not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch investor' });
    }
};

exports.getInvestorByType = async (req, res) => {
    const { type } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM investors WHERE type = ?', [type]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch investors by type' });
    }
};

exports.deleteInvestor = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM investors WHERE id = ?', [id]);
        res.json({ message: 'Investor deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete investor' });
    }
};