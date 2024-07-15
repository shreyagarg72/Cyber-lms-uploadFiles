// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { ThreeDots } from "react-loader-spinner";
// import { useLocation } from "react-router-dom";
// import { useMediaQuery } from "react-responsive";

// const EditCourse = () => {
//   const location = useLocation();
//   const initialCourseData = location.state || {};

//   const [courseName, setCourseName] = useState(
//     initialCourseData.courseName || ""
//   );
//   const [description, setDescription] = useState(
//     initialCourseData.description || ""
//   );
//   const [img, setImg] = useState(initialCourseData.img || null);
//   const [trainerName, setTrainerName] = useState(
//     initialCourseData.trainerName || ""
//   );
//   const [level, setLevel] = useState(initialCourseData.level || "Medium");
//   const [tools, setTools] = useState(initialCourseData.tools || "");
//   const [finalAssignment, setFinalAssignment] = useState(
//     initialCourseData.finalAssignment || []
//   );

//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);
//   const isMobile = useMediaQuery({ maxWidth: 450 });
//   const isTablet = useMediaQuery({ maxWidth: 768 });
//   const [moduleAssignments, setModuleAssignments] = useState(
//     initialCourseData.content.map((section) => section.assignment)
//   );

//   const [content, setContent] = useState(
//     initialCourseData.content.map((section, index) => ({
//       ...section,
//       assignment: moduleAssignments[index],
//     }))
//   );
//   const [assignments, setAssignments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   useEffect(() => {
//     if (initialCourseData.img) {
//       setImg(initialCourseData.img);
//     }
//   }, [initialCourseData]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImg(file);
//     }
//   };

//   const addNewSection = () => {
//     setContent([
//       ...content,
//       { title: "", description: "", doc: null, video: null, submodules: [] },
//     ]);
//   };

//   const addNewSubmodule = (index) => {
//     const newContent = [...content];
//     newContent[index].submodules.push({ title: "", description: "" });
//     setContent(newContent);
//   };
//   const handleAddFinalAssignment = () => {
//     setFinalAssignment([
//       ...finalAssignment,
//       {
//         questionText: "",
//         options: ["", "", "", ""],
//         correctAnswer: "",
//         explanation: "",
//       },
//     ]);
//   };

//   const handleFinalAssignmentChange = (index, field, value, optionIndex) => {
//     const updatedAssignments = finalAssignment.map((assignment, i) => {
//       if (i === index) {
//         if (field === "options") {
//           const updatedOptions = assignment.options.map((option, optIndex) =>
//             optIndex === optionIndex ? value : option
//           );
//           return { ...assignment, options: updatedOptions };
//         } else {
//           return { ...assignment, [field]: value };
//         }
//       }
//       return assignment;
//     });
//     setFinalAssignment(updatedAssignments);
//   };

//   const handleDeleteFinalAssignment = (index) => {
//     setFinalAssignment(finalAssignment.filter((_, i) => i !== index));
//   };

//   const handleAssignmentChange = (sectionIndex, questionIndex, field, value, optionIndex) => {
//     const updatedSections = [...sections];
//     if (field === "options") {
//       updatedSections[sectionIndex].assignment.questions[questionIndex].options[optionIndex] = value;
//     } else {
//       updatedSections[sectionIndex].assignment.questions[questionIndex][field] = value;
//     }
//     setSections(updatedSections);
//   };
  
//   const addNewQuestion = (sectionIndex) => {
//     const updatedSections = [...sections];
//     updatedSections[sectionIndex].assignment.questions.push({
//       questionText: "",
//       options: ["", "", "", ""],
//       correctAnswer: "",
//       explanation: "",
//     });
//     setSections(updatedSections);
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

//       // Upload course image if changed
//       let imgUrl = initialCourseData.img;
//       if (img instanceof File) {
//         imgUrl = await uploadFile("image", img);
//       }

//       // Update content with new file URLs
//       const updatedContent = await Promise.all(
//         content.map(async (section) => {
//           const updatedSection = { ...section };

//           // Upload section document if changed
//           if (section.doc instanceof File) {
//             updatedSection.doc = await uploadFile("raw", section.doc);
//           }

//           // Upload section video if changed
//           if (section.video instanceof File) {
//             updatedSection.video = await uploadFile("video", section.video);
//           }

