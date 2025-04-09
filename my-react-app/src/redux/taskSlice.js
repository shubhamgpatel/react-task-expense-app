import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch categories from backend
export const fetchCategories = createAsyncThunk("tasks/fetchCategories", async () => {
    const response = await axios.get("/api/categories");
    return response.data.map((cat) => cat.name); // Extract names only
  });
  
// Add a new category to backend & Redux
export const addCategoryAsync = createAsyncThunk("tasks/addCategory", async (categoryName, { dispatch }) => {
    const response = await axios.post("/api/categories", { name: categoryName });
    dispatch(addCategory(response.data.name)); // Add to Redux store
    return response.data.name;
  });

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks:[],
    categories: ["Work", "Personal", "Shopping", "Fitness"], // Default categories
    loading: false,
    error: null,
  },  //useSelector calls this
  reducers: {
    addCategory: (state, action) => {
        if (!state.categories.includes(action.payload)) {
          state.categories.push(action.payload);
        }
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setLoading: (state, action) => {
        state.loading = action.payload; // Set loading state
      }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(addCategoryAsync.rejected, (state, action) => {
        state.error = "Error adding category";
      });
  },
});

export const { addCategory, addTask, removeTask, setTasks, setLoading } = taskSlice.actions;
export default taskSlice.reducer;
