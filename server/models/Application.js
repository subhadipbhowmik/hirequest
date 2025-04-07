const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  placement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Placement",
    required: true,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Application", applicationSchema);