//           // Update submodules with new file URLs
//           const updatedSubmodules = await Promise.all(
//             section.submodules.map(async (submodule) => {
//               const updatedSubmodule = { ...submodule };

//               // Upload submodule document if changed
//               if (submodule.doc instanceof File) {
//                 updatedSubmodule.doc = await uploadFile("raw", submodule.doc);
//               }

//               // Upload submodule video if changed
//               if (submodule.video instanceof File) {
//                 updatedSubmodule.video = await uploadFile(
//                   "video",
//                   submodule.video
//                 );
//               }

//               return updatedSubmodule;
//             })
//           );

//           updatedSection.submodules = updatedSubmodules;
//           return updatedSection;
//         })
//       );

//       // Construct updated course data
//       const updatedCourseData = {
//         courseName,
//         description,
//         trainerName,
//         level,
//         tools,
//         img: imgUrl,
//         content: updatedContent,
//         finalAssignment,
//         moduleAssignments,
//       };
//       // Send PUT request to update course in backend
//       const response = await axios.put(
//         `${import.meta.env.VITE_BACKEND_BASEURL}/api/courses/${
//           initialCourseData._id
//         }`,
//         updatedCourseData
//       );

//       // Check response status and handle accordingly
//       if (response.status === 200) {
//         setSuccessMessage("Course updated successfully!");
//         setLoading(false);
//         setTimeout(() => setSuccessMessage(""), 5000);
//       } else {
//         throw new Error(`Failed to update course: ${response.statusText}`);
//       }
//     } catch (error) {
//       console.error("Error updating course:", error);
//       setLoading(false);
//       setSuccessMessage("Error updating course. Please try again.");
//       setTimeout(() => setSuccessMessage(""), 5000);
//     }
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

//   const handleSubmoduleChange = (e, sectionIndex, submoduleIndex, field) => {
//     const newContent = [...content];
//     newContent[sectionIndex].submodules[submoduleIndex][field] = e.target.value;
//     setContent(newContent);
//   };
//   const handleSubmoduleFileChange = (e, sectionIndex, submoduleIndex, type) => {
//     const file = e.target.files[0];
//     if (file) {
//       const newContent = [...content];
//       newContent[sectionIndex].submodules[submoduleIndex][type] = file;
//       setContent(newContent);
//     }
//   };

//   const deleteSection = (index) => {
//     const newContent = content.filter((_, i) => i !== index);
//     setContent(newContent);
//   };

//   const deleteSubmodule = (sectionIndex, submoduleIndex) => {
//     const newContent = [...content];
//     newContent[sectionIndex].submodules = newContent[
//       sectionIndex
//     ].submodules.filter((_, i) => i !== submoduleIndex);
//     setContent(newContent);
//   };
//   const [sections, setSections] = useState([
//     {
//       assignment: {
//         questions: [
//           {
//             questionText: "",
//             options: ["", "", "", ""],
//             correctAnswer: "",
//             explanation: "",
//           },
//         ],
//       },
//     },
//   ]);
  
//   return (
//     <div className="min-h-full">
//       <div className={`flex justify-center ${isMobile ? "p-2" : "py-2"}`}></div>
//       <div className="max-w-4xl mx-auto p-6 bg-gray-100 relative">
//         {successMessage && (
//           <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
//             {successMessage}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <h2 className="text-xl font-bold mb-4">Basic Information</h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             <input
//               type="text"
//               placeholder="Enter course name"
//               value={courseName}
//               onChange={(e) => setCourseName(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//             <textarea
//               placeholder="Enter description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded h-24 resize-none"
//             />
//           </div>

//           <h2 className="text-xl font-bold mb-4">Course Image</h2>
//           <div className="mb-6">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="w-full"
//             />
//             {img && (
//               <div className="mt-2">
//                 <img
//                   src={typeof img === "string" ? img : URL.createObjectURL(img)}
//                   alt="Course Image"
//                   className="w-32 h-32 object-cover"
//                 />
//               </div>
//             )}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             <input
//               type="text"
//               placeholder="Enter trainer name"
//               value={trainerName}
//               onChange={(e) => setTrainerName(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//             <select
//               value={level}
//               onChange={(e) => setLevel(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded"
//             >
//               <option value="Beginner">Beginner</option>
//               <option value="Medium">Medium</option>
//               <option value="Advanced">Advanced</option>
//             </select>
//           </div>

