const db = require('../db');

exports.createAdmin = async (req, res) => {
    const { id, email, password, name } = req.body;
    try {
        await db.query(
            `INSERT INTO admins (id, email, password, name) VALUES (?, ?, ?, ?)`,
            [id, email, password, name]
        );
        res.status(201).json({ message: 'Admin created' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create admin' });
    }
};



exports.editAdmin = async (req, res) => {
    const { id } = req.params;
    const { email, name } = req.body;
    try {
        await db.query(
            `UPDATE admins SET email = ?, name = ? WHERE id = ?`,
            [email, name, id]
        );
        res.json({ message: 'Admin updated' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update admin' });
    }
};

exports.editPassword = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    try {
        await db.query(
            `UPDATE admins SET password = ? WHERE id = ?`,
            [password, id]
        );
        res.json({ message: 'Password updated' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update password' });
    }
};
