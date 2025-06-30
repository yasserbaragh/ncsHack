// clientsController.js
const db = require('../db');

exports.createClient = async (req, res) => {
    const { id, first_name, last_name, is_startup, total_earned, investor_ids } = req.body;
    try {
        await db.query(
            `INSERT INTO clients (id, first_name, last_name, is_startup, total_earned, investor_ids)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [id, first_name, last_name, is_startup || false, total_earned || 0, investor_ids || '[]']
        );
        res.status(201).json({ message: 'Client created' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create client' });
    }
};

exports.getAllClients = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM clients');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch clients' });
    }
};

exports.getClientByProject = async (req, res) => {
    const { project_id } = req.params;
    try {
        const [rows] = await db.query(
            `SELECT c.* FROM clients c
             JOIN submissions s ON c.id = s.client_id
             WHERE s.project_id = ?`,
            [project_id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch clients by project' });
    }
};

exports.getClientById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM clients WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Client not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch client' });
    }
};

exports.editClient = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, is_startup, total_earned, investor_ids } = req.body;
    try {
        await db.query(
            `UPDATE clients SET first_name=?, last_name=?, is_startup=?, total_earned=?, investor_ids=? WHERE id=?`,
            [first_name, last_name, is_startup, total_earned, investor_ids, id]
        );
        res.json({ message: 'Client updated' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update client' });
    }
};

exports.deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM clients WHERE id = ?', [id]);
        res.json({ message: 'Client deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete client' });
    }
};

exports.getClientSubmissions = async (req, res) => {
    const { client_id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM submissions WHERE client_id = ?', [client_id]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch client submissions' });
    }
};