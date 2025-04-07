const express = require("express");
const router = express.Router();
const placementController = require("../controllers/placementController");
const coordinatorAuth = require("../middleware/coordinatorAuth");

// Public endpoints
router.get("/", placementController.getAllPlacements);
router.get("/:id", placementController.getPlacement);

// Protected coordinator endpoints
router.post("/", coordinatorAuth, placementController.addPlacement);

module.exports = router;
