import React, { useState, useEffect } from "react";
// // import { useTasks } from "../context/TaskContext";
import { Container, TextField, Button, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTask, setLoading, setTasks } from "../redux/taskSlice";
import TaskCategoryDropdown from "./TaskCategoryDropdown";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const TaskManager = () => {
  const [newtask, setNewTask] = useState({ title: '', description: '', category : '', completed: '', dueDate: ''});
  const tasks = useSelector((state) => state.tasks.tasks);
//   const categories = useSelector((state) => {state.tasks.categories});
  const loading = useSelector((state) => {state.tasks.loading});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axios.get("/api/tasks", {
          headers: { Authorization: localStorage.getItem("token") },
        });
        dispatch(setTasks(response.data));
        dispatch(setLoading(false));
      } catch (error) {
        console.error("Error fetching tasks:", error);
        dispatch(setLoading(false));
      }
    };
    fetchTasks();
  }, [dispatch]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevData) => ({ ...prevData, [name]: value, }));
    }


    // console.log(tasks)
  const handleAddTask = async () => {   
    if(newtask.title.trim()){
        try{
            dispatch(setLoading(true));
            const response = await axios.post("/api/tasks",newtask,{headers:{Authorization:localStorage.getItem("token")} });
            dispatch(addTask(response.data));
            setNewTask({title: '', description: '', category : '', completed: '', dueDate: ''})
             dispatch(fetchCategories());
            dispatch(setLoading(false));
        }catch(error){
            dispatch(setLoading(false));
            console.log(error);
        }
    }else{
        alert("Task title is required!");
        return;
    }
    // dispatch(addTask({ id: Date.now(), title: "New Task" }));       
    };
    const handleDeleteTask = async (id) => {
        try {
            const token = localStorage.getItem("token"); // Retrieve the token
          if (!token) {
            alert("User not authenticated");
            return;
          }
          await axios.delete(`/api/tasks/${id}`, { headers:{Authorization:token } });
          dispatch(removeTask(id));
          console.log("deleted")
          alert("Deleted")
          dispatch(fetchTasks());
        } catch (error) {
            console.error(error?.response?.data?.message || "Error deleting task");
        }
      };      
  return (
    <>
    <Container maxWidth="sm">
      <Typography variant="h4" style={{color:"#252c65"}} gutterBottom>Task Manager</Typography>
      {/* <button variant="contained" color="primary" onClick={handleAddTask}>Add Task</button> */}
        <Container maxWidth="sm">
        <TextField label="Task Title"  name="title" value={newtask.title}  onChange={handleChange} fullWidth margin="normal"  maxRows={1} />
        <TextField label="Task Description"  value={newtask.description} name="description" fullWidth  onChange={handleChange} margin="normal" multiline maxRows={5} />
      <div style={{marginTop:"20px",marginBottom:"20px"}}>
        <TaskCategoryDropdown selectedCategory={newtask.category} setSelectedCategory={(category) => setNewTask((prev) => ({ ...prev, category }))} />
    </div>
    <TextField label="Due Date" type="date" name="dueDate" value={newtask.dueDate} onChange={handleChange} fullWidth margin="normal"InputLabelProps={{ shrink: true }}/>
    </Container>

      </Container>
      {/* <input type="date" name="dob" /> */}
      {/* <button variant="contained" margin="normal"  color="primary" onClick={handleAddTask}>Submit Task</button> */}
      <Button onClick={handleAddTask} disabled={loading} variant="contained" color="primary">
        {loading ? <CircularProgress size={24} /> : "Add Task"}
      </Button>
      <Container maxWidth="sm">
        <ul style={{color:"#333"}}>
         {tasks.map((task) => (
          <li key={task._id}>
                <b>Title:</b> {task.title}<br/> 
                <b>Category: </b> {task.category}<br/>
                <b>Description: </b>{task.description}<br/>
                <b>Due Date: </b> {task.dueDate}
            <Button onClick={() => handleDeleteTask(task._id)}>Delete</Button>
          </li>
        ))}
      </ul>
      </Container>
    </>
  );
};

export default TaskManager;
