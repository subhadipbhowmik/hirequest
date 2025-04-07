const Student = require("../models/Student");
const Application = require("../models/Application");
const jwt = require("jsonwebtoken");
const { fetchStatusFromSheet } = require("../services/sheetsService");

// Get authenticated user's profile
const getAuthUser = async (userId) => {
  return await Student.findById(userId).populate({
    path: "applications",
    populate: { path: "placement", select: "companyName position" },
  });
};

// Signup
const signup = async (req, res) => {
  try {
    // Check for existing user
    const existing = await Student.findOne({
      $or: [
        { email: req.body.email },
        { uid: req.body.uid },
        { phoneNumber: req.body.phoneNumber },
      ],
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        error: "User already exists",
      });
    }

    // Create user
    const student = await Student.create(req.body);

    // Generate token
    const token = jwt.sign(
      { id: student._id },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "7d" }
    );

    // Get full user data with applications
    const userData = await getAuthUser(student._id);

    res.status(201).json({
      success: true,
      token,
      user: userData,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Registration failed",
    });
  }
};

// Login
const login = async (req, res) => {
  try {
    const student = await Student.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (!student) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: student._id },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "7d" }
    );

    // Get full user data with applications
    const userData = await getAuthUser(student._id);

    res.json({
      success: true,
      token,
      user: userData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Login failed",
    });
  }
};

// Get profile
const getProfile = async (req, res) => {
  try {
    const userData = await getAuthUser(req.user._id);
    res.json({ success: true, data: userData.applications });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Profile load failed",
    });
  }
};

// Validate session
const validateSession = async (req, res) => {
  try {
    const userData = await getAuthUser(req.user._id);
    res.json({ success: true, user: userData });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Session validation failed",
    });
  }
};

module.exports = { signup, login, getProfile, validateSession };
