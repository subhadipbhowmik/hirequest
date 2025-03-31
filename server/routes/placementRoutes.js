const express = require("express");
const router = express.Router();
const placementController = require("../controllers/placementController");

// Public routes
router.post("/placements", placementController.addPlacement);
router.get("/placements", placementController.getAllPlacements);
router.get("/placements/:id", placementController.getPlacement);

module.exports = router;
