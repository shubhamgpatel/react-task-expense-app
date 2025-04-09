import React, { Component } from 'react';
import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header =() => {
    const [menuOpen, setMenuOpen] = useState(false)  // State to toggle the menu visibility
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
      };
        return (
            <>
            <div className='header-bg'>
                <div className="header-left">
                <li><Link to="/" style={{color:"#333",fontSize:30, fontWeight:'bold'}}>Task Manager and Expense Tracker</Link></li>
                </div>
                <div className="header-right">
                    <div className={`header-right ${menuOpen ? 'open' : ''}`}>
                        <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/dashboard">Dashboard Temp</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Hamburger Menu Icon */}
                <div className="hamburger" onClick={toggleMenu}>
                    {menuOpen ? <FaTimes /> : <FaBars />}  {/* Display the hamburger or close icon */}
                </div>

            </div>
            </>
        );
}

export default Header;