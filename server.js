// Yeh hai hamara main server file - Kaam Karle Bhai 😄
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const todoRoutes = require("./routes/todoRoutes");

const app = express();

// Middleware - JSON aur CORS enable karo
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);

// Root route - bas ek welcome message
app.get("/", (req, res) => {
  res.json({ message: "Kaam Karle Bhai ci/cd autodeploy chal rahi hai! 🚀" });
});

// MongoDB se connect karo
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB se connect ho gaye bhai!");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server chal raha hai port ${process.env.PORT || 5000} pe`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connect nahi hua:", err.message);
    process.exit(1);
  });
