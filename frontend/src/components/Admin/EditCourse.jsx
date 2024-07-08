
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import Notification from '../Users/Notification';
import ToggleProfile from '../Users/ToggleProfile';
import { useMediaQuery } from "react-responsive";
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
import image01 from "../../assets/Screenshot 2024-06-19 001148.png";
import ProfileBoy from "../../assets/Profile.webp";
import PT from "../../assets/DashboardUI__109615071.png";
import NS from "../../assets/DashboardUI_images1.png";
import DC from "../../assets/DashboardUI__30764161.png";
import DM from "../../assets/DashboardUI__183600437cryptographyiconblockchaintechnologyrelatedvectorillustration1.png";
import WD from "../../assets/DashboardUI_malwaresymbolredisolatedonwhitebackgroundfreevector1.png";
const EditCourse = () => {
  const location = useLocation();
  const initialCourseData = location.state || {};

  const [courseName, setCourseName] = useState(initialCourseData.courseName || "");
  const [description, setDescription] = useState(initialCourseData.description || "");
  const [img, setImg] = useState(initialCourseData.img || null);
  const [trainerName, setTrainerName] = useState(initialCourseData.trainerName || "");
  const [level, setLevel] = useState(initialCourseData.level || "Medium");
  const [tools, setTools] = useState(initialCourseData.tools || "");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const isMobile = useMediaQuery({maxWidth : 450})
  const isTablet = useMediaQuery({maxWidth : 768})

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  }

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const closeProfile = () => {
    setShowProfile(false);
  }
  const [content, setContent] = useState(initialCourseData.content || [
    {
      title: "Week 1 - Introduction",
      description: "Lorem ipsum dolor sit amet",
      doc: null,
      video: null,
      submodules: []
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (initialCourseData.img) {
      setImg(initialCourseData.img);
    }
  }, [initialCourseData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
    }
  };

  const addNewSection = () => {
    setContent([
      ...content,
      { title: "", description: "", doc: null, video: null, submodules: [] },
    ]);
  };

  const addNewSubmodule = (index) => {
    const newContent = [...content];
    newContent[index].submodules.push({ title: "", description: "" });
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
  
      // Upload course image if changed
      let imgUrl = initialCourseData.img;
      if (img instanceof File) {
        imgUrl = await uploadFile("image", img);
      }
  
      // Update content with new file URLs
      const updatedContent = await Promise.all(
        content.map(async (section) => {
          const updatedSection = { ...section };
  
          // Upload section document if changed
          if (section.doc instanceof File) {
            updatedSection.doc = await uploadFile("raw", section.doc);
          }
  
          // Upload section video if changed
          if (section.video instanceof File) {
            updatedSection.video = await uploadFile("video", section.video);
          }
  
          // Update submodules with new file URLs
          const updatedSubmodules = await Promise.all(
            section.submodules.map(async (submodule) => {
              const updatedSubmodule = { ...submodule };
  
              // Upload submodule document if changed
              if (submodule.doc instanceof File) {
                updatedSubmodule.doc = await uploadFile("raw", submodule.doc);
              }
  
              // Upload submodule video if changed
              if (submodule.video instanceof File) {
                updatedSubmodule.video = await uploadFile("video", submodule.video);
              }
  
              return updatedSubmodule;
            })
          );
          updatedSection.submodules = updatedSubmodules;
          return updatedSection;
        })
      );
  
      // Construct updated course data
      const updatedCourseData = {
        courseName,
        description,
        trainerName,
        level,
        tools,
        img: imgUrl,
        content: updatedContent,
      };
  
      // Send PUT request to update course in backend
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_BASEURL}/api/courses/${initialCourseData._id}`,
        updatedCourseData
      );
  
      // Check response status and handle accordingly
      if (response.status === 200) {
        setSuccessMessage("Course updated successfully!");
        setLoading(false);
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        throw new Error(`Failed to update course: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating course:", error);
      setLoading(false);
      setSuccessMessage("Error updating course. Please try again.");
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };

  const handleFileChange = (e, index, type) => {
    const file = e.target.files[0];
    if (file) {
      const newContent = [...content];
      newContent[index][type] = file;
      setContent(newContent);
    }
  };

  const handleSubmoduleChange = (e, sectionIndex, submoduleIndex, field) => {
    const newContent = [...content];
    newContent[sectionIndex].submodules[submoduleIndex][field] = e.target.value;
    setContent(newContent);
  };

  const handleSubmoduleFileChange = (e, sectionIndex, submoduleIndex, type) => {
    const file = e.target.files[0];
    if (file) {
      const newContent = [...content];
      newContent[sectionIndex].submodules[submoduleIndex][type] = file;
      setContent(newContent);
    }
  };

  const deleteSection = (index) => {
    const newContent = content.filter((_, i) => i !== index);
    setContent(newContent);
  };

  const deleteSubmodule = (sectionIndex, submoduleIndex) => {
    const newContent = [...content];
    newContent[sectionIndex].submodules = newContent[sectionIndex].submodules.filter(
      (_, i) => i !== submoduleIndex
    );
    setContent(newContent);
  };

  return (
    <div className="min-h-full">
      <div className={`flex justify-center ${isMobile ? 'p-2' : 'py-2'}`}>
        <div className={`bg-white px-2 rounded-3xl ${isMobile ? 'py-2 w-full mx-2' : 'py-2 w-5/6 mr-3'} shadow-xl`}>
          <div className='w-full flex flex-row justify-between'>
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
                <FontAwesomeIcon icon={faBell} className="text-gray-700 text-3xl" />
              </Link>
              <Link onClick={toggleProfile}>
                <img src={ProfileBoy} alt="Profile" className="w-10 h-10 rounded-full" />
              </Link>
              {showProfile && (<ToggleProfile closeProfile={closeProfile} />)}
              {showNotifications && (<Notification />)}
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

        <h2 className="text-xl font-bold mb-4">Course Image</h2>
        <div className="mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {img && (
            <div className="mt-2">
              <img src={typeof img === 'string' ? img : URL.createObjectURL(img)} alt="Course Image" className="w-32 h-32 object-cover" />
            </div>
          )}
        </div>

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
            <option value="Beginner">Beginner</option>
            <option value="Medium">Medium</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <textarea
          placeholder="Enter tools (comma-separated)"
          value={tools}
          onChange={(e) => setTools(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded h-24 resize-none mb-6"
        />

        <h2 className="text-xl font-bold mb-4">Course Content</h2>
        {content.map((section, index) => (
          <div key={index} className="mb-6 p-4 border border-gray-300 rounded">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">{`Section ${index + 1}`}</h3>
              <button
                type="button"
                onClick={() => deleteSection(index)}
                className="text-red-500"
              >
                Delete Section
              </button>
            </div>
            <input
              type="text"
              placeholder="Enter section title"
              value={section.title}
              onChange={(e) =>
                setContent((prevContent) =>
                  prevContent.map((sec, i) =>
                    i === index ? { ...sec, title: e.target.value } : sec
                  )
                )
              }
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <textarea
              placeholder="Enter section description"
              value={section.description}
              onChange={(e) =>
                setContent((prevContent) =>
                  prevContent.map((sec, i) =>
                    i === index ? { ...sec, description: e.target.value } : sec
                  )
                )
              }
              className="w-full p-2 border border-gray-300 rounded h-24 resize-none mb-2"
            />
            <input
              type="file"
              accept="application/pdf, .doc, .docx"
              onChange={(e) => handleFileChange(e, index, "doc")}
              className="w-full mb-2"
            />
            {section.doc && (
              <a
                href={typeof section.doc === "string" ? section.doc : URL.createObjectURL(section.doc)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mb-2 block"
              >
                View Document
              </a>
            )}
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleFileChange(e, index, "video")}
              className="w-full mb-2"
            />
            {section.video && (
              <a
                href={typeof section.video === "string" ? section.video : URL.createObjectURL(section.video)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mb-2 block"
              >
                View Video
              </a>
            )}

            {section.submodules.map((submodule, subIndex) => (
              <div key={subIndex} className="mb-4 p-2 border border-gray-300 rounded">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">{`Submodule ${subIndex + 1}`}</h4>
                  <button
                    type="button"
                    onClick={() => deleteSubmodule(index, subIndex)}
                    className="text-red-500"
                  >
                    Delete Submodule
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Enter submodule title"
                  value={submodule.title}
                  onChange={(e) => handleSubmoduleChange(e, index, subIndex, "title")}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <textarea
                  placeholder="Enter submodule description"
                  value={submodule.description}
                  onChange={(e) => handleSubmoduleChange(e, index, subIndex, "description")}
                  className="w-full p-2 border border-gray-300 rounded h-24 resize-none mb-2"
                />
                <input
                  type="file"
                  accept="application/pdf, .doc, .docx"
                  onChange={(e) => handleSubmoduleFileChange(e, index, subIndex, "doc")}
                  className="w-full mb-2"
                />
                {submodule.doc && (
                  <a
                    href={typeof submodule.doc === "string" ? submodule.doc : URL.createObjectURL(submodule.doc)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline mb-2 block"
                  >
                    View Document
                  </a>
                )}
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleSubmoduleFileChange(e, index, subIndex, "video")}
                  className="w-full mb-2"
                />
                {submodule.video && (
                  <a
                    href={typeof submodule.video === "string" ? submodule.video : URL.createObjectURL(submodule.video)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline mb-2 block"
                  >
                    View Video
                  </a>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addNewSubmodule(index)}
              className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Submodule
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addNewSection}
          className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded mb-6"
        >
          Add New Section
        </button>

        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2 bg-green-500 text-white rounded"
        >
          {loading ? (
            <ThreeDots color="#FFF" height={24} width={24} />
          ) : (
            "Update Course"
          )}
        </button>
      </form>
    </div></div>
  );
};

export default EditCourse;
