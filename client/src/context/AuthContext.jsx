import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check existing session on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(
          "https://hirequest-4cy7.onrender.com/api/students/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(data);
      } catch (error) {
        localStorage.removeItem("token");
        toast.error("Session expired, please login again");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        "https://hirequest-4cy7.onrender.com/api/students/login",
        { email, password }
      );

      localStorage.setItem("token", data.token);
      setUser(data.student);
      toast.success("Login successful!");
      navigate("/profile");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
      return false;
    }
  };

  // Signup function
  const signup = async (studentData) => {
    try {
      const { data } = await axios.post(
        "https://hirequest-4cy7.onrender.com/api/students/signup",
        studentData
      );

      localStorage.setItem("token", data.token);
      setUser(data.student);
      toast.success("Account created successfully!");
      navigate("/profile");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
