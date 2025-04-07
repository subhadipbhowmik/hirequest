const Application = require("../models/Application");
const Student = require("../models/Student");
const Placement = require("../models/PlacementModel");
const { fetchStatusFromSheet } = require("../services/sheetsService");

exports.applyForPlacement = async (req, res) => {
  try {
    // Validate user exists
    const student = await Student.findById(req.user._id);
    if (!student) {
      return res.status(404).json({
        success: false,
        error: "Student account not found",
      });
    }

    // Validate placement exists
    const placement = await Placement.findById(req.params.placementId);
    if (!placement) {
      return res.status(404).json({
        success: false,
        error: "Placement opportunity not found",
      });
    }

    // Check existing application
    const existingApplication = await Application.findOne({
      student: student._id,
      placement: placement._id,
    });
    if (existingApplication) {
      return res.status(409).json({
        success: false,
        error: "Already applied to this placement",
      });
    }

    // Create application
    const application = await Application.create({
      student: student._id,
      placement: placement._id,
    });

    // Update student's applications
    await Student.findByIdAndUpdate(
      student._id,
      { $push: { applications: application._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: {
        applicationId: application._id,
        company: placement.companyName,
        appliedAt: application.appliedAt,
      },
    });
  } catch (error) {
    console.error("Application error:", error);
    res.status(500).json({
      success: false,
      error:
        process.env.NODE_ENV === "production"
          ? "Application processing failed"
          : error.message,
    });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    // Get applications with populated placement details
    const applications = await Application.find({ student: req.user._id })
      .populate({
        path: "placement",
        select: "companyName position campusDriveDate",
      })
      .sort("-appliedAt");

    // Get status from Google Sheet
    const sheetStatuses = await fetchStatusFromSheet({
      uid: req.user.uid,
      email: req.user.email,
      phone: req.user.phoneNumber,
    });

    // Merge application data with sheet statuses
    const enhancedApplications = applications.map((app) => ({
      applicationId: app._id,
      company: app.placement.companyName,
      position: app.placement.position,
      driveDate: app.placement.campusDriveDate,
      appliedDate: app.appliedAt,
      status: sheetStatuses[app.placement.companyName] || "Under Review",
    }));

    res.json({
      success: true,
      count: enhancedApplications.length,
      applications: enhancedApplications,
    });
  } catch (error) {
    console.error("Applications fetch error:", error);
    res.status(500).json({
      success: false,
      error:
        process.env.NODE_ENV === "production"
          ? "Failed to retrieve applications"
          : error.message,
    });
  }
};
