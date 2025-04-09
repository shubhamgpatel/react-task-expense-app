const jwt = require("jsonwebtoken");
const User = require("../models/User")

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");;

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }
// const token = req.header("Authorization");
//   if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    // req.user = decoded; // Attach user data to request
    // req.user = await User.findById(decoded.userId);
    if (!req.user) return res.status(404).json({ error: "User not found" });

    // if (!req.user) {
    //   return res.status(401).json({ message: "Unauthorized: User not found" });
    // }
    next(); // Move to the next middleware or route
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
module.exports = authMiddleware;
