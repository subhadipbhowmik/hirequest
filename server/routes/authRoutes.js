const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getCurrentStudent,
} = require("../controllers/authController");
const auth = require("../middleware/auth");

// @route   POST /api/signup
// @desc    Register a student
// @access  Public
router.post("/signup", register);

// @route   POST /api/login
// @desc    Authenticate student & get token
// @access  Public
router.post("/login", login);

// @route   GET /api/auth
// @desc    Get current student
// @access  Private
router.get("/auth", auth, getCurrentStudent);

module.exports = router;
