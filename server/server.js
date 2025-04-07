const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "https://hirequest-cu.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Database connection
connectDB();

// Routes
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/placements", require("./routes/placementRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));

app.get("/api/status", (req, res) => res.json({ status: "OK" }));

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