//           <textarea
//             placeholder="Enter tools (comma-separated)"
//             value={tools}
//             onChange={(e) => setTools(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded h-24 resize-none mb-6"
//           />

//           <h2 className="text-xl font-bold mb-4">Course Content</h2>
//           {content.map((section, index) => (
//             <div
//               key={index}
//               className="mb-6 p-4 border border-gray-300 rounded"
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="font-semibold text-lg">{`Section ${
//                   index + 1
//                 }`}</h3>
//                 <button
//                   type="button"
//                   onClick={() => deleteSection(index)}
//                   className="text-red-500"
//                 >
//                   Delete Section
//                 </button>
//               </div>
//               <input
//                 type="text"
//                 placeholder="Enter section title"
//                 value={section.title}
//                 onChange={(e) =>
//                   setContent((prevContent) =>
//                     prevContent.map((sec, i) =>
//                       i === index ? { ...sec, title: e.target.value } : sec
//                     )
//                   )
//                 }
//                 className="w-full p-2 border border-gray-300 rounded mb-2"
//               />
//               <textarea
//                 placeholder="Enter section description"
//                 value={section.description}
//                 onChange={(e) =>
//                   setContent((prevContent) =>
//                     prevContent.map((sec, i) =>
//                       i === index
//                         ? { ...sec, description: e.target.value }
//                         : sec
//                     )
//                   )
//                 }
//                 className="w-full p-2 border border-gray-300 rounded h-24 resize-none mb-2"
//               />
//               <input
//                 type="file"
//                 accept=".txt"
//                 onChange={(e) => handleFileChange(e, index, "doc")}
//                 className="w-full mb-2"
//               />
//               {section.doc && (
//                 <a
//                   href={
//                     typeof section.doc === "string"
//                       ? section.doc
//                       : URL.createObjectURL(section.doc)
//                   }
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 underline mb-2 block"
//                 >
//                   View Document
//                 </a>
//               )}
//               <input
//                 type="file"
//                 accept="video/*"
//                 onChange={(e) => handleFileChange(e, index, "video")}
//                 className="w-full mb-2"
//               />
//               {section.video && (
//                 <a
//                   href={
//                     typeof section.video === "string"
//                       ? section.video
//                       : URL.createObjectURL(section.video)
//                   }
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 underline mb-2 block"
//                 >
//                   View Video
//                 </a>
//               )}

