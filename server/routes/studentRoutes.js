const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// Signup route
router.post("/signup", studentController.signup);

// Login route
router.post("/login", studentController.login);

module.exports = router;
