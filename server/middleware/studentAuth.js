// studentAuth.js
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

module.exports = async (req, res, next) => {
  try {
    // 1. Get token from header
    const authHeader = req.header("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      throw new Error("Authorization token required");
    }

    const token = authHeader.replace("Bearer ", "");

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find student (with fresh data from DB)
    const student = await Student.findById(decoded.id)
      .select("-password") // Exclude sensitive data
      .lean();

    if (!student) {
      throw new Error("Student account not found");
    }

    // 4. Attach standardized user object
    req.user = {
      ...student,
      _id: student._id.toString(), // Convert ObjectID to string
    };

    next();
  } catch (error) {
    // Handle specific JWT errors
    const message =
      error.name === "JsonWebTokenError"
        ? "Invalid authentication token"
        : error.name === "TokenExpiredError"
        ? "Session expired, please login again"
        : error.message;

    res.status(error.name === "TokenExpiredError" ? 401 : 401).json({
      success: false,
      error: message,
    });
  }
};
