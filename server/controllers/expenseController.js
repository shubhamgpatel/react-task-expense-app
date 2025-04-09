const Expense = require("../models/Expense");

// ➡️ Add Expense
exports.addExpense = async (req, res) => {
  const { title, amount, description, date } = req.body;
  const userId = req.user._id; // From middleware

  if (!title || !amount) {
    return res.status(400).json({ error: "Title and amount are required." });
  }

  try {
    const newExpense = new Expense({ userId, title, amount, description, date });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ➡️ Get All Expenses for a User
exports.getExpenses = async (req, res) => {
  const userId = req.user._id;
  try {
    const expenses = await Expense.find({ userId });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// to do
exports.getExpenseById = async (req, res) => {
    const { id }= req.params;
    try {
      const expenses = await Expense.find({ _id:id, userId: req.user._id });
      if (!expense) {
        return res.status(404).json({ error: "Expense not found" });
      }
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
// Update an expense
exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const { title, amount, date, description, category } = req.body;
  
    try {
      const expense = await Expense.findOne({ _id: id, userId: req.user._id });
  
      if (!expense) {
        return res.status(404).json({ error: "Expense not found" });
      }
  
      // Update fields if they exist in the request
      if (title !== undefined) expense.title = title;
      if (amount !== undefined) expense.amount = amount;
      if (date !== undefined) expense.date = date;
      if (description !== undefined) expense.description = description;
    //   if (category !== undefined) expense.category = category;
  
      await expense.save();
      res.json({ message: "Expense updated successfully", expense });
    } catch (error) {
      res.status(500).json({ error: "Error updating expense" });
    }
  };
  
// ➡️ Delete Expense
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ error: "Expense not found" });

    // Ensure the expense belongs to the logged-in user
    if (expense.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await expense.deleteOne();
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
