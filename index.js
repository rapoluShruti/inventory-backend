require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// CORS
app.use(
  cors({
    origin: "https://inventory-seven-wine.vercel.app/",
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb+srv://ameynadkar229_db_user:lxFM9Xj1SQ0ug9gf@cluster0.umusy80.mongodb.net/"
    );
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use("/api/auth", require("./routes/auth"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
