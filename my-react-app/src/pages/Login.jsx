import React, { useContext, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Login.module.css'; 
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const {user} = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '', });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value, }));
  };
// alert(localStorage.getItem("token"))
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log(response.data);  // Handle successful login (e.g., store token)
      setSuccess("Login successful!");
      localStorage.setItem("token", response.data.token); // Store token
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className={styles['login-container']}>
      <form className={styles['login-form']} onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      
      <h1 style={{color:'#333'}}>Login </h1>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
