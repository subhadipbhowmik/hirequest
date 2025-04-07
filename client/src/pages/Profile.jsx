import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Toaster, toast } from "react-hot-toast";
import {
  FiCalendar,
  FiBriefcase,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

const Profile = () => {
  const { user, logout } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "https://hirequest-4cy7.onrender.com/api/students/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setApplications(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load applications");
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchApplications();
  }, [user]);

  const getStatusBadge = (status) => {
    const statusStyles = {
      Selected: "bg-green-100 text-green-800",
      Rejected: "bg-red-100 text-red-800",
      "In Process": "bg-yellow-100 text-yellow-800",
      Pending: "bg-blue-100 text-blue-800",
    };

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          statusStyles[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status === "Selected" && <FiCheckCircle className="mr-2" />}
        {status === "Rejected" && <FiXCircle className="mr-2" />}
        {status}
      </span>
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
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiXCircle className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Toaster position="top-center" />

      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {user?.name}
          </h1>
          <p className="text-gray-600">{user?.course}</p>
          <p className="text-gray-600">Student ID: {user?.uid}</p>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Your Applications
        </h2>

        {applications.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
            No applications submitted yet
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {app.company}
                    </h3>
                    <p className="text-gray-600">{app.position}</p>
                  </div>
                  {getStatusBadge(app.status)}
                </div>

                <div className="flex items-center text-gray-600">
                  <FiCalendar className="mr-2" />
                  <span>
                    Applied on: {new Date(app.appliedDate).toLocaleDateString()}
                  </span>
                </div>

                {app.status === "Selected" && (
                  <div className="mt-4 bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">
                      Selection Details
                    </h4>
                    <p className="text-green-700">
                      Congratulations! You've been selected for this position.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
