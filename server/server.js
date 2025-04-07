const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

// Load environment variables first
dotenv.config();

// Enhanced CORS configuration
app.use(
  cors({
    origin: "https://hirequest-cu.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    exposedHeaders: ["Authorization"],
  })
);

// Body parser middleware
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/placements", require("./routes/placementRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));

// Enhanced health check endpoint
app.get("/api/status", (req, res) =>
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
  })
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`❗ [${new Date().toISOString()}] Error: ${err.message}`);
  res.status(err.statusCode || 500).json({
    success: false,
  });
});

// Handle 404s
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
  });
});

const PORT = 5005;

app.listen(PORT, () => console.log(`Server running in mode on port ${PORT}`));
