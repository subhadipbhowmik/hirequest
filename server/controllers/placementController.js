const Placement = require("../models/Placement");
const Application = require("../models/Application");
const Student = require("../models/Student");

// Get all placements
exports.getAllPlacements = async (req, res) => {
  try {
    const placements = await Placement.find().sort({ createdAt: -1 });
    res.json(placements);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get placement by ID
exports.getPlacementById = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id);

    if (!placement) {
      return res.status(404).json({ message: "Placement not found" });
    }

    res.json(placement);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Placement not found" });
    }
    res.status(500).json({ message: "Server Error" });
  }
};

// Add new placement (admin only)
exports.addPlacement = async (req, res) => {
  try {
    const newPlacement = new Placement(req.body);
    const placement = await newPlacement.save();
    res.status(201).json(placement);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Apply for a placement
exports.applyForPlacement = async (req, res) => {
  try {
    const placementId = req.params.id;
    const studentId = req.student._id;

    // Check if placement exists
    const placement = await Placement.findById(placementId);
    if (!placement) {
      return res.status(404).json({ message: "Placement not found" });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      student: studentId,
      placement: placementId,
    });

    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "Already applied for this placement" });
    }

    // Create application
    const application = new Application({
      student: studentId,
      placement: placementId,
    });

    await application.save();

    // Update student's applications
    await Student.findByIdAndUpdate(studentId, {
      $push: { applications: application._id },
    });

    res
      .status(201)
      .json({ message: "Successfully applied for placement", application });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all applications for a student
exports.getStudentApplications = async (req, res) => {
  try {
    const applications = await Application.find({ student: req.student._id })
      .populate("placement")
      .sort({ appliedAt: -1 });

    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
