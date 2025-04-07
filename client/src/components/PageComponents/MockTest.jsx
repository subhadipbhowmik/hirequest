import React from "react";
import { FaArrowRight } from "react-icons/fa";

const mockTests = [
  {
    title: "Software Developer",
    description: "Designs, codes, and maintains software solutions.",
    image:
      "https://d8it4huxumps7.cloudfront.net/uploads/images/67bc8515d4462_software_developer.png?d=340x195",
  },
  {
    title: "QA Engineer",
    description: "Ensures software quality through testing and debugging.",
    image:
      "https://d8it4huxumps7.cloudfront.net/uploads/images/67bd918dbb515_qa_engineer.jpg?d=340x195",
  },
  {
    title: "IOS Developer",
    description: "Develops sleek, efficient iOS applications.",
    image:
      "https://d8it4huxumps7.cloudfront.net/uploads/images/67e2a32b58ff0_ios.jpg?d=340x195",
  },
  {
    title: "Cyber Security Engineer",
    description: "Secures systems from threats and vulnerabilities.",
    image:
      "https://d8it4huxumps7.cloudfront.net/uploads/images/67bd92f86c5f2_cyber_security_engineer.jpg?d=340x195",
  },
];

const MockTest = () => {
  return (
    <div className="px-6 md:px-20 py-12 bg-white">
      {/* Heading */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">
            AI-Powered <span className="text-blue-600">Mock Tests</span>
          </h2>
          <p className="text-gray-600 mt-1">
            Master your concepts with AI-Powered full-length mock tests for 360°
            preparation!
          </p>
        </div>
        <a
          href="#"
          className="text-blue-600 font-medium flex items-center gap-1"
        >
          View all <FaArrowRight size={12} />
        </a>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["Tech", "Management", "General"].map((tab, idx) => (
          <button
            key={idx}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              tab === "Tech"
                ? "bg-gray-100 text-black shadow"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockTests.map((test, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={test.image}
              alt={test.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{test.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{test.description}</p>
              <a
                href="#"
                className="flex items-center text-sm text-blue-600 font-medium"
              >
                Start Test <FaArrowRight className="ml-1" size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MockTest;
