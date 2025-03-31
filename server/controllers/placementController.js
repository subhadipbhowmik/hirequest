const Placement = require("../models/PlacementModel");

// Add new placement
exports.addPlacement = async (req, res) => {
  try {
    const requiredFields = [
      "companyName",
      "driveType",
      "campusDriveDate",
      "companyWebsite",
      "streamRequired",
      "eligibilityCriteria",
      "batch",
      "position",
      "jobLocation",
      "payPackage",
      "placementProcess",
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`,
        });
      }
    }

    const newPlacement = await Placement.create(req.body);

    res.status(201).json({
      success: true,
      message: "Placement added successfully",
      placement: newPlacement,
    });
  } catch (error) {
    console.error("Add placement error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get all placements
exports.getAllPlacements = async (req, res) => {
  try {
    const placements = await Placement.find().sort({ campusDriveDate: 1 });
    res.status(200).json({
      success: true,
      count: placements.length,
      placements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get single placement
exports.getPlacement = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id);
    if (!placement) {
      return res.status(404).json({
        success: false,
        message: "Placement not found",
      });
    }
    res.status(200).json({
      success: true,
      placement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
