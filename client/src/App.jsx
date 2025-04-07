import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import AllPlacements from "./pages/AllPlacements";
import PlacementDetails from "./pages/PlacementDetails";
import AddPlacement from "./pages/AddPlacement";
import About from "./pages/About";
import Resources from "./pages/Resources";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/all-placements" element={<AllPlacements />} />
            <Route path="/placements/:id" element={<PlacementDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/resources" element={<Resources />} />

            {/* Protected Routes - Only login required */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/add-placement" element={<AddPlacement />} />
            </Route>
          </Routes>
        </main>

        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </AuthProvider>
  );
}

export default App;
