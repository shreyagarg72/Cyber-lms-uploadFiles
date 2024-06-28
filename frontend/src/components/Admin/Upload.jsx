
// import React, { useState } from "react";
// import axios from "axios";
// import { ThreeDots } from "react-loader-spinner";

// const Upload = () => {
//   const [courseName, setCourseName] = useState("");
//   const [description, setDescription] = useState("");
//   const [img, setImg] = useState(null);
//   const [trainerName, setTrainerName] = useState("");
//   const [level, setLevel] = useState("Medium");
//   const [tools, setTools] = useState("");
//   const [content, setContent] = useState([
//     {
//       title: "Week 1 - Introduction",
//       description: "Lorem ipsum dolor sit amet",
//       pdf: null,
//       video: null,
//       submodules: [],
//     },
//   ]);
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImg(file);
//     }
//   };

//   const addNewSection = () => {
//     setContent([
//       ...content,
//       { title: "", description: "", pdf: null, video: null, submodules: [] },
//     ]);
//   };

//   const addNewSubmodule = (sectionIndex) => {
//     const newContent = [...content];
//     newContent[sectionIndex].submodules.push({
//       title: "",
//       description: "",
//       pdf: null,
//       video: null,
//     });
//     setContent(newContent);
//   };

//   const uploadFile = async (type, file) => {
//     try {
//       const data = new FormData();
//       data.append("file", file);
//       data.append(
//         "upload_preset",
//         type === "image"
//           ? "images_preset"
//           : type === "video"
//           ? "videos_preset"
//           : "samples_preset"
//       );

//       const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
//       const resourceType =
//         type === "image" ? "image" : type === "video" ? "video" : "raw";
//       const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

//       const res = await axios.post(api, data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (res.status !== 200) {
//         throw new Error(
//           `Failed to upload file to Cloudinary: ${res.statusText}`
//         );
//       }

//       const { secure_url } = res.data;
//       return secure_url;
//     } catch (error) {
//       console.error("Error uploading file to Cloudinary:", error);
//       throw new Error("Failed to upload file to Cloudinary");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);

//       const imgUrl = await uploadFile("image", img);

//       const contentWithUrls = await Promise.all(
//         content.map(async (section) => {
//           const pdfUrl = section.pdf
//             ? await uploadFile("pdf", section.pdf)
//             : null;
//           const videoUrl = section.video
//             ? await uploadFile("video", section.video)
//             : null;
      
//           const submodulesWithUrls = await Promise.all(
//             section.submodules.map(async (submodule) => {
//               const submodulePdfUrl = submodule.pdf
//                 ? await uploadFile("pdf", submodule.pdf)
//                 : null;
//               const submoduleVideoUrl = submodule.video
//                 ? await uploadFile("video", submodule.video)
//                 : null;
//               return {
//                 title: submodule.title,
//                 description: submodule.description,
//                 pdfUrl: submodulePdfUrl,
//                 videoUrl: submoduleVideoUrl,
//               };
//             })
//           );
      
//           return {
//             title: section.title,
//             description: section.description,
//             pdfUrl,
//             videoUrl,
//             submodules: submodulesWithUrls,
//           };
//         })
//       );

//       const courseData = {
//         courseName,
//         description,
//         trainerName,
//         level,
//         tools,
//         imgUrl,
//         content: contentWithUrls,
//       };

//       await axios.post(
//         `${import.meta.env.VITE_BACKEND_BASEURL}/api/courses`,
//         courseData
//       );

//       setSuccessMessage("Course created successfully!");
//       setLoading(false);
//       resetForm();

//       setTimeout(() => setSuccessMessage(""), 5000);
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//       setSuccessMessage("Error creating course. Please try again.");
//       setTimeout(() => setSuccessMessage(""), 5000);
//     }
//   };

//   const resetForm = () => {
//     setImg(null);
//     setCourseName("");
//     setDescription("");
//     setTrainerName("");
//     setLevel("Medium");
//     setTools("");
//     setContent([
//       {
//         title: "Week 1 - Introduction",
//         description: "Lorem ipsum dolor sit amet",
//         pdf: null,
//         video: null,
//         submodules: [],
//       },
//     ]);
//   };

//   const handleFileChange = (e, sectionIndex, type, submoduleIndex = null) => {
//     const file = e.target.files[0];
//     if (file) {
//       const newContent = [...content];
//       if (submoduleIndex === null) {
//         newContent[sectionIndex][type] = file;
//       } else {
//         newContent[sectionIndex].submodules[submoduleIndex][type] = file;
//       }
//       setContent(newContent);
//     }
//   };

//   const deleteSection = (index) => {
//     const newContent = content.filter((_, i) => i !== index);
//     setContent(newContent);
//   };

