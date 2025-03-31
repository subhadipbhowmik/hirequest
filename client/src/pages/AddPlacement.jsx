import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CircleX } from "lucide-react";

export const AddPlacement = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    companyDescription: "",
    driveType: "In-Person",
    campusDriveDate: "",
    companyWebsite: "",
    streamRequired: [],
    eligibilityCriteria: [],
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
    placementProcess: [],
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
      setTimeout(() => navigate("/placements"), 1000);
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
        className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-12"
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
              {/* First Grid: Company, Job, Logistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Company Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                    Company Details
                  </h3>
                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Company Name*
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="companyDescription"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Company Description
                    </label>
                    <textarea
                      id="companyDescription"
                      name="companyDescription"
                      value={formData.companyDescription}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Briefly describe the company..."
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="driveType"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Drive Type*
                    </label>
                    <select
                      id="driveType"
                      name="driveType"
                      value={formData.driveType}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="In-Person">In-Person</option>
                      <option value="Virtual">Virtual</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="companyWebsite"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Website URL*
                    </label>
                    <input
                      id="companyWebsite"
                      type="url"
                      name="companyWebsite"
                      value={formData.companyWebsite}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      placeholder="https://example.com"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                {/* Job Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                    Job Details
                  </h3>
                  <div>
                    <label
                      htmlFor="position"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Position*
                    </label>
                    <input
                      id="position"
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="jobProfile"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Job Profile
                    </label>
                    <textarea
                      id="jobProfile"
                      name="jobProfile"
                      value={formData.jobProfile}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Describe the job role..."
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="jobLocation"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Job Location*
                    </label>
                    <input
                      id="jobLocation"
                      type="text"
                      name="jobLocation"
                      value={formData.jobLocation}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="batch"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Eligible Batch*
                    </label>
                    <input
                      id="batch"
                      type="number"
                      name="batch"
                      value={formData.batch}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      min="2000"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                {/* Logistics */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                    Importants
                  </h3>
                  <div>
                    <label
                      htmlFor="campusDriveDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Drive Date*
                    </label>
                    <input
                      id="campusDriveDate"
                      type="datetime-local"
                      name="campusDriveDate"
                      value={formData.campusDriveDate}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="dateOfJoining"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Joining Date
                    </label>
                    <input
                      id="dateOfJoining"
                      type="date"
                      name="dateOfJoining"
                      value={formData.dateOfJoining}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="anyBond"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Bond Details
                    </label>
                    <input
                      id="anyBond"
                      type="text"
                      name="anyBond"
                      value={formData.anyBond}
                      onChange={handleChange}
                      placeholder="e.g., 2 years"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Salary Package*
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label
                          htmlFor="ctc"
                          className="block text-xs text-gray-500"
                        >
                          CTC (₹)
                        </label>
                        <input
                          id="ctc"
                          type="text"
                          value={formData.payPackage.salary.ctc}
                          onChange={(e) =>
                            handleNestedChange("payPackage", "salary", {
                              ...formData.payPackage.salary,
                              ctc: e.target.value,
                            })
                          }
                          required
                          aria-required="true"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="variablePay"
                          className="block text-xs text-gray-500"
                        >
                          Variable Pay (₹)
                        </label>
                        <input
                          id="variablePay"
                          type="number"
                          value={formData.payPackage.salary.variable}
                          onChange={(e) =>
                            handleNestedChange("payPackage", "salary", {
                              ...formData.payPackage.salary,
                              variable: e.target.value,
                            })
                          }
                          min="0"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="internshipStipend"
                        className="block text-xs text-gray-500"
                      >
                        Internship Stipend (₹)
                      </label>
                      <input
                        id="internshipStipend"
                        type="number"
                        value={formData.payPackage.internshipStipend.amount}
                        onChange={(e) =>
                          handleNestedChange(
                            "payPackage",
                            "internshipStipend",
                            {
                              amount: e.target.value,
                            }
                          )
                        }
                        min="0"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Grid: Streams, Criteria, Process in One Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Eligible Streams */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Eligible Streams*
                    </label>
                    <button
                      type="button"
                      onClick={() => addArrayField("streamRequired")}
                      className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200"
                    >
                      + Add
                    </button>
                  </div>
                  {formData.streamRequired.length === 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      Add at least one stream
                    </p>
                  )}
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
                        aria-required="true"
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeArrayField("streamRequired", index)
                        }
                        className="ml-2  text-red-500 hover:text-red-700"
                      >
                        <CircleX size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Eligibility Criteria */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Eligibility Criteria*
                    </label>
                    <button
                      type="button"
                      onClick={() => addArrayField("eligibilityCriteria")}
                      className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200"
                    >
                      + Add
                    </button>
                  </div>
                  {formData.eligibilityCriteria.length === 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      Add at least one criterion
                    </p>
                  )}
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
                        aria-required="true"
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeArrayField("eligibilityCriteria", index)
                        }
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <CircleX size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Placement Process */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Placement Process*
                    </label>
                    <button
                      type="button"
                      onClick={() => addArrayField("placementProcess")}
                      className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200"
                    >
                      + Add
                    </button>
                  </div>
                  {formData.placementProcess.length === 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      Add at least one step
                    </p>
                  )}
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
                        aria-required="true"
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeArrayField("placementProcess", index)
                        }
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <CircleX size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
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
