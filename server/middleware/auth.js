const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const student = await Student.findById(decoded.id);

    if (!student) {
      throw new Error("Student not found");
    }

    req.user = student;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication required" });
  }
};
