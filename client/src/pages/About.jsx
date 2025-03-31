import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 mt-12 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Main Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About HireQuest
          </h1>
          <p className="text-xl text-gray-600">
            Simplifying campus placements for students and institutions
          </p>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We aim to bridge the gap between students and potential employers
              by providing a streamlined platform for campus placements. Our
              goal is to make the recruitment process efficient, transparent,
              and stress-free for all parties involved.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              What We Offer
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-600">
              <li>Simplified job application process for students</li>
              <li>Centralized placement management for institutions</li>
              <li>Efficient candidate screening for companies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Contact Us
            </h2>
            <p className="text-gray-600">
              Have questions? Reach out to our team at
              <br />
              <a
                href="mailto:support@hirequest.com"
                className="text-indigo-600 hover:underline"
              >
                support@hirequest.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
