const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

// Register a new student
exports.register = async (req, res) => {
  try {
    const { name, course, uid, phoneNumber, email, password } = req.body;

    // Check if student already exists
    let student = await Student.findOne({ email });
    if (student) {
      return res.status(400).json({ message: "Student already exists" });
    }

    // Check if UID already exists
    student = await Student.findOne({ uid });
    if (student) {
      return res.status(400).json({ message: "UID already in use" });
    }

    // Check if phone number already exists
    student = await Student.findOne({ phoneNumber });
    if (student) {
      return res.status(400).json({ message: "Phone number already in use" });
    }

    // Create new student
    student = new Student({
      name,
      course,
      uid,
      phoneNumber,
      email,
      password, // No hashing as per your requirement
    });

    await student.save();

    // Create and return JWT token
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        uid: student.uid,
        course: student.course,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Login student
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if student exists
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    if (password !== student.password) {
      // No hashing as per your requirement
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create and return JWT token
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        uid: student.uid,
        course: student.course,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get current student
exports.getCurrentStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.student._id).select("-password");
    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
