const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true,unique: true  },
  description: { type: String },
  category: { type: String, required: true },
  // category: { type: String, enum: ["Work", "Personal", "Urgent"], default: "Work" },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
