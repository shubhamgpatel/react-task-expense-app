const express = require("express");
const { registerUser,loginUser } = require("../controllers/authController");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Register route
router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/protected-route", authMiddleware, (req, res) => {
  res.json({ message: "You have access!", user: req.user });
});

// ✅ Get current user route
router.get("/me", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB (excluding password)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
});
module.exports = router;
