const express = require("express");
const router = express.Router();
const {
  getAllPlacements,
  getPlacementById,
  addPlacement,
  applyForPlacement,
  getStudentApplications,
} = require("../controllers/placementController");
const auth = require("../middleware/auth");

// @route   GET /api/all-placements
// @desc    Get all placements
// @access  Public
router.get("/all-placements", getAllPlacements);

// @route   GET /api/placements/:id
// @desc    Get placement by ID
// @access  Private
router.get("/placements/:id", auth, getPlacementById);

// @route   POST /api/add-placement
// @desc    Add a new placement
// @access  Public (in a real app, this would be admin only)
router.post("/add-placement", addPlacement);

// @route   POST /api/placements/:id/apply
// @desc    Apply for a placement
// @access  Private
router.post("/placements/:id/apply", auth, applyForPlacement);

// @route   GET /api/applications
// @desc    Get all applications for a student
// @access  Private
router.get("/applications", auth, getStudentApplications);

module.exports = router;
