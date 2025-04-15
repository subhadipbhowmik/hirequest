const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
} = require("../controllers/profileController");
const auth = require("../middleware/auth");

// @route   GET /api/profile
// @desc    Get current student profile
// @access  Private
router.get("/profile", auth, getProfile);

// @route   PUT /api/profile
// @desc    Update student profile
// @access  Private
router.put("/profile", auth, updateProfile);

module.exports = router;
