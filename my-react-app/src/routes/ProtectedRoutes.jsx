import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user === null) return <div style={{color:"#333",fontSize:'20px',display:'flex',alignItems:"center",flex:1,justifyContent:"center",height:"80vh"}}>Not Logged in!! Return to&ensp;<Link to="/login"> Login</Link> </div>; // Prevents premature redirects

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
