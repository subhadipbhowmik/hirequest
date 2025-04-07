import React from "react";
import { FaArrowRight } from "react-icons/fa";

const notionLink =
  "https://shubhadip.notion.site/JavaScript-Complete-Notes-1395dcf2e65580cfabacd2df26e26633";

const resources = [
  {
    title: "📘 DSA Bible",
    description:
      "A curated list of top Data Structures and Algorithms books & PDFs to boost your coding game.",
    tags: ["DSA", "Algorithms", "Books"],
    link: notionLink,
  },
  {
    title: "🧠 HR Interview Prep",
    description:
      "Common HR questions, mindset tips, and do’s & don'ts for real interviews.",
    tags: ["HR", "Behavioral", "Interview"],
    link: notionLink,
  },
  {
    title: "🧩 DBMS + OS Questions",
    description:
      "Important placement questions on DBMS and Operating Systems with answers.",
    tags: ["DBMS", "OS", "Theory"],
    link: notionLink,
  },
  {
    title: "📄 Resume Building Kit",
    description:
      "ATS-friendly resume templates, portfolio tips, and GitHub strategies.",
    tags: ["Resume", "Portfolio", "Career"],
    link: notionLink,
  },
];

const PrepResources = () => {
  return (
    <section className="bg-gray-50 px-6 md:px-20 py-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">
        Books & Placement Preparation
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {resources.map((res, index) => (
          <div
            key={index}
            className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {res.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{res.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {res.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-blue-100 text-blue-600 font-medium px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={res.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto text-blue-600 font-medium flex items-center gap-1"
            >
              Explore <FaArrowRight size={12} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PrepResources;
