import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import {
  FiCalendar,
  FiMapPin,
  FiBriefcase,
  FiGlobe,
  FiClock,
  FiFileText,
  FiArrowLeft,
} from "react-icons/fi";
import { Toaster, toast } from "react-hot-toast";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";

const PlacementDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [placement, setPlacement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applied, setApplied] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [placementRes, applicationsRes] = await Promise.all([
          axios.get(`https://hirequest-4cy7.onrender.com/api/placements/${id}`),
          user &&
            axios.get(
              `https://hirequest-4cy7.onrender.com/api/applications/me`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            ),
        ]);

        setPlacement(placementRes.data.placement);

        if (applicationsRes?.data) {
          const hasApplied = applicationsRes.data.some(
            (app) => app.placement._id === id
          );
          setApplied(hasApplied);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data");
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user]);

  const handleApply = async () => {
    setShowConfirmation(false);
    setApplying(true);

    try {
      await axios.post(
        `https://hirequest-4cy7.onrender.com/api/applications/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setApplied(true);
      toast.success("Application submitted successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to apply");
    } finally {
      setApplying(false);
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
          Are you sure you want to apply for this position at{" "}
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
            disabled={applying}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {applying ? "Applying..." : "Confirm"}
          </button>
        </div>
      </motion.div>
    </div>
  );

  const ApplyButton = () => {
    if (!user) {
      return (
        <Link
          to="/login"
          className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Login to Apply
        </Link>
      );
    }

    return (
      <button
        onClick={() => setShowConfirmation(true)}
        disabled={applied || applying}
        className={`ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ${
          applied
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        } text-white`}
      >
        {applied ? "Applied" : "Apply Now"}
      </button>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-auto max-w-4xl mt-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!placement) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">
          Placement not found
        </h3>
        <Link
          to="/all-placements"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Back to all placements
        </Link>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      {showConfirmation && <ConfirmationModal />}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto">
          <Link
            to="/all-placements"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
          >
            <FiArrowLeft className="mr-2" /> Back to all placements
          </Link>

          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {placement.companyName}
                  </h2>
                  <p className="mt-1 text-xl text-indigo-600">
                    {placement.position}
                  </p>
                </div>
                <div className="flex items-center mt-3 sm:mt-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    {placement.driveType}
                  </span>
                  <ApplyButton />
                </div>
              </div>
            </div>

            {/* Rest of the placement details content remains the same */}
            {/* ... [Keep all existing placement detail JSX] ... */}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default PlacementDetails;