//   const deleteSubmodule = (sectionIndex, submoduleIndex) => {
//     const newContent = [...content];
//     newContent[sectionIndex].submodules = newContent[sectionIndex].submodules.filter(
//       (_, i) => i !== submoduleIndex
//     );
//     setContent(newContent);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-gray-100 relative">
//       {successMessage && (
//         <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
//           {successMessage}
//         </div>
//       )}

//       <form onSubmit={handleSubmit}>
//         {/* Basic Information */}
//         <h2 className="text-xl font-bold mb-4">Basic Information</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="Enter course name"
//             value={courseName}
//             onChange={(e) => setCourseName(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//           <textarea
//             placeholder="Enter description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded h-24 resize-none"
//           />
//         </div>

//         {/* Course Image */}
//         <h2 className="text-xl font-bold mb-4">Course Image</h2>
//         <div className="mb-6">
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="w-full"
//           />
//         </div>

//         {/* Additional Information */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="Enter trainer name"
//             value={trainerName}
//             onChange={(e) => setTrainerName(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//           <select
//             value={level}
//             onChange={(e) => setLevel(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//           >
//             <option value="Easy">Easy</option>
//             <option value="Medium">Medium</option>
//             <option value="Hard">Hard</option>
//           </select>
//         </div>

//         <input
//           type="text"
//           placeholder="Enter tools"
//           value={tools}
//           onChange={(e) => setTools(e.target.value)}
//           className="w-full p-2 mb-6 border border-gray-300 rounded"
//         />

//         {/* Content Sections */}
//         <h2 className="text-xl font-bold mb-4">Content</h2>
//         {content.map((section, sectionIndex) => (
//           <div key={sectionIndex} className="mb-6 p-4 bg-white rounded shadow">
//             <input
//               type="text"
//               placeholder="Section title"
//               value={section.title}
//               onChange={(e) => {
//                 const newContent = [...content];
//                 newContent[sectionIndex].title = e.target.value;
//                 setContent(newContent);
//               }}
//               className="w-full p-2 mb-2 border border-gray-300 rounded"
//             />
//             <textarea
//               placeholder="Section description"
//               value={section.description}
//               onChange={(e) => {
//                 const newContent = [...content];
//                 newContent[sectionIndex].description = e.target.value;
//                 setContent(newContent);
//               }}
//               className="w-full p-2 mb-2 border border-gray-300 rounded h-24 resize-none"
//             />
//             <div className="flex flex-col sm:flex-row items-center gap-4 mb-2">
//               <div className="w-full sm:w-1/3">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   PDF File
//                 </label>
//                 <input
//                   type="file"
//                   accept=".pdf"
//                   onChange={(e) => handleFileChange(e, sectionIndex, "pdf")}
//                   className="w-full"
//                 />
//               </div>
//               <div className="w-full sm:w-1/3">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Video File
//                 </label>
//                 <input
//                   type="file"
//                   accept="video/*"
//                   onChange={(e) => handleFileChange(e, sectionIndex, "video")}
//                   className="w-full"
//                 />
//               </div>
//               <div className="w-full sm:w-1/3">
//                 <button
//                   type="button"
//                   className="w-full sm:w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
//                   onClick={() => deleteSection(sectionIndex)}
//                 >
//                   Delete Section
//                 </button>
//               </div>
//             </div>

//             {/* Submodules */}
//             <h3 className="text-lg font-semibold mb-2">Submodules</h3>
//             {section.submodules.map((submodule, submoduleIndex) => (
//               <div key={submoduleIndex} className="mb-4 p-4 bg-gray-100 rounded shadow">
//                 <input
//                   type="text"
//                   placeholder="Submodule title"
//                   value={submodule.title}
//                   onChange={(e) => {
//                     const newContent = [...content];
//                     newContent[sectionIndex].submodules[submoduleIndex].title =
//                       e.target.value;
//                     setContent(newContent);
//                   }}
//                   className="w-full p-2 mb-2 border border-gray-300 rounded"
//                 />
//                 <textarea
//                   placeholder="Submodule description"
//                   value={submodule.description}
//                   onChange={(e) => {
//                     const newContent = [...content];
//                     newContent[sectionIndex].submodules[submoduleIndex].description =
//                       e.target.value;
//                     setContent(newContent);
//                   }}
//                   className="w-full p-2 mb-2 border border-gray-300 rounded h-24 resize-none"
//                 />
//                 <div className="flex flex-col sm:flex-row items-center gap-4 mb-2">
//                   <div className="w-full sm:w-1/2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       PDF File
//                     </label>
//                     <input
//                       type="file"
//                       accept=".pdf"
//                       onChange={(e) =>
//                         handleFileChange(e, sectionIndex, "pdf", submoduleIndex)
//                       }
//                       className="w-full"
//                     />
//                   </div>
//                   <div className="w-full sm:w-1/2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Video File
//                     </label>
//                     <input
//                       type="file"
//                       accept="video/*"
//                       onChange={(e) =>
//                         handleFileChange(e, sectionIndex, "video", submoduleIndex)
//                       }
//                       className="w-full"
//                     />
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
//                   onClick={() => deleteSubmodule(sectionIndex, submoduleIndex)}
//                 >
//                   Delete Submodule
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
//               onClick={() => addNewSubmodule(sectionIndex)}
//             >
//               Add new submodule
//             </button>
//           </div>
//         ))}