//               {section.submodules.map((submodule, subIndex) => (
//                 <div
//                   key={subIndex}
//                   className="mb-4 p-2 border border-gray-300 rounded"
//                 >
//                   <div className="flex justify-between items-center mb-2">
//                     <h4 className="font-semibold">{`Submodule ${
//                       subIndex + 1
//                     }`}</h4>
//                     <button
//                       type="button"
//                       onClick={() => deleteSubmodule(index, subIndex)}
//                       className="text-red-500"
//                     >
//                       Delete Submodule
//                     </button>
//                   </div>
//                   <input
//                     type="text"
//                     value={submodule.title}
//                     onChange={(e) =>
//                       handleSubmoduleChange(
//                         e,
//                         sectionIndex,
//                         submoduleIndex,
//                         "title"
//                       )
//                     }
//                     className="w-full p-2 border border-gray-300 rounded mb-2"
//                   />
//                   <textarea
//                     placeholder="Enter submodule description"
//                     value={submodule.description}
//                     onChange={(e) =>
//                       handleSubmoduleChange(e, index, subIndex, "description")
//                     }
//                     className="w-full p-2 border border-gray-300 rounded h-24 resize-none mb-2"
//                   />
//                   <input
//                     type="file"
//                     onChange={(e) =>
//                       handleSubmoduleFileChange(
//                         e,
//                         sectionIndex,
//                         submoduleIndex,
//                         "doc"
//                       )
//                     }
//                     className="w-full mb-2"
//                   />
//                   {submodule.doc && (
//                     <a
//                       href={
//                         typeof submodule.doc === "string"
//                           ? submodule.doc
//                           : URL.createObjectURL(submodule.doc)
//                       }
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-500 underline mb-2 block"
//                     >
//                       View Document
//                     </a>
//                   )}
//                   <input
//                     type="file"
//                     accept="video/*"
//                     onChange={(e) =>
//                       handleSubmoduleFileChange(e, index, subIndex, "video")
//                     }
//                     className="w-full mb-2"
//                   />
//                   {submodule.video && (
//                     <a
//                       href={
//                         typeof submodule.video === "string"
//                           ? submodule.video
//                           : URL.createObjectURL(submodule.video)
//                       }
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-500 underline mb-2 block"
//                     >
//                       View Video
//                     </a>
//                   )}
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={() => addNewSubmodule(index)}
//                 className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded"
//               >
//                 Add Submodule
//               </button>
//               {section.submodules.map((submodule, submoduleIndex) => (
//                 <div
//                   key={submoduleIndex}
//                   className="p-4 mb-4 bg-gray-100 rounded shadow"
//                 >
//                   <input
//                     type="text"
//                     placeholder="Submodule title"
//                     value={submodule.title}
//                     onChange={(e) => {
//                       const newContent = [...content];
//                       newContent[sectionIndex].submodules[
//                         submoduleIndex
//                       ].title = e.target.value;
//                       setContent(newContent);
//                     }}
//                     className="w-full p-2 mb-4 border border-gray-300 rounded"
//                   />
//                   <textarea
//                     placeholder="Submodule description"
//                     value={submodule.description}
//                     onChange={(e) => {
//                       const newContent = [...content];
//                       newContent[sectionIndex].submodules[
//                         submoduleIndex
//                       ].description = e.target.value;
//                       setContent(newContent);
//                     }}
//                     className="w-full p-2 mb-4 border border-gray-300 rounded resize-none h-24"
//                   />
//                   <p className="mb-2 text-sm text-gray-600">Upload DOC file:</p>{" "}
//                   <input
//                     type="file"
//                     accept=".doc,.docx"
//                     onChange={(e) =>
//                       handleFileChange(e, sectionIndex, "doc", submoduleIndex)
//                     }
//                     className="w-full mb-4"
//                   />
//                   <p className="mb-2 text-sm text-gray-600">
//                     Upload video file:
//                   </p>
//                   <input
//                     type="file"
//                     accept="video/*"
//                     onChange={(e) =>
//                       handleFileChange(e, sectionIndex, "video", submoduleIndex)
//                     }
//                     className="w-full mb-4"
//                   />
//                   <button
//                     type="button"
//                     onClick={() =>
//                       deleteSubmodule(sectionIndex, submoduleIndex)
//                     }
//                     className="p-2 bg-red-500 text-white rounded shadow"
//                   >
//                     Delete Submodule
//                   </button>
//                 </div>
//               ))}
//               <div className="mt-6 p-4 bg-gray-100 rounded shadow">
//   <h3 className="text-lg font-bold mb-4">Module Assignment</h3>

//   {sections.map((section, sectionIndex) => (
//     <div key={sectionIndex}>
//       {section.assignment.questions.map((question, questionIndex) => (
//         <div
//           key={questionIndex}
//           className="mb-6 p-4 bg-white rounded shadow"
//         >
//           <div className="mb-4">
//             <label className="block mb-2 font-bold">
//               Question {questionIndex + 1}:
//             </label>
//             <input
//               type="text"
//               placeholder="Question Text"
//               value={question.questionText}
//               onChange={(e) =>
//                 handleAssignmentChange(
//                   sectionIndex,
//                   questionIndex,
//                   "questionText",
//                   e.target.value
//                 )
//               }
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2 font-bold">Options:</label>
//             {question.options.map((option, optionIndex) => (
//               <input
//                 key={optionIndex}
//                 type="text"
//                 placeholder={`Option ${optionIndex + 1}`}
//                 value={option}
//                 onChange={(e) =>
//                   handleAssignmentChange(
//                     sectionIndex,
//                     questionIndex,
//                     "options",
//                     e.target.value,
//                     optionIndex
//                   )
//                 }
//                 className="w-full p-2 mb-2 border border-gray-300 rounded"
//               />
//             ))}
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2 font-bold">
//               Correct Answer:
//             </label>
//             <input
//               type="text"
//               placeholder="Correct Answer"
//               value={question.correctAnswer}
//               onChange={(e) =>
//                 handleAssignmentChange(
//                   sectionIndex,
//                   questionIndex,
//                   "correctAnswer",
//                   e.target.value
//                 )
//               }
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2 font-bold">
//               Explanation:
//             </label>
//             <textarea
//               placeholder="Explanation for the correct answer"
//               value={question.explanation}
//               onChange={(e) =>
//                 handleAssignmentChange(
//                   sectionIndex,
//                   questionIndex,
//                   "explanation",
//                   e.target.value
//                 )
//               }
//               className="w-full p-2 border border-gray-300 rounded resize-none h-24"
//             />
//           </div>
//         </div>
//       ))}
//       <button
//         type="button"
//         onClick={() => addNewQuestion(sectionIndex)}
//         className="mt-4 p-2 bg-green-500 text-white rounded shadow"
//       >
//         Add New Question
//       </button>
//     </div>
//   ))}
// </div>

