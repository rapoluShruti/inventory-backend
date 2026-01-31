const express = require("express");
const {
  register,
  login,
  updateShop,
  getUser,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// 🔒 Protected routes
router.post("/update-shop", protect, updateShop);
router.get("/me", protect, getUser);

module.exports = router;
