const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    // const { name, email, password } = req.body;
    const { name, email, password, dob, gender } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

     // Hashing done in USER SCHEMA
    // Create new user
    const newUser = new User({ name, email, password,dob,gender, });
    await newUser.save();

    // Generate JWT Token
    // const token = jwt.sign({ userId: newUser._id }, "TASK_EXPENSE", { expiresIn: "1h" });
    // res.status(201).json({ message: "User registered successfully", token });
    res.status(201).json({ message: "User registered successfully" });
    console.log("Saved user in MongoDB:", newUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

const loginUser = async (req,res) => {
    try{
        const{ email, password } = req.body;
        const user = await User.findOne({email});

        if (!user) return res.status(400).json({ message: "Invalid email or password, not a user" });
         // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
     
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });
    
        // Generate JWT token TO UNDERSTAND
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({message:"Login Successful",token});

    }catch(error){
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
module.exports = { registerUser,loginUser };