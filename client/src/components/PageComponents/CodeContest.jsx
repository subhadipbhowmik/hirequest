import React from "react";
import { FaArrowRight } from "react-icons/fa";

const CodeContest = () => {
  return (
    <div className="px-6 md:px-20 py-12 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
      {/* 100 Days Coding Sprint */}
      <div className="rounded-2xl border p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:shadow transition">
        {/* Text */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">
            100 Days <br /> Coding Sprint
          </h2>
          <p className="text-gray-600 mb-4">
            Level up your skills daily with our 100-Day Coding Sprint
          </p>
          <a
            href="#"
            className="text-blue-600 font-medium flex items-center gap-1"
          >
            Start now <FaArrowRight size={12} />
          </a>
        </div>
        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src="https://d8it4huxumps7.cloudfront.net/uploads/images/655de6e735598_frame_1000012851.png?d=716x546"
            alt="Coding Sprint"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Code Conquest */}
      <div className="rounded-2xl border p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:shadow transition">
        {/* Text */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">Code Conquest</h2>
          <p className="text-gray-600 mb-4">
            Pick your topics, set your difficulty, and master key concepts with
            ease!
          </p>
          <a
            href="#"
            className="text-blue-600 font-medium flex items-center gap-1"
          >
            Start now <FaArrowRight size={12} />
          </a>
        </div>
        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src="https://d8it4huxumps7.cloudfront.net/uploads/images/655de9718b2a4_frame_1000012850.png?d=716x546"
            alt="Code Conquest"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default CodeContest;
