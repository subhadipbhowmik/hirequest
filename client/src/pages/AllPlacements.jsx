import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiExternalLink,
  FiCalendar,
  FiMapPin,
  FiBriefcase,
  FiAward,
} from "react-icons/fi";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";

export const AllPlacements = () => {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        const response = await axios.get(
          "https://hirequest-4cy7.onrender.com/api/placements"
        );
        setPlacements(response.data.placements);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch placements");
      } finally {
        setLoading(false);
      }
    };

    fetchPlacements();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 mt-20 border-l-4 border-red-500 p-4">
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 mt-30 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Current Placement Drives
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Explore upcoming campus recruitment opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placements.map((placement) => (
            <motion.div
              key={placement._id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {placement.companyName}
                    </h3>
                    <p className="mt-1 text-indigo-600 font-medium">
                      {placement.position}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {placement.driveType}
                  </span>
                </div>

                <p className="mt-3 text-gray-500 line-clamp-2">
                  {placement.companyDescription}
                </p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <FiCalendar className="flex-shrink-0 mr-2 text-gray-400" />
                    <span>
                      Drive:{" "}
                      {new Date(placement.campusDriveDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FiMapPin className="flex-shrink-0 mr-2 text-gray-400" />
                    <span>{placement.jobLocation}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <RiMoneyRupeeCircleLine className="flex-shrink-0 mr-2 text-gray-400" />
                    <span>CTC: ₹{placement.payPackage.salary.ctc}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FiBriefcase className="flex-shrink-0 mr-2 text-gray-400" />
                    <span>Batch: {placement.batch}</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {placement.streamRequired.slice(0, 3).map((stream, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {stream}
                    </span>
                  ))}
                  {placement.streamRequired.length > 3 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      +{placement.streamRequired.length - 3} more
                    </span>
                  )}
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <Link
                    to={`/placements/${placement._id}`}
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                  >
                    View details <FiExternalLink className="ml-1" />
                  </Link>
                  <span className="text-xs text-gray-500">
                    Posted {new Date(placement.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {placements.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No placements available
            </h3>
            <p className="mt-1 text-gray-500">
              Check back later for new opportunities.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AllPlacements;
