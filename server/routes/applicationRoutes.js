// routes/applicationRoutes.js
const express = require("express");
const router = express.Router();
const {
  applyForPlacement,
  getMyApplications,
} = require("../controllers/applicationController");
const studentAuth = require("../middleware/studentAuth");

// @desc    Apply for a placement
// @route   POST /api/applications/:placementId/apply
router.post("/:placementId/apply", studentAuth, applyForPlacement);

// @desc    Get logged-in student's applications
// @route   GET /api/applications/my-applications
router.get("/my-applications", studentAuth, getMyApplications);

module.exports = router;
