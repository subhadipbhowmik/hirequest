const Student = require("../models/Student");
const Application = require("../models/Application");
const jwt = require("jsonwebtoken");
const { fetchStatusFromSheet } = require("../services/sheetsService");

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
      return res.status(409).json({ error: "User already exists" });
    }

    // Create user
    const student = await Student.create(req.body);

    // Generate token
    const token = jwt.sign(
      { id: student._id },
      process.env.JWT_SECRET || "default_secret",
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({ token, student });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Registration failed" });
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
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: student._id },
      process.env.JWT_SECRET || "default_secret",
      {
        expiresIn: "7d",
      }
    );

    res.json({ token, student });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

// Get profile
const getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id).populate({
      path: "applications",
      populate: { path: "placement", select: "companyName position" },
    });

    res.json(student.applications);
  } catch (error) {
    res.status(500).json({ error: "Profile load failed" });
  }
};

module.exports = { signup, login, getProfile };
