const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
    index: true,
  },
  placement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Placement",
    required: true,
    index: true,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

// Add compound index to prevent duplicate applications
applicationSchema.index(
  { student: 1, placement: 1 },
  { unique: true, name: "unique_application" }
);

module.exports = mongoose.model("Application", applicationSchema);
