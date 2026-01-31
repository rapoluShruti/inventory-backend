const User = require("../models/User");
const { createToken } = require("../middleware/auth");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const user = await User.create({ name, email, password });
    const token = createToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        shopName: user.shopName,
        shopType: user.shopType,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = createToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        shopName: user.shopName,
        shopType: user.shopType,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE SHOP (PROTECTED)
exports.updateShop = async (req, res) => {
  try {
    const { shopName, shopType } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { shopName, shopType },
      { new: true }
    );

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        shopName: user.shopName,
        shopType: user.shopType,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET PROFILE (PROTECTED)
exports.getUser = async (req, res) => {
  res.json({ user: req.user });
};
