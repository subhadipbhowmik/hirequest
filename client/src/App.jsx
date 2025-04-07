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
import About from "./pages/About.jsx";
import Resources from "./pages/Resources.jsx";

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

        {/* basic pages  */}
        <Route path="/about" element={<About />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
      <Toaster position="right-bottom" />
      <Footer />
    </>
  );
}

export default App;
