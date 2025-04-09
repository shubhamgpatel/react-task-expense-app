// src/components/ExpenseForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense } from '../redux/expenseSlice';

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ title: '', amount: '', category: '', date: '' });

  const handleChange = (e) => { const { name, value } = e.target; setFormData({ ...formData, [name]: value }); };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addExpense(formData));
    setFormData({ title: '', amount: '', category: '', date: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
      <input name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" />
      <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
      <input name="date" value={formData.date} onChange={handleChange} type="date" />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;