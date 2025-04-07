import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    // Pass current location to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
