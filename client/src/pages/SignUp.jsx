import React, { useState } from "react";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    uid: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await signup(formData);
      if (success) {
        setFormData({
          name: "",
          course: "",
          uid: "",
          phoneNumber: "",
          email: "",
          password: "",
        });
        navigate("/profile");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="course"
                  className="block text-sm font-medium text-gray-700"
                >
                  Course
                </label>
                <div className="mt-1">
                  <input
                    id="course"
                    name="course"
                    type="text"
                    required
                    value={formData.course}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="uid"
                  className="block text-sm font-medium text-gray-700"
                >
                  Student ID
                </label>
                <div className="mt-1">
                  <input
                    id="uid"
                    name="uid"
                    type="text"
                    required
                    value={formData.uid}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Sign up"
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default SignUp;
