import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize axios headers and check auth state
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
          const response = await axios.get("/api/students/profile");
          setUser(response.data);
        } catch (error) {
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Axios response interceptor
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/students/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      setUser(response.data.user);

      return true;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Login failed");
    }
  };

  const signup = async (formData) => {
    try {
      const response = await axios.post("/api/students/signup", formData);

      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      setUser(response.data.user);

      return true;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    navigate("/login");
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