//               <button
//                 type="button"
//                 onClick={() => deleteSection(sectionIndex)}
//                 className="p-2 bg-red-500 text-white rounded shadow"
//               >
//                 Delete Module
//               </button>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addNewSection}
//             className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded mb-6"
//           >
//             Add New Module
//           </button>

//           <div className="mb-6">
//             <h2 className="text-xl font-bold mb-4">Final Assignments</h2>
//             <button
//               onClick={handleAddFinalAssignment}
//               className="mb-4 p-2 bg-green-500 text-white rounded shadow"
//             >
//               Add Assignment
//             </button>
//             {finalAssignment.map((assignment, index) => (
//               <div key={index} className="mb-6 p-4 bg-white rounded shadow">
//                 <div className="mb-4">
//                   <label className="block mb-2 font-bold">Question:</label>
//                   <input
//                     type="text"
//                     placeholder="Question Text"
//                     value={assignment.questionText}
//                     onChange={(e) =>
//                       handleFinalAssignmentChange(
//                         index,
//                         "questionText",
//                         e.target.value
//                       )
//                     }
//                     className="w-full p-2 border border-gray-300 rounded"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block mb-2 font-bold">Options:</label>
//                   {assignment.options.map((option, optionIndex) => (
//                     <input
//                       key={optionIndex}
//                       type="text"
//                       placeholder={`Option ${optionIndex + 1}`}
//                       value={option}
//                       onChange={(e) =>
//                         handleFinalAssignmentChange(
//                           index,
//                           "options",
//                           e.target.value,
//                           optionIndex
//                         )
//                       }
//                       className="w-full p-2 mb-2 border border-gray-300 rounded"
//                     />
//                   ))}
//                 </div>
//                 <div className="mb-4">
//                   <label className="block mb-2 font-bold">
//                     Correct Answer:
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Correct Answer"
//                     value={assignment.correctAnswer}
//                     onChange={(e) =>
//                       handleFinalAssignmentChange(
//                         index,
//                         "correctAnswer",
//                         e.target.value
//                       )
//                     }
//                     className="w-full p-2 border border-gray-300 rounded"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block mb-2 font-bold">Explanation:</label>
//                   <textarea
//                     placeholder="Explanation for the correct answer"
//                     value={assignment.explanation}
//                     onChange={(e) =>
//                       handleFinalAssignmentChange(
//                         index,
//                         "explanation",
//                         e.target.value
//                       )
//                     }
//                     className="w-full p-2 border border-gray-300 rounded resize-none h-24"
//                   />
//                 </div>
//                 <button
//                   onClick={() => handleDeleteFinalAssignment(index)}
//                   className="text-red-500"
//                 >
//                   Delete Assignment
//                 </button>
//               </div>
//             ))}
//           </div>

