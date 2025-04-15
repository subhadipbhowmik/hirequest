const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No authentication token, access denied" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find student by id
    const student = await Student.findById(decoded.id);

    if (!student) {
      return res.status(401).json({ message: "Token is not valid" });
    }

    // Set student in request object
    req.student = student;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth;
