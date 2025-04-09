import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice"; // Task reducer (we'll create it)
import expenseReducer from "./expenseSlice"; // Expense reducer

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    expenses: expenseReducer,
  },
});

export default store;
