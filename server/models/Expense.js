// const mongoose = require("mongoose");

// const expenseSchema = new mongoose.Schema({
//   title: { type: String, required: true,unique: true  },
//   description: { type: String },
//   category: { type: String, required: true },
//   // category: { type: String, enum: ["Work", "Personal", "Urgent"], default: "Work" },
//   completed: { type: Boolean, default: false },
//   dueDate: { type: Date },
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// }, { timestamps: true });

// module.exports = mongoose.model("Expense", expenseSchema);

const mongoose = require("mongoose");
const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
  title: { type: String, required: true, },
  amount: { type: Number, required: true, },
  description: { type: String, },
  date: { type: Date, default: Date.now, },
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
