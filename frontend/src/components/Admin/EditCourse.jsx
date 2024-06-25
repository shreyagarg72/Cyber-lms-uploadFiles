import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useLocation } from "react-router-dom";

const EditCourse = () => {
  const location = useLocation();
  const initialCourseData = location.state || {};

  const [courseName, setCourseName] = useState(initialCourseData.courseName || "");
  const [description, setDescription] = useState(initialCourseData.description || "");
  const [img, setImg] = useState(initialCourseData.img || null);
  const [trainerName, setTrainerName] = useState(initialCourseData.trainerName || "");
  const [level, setLevel] = useState(initialCourseData.level || "Medium");
  const [tools, setTools] = useState(initialCourseData.tools || "");
  const [content, setContent] = useState(initialCourseData.content || [
    {
      title: "Week 1 - Introduction",
      description: "Lorem ipsum dolor sit amet",
      pdf: null,
      video: null,
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
      { title: "", description: "", pdf: null, video: null },
    ]);
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

      const imgUrl = img instanceof File ? await uploadFile("image", img) : img;

      const contentWithUrls = await Promise.all(
        content.map(async (section) => {
          const pdfUrl = section.pdf instanceof File
            ? await uploadFile("pdf", section.pdf)
            : section.pdf;
          const videoUrl = section.video instanceof File
            ? await uploadFile("video", section.video)
            : section.video;
          return { ...section, pdf: pdfUrl, video: videoUrl };
        })
      );

      const courseData = {
        courseName,
        description,
        trainerName,
        level,
        tools,
        img: imgUrl,
        content: contentWithUrls,
      };

      await axios.post(
        `${import.meta.env.VITE_BACKEND_BASEURL}/api/courses`,
        courseData
      );

      setSuccessMessage("Course created successfully!");
      setLoading(false);
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
          pdf: null,
          video: null,
        },
      ]);

      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setSuccessMessage("Error creating course. Please try again.");
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

  const deleteSection = (index) => {
    const newContent = content.filter((_, i) => i !== index);
    setContent(newContent);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 relative">
      {successMessage && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {successMessage}
        </div>
      )}

      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 mb-6 border border-gray-300 rounded"
      />

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

        <h2 className="text-xl font-bold mb-4">Content</h2>
        {content.map((section, index) => (
          <div key={index} className="mb-6 p-4 bg-white rounded shadow">
            <input
              type="text"
              placeholder="Section title"
              value={section.title}
              onChange={(e) => {
                const newContent = [...content];
                newContent[index].title = e.target.value;
                setContent(newContent);
              }}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Section description"
              value={section.description}
              onChange={(e) => {
                const newContent = [...content];
                newContent[index].description = e.target.value;
                setContent(newContent);
              }}
              className="w-full p-2 mb-2 border border-gray-300 rounded h-24 resize-none"
            />
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-2">
              <div className="w-full sm:w-1/3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PDF File
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e, index, "pdf")}
                  className="w-full"
                />
              </div>
              <div className="w-full sm:w-1/3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video File
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileChange(e, index, "video")}
                  className="w-full"
                />
              </div>
              <div className="w-full sm:w-1/3">
                <button
                  type="button"
                  className="w-fullsm:w-1/3  p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  onClick={() => deleteSection(index)}
                >
                  Delete Section
                </button>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addNewSection}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
        >
          Add new section
        </button>
<div>
        <button
          type="submit"
          className="w-full sm:w-1/2 mt-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center">
              <ThreeDots
                height="24"
                width="50"
                radius="9"
                color="#ffffff"
                ariaLabel="three-dots-loading"
                visible={true}
              />
            </div>
          ) : (
            "Save Course"
          )}
        </button>
        <button className="w-full sm:w-1/2 mt-4  py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">Delete Course</button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
