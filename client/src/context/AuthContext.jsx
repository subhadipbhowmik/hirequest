import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize axios defaults
  useEffect(() => {
    axios.defaults.baseURL =
      import.meta.env.VITE_API_URL || "http://localhost:5005/api";

    const token = localStorage.getItem("hireQuestToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("hireQuestToken");
        if (token) {
          const response = await axios.get("/students/profile");
          setUser(response.data);
        }
      } catch (error) {
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleAuthResponse = (response) => {
    const { token, student } = response.data;
    localStorage.setItem("hireQuestToken", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(student);
    return student;
  };

  const signup = async (formData) => {
    try {
      const response = await axios.post("/students/signup", formData);
      const student = handleAuthResponse(response);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Registration failed");
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post("/students/login", { email, password });
      handleAuthResponse(response);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("hireQuestToken");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    navigate("/login");
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post("/students/refresh-token");
      handleAuthResponse(response);
      return true;
    } catch (error) {
      logout();
      return false;
    }
  };

  // Axios response interceptor
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          await refreshToken();
          return axios(originalRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  const value = {
    user,
    loading,
    signup,
    login,
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

export default AuthProvider;
