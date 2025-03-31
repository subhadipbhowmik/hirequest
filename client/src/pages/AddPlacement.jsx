import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AddPlacement = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    companyDescription: "",
    driveType: "In-Person",
    campusDriveDate: "",
    companyWebsite: "",
    streamRequired: [""],
    eligibilityCriteria: [""],
    batch: "",
    position: "",
    jobProfile: "",
    jobLocation: "",
    dateOfJoining: "",
    payPackage: {
      internshipStipend: { amount: 0 },
      salary: { ctc: "", variable: 0 },
    },
    anyBond: "",
    placementProcess: [""],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (parent, child, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: value,
      },
    }));
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const addArrayField = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayField = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://hirequest-4cy7.onrender.com/api/placements",
        {
          ...formData,
          // Convert empty strings to numbers where needed
          batch: Number(formData.batch),
          payPackage: {
            ...formData.payPackage,
            internshipStipend: {
              amount: Number(formData.payPackage.internshipStipend.amount),
            },
            salary: {
              ...formData.payPackage.salary,
              variable: Number(formData.payPackage.salary.variable),
            },
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Placement added successfully!");
      setTimeout(() => navigate("/placements"), 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add placement");
      console.error("Add placement error:", error);
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
        className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Add New Placement Drive
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Fill in the details of the new campus placement opportunity
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.005 }}
            className="bg-white shadow rounded-lg p-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Information - Column 1 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                    Company Details
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Company Name*
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Company Description
                    </label>
                    <textarea
                      name="companyDescription"
                      value={formData.companyDescription}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Drive Type*
                    </label>
                    <select
                      name="driveType"
                      value={formData.driveType}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="In-Person">In-Person</option>
                      <option value="Virtual">Virtual</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Website URL*
                    </label>
                    <input
                      type="url"
                      name="companyWebsite"
                      value={formData.companyWebsite}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                {/* Job Details - Column 2 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                    Job Details
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Position*
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Job Profile
                    </label>
                    <textarea
                      name="jobProfile"
                      value={formData.jobProfile}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Job Location*
                    </label>
                    <input
                      type="text"
                      name="jobLocation"
                      value={formData.jobLocation}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Eligible Batch*
                    </label>
                    <input
                      type="number"
                      name="batch"
                      value={formData.batch}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                {/* Logistics - Column 3 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                    Logistics
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Drive Date*
                    </label>
                    <input
                      type="datetime-local"
                      name="campusDriveDate"
                      value={formData.campusDriveDate}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Joining Date
                    </label>
                    <input
                      type="date"
                      name="dateOfJoining"
                      value={formData.dateOfJoining}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bond Details
                    </label>
                    <input
                      type="text"
                      name="anyBond"
                      value={formData.anyBond}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  {/* Salary Package */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Salary Package*
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-gray-500">
                          CTC (₹)
                        </label>
                        <input
                          type="text"
                          value={formData.payPackage.salary.ctc}
                          onChange={(e) =>
                            handleNestedChange("payPackage", "salary", {
                              ...formData.payPackage.salary,
                              ctc: e.target.value,
                            })
                          }
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500">
                          Variable Pay (₹)
                        </label>
                        <input
                          type="number"
                          value={formData.payPackage.salary.variable}
                          onChange={(e) =>
                            handleNestedChange("payPackage", "salary", {
                              ...formData.payPackage.salary,
                              variable: e.target.value,
                            })
                          }
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500">
                        Internship Stipend (₹)
                      </label>
                      <input
                        type="number"
                        value={formData.payPackage.internshipStipend.amount}
                        onChange={(e) =>
                          handleNestedChange(
                            "payPackage",
                            "internshipStipend",
                            { amount: e.target.value }
                          )
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Array Fields - Full Width */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Eligible Streams*
                    </label>
                    <button
                      type="button"
                      onClick={() => addArrayField("streamRequired")}
                      className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded"
                    >
                      + Add Stream
                    </button>
                  </div>
                  {formData.streamRequired.map((stream, index) => (
                    <div key={index} className="flex mt-1">
                      <input
                        type="text"
                        value={stream}
                        onChange={(e) =>
                          handleArrayChange(
                            "streamRequired",
                            index,
                            e.target.value
                          )
                        }
                        required
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {formData.streamRequired.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeArrayField("streamRequired", index)
                          }
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Eligibility Criteria*
                    </label>
                    <button
                      type="button"
                      onClick={() => addArrayField("eligibilityCriteria")}
                      className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded"
                    >
                      + Add Criteria
                    </button>
                  </div>
                  {formData.eligibilityCriteria.map((criteria, index) => (
                    <div key={index} className="flex mt-1">
                      <input
                        type="text"
                        value={criteria}
                        onChange={(e) =>
                          handleArrayChange(
                            "eligibilityCriteria",
                            index,
                            e.target.value
                          )
                        }
                        required
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {formData.eligibilityCriteria.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeArrayField("eligibilityCriteria", index)
                          }
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Placement Process*
                    </label>
                    <button
                      type="button"
                      onClick={() => addArrayField("placementProcess")}
                      className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded"
                    >
                      + Add Process
                    </button>
                  </div>
                  {formData.placementProcess.map((process, index) => (
                    <div key={index} className="flex mt-1">
                      <input
                        type="text"
                        value={process}
                        onChange={(e) =>
                          handleArrayChange(
                            "placementProcess",
                            index,
                            e.target.value
                          )
                        }
                        required
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {formData.placementProcess.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeArrayField("placementProcess", index)
                          }
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
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
                      Adding Placement...
                    </>
                  ) : (
                    "Add Placement"
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
