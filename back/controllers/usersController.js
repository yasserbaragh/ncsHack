// usersController.js

const db = require('../db');

exports.createUser = async (req, res) => {
    const { id, email, password, role, user_ref_id } = req.body;
    try {
        await db.query(
            `INSERT INTO users (id, email, password, role, user_ref_id)
             VALUES (?, ?, ?, ?, ?)`,
            [id, email, password, role, user_ref_id]
        );
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

exports.editEmail = async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
    try {
        await db.query(
            `UPDATE users SET email = ? WHERE id = ?`,
            [email, id]
        );
        res.json({ message: 'Email updated' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update email' });
    }
};

exports.changePassword = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    try {
        await db.query(
            `UPDATE users SET password = ? WHERE id = ?`,
            [password, id]
        );
        res.json({ message: 'Password updated' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update password' });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};