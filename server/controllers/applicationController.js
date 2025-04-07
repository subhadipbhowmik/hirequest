const Application = require("../models/Application");
const Student = require("../models/Student");
const Placement = require("../models/PlacementModel");
const axios = require("axios");
const { fetchStatusFromSheet } = require("../services/sheetsService");

exports.applyForPlacement = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);
    const placement = await Placement.findById(req.params.placementId);

    if (!placement) {
      return res.status(404).json({ message: "Placement not found" });
    }

    const existingApplication = await Application.findOne({
      student: student._id,
      placement: placement._id,
    });

    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "Already applied to this placement" });
    }

    const application = new Application({
      student: student._id,
      placement: placement._id,
    });

    await application.save();

    // Add to student's applications
    await Student.findByIdAndUpdate(student._id, {
      $push: { applications: application._id },
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find(...).populate(...);
    
    // Get Google Sheet status
    const statuses = await fetchStatusFromSheet({
      uid: req.user.uid,
      email: req.user.email,
      phone: req.user.phoneNumber
    });
    
    res.json({ applications, statuses });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
