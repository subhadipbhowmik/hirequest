import React, { useState, useRef } from "react";
import { Download, FilePlus, Trash2 } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ResumeBuilder = () => {
  const resumeRef = useRef(null);
  const [activeSection, setActiveSection] = useState("personal");
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [resumeSaved, setResumeSaved] = useState(false);

  const [formData, setFormData] = useState({
    personal: {
      name: "",
      email: "",
      phone: "",
      portfolio: "",
      github: "",
      linkedin: "",
      title: "",
    },
    education: [
      {
        institution: "",
        degree: "",
        gpa: "",
        duration: "",
        location: "",
      },
    ],
    skills: {
      programmingLanguages: "",
      webDevelopment: "",
      frameworksLibraries: "",
      databaseTechnologies: "",
      toolsTechnologies: "",
    },
    experience: [
      {
        company: "",
        position: "",
        duration: "",
        location: "",
        points: ["", "", ""],
      },
    ],
    projects: [
      {
        name: "",
        link: "",
        duration: "",
        objective: "",
        techStack: "",
      },
    ],
  });

  const handleInputChange = (section, field, value, index = null) => {
    if (index !== null) {
      const newData = [...formData[section]];
      newData[index][field] = value;
      setFormData({ ...formData, [section]: newData });
    } else if (section === "skills") {
      setFormData({
        ...formData,
        skills: {
          ...formData.skills,
          [field]: value,
        },
      });
    } else if (section === "personal") {
      setFormData({
        ...formData,
        personal: {
          ...formData.personal,
          [field]: value,
        },
      });
    }
  };

  const handleAddItem = (section) => {
    let newItem;
    switch (section) {
      case "education":
        newItem = {
          institution: "",
          degree: "",
          gpa: "",
          duration: "",
          location: "",
        };
        break;
      case "experience":
        newItem = {
          company: "",
          position: "",
          duration: "",
          location: "",
          points: ["", "", ""],
        };
        break;
      case "projects":
        newItem = {
          name: "",
          link: "",
          duration: "",
          objective: "",
          techStack: "",
        };
        break;
      default:
        return;
    }
    setFormData({
      ...formData,
      [section]: [...formData[section], newItem],
    });
  };

  const handleRemoveItem = (section, index) => {
    const newData = [...formData[section]];
    newData.splice(index, 1);
    setFormData({ ...formData, [section]: newData });
  };

  const handlePointChange = (expIndex, pointIndex, value) => {
    const newExp = [...formData.experience];
    newExp[expIndex].points[pointIndex] = value;
    setFormData({
      ...formData,
      experience: newExp,
    });
  };

  const loadSampleData = () => {
    setFormData({
      personal: {
        name: "Shubhadip Bhowmik",
        email: "shubhadipbhowmikdev@gmail.com",
        phone: "+91-7550814404",
        portfolio: "shubhadipbhowmik.vercel.app",
        github: "github.com/subhadipbhowmik",
        linkedin: "linkedin.com/in/shubhadip-bhowmik",
        title: "Full Stack Developer",
      },
      education: [
        {
          institution: "Chandigarh University",
          degree: "Bachelor of Computer Application",
          gpa: "8.33",
          duration: "July 2022 - June 2025",
          location: "Punjab, India",
        },
      ],
      skills: {
        programmingLanguages: "JAVA, JavaScript, SQL",
        webDevelopment: "HTML5, CSS3, React.JS, Node.JS",
        frameworksLibraries: "Bootstrap, Tailwind CSS, Express.JS",
        databaseTechnologies: "MySQL, PostgreSQL, MongoDB",
        toolsTechnologies: "Git, GitHub, Figma, Postman",
      },
      experience: [
        {
          company: "NY Softech IT Park",
          position: "Web Developer & Designer",
          duration: "Feb 2025 - Present",
          location: "Chandigarh",
          points: [
            "Designed responsive websites.",
            "Improved loading speeds by 40%.",
            "Collaborated with clients.",
          ],
        },
      ],
      projects: [
        {
          name: "BioBranch",
          link: "biobranch.vercel.app",
          duration: "Nov 2022 - Jun 2023",
          objective: "Manage social media links.",
          techStack: "React, Node.js, MongoDB",
        },
      ],
    });
    setResumeSaved(true);
    setTimeout(() => setResumeSaved(false), 2000);
  };

  const generatePDF = async () => {
    if (resumeRef.current) {
      try {
        const input = resumeRef.current;
        const canvas = await html2canvas(input, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 0;
        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        );
        pdf.save("resume.pdf");
      } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Failed to generate PDF.");
      }
    }
  };

  const clearForm = () => {
    if (window.confirm("Clear all data?")) {
      setFormData({
        personal: {
          name: "",
          email: "",
          phone: "",
          portfolio: "",
          github: "",
          linkedin: "",
          title: "",
        },
        education: [
          {
            institution: "",
            degree: "",
            gpa: "",
            duration: "",
            location: "",
          },
        ],
        skills: {
          programmingLanguages: "",
          webDevelopment: "",
          frameworksLibraries: "",
          databaseTechnologies: "",
          toolsTechnologies: "",
        },
        experience: [
          {
            company: "",
            position: "",
            duration: "",
            location: "",
            points: ["", "", ""],
          },
        ],
        projects: [
          {
            name: "",
            link: "",
            duration: "",
            objective: "",
            techStack: "",
          },
        ],
      });
    }
  };

  const ModernTemplate = () => (
    <div className="bg-white p-8 shadow-lg">
      <header className="border-b-2 border-gray-700 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-blue-600">
          {formData.personal.name || "Your Name"}
        </h1>
        <p className="text-lg text-gray-700 mt-1">
          {formData.personal.title || "Your Title"}
        </p>
        <div className="flex flex-wrap gap-3 mt-3 text-sm">
          {formData.personal.email && (
            <span>Email: {formData.personal.email}</span>
          )}
          {formData.personal.phone && (
            <span>Phone: {formData.personal.phone}</span>
          )}
          {formData.personal.portfolio && (
            <span>Portfolio: {formData.personal.portfolio}</span>
          )}
          {formData.personal.github && (
            <span>GitHub: {formData.personal.github}</span>
          )}
          {formData.personal.linkedin && (
            <span>LinkedIn: {formData.personal.linkedin}</span>
          )}
        </div>
      </header>
      {formData.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 border-b">
            Education
          </h2>
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">
                    {edu.institution || "Institution"}
                  </h3>
                  <p>
                    {edu.degree || "Degree"}
                    {edu.gpa ? ` GPA: ${edu.gpa}` : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p>{edu.location || "Location"}</p>
                  <p className="text-gray-600">{edu.duration || "Duration"}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
      <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3 border-b">
          Skills
        </h2>
        <div className="grid grid-cols-1 gap-2">
          {formData.skills.programmingLanguages && (
            <div>
              <span className="font-semibold">Programming:</span>{" "}
              {formData.skills.programmingLanguages}
            </div>
          )}
          {formData.skills.webDevelopment && (
            <div>
              <span className="font-semibold">Web:</span>{" "}
              {formData.skills.webDevelopment}
            </div>
          )}
          {formData.skills.frameworksLibraries && (
            <div>
              <span className="font-semibold">Frameworks:</span>{" "}
              {formData.skills.frameworksLibraries}
            </div>
          )}
          {formData.skills.databaseTechnologies && (
            <div>
              <span className="font-semibold">Databases:</span>{" "}
              {formData.skills.databaseTechnologies}
            </div>
          )}
          {formData.skills.toolsTechnologies && (
            <div>
              <span className="font-semibold">Tools:</span>{" "}
              {formData.skills.toolsTechnologies}
            </div>
          )}
        </div>
      </section>
      {formData.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 border-b">
            Experience
          </h2>
          {formData.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between mb-1">
                <div>
                  <h3 className="font-semibold">{exp.company || "Company"}</h3>
                  <p className="italic">{exp.position || "Position"}</p>
                </div>
                <div className="text-right">
                  <p>{exp.location || "Location"}</p>
                  <p className="text-gray-600">{exp.duration || "Duration"}</p>
                </div>
              </div>
              <ul className="list-disc ml-5 text-sm">
                {exp.points.map((point, pointIndex) =>
                  point ? <li key={pointIndex}>{point}</li> : null
                )}
              </ul>
            </div>
          ))}
        </section>
      )}
      {formData.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 border-b">
            Projects
          </h2>
          {formData.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between mb-1">
                <div>
                  <h3 className="font-semibold">{project.name || "Project"}</h3>
                  {project.link && <p className="text-sm">{project.link}</p>}
                </div>
                <p className="text-gray-600">
                  {project.duration || "Duration"}
                </p>
              </div>
              {project.objective && (
                <p className="text-sm">
                  <span className="font-semibold">Objective:</span>{" "}
                  {project.objective}
                </p>
              )}
              {project.techStack && (
                <p className="text-sm">
                  <span className="font-semibold">Tech:</span>{" "}
                  {project.techStack}
                </p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );

  const ProfessionalTemplate = () => (
    <div className="bg-white p-8 shadow-lg">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {formData.personal.name || "Your Name"}
        </h1>
        <p className="text-xl text-gray-600 mt-1">
          {formData.personal.title || "Your Title"}
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-3 text-sm">
          {formData.personal.email && <span>{formData.personal.email}</span>}
          {formData.personal.phone && <span>{formData.personal.phone}</span>}
          {formData.personal.portfolio && (
            <span>{formData.personal.portfolio}</span>
          )}
          {formData.personal.github && <span>{formData.personal.github}</span>}
          {formData.personal.linkedin && (
            <span>{formData.personal.linkedin}</span>
          )}
        </div>
      </header>
      {formData.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2">
            Education
          </h2>
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-lg">
                    {edu.institution || "Institution"}
                  </h3>
                  <p className="text-gray-700">
                    {edu.degree || "Degree"}
                    {edu.gpa ? ` | GPA: ${edu.gpa}` : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{edu.location || "Location"}</p>
                  <p className="text-gray-600">{edu.duration || "Duration"}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
      {formData.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2">
            Experience
          </h2>
          {formData.experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg">
                    {exp.company || "Company"}
                  </h3>
                  <p className="font-medium text-gray-700">
                    {exp.position || "Position"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{exp.location || "Location"}</p>
                  <p className="text-gray-600">{exp.duration || "Duration"}</p>
                </div>
              </div>
              <ul className="list-disc ml-6">
                {exp.points.map((point, pointIndex) =>
                  point ? (
                    <li key={pointIndex} className="mb-1">
                      {point}
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          ))}
        </section>
      )}
      {formData.projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2">
            Projects
          </h2>
          {formData.projects.map((project, index) => (
            <div key={index} className="mb-5">
              <div className="flex justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg">
                    {project.name || "Project"}
                  </h3>
                  {project.link && (
                    <p className="text-gray-600 italic">{project.link}</p>
                  )}
                </div>
                <p className="text-gray-600">
                  {project.duration || "Duration"}
                </p>
              </div>
              {project.objective && (
                <p>
                  <span className="font-medium">Objective:</span>{" "}
                  {project.objective}
                </p>
              )}
              {project.techStack && (
                <p>
                  <span className="font-medium">Tech:</span> {project.techStack}
                </p>
              )}
            </div>
          ))}
        </section>
      )}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2">
          Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {formData.skills.programmingLanguages && (
            <div className="mb-2">
              <h3 className="font-semibold">Programming</h3>
              <p>{formData.skills.programmingLanguages}</p>
            </div>
          )}
          {formData.skills.webDevelopment && (
            <div className="mb-2">
              <h3 className="font-semibold">Web</h3>
              <p>{formData.skills.webDevelopment}</p>
            </div>
          )}
          {formData.skills.frameworksLibraries && (
            <div className="mb-2">
              <h3 className="font-semibold">Frameworks</h3>
              <p>{formData.skills.frameworksLibraries}</p>
            </div>
          )}
          {formData.skills.databaseTechnologies && (
            <div className="mb-2">
              <h3 className="font-semibold">Databases</h3>
              <p>{formData.skills.databaseTechnologies}</p>
            </div>
          )}
          {formData.skills.toolsTechnologies && (
            <div className="mb-2">
              <h3 className="font-semibold">Tools</h3>
              <p>{formData.skills.toolsTechnologies}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );

  const renderTabs = () => (
    <div className="flex mb-6 border-b overflow-x-auto">
      {["personal", "education", "skills", "experience", "projects"].map(
        (section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 ${
              activeSection === section
                ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        )
      )}
    </div>
  );

  const renderForm = () => {
    switch (activeSection) {
      case "personal":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.personal.name}
                  onChange={(e) =>
                    handleInputChange("personal", "name", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.personal.title}
                  onChange={(e) =>
                    handleInputChange("personal", "title", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Full Stack Developer"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.personal.email}
                  onChange={(e) =>
                    handleInputChange("personal", "email", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                  placeholder="johndoe@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  value={formData.personal.phone}
                  onChange={(e) =>
                    handleInputChange("personal", "phone", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                  placeholder="+1 123-456-7890"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Portfolio
                </label>
                <input
                  type="text"
                  value={formData.personal.portfolio}
                  onChange={(e) =>
                    handleInputChange("personal", "portfolio", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                  placeholder="yourportfolio.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub
                </label>
                <input
                  type="text"
                  value={formData.personal.github}
                  onChange={(e) =>
                    handleInputChange("personal", "github", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                  placeholder="github.com/username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn
                </label>
                <input
                  type="text"
                  value={formData.personal.linkedin}
                  onChange={(e) =>
                    handleInputChange("personal", "linkedin", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                  placeholder="linkedin.com/in/username"
                />
              </div>
            </div>
          </div>
        );
      case "education":
        return (
          <div>
            {formData.education.map((edu, index) => (
              <div key={index} className="mb-6 p-4 border rounded bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">
                    Education #{index + 1}
                  </h3>
                  {formData.education.length > 1 && (
                    <button
                      onClick={() => handleRemoveItem("education", index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Institution
                    </label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) =>
                        handleInputChange(
                          "education",
                          "institution",
                          e.target.value,
                          index
                        )
                      }
                      className="w-full p-2 border rounded"
                      placeholder="University Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Degree
                    </label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) =>
                        handleInputChange(
                          "education",
                          "degree",
                          e.target.value,
                          index
                        )
                      }
                      className="w-full p-2 border rounded"
                      placeholder="Bachelor of Science"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GPA
                    </label>
                    <input
                      type="text"
                      value={edu.gpa}
                      onChange={(e) =>
                        handleInputChange(
                          "education",
                          "gpa",
                          e.target.value,
                          index
                        )
                      }
                      className="w-full p-2 border rounded"
                      placeholder="3.8"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={edu.duration}
                      onChange={(e) =>
                        handleInputChange(
                          "education",
                          "duration",
                          e.target.value,
                          index
                        )
                      }
                      className="w-full p-2 border rounded"
                      placeholder="Aug 2020 - May 2024"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={edu.location}
                      onChange={(e) =>
                        handleInputChange(
                          "education",
                          "location",
                          e.target.value,
                          index
                        )
                      }
                      className="w-full p-2 border rounded"
                      placeholder="City, Country"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => handleAddItem("education")}
              className="flex items-center text-blue-500 hover:text-blue-700 mt-2"
            >
              <FilePlus size={16} className="mr-1" /> Add Education
            </button>
          </div>
        );
      case "skills":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Programming Languages
              </label>
              <input
                type="text"
                value={formData.skills.programmingLanguages}
                onChange={(e) =>
                  handleInputChange(
                    "skills",
                    "programmingLanguages",
                    e.target.value
                  )
                }
                className="w-full p-2 border rounded"
                placeholder="Java, JavaScript, Python"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Web Development
              </label>
              <input
                type="text"
                value={formData.skills.webDevelopment}
                onChange={(e) =>
                  handleInputChange("skills", "webDevelopment", e.target.value)
                }
                className="w-full p-2 border rounded"
                placeholder="HTML5, CSS3, React.js"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Frameworks & Libraries
              </label>
              <input
                type="text"
                value={formData.skills.frameworksLibraries}
                onChange={(e) =>
                  handleInputChange(
                    "skills",
                    "frameworksLibraries",
                    e.target.value
                  )
                }
                className="w-full p-2 border rounded"
                placeholder="Bootstrap, Angular"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Database Technologies
              </label>
              <input
                type="text"
                value={formData.skills.databaseTechnologies}
                onChange={(e) =>
                  handleInputChange(
                    "skills",
                    "databaseTechnologies",
                    e.target.value
                  )
                }
                className="w-full p-2 border rounded"
                placeholder="MySQL, MongoDB"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tools & Technologies
              </label>
              <input
                type="text"
                value={formData.skills.toolsTechnologies}
                onChange={(e) =>
                  handleInputChange(
                    "skills",
                    "toolsTechnologies",
                    e.target.value
                  )
                }
                className="w-full p-2 border rounded"
                placeholder="Git, Docker"
              />
            </div>
          </div>
        );
      case "experience":
        return (
          <div>
            {formData.experience.map((exp, index) => (
              <div key={index} className="mb-6 p-4 border rounded bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">
                    Experience #{index + 1}
                  </h3>
                  {formData.experience.length > 1 && (
                    <button
                      onClick={() => handleRemoveItem("experience", index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) =>
                        handleInputChange(
                          "experience",
                          "company",
                          e.target.value,
                          index
                        )
                      }
                      className="w-full p-2 border rounded"
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position
                    </label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) =>
                        handleInputChange(
                          "experience",
                          "position",
                          e.target.value,
                          index
                        )
                      }
                      className="w-full p-2 border rounded"
                      placeholder="Job Title"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) =>
                        handleInputChange(
                          "experience",
                          "duration",
                          e.target.value,
                          index
                        )
                      }
                      className="w-full p-2 border rounded"
                      placeholder="Jan 2020 - Dec 2022"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) =>
                        handleInputChange(
                          "experience",
                          "location",
                          e.target.value,
                          index
                        )
                      }
                      className="w-full p-2 border rounded"
                      placeholder="City, State"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Responsibilities
                  </label>
                  {exp.points.map((point, pointIndex) => (
                    <input
                      key={pointIndex}
                      type="text"
                      value={point}
                      onChange={(e) =>
                        handlePointChange(index, pointIndex, e.target.value)
                      }
                      className="w-full p-2 border rounded mb-2"
                      placeholder={`Point ${pointIndex + 1}`}
                    />
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={() => handleAddItem("experience")}
              className="flex items-center text-blue-500 hover:text-blue-700 mt-2"
            >
              <FilePlus size={16} className="mr-1" /> Add Experience
            </button>
          </div>
        );
      case "projects":
        return (
          <div>
            {formData.projects.map((project, index) => (
              <div key={index} className="mb-6 p-4 border rounded bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Project #{index + 1}</h3>
                  {formData.projects.length > 1 && (
                    <button
                      onClick={() => handleRemoveItem("projects", index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) =>
                        handleInputChange(
                          "projects",
                          "name",
                          e.target.value,
                          index
                        )
                      }
                      className="w-full p-2 border rounded"
                      placeholder="Project Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Link
                    </label>
                    <input
                      type="text"
                      value={project.link}
                      onChange={(e) =>
                        handleInputChange(
                          "projects",
                          "link",
                          e.target.value,
                          index
                        )
                      }
                      className="w-full p-2 border rounded"
                      placeholder="projectlink.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={project.duration}
                      onChange={(e) =>
                        handleInputChange(
                          "projects",
                          "duration",
                          e.target.value,
                          index
                        )
                      }
                      className="w-full p-2 border rounded"
                      placeholder="Jan 2023 - Mar 2023"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tech Stack
                    </label>
                    <input
                      type="text"
                      value={project.techStack}
                      onChange={(e) =>
                        handleInputChange(
                          "projects",
                          "techStack",
                          e.target.value,
                          index
                        )
                      }
                      className="w-full p-2 border rounded"
                      placeholder="React, Node.js"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Objective
                  </label>
                  <textarea
                    value={project.objective}
                    onChange={(e) =>
                      handleInputChange(
                        "projects",
                        "objective",
                        e.target.value,
                        index
                      )
                    }
                    className="w-full p-2 border rounded"
                    placeholder="Project objective"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={() => handleAddItem("projects")}
              className="flex items-center text-blue-500 hover:text-blue-700 mt-2"
            >
              <FilePlus size={16} className="mr-1" /> Add Project
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 mt-20">
      <h1 className="text-2xl font-semibold mb-4">Resume Builder</h1>
      <div className="flex gap-4 mb-4">
        <button
          onClick={generatePDF}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Download size={16} className="mr-2" /> Download PDF
        </button>
        <button
          onClick={loadSampleData}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          <FilePlus size={16} className="mr-2" /> Load Sample
        </button>
        <button
          onClick={clearForm}
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          <Trash2 size={16} className="mr-2" /> Clear Form
        </button>
        <select
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="modern">Modern</option>
          <option value="professional">Professional</option>
        </select>
      </div>
      {resumeSaved && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-2 rounded">
          Resume Saved!
        </div>
      )}
      <div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Form Input</h2>
          {renderTabs()}
          {renderForm()}
        </div>
        <div className="bg-white rounded shadow text-center">
          <div
            ref={resumeRef}
            style={{
              width: "210mm",
              minHeight: "297mm",
              padding: "20mm",
              margin: "0 auto",
            }}
          >
            {selectedTemplate === "modern" ? (
              <ModernTemplate />
            ) : (
              <ProfessionalTemplate />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
