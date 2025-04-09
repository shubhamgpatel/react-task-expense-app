const mongoose = require("mongoose");

const TaskCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const TaskCategory = mongoose.model("TaskCategory", TaskCategorySchema);
module.exports = TaskCategory;
