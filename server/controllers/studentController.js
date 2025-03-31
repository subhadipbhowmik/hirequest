const Student = require("../models/Student");

// Signup controller
const signup = async (req, res) => {
  try {
    const { name, course, uid, phoneNumber, email, password } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({
      $or: [{ email }, { uid }, { phoneNumber }],
    });
    if (existingStudent) {
      return res.status(400).json({
        message: "Student already exists with this email, UID, or phone number",
      });
    }

    // Create new student
    const student = new Student({
      name,
      course,
      uid,
      phoneNumber,
      email,
      password, // Storing plain text password
    });

    await student.save();

    res.status(201).json({
      message: "Student created successfully",
      student: {
        _id: student._id,
        name: student.name,
        email: student.email,
        uid: student.uid,
        course: student.course,
        phoneNumber: student.phoneNumber,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find student by email
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords (plain text)
    if (password !== student.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Return student data
    res.status(200).json({
      message: "Login successful",
      student: {
        _id: student._id,
        name: student.name,
        email: student.email,
        uid: student.uid,
        course: student.course,
        phoneNumber: student.phoneNumber,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  signup,
  login,
};
