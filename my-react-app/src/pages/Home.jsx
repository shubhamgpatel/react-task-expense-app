import React from 'react';
import '../assets/Home.css'
import { Link } from 'react-router-dom';

// import '../../public/images/expense-tracker.png';
const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Task Manager & Expense Tracker</h1>
        <p>Organize your tasks efficiently and track your expenses with ease.</p>
      </header>

      <section className="intro-section">
        <h2>Get Started with Managing Your Tasks and Expenses</h2>
        <p>Our app helps you manage your daily tasks and expenses with ease. Track your progress, manage your time, and stay within budget all in one place.</p>
      </section>

      <section className="features-section">
        <div className="feature-item">
          <img src="/images/task-manager.jpg" alt="Task Manager" className="feature-image" />
          <h3>Task Manager</h3>
          <p>Keep track of your tasks and stay organized. Assign deadlines, track progress, and manage priorities with ease. Your productivity assistant.</p>
        </div>
        <div className="feature-item">
          <img src="/images/expense-tracker.jpg" alt="Expense Tracker" className="feature-image" />
          <h3>Expense Tracker</h3>
          <p>Monitor your spending and stay within budget. Track your daily, weekly, and monthly expenses in one place to keep your finances under control.</p>
        </div>
        <div className="feature-item">
          <img src="/images/time-tracker.jpg" alt="Time Tracking" className="feature-image" />
          <h3>Time Tracking</h3>
          <p>Track the time spent on each task to improve productivity. Analyze where you're spending time and optimize your workflow for better results.</p>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Sign up today and start managing your tasks and expenses effortlessly.</p>
        <Link to="/register"><button>Get Started</button></Link>
        
      </section>

    </div>
  );
};

export default Home;
