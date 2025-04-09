const Task = require("../models/Task");
const TaskCategory = require("../models/TaskCategory");

// Create a new task
exports.createTask = async (req, res) => {
  try {
    console.log("Received Task Data:", req.body);
    const { title, description, category, dueDate } = req.body;
    if (!title || !category) {
        return res.status(400).json({ message: "Title and category are required" });
      }

    // Check if category exists in the taskcategories collection
    let existingCategory = await TaskCategory.findOne({ name: category });
    
    if (!existingCategory) {
      // If category doesn't exist, create a new one
      console.log("Category not found, creating new one");
      existingCategory = await TaskCategory.create({ name: category,userId:req.user.id });
      console.log(existingCategory)
    }

    const task = new Task({ title, description, category, dueDate, createdBy: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

// Get all tasks for the logged-in user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    console.log("deleting",req.params)
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};
//-------------------------------

// const deleteTask = async (req, res) => {
//   try {
//     const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });

//     if (!task) {
//       return res.status(404).json({ message: "Task not found or not authorized" });
//     }
//     await Task.deleteOne({ _id: task._id });

//     res.status(200).json({ message: "Task deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting task:", error);
//     res.status(500).json({ message: "Failed to delete task" });
//   }
// };
