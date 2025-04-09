import React, { useState } from 'react';
import axios from 'axios';
import styles from "../styles/Register.module.css";

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', dob: '', gender: ''});
  const [passwordError, setPasswordError] = useState('');
  const [dobError, setDobError] = useState('');
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

    // Get today's date minus 10 years
    const getMinDOB = () => {
        const today = new Date();
        today.setFullYear(today.getFullYear() - 10);
        return today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData, [name]: value,
    }));

    // Real-time password validation
    if (name === "confirmPassword") {
      setPasswordError(value !== formData.password ? "Passwords do not match!" : "");
    }

      // Real-time DOB validation
      if (name === "dob") {
        const minDOB = new Date(getMinDOB());
        // alert(minDOB)
        const selectedDate = new Date(value);
        setDobError(selectedDate > minDOB ? "You must be at least 10 years old!" : "");
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { name, email, password, confirmPassword, dob, gender } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log(formData);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      // console.log(response.data);  // Handle response (e.g., show success message)
      setSuccess(response.data.message);
      setFormData({ name: "", email: "", password: "", confirmPassword: "", dob: "", gender: "", });
    } catch (error) {
        setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className={styles['register-container']}>
      <form onSubmit={handleSubmit} className={styles['register-form']}>
        <h1 style={{color:"#333"}}>Register</h1>
        {error && <p className={styles.error}  style={{color:'red'}}>{error}</p>}
        {success && <p className={styles.success} style={{color:'green'}}>{success}</p>}
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
        
        {passwordError && <p style={{ color: "red", fontSize: "14px" }}>{passwordError}</p>}

        <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
        {dobError && <p style={{ color: "red", fontSize: "14px" }}>{dobError}</p>}
        <select name="gender" value={formData.gender} onChange={handleChange} >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
