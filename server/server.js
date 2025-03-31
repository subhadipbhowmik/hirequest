const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "https://hirequest-cu.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// connect to db
connectDB();

// routes
app.get("/api/status", (req, res) => {
  res.json({ status: "ok" });
});

// Student routes
app.use("/api/students", require("./routes/studentRoutes"));

app.listen(5005, () => console.log("Server started on port 5005"));

module.exports = app;
