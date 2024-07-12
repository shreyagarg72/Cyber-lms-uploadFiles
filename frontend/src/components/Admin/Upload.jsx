import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faFileAlt,
  faCheckCircle,
  faTimesCircle,
  faClock,
  faSearch,
  faUsers,
  faBell,
  faFolderOpen,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import image01 from "../../assets/Screenshot 2024-06-19 001148.png";
import ProfileBoy from "../../assets/Profile.webp";
import PT from "../../assets/DashboardUI__109615071.png";
import NS from "../../assets/DashboardUI_images1.png";
import DC from "../../assets/DashboardUI__30764161.png";
import DM from "../../assets/DashboardUI__183600437cryptographyiconblockchaintechnologyrelatedvectorillustration1.png";
import WD from "../../assets/DashboardUI_malwaresymbolredisolatedonwhitebackgroundfreevector1.png";
import React, { useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import Notification from "../Users/Notification";
import ToggleProfile from "../Users/ToggleProfile";

const Upload = () => {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);
  const [trainerName, setTrainerName] = useState("");
  const [level, setLevel] = useState("Medium");
  const [tools, setTools] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 450 });
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const closeProfile = () => {
    setShowProfile(false);
  };
  // const [content, setContent] = useState([
  //   {
  //     title: "Week 1 - Introduction",
  //     description: "Lorem ipsum dolor sit amet",
  //     submodules: [],
  //   },
  // ]);
  const [content, setContent] = useState([
    {
      title: "Week 1 - Introduction",
      description: "Lorem ipsum dolor sit amet",
      submodules: [],
      assignment: {
        questions: [
          {
            questionText: "",
            options: ["", "", "", ""],
            correctAnswer: "",
            explanation: "",
          },
        ],
      },
    },
  ]);

  const [assignments, setAssignments] = useState([]);

  const handleAddAssignment = () => {
    const newAssignment = {
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      explanation: "",
    };
    setAssignments([...assignments, newAssignment]);
  };

  // const handleAssignmentChange = (index, field, value, optionIndex = null) => {
  //   const newAssignments = [...assignments];
  //   if (field === 'options') {
  //     newAssignments[index].options[optionIndex] = value;
  //   } else {
  //     newAssignments[index][field] = value;
  //   }
  //   setAssignments(newAssignments);
  // };

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const handleAssignmentChange = (
    moduleIndex,
    questionIndex,
    field,
    value,
    optionIndex = null
  ) => {
    const newContent = [...content];
    if (field === "options") {
      newContent[moduleIndex].assignment.questions[questionIndex].options[
        optionIndex
      ] = value;
    } else {
      newContent[moduleIndex].assignment.questions[questionIndex][field] =
        value;
    }
    setContent(newContent);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
    }
  };
  const addNewQuestion = (moduleIndex) => {
    const newContent = [...content];
    newContent[moduleIndex].assignment.questions.push({
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      explanation: "",
    });
    setContent(newContent);
  };

  // const addNewModule = () => {
  //   setContent([...content, { title: "", description: "", submodules: [] }]);
  // };
  const addNewModule = () => {
    setContent([
      ...content,
      {
        title: "",
        description: "",
        submodules: [],
        assignment: {
          questions: [
            {
              questionText: "",
              options: ["", "", "", ""],
              correctAnswer: "",
              explanation: "",
            },
          ],
        },
      },
    ]);
  };

  const addNewSubmodule = (sectionIndex) => {
    const newContent = [...content];
    newContent[sectionIndex].submodules.push({
      title: "",
      description: "",
      doc: null,
      video: null,
    });
    setContent(newContent);
  };

  const uploadFile = async (type, file) => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append(
        "upload_preset",
        type === "image"
          ? "images_preset"
          : type === "video"
          ? "videos_preset"
          : "samples_preset"
      );

      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const resourceType =
        type === "image" ? "image" : type === "video" ? "video" : "raw";
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status !== 200) {
        throw new Error(
          `Failed to upload file to Cloudinary: ${res.statusText}`
        );
      }

      const { secure_url } = res.data;
      return secure_url;
    } catch (error) {
      console.error("Error uploading file to Cloudinary:", error);
      throw new Error("Failed to upload file to Cloudinary");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Upload course image
      const imgUrl = await uploadFile("image", img);

      // Upload module content with submodules
      const contentWithUrls = await Promise.all(
        content.map(async (section) => {
          // Upload submodules documents and videos
          const submodulesWithUrls = await Promise.all(
            section.submodules.map(async (submodule) => {
              const submoduleDocUrl = submodule.doc
                ? await uploadFile("doc", submodule.doc)
                : null;
              const submoduleVideoUrl = submodule.video
                ? await uploadFile("video", submodule.video)
                : null;
              return {
                title: submodule.title,
                description: submodule.description,
                docUrl: submoduleDocUrl,
                videoUrl: submoduleVideoUrl,
              };
            })
          );

          return {
            title: section.title,
            description: section.description,
            submodules: submodulesWithUrls,
          };
        })
      );

      // Construct course data with all uploaded URLs
      const courseData = {
        courseName,
        description,
        trainerName,
        level,
        tools,
        imgUrl,
        content: contentWithUrls,
        assignments,
      };

      // Send courseData to backend API to save in MongoDB
      await axios.post(
        `${import.meta.env.VITE_BACKEND_BASEURL}/api/courses`,
        courseData
      );

      // Display success message, reset form and loading state
      setSuccessMessage("Course created successfully!");
      setLoading(false);
      resetForm();

      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setSuccessMessage("Error creating course. Please try again.");
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  const resetForm = () => {
    setImg(null);
    setCourseName("");
    setDescription("");
    setTrainerName("");
    setLevel("Medium");
    setTools("");
    setContent([
      {
        title: "Week 1 - Introduction",
        description: "Lorem ipsum dolor sit amet",
        submodules: [],
      },
    ]);
  };

  const handleFileChange = (e, sectionIndex, type, submoduleIndex = null) => {
    const file = e.target.files[0];
    if (file) {
      const newContent = [...content];
      if (submoduleIndex === null) {
        newContent[sectionIndex][type] = file;
      } else {
        newContent[sectionIndex].submodules[submoduleIndex][type] = file;
      }
      setContent(newContent);
    }
  };

  const deleteSection = (index) => {
    const newContent = content.filter((_, i) => i !== index);
    setContent(newContent);
  };

  const deleteSubmodule = (sectionIndex, submoduleIndex) => {
    const newContent = [...content];
    newContent[sectionIndex].submodules = newContent[
      sectionIndex
    ].submodules.filter((_, i) => i !== submoduleIndex);
    setContent(newContent);
  };

  return (
    <div className="min-h-full">
      <div className={`flex justify-center ${isMobile ? "p-2" : "py-2"}`}>
        <div
          className={`bg-white px-2 rounded-3xl ${
            isMobile ? "py-2 w-full mx-2" : "py-2 w-5/6 mr-3"
          } shadow-xl`}
        >
          <div className="w-full flex flex-row justify-between">
            <div className="flex items-center bg-slate-200 rounded-full px-4 py-2 w-52">
              <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent focus:outline-none"
              />
            </div>
            <div className="flex items-center space-x-2 md:space-x-10 md:mr-10">
              <Link onClick={toggleNotifications}>
                <FontAwesomeIcon
                  icon={faBell}
                  className="text-gray-700 text-3xl"
                />
              </Link>
              <Link onClick={toggleProfile}>
                <img
                  src={ProfileBoy}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              </Link>
              {showProfile && <ToggleProfile closeProfile={closeProfile} />}
              {showNotifications && <Notification />}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 relative">
        {successMessage && (
          <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <h2 className="text-xl font-bold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              placeholder="Enter course name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded h-24 resize-none"
            />
          </div>

          {/* Course Image */}
          <h2 className="text-xl font-bold mb-4">Course Image</h2>
          <div className="mb-6">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              placeholder="Enter trainer name"
              value={trainerName}
              onChange={(e) => setTrainerName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Enter tools"
            value={tools}
            onChange={(e) => setTools(e.target.value)}
            className="w-full p-2 mb-6 border border-gray-300 rounded"
          />

          {/* Content Modules */}
          <h2 className="text-xl font-bold mb-4">Content</h2>
          {content.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="mb-6 p-4 bg-white rounded shadow"
            >
              <input
                type="text"
                placeholder="Module title"
                value={section.title}
                onChange={(e) => {
                  const newContent = [...content];
                  newContent[sectionIndex].title = e.target.value;
                  setContent(newContent);
                }}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <textarea
                placeholder="Module description"
                value={section.description}
                onChange={(e) => {
                  const newContent = [...content];
                  newContent[sectionIndex].description = e.target.value;
                  setContent(newContent);
                }}
                className="w-full p-2 mb-4 border border-gray-300 rounded resize-none h-24"
              />
              <button
                type="button"
                onClick={() => addNewSubmodule(sectionIndex)}
                className="mb-4 p-2 bg-blue-500 text-white rounded shadow"
              >
                Add Submodule
              </button>

              {section.submodules.map((submodule, submoduleIndex) => (
                <div
                  key={submoduleIndex}
                  className="p-4 mb-4 bg-gray-100 rounded shadow"
                >
                  <input
                    type="text"
                    placeholder="Submodule title"
                    value={submodule.title}
                    onChange={(e) => {
                      const newContent = [...content];
                      newContent[sectionIndex].submodules[
                        submoduleIndex
                      ].title = e.target.value;
                      setContent(newContent);
                    }}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                  />
                  <textarea
                    placeholder="Submodule description"
                    value={submodule.description}
                    onChange={(e) => {
                      const newContent = [...content];
                      newContent[sectionIndex].submodules[
                        submoduleIndex
                      ].description = e.target.value;
                      setContent(newContent);
                    }}
                    className="w-full p-2 mb-4 border border-gray-300 rounded resize-none h-24"
                  />
                  <p className="mb-2 text-sm text-gray-600">Upload DOC file:</p>{" "}
                  <input
                    type="file"
                    accept=".doc,.docx"
                    onChange={(e) =>
                      handleFileChange(e, sectionIndex, "doc", submoduleIndex)
                    }
                    className="w-full mb-4"
                  />
                  <p className="mb-2 text-sm text-gray-600">
                    Upload video file:
                  </p>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) =>
                      handleFileChange(e, sectionIndex, "video", submoduleIndex)
                    }
                    className="w-full mb-4"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      deleteSubmodule(sectionIndex, submoduleIndex)
                    }
                    className="p-2 bg-red-500 text-white rounded shadow"
                  >
                    Delete Submodule
                  </button>
                </div>
              ))}
              <div className="mt-6 p-4 bg-gray-100 rounded shadow">
                <h3 className="text-lg font-bold mb-4">Module Assignment</h3>
                {section.assignment.questions.map((question, questionIndex) => (
                  <div
                    key={questionIndex}
                    className="mb-6 p-4 bg-white rounded shadow"
                  >
                    <div className="mb-4">
                      <label className="block mb-2 font-bold">
                        Question {questionIndex + 1}:
                      </label>
                      <input
                        type="text"
                        placeholder="Question Text"
                        value={question.questionText}
                        onChange={(e) =>
                          handleAssignmentChange(
                            sectionIndex,
                            questionIndex,
                            "questionText",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 font-bold">Options:</label>
                      {question.options.map((option, optionIndex) => (
                        <input
                          key={optionIndex}
                          type="text"
                          placeholder={`Option ${optionIndex + 1}`}
                          value={option}
                          onChange={(e) =>
                            handleAssignmentChange(
                              sectionIndex,
                              questionIndex,
                              "options",
                              e.target.value,
                              optionIndex
                            )
                          }
                          className="w-full p-2 mb-2 border border-gray-300 rounded"
                        />
                      ))}
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 font-bold">
                        Correct Answer:
                      </label>
                      <input
                        type="text"
                        placeholder="Correct Answer"
                        value={question.correctAnswer}
                        onChange={(e) =>
                          handleAssignmentChange(
                            sectionIndex,
                            questionIndex,
                            "correctAnswer",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 font-bold">
                        Explanation:
                      </label>
                      <textarea
                        placeholder="Explanation for the correct answer"
                        value={question.explanation}
                        onChange={(e) =>
                          handleAssignmentChange(
                            sectionIndex,
                            questionIndex,
                            "explanation",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded resize-none h-24"
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addNewQuestion(sectionIndex)}
                  className="mt-4 p-2 bg-green-500 text-white rounded shadow"
                >
                  Add New Question
                </button>
              </div>
              <button
                type="button"
                onClick={() => deleteSection(sectionIndex)}
                className="p-2 bg-red-500 text-white rounded shadow"
              >
                Delete Module
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addNewModule}
            className="mb-4 p-2 bg-green-500 text-white rounded shadow"
          >
            Add New Module
          </button>
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">Assignments</h3>
            <button
              onClick={handleAddAssignment}
              className="mb-4 p-2 bg-green-500 text-white rounded shadow"
            >
              Add Assignment
            </button>
            {assignments.map((assignment, index) => (
              <div key={index} className="mb-6 p-4 bg-white rounded shadow">
                <div className="mb-4">
                  <label className="block mb-2 font-bold">Question:</label>
                  <input
                    type="text"
                    placeholder="Question Text"
                    value={assignment.questionText}
                    onChange={(e) =>
                      handleAssignmentChange(
                        index,
                        "questionText",
                        e.target.value
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-bold">Options:</label>
                  {assignment.options.map((option, optionIndex) => (
                    <input
                      key={optionIndex}
                      type="text"
                      placeholder={`Option ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) =>
                        handleAssignmentChange(
                          index,
                          "options",
                          e.target.value,
                          optionIndex
                        )
                      }
                      className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                  ))}
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-bold">
                    Correct Answer:
                  </label>
                  <input
                    type="text"
                    placeholder="Correct Answer"
                    value={assignment.correctAnswer}
                    onChange={(e) =>
                      handleAssignmentChange(
                        index,
                        "correctAnswer",
                        e.target.value
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 font-bold">Explanation:</label>
                  <textarea
                    placeholder="Explanation for the correct answer"
                    value={assignment.explanation}
                    onChange={(e) =>
                      handleAssignmentChange(
                        index,
                        "explanation",
                        e.target.value
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded resize-none h-24"
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className={`w-full p-2 bg-blue-500 text-white rounded shadow ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <ThreeDots
                height="40"
                width="40"
                radius="9"
                color="white"
                ariaLabel="three-dots-loading"
                wrapperStyle={{ display: "flex", justifyContent: "center" }}
                visible={true}
              />
            ) : (
              "Create Course"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
