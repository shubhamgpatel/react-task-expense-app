const express = require("express");
const TaskCategory = require("../models/TaskCategory");
const authMiddleware = require("../middleware/authMiddleware"); // Ensure user authentication

const router = express.Router();

// Get all categories
router.get("/", authMiddleware, async (req, res) => {
//   try {
//     const categories = await TaskCategory.find();
//     res.json(categories);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching categories" });
//   }
  try {
    const categories = await TaskCategory.find({ userId: req.user._id });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories" });
  }
});

// Add a new category
router.post("/", authMiddleware, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Category name is required" });

  try {
    const existingCategory = await TaskCategory.findOne({ name,userId: req.user._id   });
    if (existingCategory) return res.status(400).json({ error: "Category already exists" });

    const newCategory = new TaskCategory({ name, userId: req.user._id });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Error adding category" });
  }
});

module.exports = router;
