import React, { useEffect, useState } from "react";
import { MenuItem, TextField, Select, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
// import { MenuItem, TextField, Select } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories, addCategoryAsync } from "../redux/taskSlice";
import { addCategory } from "../redux/taskSlice";

const TaskCategoryDropdown = ({ selectedCategory, setSelectedCategory }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.tasks.categories);
  const [newCategory, setNewCategory] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (value === "add_new") {
      setTimeout(() => setOpenDialog(true), 0); // Ensures dialog remains open
    } else {
      setSelectedCategory(value);
    }
  };
   
  const handleAddCategory = async (event) => {
    if (newCategory.trim() !== "") {
      dispatch(addCategory(newCategory.trim()));
      setSelectedCategory(newCategory.trim());
      setNewCategory("");
      setOpenDialog(false);
    }
  };

  return (
    <>
    <Select value={selectedCategory} displayEmpty onChange={handleCategoryChange} fullWidth>
      <MenuItem value="" disabled>Select Category</MenuItem>
      {categories.map((category, index) => (
        <MenuItem key={index} value={category}> {category} </MenuItem>
      ))}
       <MenuItem value="add_new">+ Add New Category</MenuItem>
    </Select>

         <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField label="Category Name" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} fullWidth autoFocus/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddCategory} variant="contained" color="primary">Add</Button>
        </DialogActions>
      </Dialog>
      </>
  );
};

export default TaskCategoryDropdown;
