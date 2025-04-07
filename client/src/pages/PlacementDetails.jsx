import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { FiArrowLeft } from "react-icons/fi";
import { Toaster, toast } from "react-hot-toast";

const PlacementDetails = () => {
  const { id } = useParams();
  const { user, logout } = useAuth();
  const [placement, setPlacement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applied, setApplied] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const placementRes = await axios.get(
          `https://hirequest-4cy7.onrender.com/api/placements/${id}`
        );

        setPlacement(placementRes.data.placement);
        setApplied(user?.applications?.some((app) => app.placement === id));
      } catch (err) {
        setError(
          err.response?.data?.error || "Failed to load placement details"
        );
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user]);

  const handleApply = async () => {
    try {
      const token = localStorage.getItem("hireQuestToken");
      if (!token) {
        toast.error("Please login to apply");
        return;
      }

      await axios.post(
        `https://hirequest-4cy7.onrender.com/api/applications/${id}/apply`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setApplied(true);
      toast.success("Application submitted successfully!");
    } catch (err) {
      console.error("Application error:", err);
      if (err.response?.status === 401) logout();
      toast.error(err.response?.data?.error || "Application failed");
    } finally {
      setShowConfirmation(false);
    }
  };

  const ConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-lg p-6 max-w-md w-full"
      >
        <h3 className="text-lg font-semibold mb-4">Confirm Application</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to apply for {placement?.position} at{" "}
          {placement?.companyName}?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setShowConfirmation(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-600">{error}</div>;
  if (!placement)
    return <div className="text-center p-8">Placement not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Toaster />
      {showConfirmation && <ConfirmationModal />}

      <div className="max-w-4xl mx-auto">
        <Link
          to="/all-placements"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
        >
          <FiArrowLeft className="mr-2" /> Back to placements
        </Link>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">{placement.companyName}</h1>
              <p className="text-xl text-indigo-600 mt-2">
                {placement.position}
              </p>
            </div>

            {user ? (
              <button
                onClick={() => !applied && setShowConfirmation(true)}
                className={`mt-4 sm:mt-0 px-6 py-2 rounded-lg ${
                  applied
                    ? "bg-gray-400 cursor-default"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } text-white`}
              >
                {applied ? "Applied ✓" : "Apply Now"}
              </button>
            ) : (
              <Link
                to="/login"
                className="mt-4 sm:mt-0 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white"
              >
                Login to Apply
              </Link>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <FiBriefcase className="mr-2 text-gray-600" />
              <span>{placement.jobProfile}</span>
            </div>

            <div className="flex items-center">
              <FiMapPin className="mr-2 text-gray-600" />
              <span>{placement.jobLocation}</span>
            </div>

            <div className="flex items-center">
              <FiCalendar className="mr-2 text-gray-600" />
              <span>
                Drive Date:{" "}
                {new Date(placement.campusDriveDate).toLocaleDateString()}
              </span>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">
                Eligibility Criteria
              </h3>
              <ul className="list-disc pl-6">
                {placement.eligibilityCriteria.map((criteria, index) => (
                  <li key={index}>{criteria}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementDetails;
