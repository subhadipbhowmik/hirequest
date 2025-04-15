const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const placementRoutes = require("./routes/placementRoutes");
const profileRoutes = require("./routes/profileRoutes");

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api", placementRoutes);
app.use("/api", profileRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("HireQuest API is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
