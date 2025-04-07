// routes/studentRoutes.js
const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getProfile,
} = require("../controllers/studentController");
const studentAuth = require("../middleware/studentAuth");

// Public routes (no authentication required)
router.post("/signup", signup);
router.post("/login", login);

// Protected routes (require valid JWT)
router.get("/profile", studentAuth, getProfile);
// In studentRoutes.js
router.get("/validate-session", studentAuth, validateSession);

module.exports = router;
