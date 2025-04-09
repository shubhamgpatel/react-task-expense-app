import { useContext } from 'react'
import './App.css'
import Header from './layout/Header';
import Footer from './layout/Footer';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Contact from './pages/Contact';
import { AuthProvider, AuthContext } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoutes';
import Dashboard from './dashboard/Dashboard';
import TaskManager from './dashboard/TaskManager';
import ExpenseTracker from './dashboard/ExpenseTracker';
import DashboardLayout from './layout/DashboardLayout';
import Profile from './dashboard/Profile';

const App = () => {
  // const { user, loading } = useContext(AuthContext);
  // if (loading) return <div>Loading...</div>; // Prevents flickering issues

  return (
    <BrowserRouter>
    <AuthProvider>
    <Header/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact/>} />
       
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />  {/* Dashboard as Default Page */}
          <Route path="profile" element={<Profile />} />
          <Route path="tasks" element={<TaskManager />} />
          <Route path="expenses" element={<ExpenseTracker />} />
      </Route>
      </Routes>
    {/* <Footer/> */}
    </AuthProvider>    
    </BrowserRouter>
  )
}
// const AuthWrapper = ({ children }) => {
//   const { user } = useContext(AuthContext);
//   return user ? <Navigate to="/dashboard" /> : children;
// };

     {/* <div className="card"></div> */}
export default App
