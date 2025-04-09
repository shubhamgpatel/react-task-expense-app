const express = require("express");
const { addExpense, getExpenses, updateExpense, deleteExpense } = require("../controllers/expenseController");
const authMiddleware = require("../middleware/authMiddleware");
// const Expense = require("../models/Expense");

const router = express.Router();

// Update an expense by ID
router.put("/:id", authMiddleware, updateExpense);


router.post("/", authMiddleware, addExpense);
router.get("/", authMiddleware, getExpenses);
router.get("/:id", authMiddleware, getExpenseById);     //work on this
router.put("/:id", authMiddleware, updateExpense);
router.delete("/expense/:id", authMiddleware, deleteExpense);
router.delete("/:id", authMiddleware, deleteExpense);  //might remove

module.exports = router;

