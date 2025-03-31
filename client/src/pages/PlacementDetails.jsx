import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiDollarSign,
  FiMapPin,
  FiBriefcase,
  FiAward,
  FiGlobe,
  FiClock,
  FiFileText,
  FiArrowLeft,
} from "react-icons/fi";
import { Toaster, toast } from "react-hot-toast";

const PlacementDetails = () => {
  const { id } = useParams();
  const [placement, setPlacement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlacement = async () => {
      try {
        const response = await axios.get(
          `https://hirequest-4cy7.onrender.com/api/placements/${id}`
        );
        setPlacement(response.data.placement);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch placement details"
        );
        toast.error("Failed to load placement details");
      } finally {
        setLoading(false);
      }
    };

    fetchPlacement();
  }, [id]);

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
                <span className="mt-3 sm:mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  {placement.driveType}
                </span>
              </div>
            </div>

            <div className="px-6 py-5">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Company Information
                </h3>
                <p className="text-gray-600">{placement.companyDescription}</p>
                <div className="mt-3 flex items-center text-sm text-gray-500">
                  <FiGlobe className="flex-shrink-0 mr-2 text-gray-400" />
                  <a
                    href={placement.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    {placement.companyWebsite}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Drive Details
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <FiCalendar className="flex-shrink-0 mr-2 text-gray-400" />
                      <span>
                        <span className="font-medium">Drive Date:</span>{" "}
                        {new Date(placement.campusDriveDate).toLocaleString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FiClock className="flex-shrink-0 mr-2 text-gray-400" />
                      <span>
                        <span className="font-medium">Joining Date:</span>{" "}
                        {placement.dateOfJoining
                          ? new Date(
                              placement.dateOfJoining
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "Not specified"}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FiBriefcase className="flex-shrink-0 mr-2 text-gray-400" />
                      <span>
                        <span className="font-medium">Batch:</span>{" "}
                        {placement.batch}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Compensation
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <FiDollarSign className="flex-shrink-0 mr-2 text-gray-400" />
                      <span>
                        <span className="font-medium">CTC:</span> ₹
                        {placement.payPackage.salary.ctc}
                      </span>
                    </div>
                    {placement.payPackage.salary.variable > 0 && (
                      <div className="flex items-center text-sm text-gray-600">
                        <FiDollarSign className="flex-shrink-0 mr-2 text-gray-400" />
                        <span>
                          <span className="font-medium">Variable Pay:</span> ₹
                          {placement.payPackage.salary.variable}
                        </span>
                      </div>
                    )}
                    {placement.payPackage.internshipStipend.amount > 0 && (
                      <div className="flex items-center text-sm text-gray-600">
                        <FiDollarSign className="flex-shrink-0 mr-2 text-gray-400" />
                        <span>
                          <span className="font-medium">
                            Internship Stipend:
                          </span>{" "}
                          ₹{placement.payPackage.internshipStipend.amount}/month
                        </span>
                      </div>
                    )}
                    {placement.anyBond && (
                      <div className="flex items-center text-sm text-gray-600">
                        <FiFileText className="flex-shrink-0 mr-2 text-gray-400" />
                        <span>
                          <span className="font-medium">Bond:</span>{" "}
                          {placement.anyBond}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Eligibility
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">
                        Eligible Streams
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {placement.streamRequired.map((stream, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {stream}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">
                        Criteria
                      </h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {placement.eligibilityCriteria.map(
                          (criteria, index) => (
                            <li key={index}>{criteria}</li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Job Details
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-start text-sm text-gray-600">
                      <FiMapPin className="flex-shrink-0 mr-2 text-gray-400 mt-0.5" />
                      <span>
                        <span className="font-medium">Location:</span>{" "}
                        {placement.jobLocation}
                      </span>
                    </div>
                    {placement.jobProfile && (
                      <div className="text-sm text-gray-600">
                        <h4 className="font-medium text-gray-700 mb-1">
                          Job Profile
                        </h4>
                        <p>{placement.jobProfile}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Placement Process
                </h3>
                <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2">
                  {placement.placementProcess.map((process, index) => (
                    <li key={index} className="font-medium">
                      <span className="font-normal">{process}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default PlacementDetails;
