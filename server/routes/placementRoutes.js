// routes/placementRoutes.js
const express = require("express");
const router = express.Router();
const {
  addPlacement,
  getAllPlacements,
  getPlacement,
} = require("../controllers/placementController");

// Public routes
router.post("/", addPlacement); // No auth middleware
router.get("/", getAllPlacements);
router.get("/:id", getPlacement);

module.exports = router;
