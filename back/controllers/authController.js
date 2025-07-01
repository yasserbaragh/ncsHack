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
    const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

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
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: userResult.insertId,
        email,
        role,
        user_ref_id
      }
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};



// Login a user and return access & refresh tokens
exports.loginUser = async (req, res) => {
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
exports.logoutUser = async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  const { refreshToken } = req.cookies;
  return res.json({ success: true, message: "Logged out successfully" });
};

// Refresh access token using a valid refresh token
exports.refreshToken = async (req, res) => {
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
exports.getCurrentUser = async (req, res) => {
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
};