import React from "react";
import { FaArrowRight } from "react-icons/fa";

const ResourceHero = () => {
  return (
    <div className="bg-white mt-24 py-12 px-6 md:px-20 flex flex-col md:flex-row justify-between items-center">
      {/* Left Section */}
      <div className="max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-blue-600">Unlock</span> Perfection
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Solve easy to complex problems & get hands-on experience to get hired
          by{" "}
          <span className="italic font-semibold text-blue-800">
            your dream company!
          </span>
        </p>

        <button className="flex items-center gap-2 bg-purple-100 text-purple-700 px-6 py-3 rounded-full font-semibold hover:bg-purple-200 transition">
          Go Pro Now <FaArrowRight />
        </button>
      </div>

      {/* Right Section - Image & Icons */}
      <div className="mt-10 md:mt-0 relative flex justify-center items-center">
        {/* Main Person Image */}
        <img
          src="https://d8it4huxumps7.cloudfront.net/uploads/images/676e56018e078_practice.png?d=1000x600" // Update this to the correct public image path or import
          alt="Student Preparing"
          className="w-72 md:w-80"
        />
      </div>
    </div>
  );
};

export default ResourceHero;
