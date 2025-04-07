const Student = require("../models/Student");
const Application = require("../models/Application");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  fetchStatusFromSheet,
  getStudentStatus,
} = require("../services/sheetsService");

// Signup with auto-login
const signup = async (req, res) => {
  try {
    const { name, course, uid, phoneNumber, email, password } = req.body;

    // Existing user check
    const existingStudent = await Student.findOne({
      $or: [{ email }, { uid }, { phoneNumber }],
    });
    if (existingStudent)
      return res.status(400).json({ error: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const student = await Student.create({
      name,
      course,
      uid,
      phoneNumber,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ token, student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });

    if (!student || !(await bcrypt.compare(password, student.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get student profile with applications and statuses
const getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.userId).populate({
      path: "applications",
      populate: { path: "placement", select: "companyName position" },
    });

    // Get statuses from Google Sheet
    const sheetStatuses = await fetchStatusFromSheet({
      uid: student.uid,
      email: student.email,
      phone: student.phoneNumber,
    });

    // Merge application data with sheet statuses
    const profileData = student.applications.map((app) => ({
      company: app.placement.companyName,
      position: app.placement.position,
      appliedDate: app.appliedAt,
      status: sheetStatuses[app.placement.companyName] || "Pending",
    }));

    res.json(profileData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get student profile with applications and statuses
exports.getStudentProfile = async (req, res) => {
  try {
    // Get applications from DB
    const applications = await Application.find({
      student: req.user.id,
    }).populate("placement", "companyName position");

    // Get statuses from Google Sheet
    const student = await Student.findById(req.user.id);
    const sheetStatuses = await getStudentStatus({
      uid: student.uid,
      email: student.email,
      phone: student.phoneNumber,
    });

    // Merge data
    const profileData = applications.map((app) => ({
      company: app.placement.companyName,
      position: app.placement.position,
      appliedDate: app.appliedAt,
      status: sheetStatuses[app.placement.companyName] || "Under Review",
    }));

    res.json(profileData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signup, login, getProfile, getStudentProfile };
