require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");
const categoryRoutes = require("./routes/categoryRoutes");
const expenseRoutes = require("./routes/expense");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/expenses", expenseRoutes);
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch((err) => console.log("MongoDB Connection Error ❌", err));

// Routes
app.get("/", (req, res) => { res.send("API is running..."); });

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
