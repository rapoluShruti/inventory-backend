require("dotenv").config();

module.exports = {
  mongodbURI: process.env.MONGODB_URI || "mongodb://localhost:27017/retail-demand",
  jwtSecret: process.env.JWT_SECRET || "your-secret-key-change-in-production",
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
};
