import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateUser = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_ACCESS);

    const [rows] = await pool.query(
      'SELECT id, email, role, user_ref_id FROM users WHERE id = ?',
      [decoded.id]
    );

    const user = rows[0];

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(403).json({
      success: false,
      message: error.name === 'TokenExpiredError' ? 'Access token expired' : 'Invalid token',
    });
  }
};
