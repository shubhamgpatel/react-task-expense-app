const express = require("express");
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");
const Task = require("../models/Task");


const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.put("/:id", authMiddleware, updateTask);
router.delete("/tasks/:id", authMiddleware, deleteTask);
router.delete("/:id", authMiddleware, deleteTask);  //might remove


// Add a new task
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, category, completed, dueDate } = req.body;
  
  if (!title) return res.status(400).json({ error: "Title is required" });

  try {
    const newTask = new Task({ title, description, category, completed: completed || false, dueDate, userId: req.user._id, });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Error adding task" });
  }
});


module.exports = router;
