import React, { useState, useEffect } from "react";
import { Search, Loader2, Filter } from "lucide-react";

const PlacementChecker = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    batch: "",
    placementStatus: "",
    placementType: "",
    role: "",
    company: "",
  });

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbyb_orPNiyC9AAFLAiEQLonGblwnjg1kHGJXdHycmhte2NoZ5LNz5BcP4_lTHd1ERV_/exec"
        );
        const data = await response.json();
        setStudents(data);
        setFilteredStudents(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter students based on search term and filters
  useEffect(() => {
    let result = [...students];

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (student) =>
          student.NAME.toLowerCase().includes(term) ||
          student.UID.toLowerCase().includes(term) ||
          student.Batch.toString().includes(term) ||
          student.Placement_Status.toLowerCase().includes(term)
      );
    }

    // Apply filters
    if (filters.batch) {
      result = result.filter(
        (student) => student.Batch.toString() === filters.batch
      );
    }
    if (filters.placementStatus) {
      result = result.filter(
        (student) => student.Placement_Status === filters.placementStatus
      );
    }
    if (filters.placementType) {
      result = result.filter(
        (student) => student.Type_Of_Placement === filters.placementType
      );
    }
    if (filters.role) {
      result = result.filter((student) => student.Role === filters.role);
    }
    if (filters.company) {
      result = result.filter(
        (student) => student.Company_Name === filters.company
      );
    }

    setFilteredStudents(result);
  }, [searchTerm, filters, students]);

  // Get unique values for filters
  const getUniqueValues = (field) => {
    const values = [...new Set(students.map((student) => student[field]))];
    return values.filter((value) => value); // Remove empty values
  };

  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value,
    });
  };

  const clearFilters = () => {
    setFilters({
      batch: "",
      placementStatus: "",
      placementType: "",
      role: "",
      company: "",
    });
    setSearchTerm("");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
        <p className="mt-4 text-xl font-semibold text-gray-700">
          Loading student data...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen  mt-20">
      {/* Sidebar with filters */}
      <div className="w-full md:w-64 bg-white p-4 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Filters</h2>
          <button
            onClick={clearFilters}
            className="text-sm text-white rounded-md cursor-pointer px-4 py-2 bg-indigo-600"
          >
            Clear all
          </button>
        </div>

        {/* Batch Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Batch
          </label>
          <select
            value={filters.batch}
            onChange={(e) => handleFilterChange("batch", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Batches</option>
            {getUniqueValues("Batch").map((batch) => (
              <option key={batch} value={batch}>
                {batch}
              </option>
            ))}
          </select>
        </div>

        {/* Placement Status Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Placement Status
          </label>
          <select
            value={filters.placementStatus}
            onChange={(e) =>
              handleFilterChange("placementStatus", e.target.value)
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Statuses</option>
            {getUniqueValues("Placement_Status").map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Placement Type Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Placement Type
          </label>
          <select
            value={filters.placementType}
            onChange={(e) =>
              handleFilterChange("placementType", e.target.value)
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Types</option>
            {getUniqueValues("Type_Of_Placement").map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Role Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            value={filters.role}
            onChange={(e) => handleFilterChange("role", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Roles</option>
            {getUniqueValues("Role").map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Company Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <select
            value={filters.company}
            onChange={(e) => handleFilterChange("company", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Companies</option>
            {getUniqueValues("Company_Name").map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4">
        {/* Search bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, UID, batch or status..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Results info */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Student Placements
          </h1>
          <p className="text-sm text-gray-600">
            Showing {filteredStudents.length} of {students.length} students
          </p>
        </div>

        {/* Student cards */}
        {filteredStudents.length === 0 ? (
          <div className="text-center py-12">
            <Filter className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No students found
            </h3>
            <p className="mt-2 text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <div
                key={student.SL_NO}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center p-4 border-b">
                  <div className="h-16 w-16 rounded-full overflow-hidden  flex-shrink-0">
                    {student.Profile_Photo ? (
                      <img
                        src={student.Profile_Photo}
                        alt={student.NAME}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-500 text-xl font-bold">
                        {student.NAME ? student.NAME.charAt(0) : "?"}
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-lg text-gray-900">
                      {student.NAME}
                    </h3>
                    <p className="text-gray-600 text-sm">{student.UID}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      Status:
                    </span>
                    <span
                      className={`text-sm font-semibold px-2 py-1 rounded ${
                        student.Placement_Status === "PLACED"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {student.Placement_Status}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      Batch:
                    </span>
                    <span className="text-sm text-gray-700">
                      {student.Batch}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      Company:
                    </span>
                    <span className="text-sm text-gray-700">
                      {student.Company_Name || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      Role:
                    </span>
                    <span className="text-sm text-gray-700">
                      {student.Role || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Type:
                    </span>
                    <span className="text-sm text-gray-700">
                      {student.Type_Of_Placement || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacementChecker;
