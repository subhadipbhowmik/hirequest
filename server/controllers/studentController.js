const Student = require("../models/Student");
const Application = require("../models/Application");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { fetchStatusFromSheet } = require("../services/sheetsService");

// Utility: Remove sensitive fields
const sanitizeStudent = ({
  _id,
  name,
  course,
  uid,
  email,
  phoneNumber,
  applications,
}) => ({ _id, name, course, uid, email, phoneNumber, applications });

// Signup
// controllers/studentController.js
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
    const student = await Student.create({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 12),
    });

    // Verify JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT secret not configured");
    }

    // Generate token
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send response
    res.status(201).json({
      success: true,
      token,
      student: sanitizeStudent(student),
    });
  } catch (error) {
    console.error("Signup error:", error);

    // Handle duplicate key error separately
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        error: "User already exists",
      });
    }

    res.status(500).json({
      success: false,
      error: error.message || "Registration failed",
    });
  }
};

// Login
const login = async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.body.email });
    if (
      !student ||
      !(await bcrypt.compare(req.body.password, student.password))
    ) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token, student: sanitizeStudent(student) });
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

    const sheetStatuses = await fetchStatusFromSheet({
      uid: student.uid,
      email: student.email,
      phone: student.phoneNumber,
    });

    const profileData = student.applications.map((app) => ({
      company: app.placement?.companyName || "Unknown Company",
      position: app.placement?.position || "N/A",
      appliedDate: app.appliedAt,
      status: sheetStatuses[app.placement?.companyName] || "Pending",
    }));

    res.json(profileData);
  } catch (error) {
    res.status(500).json({ error: "Profile load failed" });
  }
};

module.exports = { signup, login, getProfile };
