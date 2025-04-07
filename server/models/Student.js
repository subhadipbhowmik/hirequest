const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    course: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"], // Validates a 10-digit number
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"], // Basic email validation
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true } // Adds createdAt & updatedAt fields
);

module.exports = mongoose.model("Student", studentSchema);