//         <button
//           type="button"
//           onClick={addNewSection}
//           className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
//         >
//           Add new section
//         </button>

//         <button
//           type="submit"
//           className="w-full mt-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//           disabled={loading}
//         >
//           {loading ? (
//             <div className="flex justify-center">
//               <ThreeDots
//                 height="24"
//                 width="50"
//                 radius="9"
//                 color="#ffffff"
//                 ariaLabel="three-dots-loading"
//                 visible={true}
//               />
//             </div>
//           ) : (
//             "Create Course"
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Upload;

import React, { useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

const Upload = () => {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);
  const [trainerName, setTrainerName] = useState("");
  const [level, setLevel] = useState("Medium");
  const [tools, setTools] = useState("");
  const [content, setContent] = useState([
    {
      title: "Week 1 - Introduction",
      description: "Lorem ipsum dolor sit amet",
      doc: null,
      video: null,
      submodules: [],
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
    }
  };

  const addNewModule = () => {
    setContent([
      ...content,
      { title: "", description: "", doc: null, video: null, submodules: [] },
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
          // Upload module document and video
          const docUrl = section.doc ? await uploadFile("doc", section.doc) : null;
          const videoUrl = section.video ? await uploadFile("video", section.video) : null;
  
          // Upload submodules documents and videos
          const submodulesWithUrls = await Promise.all(
            section.submodules.map(async (submodule) => {
              const submoduleDocUrl = submodule.doc ? await uploadFile("doc", submodule.doc) : null;
              const submoduleVideoUrl = submodule.video ? await uploadFile("video", submodule.video) : null;
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
            docUrl,
            videoUrl,
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
        doc: null,
        video: null,
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
    newContent[sectionIndex].submodules = newContent[sectionIndex].submodules.filter(
      (_, i) => i !== submoduleIndex
    );
    setContent(newContent);
  };

  return (
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
          <div key={sectionIndex} className="mb-6 p-4 bg-white rounded shadow">
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
            <p className="mb-2 text-sm text-gray-600">Upload DOC file:</p>
            <input
              type="file"
              accept=".doc,.docx"
              onChange={(e) => handleFileChange(e, sectionIndex, "doc")}
              className="w-full mb-4"
            />
            <p className="mb-2 text-sm text-gray-600">Upload video file:</p>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleFileChange(e, sectionIndex, "video")}
              className="w-full mb-4"
            />
            <button
              type="button"
              onClick={() => addNewSubmodule(sectionIndex)}
              className="bg-green-500 text-white px-4 py-2 rounded shadow"
            >
              Add Submodule
            </button>
            <button
              type="button"
              onClick={() => deleteSection(sectionIndex)}
              className="ml-4 bg-red-500 text-white px-4 py-2 rounded shadow"
            >
              Delete Module
            </button>

            {/* Submodules */}
            {section.submodules.map((submodule, submoduleIndex) => (
              <div
                key={submoduleIndex}
                className="mt-4 p-4 bg-gray-100 rounded shadow"
              >
                <input
                  type="text"
                  placeholder="Submodule title"
                  value={submodule.title}
                  onChange={(e) => {
                    const newContent = [...content];
                    newContent[sectionIndex].submodules[submoduleIndex].title =
                      e.target.value;
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
                <p className="mb-2 text-sm text-gray-600">Upload DOC file:</p>
                <input
                  type="file"
                  accept=".doc,.docx"
                  onChange={(e) =>
                    handleFileChange(e, sectionIndex, "doc", submoduleIndex)
                  }
                  className="w-full mb-4"
                />
                <p className="mb-2 text-sm text-gray-600">Upload video file:</p>
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
                  onClick={() => deleteSubmodule(sectionIndex, submoduleIndex)}
                  className="bg-red-500 text-white px-4 py-2 rounded shadow"
                >
                  Delete Submodule
                </button>
              </div>
            ))}
          </div>
        ))}
        <button
          type="button"
          onClick={addNewModule}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          Add Module
        </button>
        <button
          type="submit"
          className="ml-4 bg-green-500 text-white px-4 py-2 rounded shadow"
          disabled={loading}
        >
          {loading ? (
            <ThreeDots
              height="20"
              width="20"
              color="#ffffff"
              ariaLabel="loading"
            />
          ) : (
            "Create Course"
          )}
        </button>
      </form>
    </div>
  );
};

export default Upload;
