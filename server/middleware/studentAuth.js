const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new Error("Authentication required");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const student = await Student.findById(decoded.id);

    if (!student) throw new Error("Student not found");

    req.userId = student._id;
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
