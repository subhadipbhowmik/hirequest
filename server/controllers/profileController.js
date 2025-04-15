const Student = require("../models/Student");
const Application = require("../models/Application");

// Get current student profile
exports.getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.student._id)
      .select("-password")
      .populate({
        path: "applications",
        populate: {
          path: "placement",
          model: "Placement",
        },
      });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update student profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, course, phoneNumber } = req.body;

    // Build profile object
    const profileFields = {};
    if (name) profileFields.name = name;
    if (course) profileFields.course = course;
    if (phoneNumber) profileFields.phoneNumber = phoneNumber;

    // Update
    const student = await Student.findByIdAndUpdate(
      req.student._id,
      { $set: profileFields },
      { new: true }
    ).select("-password");

    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
