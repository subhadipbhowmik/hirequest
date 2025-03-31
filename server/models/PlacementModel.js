const mongoose = require("mongoose");

const payPackageSchema = new mongoose.Schema({
  internshipStipend: {
    amount: { type: Number, default: 0 },
  },
  salary: {
    ctc: { type: String, required: true },
    variable: { type: Number, default: 0 },
  },
});

const placementSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    companyDescription: String,
    driveType: {
      type: String,
      enum: ["In-Person", "Virtual", "Hybrid"],
      required: true,
    },
    campusDriveDate: {
      type: Date,
      required: true,
    },
    companyWebsite: {
      type: String,
      required: true,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "Invalid website URL",
      ],
    },
    streamRequired: [
      {
        type: String,
        required: true,
      },
    ],
    eligibilityCriteria: [
      {
        type: String,
        required: true,
      },
    ],
    batch: {
      type: Number,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    jobProfile: String,
    jobLocation: {
      type: String,
      required: true,
    },
    dateOfJoining: Date,
    payPackage: {
      type: payPackageSchema,
      required: true,
    },
    anyBond: String,
    placementProcess: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Placement", placementSchema);