//           <button
//             type="submit"
//             className="w-full sm:w-auto px-6 py-2 bg-green-500 text-white rounded"
//           >
//             {loading ? (
//               <ThreeDots color="#FFF" height={24} width={24} />
//             ) : (
//               "Update Course"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditCourse;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const EditCourse = () => {
  const location = useLocation();
  const initialCourseData = location.state || {};

  const [courseName, setCourseName] = useState(initialCourseData.courseName || "");
  const [description, setDescription] = useState(initialCourseData.description || "");
  const [img, setImg] = useState(initialCourseData.img || null);
  const [trainerName, setTrainerName] = useState(initialCourseData.trainerName || "");
  const [level, setLevel] = useState(initialCourseData.level || "Medium");
  const [tools, setTools] = useState(initialCourseData.tools || "");
  const [finalAssignment, setFinalAssignment] = useState(initialCourseData.finalAssignment || []);
  const [content, setContent] = useState(initialCourseData.content || []);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const isMobile = useMediaQuery({ maxWidth: 450 });
  const isTablet = useMediaQuery({ maxWidth: 768 });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
    }
  };

  const addNewSection = () => {
    setContent([
      ...content,
      { title: "", description: "", doc: null, video: null, submodules: [], assignment: { questions: [] } },
    ]);
  };

  const addNewSubmodule = (index) => {
    const newContent = [...content];
    newContent[index].submodules.push({ title: "", description: "" });
    setContent(newContent);
  };

  const handleAddFinalAssignment = () => {
    setFinalAssignment([
      ...finalAssignment,
      { questionText: "", options: ["", "", "", ""], correctAnswer: "", explanation: "" },
    ]);
  };

  const handleFinalAssignmentChange = (index, field, value, optionIndex) => {
    const updatedAssignments = finalAssignment.map((assignment, i) => {
      if (i === index) {
        if (field === "options") {
          const updatedOptions = assignment.options.map((option, optIndex) =>
            optIndex === optionIndex ? value : option
          );
          return { ...assignment, options: updatedOptions };
        } else {
          return { ...assignment, [field]: value };
        }
      }
      return assignment;
    });
    setFinalAssignment(updatedAssignments);
  };

  const handleDeleteFinalAssignment = (index) => {
    setFinalAssignment(finalAssignment.filter((_, i) => i !== index));
  };

  const handleAssignmentChange = (moduleIndex, questionIndex, field, value, optionIndex = null) => {
    const newContent = [...content];
    if (field === "options") {
      newContent[moduleIndex].assignment.questions[questionIndex].options[optionIndex] = value;
    } else {
      newContent[moduleIndex].assignment.questions[questionIndex][field] = value;
    }
    setContent(newContent);
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
        finalAssignment,
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
      </div>
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 relative">
        {successMessage && (
          <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-md z-50">
            {successMessage}
          </div>
        )}
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Course</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold mb-1">Course Name:</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">Course Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {img && (
              <img
                src={typeof img === "string" ? img : URL.createObjectURL(img)}
                alt="Course"
                className="mt-2 w-48"
              />
            )}
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">Trainer Name:</label>
            <input
              type="text"
              value={trainerName}
              onChange={(e) => setTrainerName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">Level:</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            >
              <option value="Beginner">Beginner</option>
              <option value="Medium">Medium</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">Tools:</label>
            <input
              type="text"
              value={tools}
              onChange={(e) => setTools(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          {content.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-4 border rounded-lg p-4 bg-white shadow-md">
              <div className="mb-4">
                <label className="block font-bold mb-1">Section Title:</label>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => {
                    const newContent = [...content];
                    newContent[sectionIndex].title = e.target.value;
                    setContent(newContent);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-1">Section Description:</label>
                <textarea
                  value={section.description}
                  onChange={(e) => {
                    const newContent = [...content];
                    newContent[sectionIndex].description = e.target.value;
                    setContent(newContent);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-1">Section Document:</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, sectionIndex, "doc")}
                  className="w-full"
                />
                {section.doc && (
                  <div className="mt-2">
                    <a
                      href={typeof section.doc === "string" ? section.doc : URL.createObjectURL(section.doc)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Document
                    </a>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-1">Section Video:</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileChange(e, sectionIndex, "video")}
                  className="w-full"
                />
                {section.video && (
                  <div className="mt-2">
                    <video
                      src={
                        typeof section.video === "string"
                          ? section.video
                          : URL.createObjectURL(section.video)
                      }
                      controls
                      className="w-full mb-2"
                    />
                    <a
                      href={
                        typeof section.video === "string"
                          ? section.video
                          : URL.createObjectURL(section.video)
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Video
                    </a>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-1">Assignment:</label>
                <div>
                  {section.assignment.questions.map((question, questionIndex) => (
                    <div key={questionIndex} className="mb-4 border p-2 rounded">
                      <label className="block mb-1">Question:</label>
                      <input
                        type="text"
                        value={question.questionText}
                        onChange={(e) =>
                          handleAssignmentChange(sectionIndex, questionIndex, "questionText", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        required
                      />
                      <label className="block mt-2 mb-1">Options:</label>
                      {question.options.map((option, optionIndex) => (
                        <input
                          key={optionIndex}
                          type="text"
                          value={option}
                          onChange={(e) =>
                            handleAssignmentChange(sectionIndex, questionIndex, "options", e.target.value, optionIndex)
                          }
                          className="w-full px-2 py-1 mb-1 border border-gray-300 rounded"
                          required
                        />
                      ))}
                      <label className="block mt-2 mb-1">Correct Answer:</label>
                      <input
                        type="text"
                        value={question.correctAnswer}
                        onChange={(e) =>
                          handleAssignmentChange(sectionIndex, questionIndex, "correctAnswer", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        required
                      />
                      <label className="block mt-2 mb-1">Explanation:</label>
                      <textarea
                        value={question.explanation}
                        onChange={(e) =>
                          handleAssignmentChange(sectionIndex, questionIndex, "explanation", e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      ></textarea>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addNewQuestion(sectionIndex)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Add New Question
                  </button>
                </div>
              </div>
              {section.submodules.map((submodule, submoduleIndex) => (
                <div key={submoduleIndex} className="mb-4 border p-4 rounded-lg bg-gray-50">
                  <h3 className="font-bold mb-2">Submodule {submoduleIndex + 1}</h3>
                  <div className="mb-4">
                    <label className="block font-bold mb-1">Title:</label>
                    <input
                      type="text"
                      value={submodule.title}
                      onChange={(e) =>
                        handleSubmoduleChange(e, sectionIndex, submoduleIndex, "title")
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-bold mb-1">Description:</label>
                    <textarea
                      value={submodule.description}
                      onChange={(e) =>
                        handleSubmoduleChange(e, sectionIndex, submoduleIndex, "description")
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                      required
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="block font-bold mb-1">Document:</label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) =>
                        handleSubmoduleFileChange(e, sectionIndex, submoduleIndex, "doc")
                      }
                      className="w-full"
                    />
                    {submodule.doc && (
                      <div className="mt-2">
                        <a
                          href={
                            typeof submodule.doc === "string"
                              ? submodule.doc
                              : URL.createObjectURL(submodule.doc)
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          View Document
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block font-bold mb-1">Video:</label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) =>
                        handleSubmoduleFileChange(e, sectionIndex, submoduleIndex, "video")
                      }
                      className="w-full"
                    />
                    {submodule.video && (
                      <div className="mt-2">
                        <video
                          src={
                            typeof submodule.video === "string"
                              ? submodule.video
                              : URL.createObjectURL(submodule.video)
                          }
                          controls
                          className="w-full mb-2"
                        />
                        <a
                          href={
                            typeof submodule.video === "string"
                              ? submodule.video
                              : URL.createObjectURL(submodule.video)
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          View Video
                        </a>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteSubmodule(sectionIndex, submoduleIndex)}
                    className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Delete Submodule
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addNewSubmodule(sectionIndex)}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              >
                Add New Submodule
              </button>
              <button
                type="button"
                onClick={() => deleteSection(sectionIndex)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              >
                Delete Section
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addNewSection}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Add New Section
          </button>
          <div className="mb-4 mt-6">
            <h2 className="text-xl font-bold mb-2">Final Assignment</h2>
            {finalAssignment.map((assignment, index) => (
              <div key={index} className="mb-4 border p-4 rounded-lg bg-gray-50">
                <label className="block mb-1 font-bold">Question:</label>
                <input
                  type="text"
                  value={assignment.questionText}
                  onChange={(e) =>
                    handleFinalAssignmentChange(index, "questionText", e.target.value)
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                />
                <label className="block mt-2 mb-1 font-bold">Options:</label>
                {assignment.options.map((option, optIndex) => (
                  <input
                    key={optIndex}
                    type="text"
                    value={option}
                    onChange={(e) =>
                      handleFinalAssignmentChange(index, "options", e.target.value, optIndex)
                    }
                    className="w-full px-2 py-1 mb-1 border border-gray-300 rounded"
                  />
                ))}
                <label className="block mt-2 mb-1 font-bold">Correct Answer:</label>
                <input
                  type="text"
                  value={assignment.correctAnswer}
                  onChange={(e) =>
                    handleFinalAssignmentChange(index, "correctAnswer", e.target.value)
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                />
                <label className="block mt-2 mb-1 font-bold">Explanation:</label>
                <textarea
                  value={assignment.explanation}
                  onChange={(e) =>
                    handleFinalAssignmentChange(index, "explanation", e.target.value)
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                ></textarea>
                <button
                  type="button"
                  onClick={() => handleDeleteFinalAssignment(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                >
                  Delete Question
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddFinalAssignment}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Add Final Assignment
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white px-4 py-2 rounded mt-4"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
