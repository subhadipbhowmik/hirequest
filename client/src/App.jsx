import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import { AddPlacement } from "./pages/AddPlacement.jsx";
import { AllPlacements } from "./pages/AllPlacements.jsx";
import PlacementDetails from "./pages/PlacementDetails.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/add-placement" element={<AddPlacement />} />
        <Route path="/all-placements" element={<AllPlacements />} />
        <Route path="/placements/:id" element={<PlacementDetails />} />
      </Routes>
      <Toaster position="right-bottom" />
      <Footer />
    </>
  );
}

export default App;
