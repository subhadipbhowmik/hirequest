const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

// Load environment variables first
dotenv.config({ path: "./config/config.env" });

// Enhanced CORS configuration
app.use(
  cors({
    origin: "https://hirequest-cu.vercel.app" || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    exposedHeaders: ["Authorization"], // Needed for token refresh patterns
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
    environment: process.env.NODE_ENV || "development",
  })
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`❗ [${new Date().toISOString()}] Error: ${err.message}`);
  res.status(err.statusCode || 500).json({
    success: false,
    error: process.env.NODE_ENV === "production" ? "Server error" : err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// Handle 404s
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
  });
});

const PORT = process.env.PORT || 5005;

app.listen(PORT, () =>
  console.log(
    `🚀 Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  )
);
