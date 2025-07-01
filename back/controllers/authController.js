<<<<<<< HEAD
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

// Register a new user
export const registerUser = async (req, res) => {
  const { email, password, confirmPassword, role, user_ref_id } = req.body;

  // Check if all fields are provided
  if (!email || !password || !confirmPassword || !role || !user_ref_id) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: "Passwords do not match" });
  }

  try {
    // Check if user already exists
=======
const jwt =require('jsonwebtoken');
const bcrypt =require('bcrypt');
const db =require('../config/db');


// Register a new user
exports.registerUser = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
>>>>>>> 922e4ade9a37c126af1a1c53c83861461e061f36
    const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

<<<<<<< HEAD
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();

    // Insert new user
    await db.query(
      'INSERT INTO users (id, email, password, role, user_ref_id) VALUES (?, ?, ?, ?, ?)',
      [id, email, hashedPassword, role, user_ref_id]
=======
    const hashedPassword = await bcrypt.hash(password, 10);

    let user_ref_id = null;

    if (role === "client") {
      const { firstName, lastName } = req.body;
      if (!firstName || !lastName) {
        return res.status(400).json({ success: false, message: "First name and last name are required for client" });
      }

      // Create client and get its ID
      const [clientResult] = await db.query(
        'INSERT INTO clients (first_name, last_name) VALUES (?, ?)',
        [firstName, lastName]
      );

      user_ref_id = clientResult.insertId;
    }

    // Add other role logic if needed here...
    // For example: else if (role === "investor") { ... }

    // Now insert into users table using the user_ref_id
    const [userResult] = await db.query(
      'INSERT INTO users (email, password, role, user_ref_id) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, role, user_ref_id]
>>>>>>> 922e4ade9a37c126af1a1c53c83861461e061f36
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
<<<<<<< HEAD
      user: { id, email, role, user_ref_id }
=======
      user: {
        id: userResult.insertId,
        email,
        role,
        user_ref_id
      }
>>>>>>> 922e4ade9a37c126af1a1c53c83861461e061f36
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

<<<<<<< HEAD
// Login a user and return access & refresh tokens
export const loginUser = async (req, res) => {
=======


// Login a user and return access & refresh tokens
exports.loginUser = async (req, res) => {
>>>>>>> 922e4ade9a37c126af1a1c53c83861461e061f36
  const { email, password } = req.body;

  try {
    console.log("Received credentials:", { email, password });

    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    console.log("Database result:", rows);

    const user = rows[0];

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("User password from DB:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Incorrect password" });
    }

    const accessToken = jwt.sign({ id: user.id }, process.env.SECRET_ACCESS, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user.id }, process.env.SECRET_REFRESH, { expiresIn: '7d' });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 15 * 60 * 1000
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        user_ref_id: user.user_ref_id,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ success: false, message: "Login error" });
  }
};

// Logout user and clear cookies
<<<<<<< HEAD
export const logoutUser = async (req, res) => {
=======
exports.logoutUser = async (req, res) => {
>>>>>>> 922e4ade9a37c126af1a1c53c83861461e061f36
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  const { refreshToken } = req.cookies;
  return res.json({ success: true, message: "Logged out successfully" });
};

// Refresh access token using a valid refresh token
<<<<<<< HEAD
export const refreshToken = async (req, res) => {
=======
exports.refreshToken = async (req, res) => {
>>>>>>> 922e4ade9a37c126af1a1c53c83861461e061f36
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(403).json({ success: false, message: "Missing refresh token" });
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.SECRET_REFRESH);

    // Get user from DB
    const [users] = await db.query('SELECT * FROM users WHERE id = ?', [decoded.id]);
    const user = users[0];

    // Generate new access token
    const newAccessToken = jwt.sign({ id: user.id }, process.env.SECRET_ACCESS, { expiresIn: '15m' });

    // Set new access token cookie
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 15 * 60 * 1000,
    });

    return res.json({ success: true, accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ success: false, message: "Token verification failed" });
  }
};

// Get the current authenticated user
<<<<<<< HEAD
export const getCurrentUser = async (req, res) => {
=======
exports.getCurrentUser = async (req, res) => {
>>>>>>> 922e4ade9a37c126af1a1c53c83861461e061f36
  try {
    const user = req.user;
    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        user_ref_id: user.user_ref_id,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> 922e4ade9a37c126af1a1c53c83861461e061f36
