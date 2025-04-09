import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);  // ✅
    
    const login = (token, userData) => { localStorage.setItem("token", token);
        setUser(userData);
        navigate("/dashboard");
      };
    
      const logout = () => { localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
      };
  
    return (
      <AuthContext.Provider value={{ user, login, logout, loading }}>
        <AuthInitializer setUser={setUser} setLoading={setLoading}>{children}</AuthInitializer> {/* ✅ Fix applied here */}
      </AuthContext.Provider>
    );
  };
  
  const AuthInitializer = ({ children, setUser, setLoading }) => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      console.log("Mila token: " + token)
      if (token) {
        axios.get("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
          .then((res) => {console.log(res.data); setUser(res.data)}).catch(() => {
            localStorage.removeItem("token");
            navigate("/login"); // ✅ Now it is inside `BrowserRouter`
          }).finally(()=>setLoading(false));
      }else {
        setLoading(false);
      }
    }, [navigate, setUser, setLoading]);
    return children;
  };