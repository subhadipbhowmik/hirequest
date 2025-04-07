const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const student = await Student.findById(decoded.id).select("-password");

    if (!student) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = student;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({
      message:
        error.name === "TokenExpiredError"
          ? "Session expired"
          : "Invalid token",
    });
  }
};
