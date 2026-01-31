const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/User");

// CREATE TOKEN
const createToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: "7d",
  });
};

// PROTECT ROUTES
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ error: "Not authorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = { createToken, protect };
