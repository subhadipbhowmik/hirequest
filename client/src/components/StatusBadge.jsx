import React from "react";

const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status.toLowerCase()) {
      case "selected":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
      case "under review":
        return "bg-yellow-100 text-yellow-800";
      case "applied":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles()}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
