// import React, { useState } from "react";
// import axios from "axios";
// import { ThreeDots } from "react-loader-spinner";

// const Upload = () => {
//   const [img, setImg] = useState(null);
//   const [video, setVideo] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const uploadFile = async (type) => {
//     const data = new FormData();
//     data.append("file", type === "image" ? img : video);
//     data.append(
//       "upload_preset",
//       type === "image" ? "images_preset" : "videos_preset"
//     );

//     try {
//       const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
//       const resourceType = type === "image" ? "image" : "video";
//       const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
//       const res = await axios.post(api, data);
//       const { url } = res.data;
//       return url; // Return the Cloudinary URL
//     } catch (error) {
//       console.error(error);
//       throw new Error("Failed to upload file to Cloudinary");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const imgUrl = await uploadFile("image");
//       const videoUrl = await uploadFile("video");
//       console.log("begin to send");
//       // Send imgUrl and videoUrl to backend
//       // await axios.post(`${process.env.VITE_BACKEND_BASEURL}/api/videos`, {
//       //   imgUrl,
//       //   videoUrl,
//       // });
//       try {
//         const response = await axios.post(
//           `${import.meta.env.VITE_BACKEND_BASEURL}/api/videos`,
//           { imgUrl, videoUrl }
//         );
//         console.log("Response from backend:", response.data);
//       } catch (error) {
//         console.error("Error:", error);
//       }

//       console.log(" send");

//       setImg(null);
//       setVideo(null);
//       console.log("Files uploaded successfully");
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//     } 
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="video">Video:</label>
//           <br />
//           <input
//             type="file"
//             accept="video/*"
//             id="video"
//             onChange={(e) => setVideo(e.target.files[0])}
//           />
//         </div>
//         <br />
//         <div>
//           <label htmlFor="img">Image:</label>
//           <br />
//           <input
//             type="file"
//             accept="image/*"
//             id="img"
//             onChange={(e) => setImg(e.target.files[0])}
//           />
//           <br />
//         </div>
//         <br />
//         <button type="submit">Upload</button>
//       </form>
//       {loading && (
//         <ThreeDots
//           visible={true}
//           height={80}
//           width={80}
//           color="#4fa94d"
//           radius={9}
//           ariaLabel="three-dots-loading"
//           wrapperStyle={{}}
//           wrapperClass=""
//         />
//       )}
//     </div>
//   );
// };

// export default Upload;





// import React, { useState } from 'react';


// take 2
// const CourseCreation = () => {
//   const [courseName, setCourseName] = useState('');
//   const [description, setDescription] = useState('');
//   const [img, setImg] = useState(null);
//   const [trainerName, setTrainerName] = useState('');
//   const [level, setLevel] = useState('Medium');
//   const [tools, setTools] = useState('');
//   const [content, setContent] = useState([{ title: 'Week 1 - Introduction', description: 'Lorem ipsum dolor sit amet' }]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImg(file);
//     }
//   };

//   const addNewSection = () => {
//     setContent([...content, { title: '', description: '' }]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log({ courseName, description, img, trainerName, level, tools, content });
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-gray-100">
//       <input
//         type="text"
//         placeholder="Search"
//         className="w-full p-2 mb-6 border border-gray-300 rounded"
//       />
      
//       <form onSubmit={handleSubmit}>
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

//         <div className="mb-6">
//           <div className="relative h-32 bg-gray-200 rounded overflow-hidden mb-2">
//             {img && (
//               <img
//                 src={URL.createObjectURL(img)}
//                 alt="Course"
//                 className="w-full h-full object-cover"
//               />
//             )}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="absolute inset-0 opacity-0 cursor-pointer"
//             />
//           </div>
//           <p className="text-sm text-blue-600 text-center cursor-pointer">Click to change</p>
//         </div>

//         <div className="grid grid-cols-2 gap-4 mb-6">
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

//         <select
//           value={tools}
//           onChange={(e) => setTools(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded mb-6"
//         >
//           <option value="">Select...</option>
//           <option value="tool1">Tool 1</option>
//           <option value="tool2">Tool 2</option>
//           <option value="tool3">Tool 3</option>
//         </select>

//         <h2 className="text-xl font-bold mb-4">Content</h2>
//         {content.map((section, index) => (
//           <div key={index} className="mb-4">
//             <input
//               type="text"
//               placeholder="Section title"
//               value={section.title}
//               onChange={(e) => {
//                 const newContent = [...content];
//                 newContent[index].title = e.target.value;
//                 setContent(newContent);
//               }}
//               className="w-full p-2 border border-gray-300 rounded mb-2"
//             />
//             <textarea
//               placeholder="Section description"
//               value={section.description}
//               onChange={(e) => {
//                 const newContent = [...content];
//                 newContent[index].description = e.target.value;
//                 setContent(newContent);
//               }}
//               className="w-full p-2 border border-gray-300 rounded h-24 resize-none"
//             />
//           </div>
//         ))}
        
//         <button
//           type="button"
//           onClick={addNewSection}
//           className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
//         >
//           Add new section
//         </button>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Create Course
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CourseCreation;


// take 3
// import React, { useState } from 'react';
// import axios from 'axios';
// import { ThreeDots } from "react-loader-spinner";
// const Upload = () => {
//   const [courseName, setCourseName] = useState('');
//   const [description, setDescription] = useState('');
//   const [img, setImg] = useState(null);
//   const [video, setVideo] = useState(null);
//   const [trainerName, setTrainerName] = useState('');
//   const [level, setLevel] = useState('Medium');
//   const [tools, setTools] = useState('');
//   const [content, setContent] = useState([{ title: 'Week 1 - Introduction', description: 'Lorem ipsum dolor sit amet' }]);
//   const [loading, setLoading] = useState(false);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImg(file);
//     }
//   };

//   const addNewSection = () => {
//     setContent([...content, { title: '', description: '' }]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const imgUrl = await uploadFile("image", img);
//       const videoUrl = await uploadFile("video", video);
//       console.log("begin to send");
//       // Send imgUrl and videoUrl to backend
//       // await axios.post(`${process.env.VITE_BACKEND_BASEURL}/api/videos`, {
//       //   imgUrl,
//       //   videoUrl,
//       // });
//       try {
//         const response = await axios.post(
//           `${import.meta.env.VITE_BACKEND_BASEURL}/api/videos`,
//           { imgUrl, videoUrl }
//         );
//         console.log("Response from backend:", response.data);
//       } catch (error) {
//         console.error("Error:", error);
//       }
  
//       console.log(" send");
  
//       setImg(null);
//       setVideo(null);
//       console.log("Files uploaded successfully");
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//     } 
//   };

//   const uploadFile = async (type) => {
//     const data = new FormData();
//     data.append("file", type === "image" ? img : video);
//     data.append(
//       "upload_preset",
//       type === "image" ? "images_preset" : "videos_preset"
//     );
  
//     try {
//       const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
//       const resourceType = type === "image" ? "image" : "video";
//       const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
//       const res = await axios.post(api, data);
//       const { url } = res.data;
//       return url; // Return the Cloudinary URL
//     } catch (error) {
//       console.error(error);
//       throw new Error("Failed to upload file to Cloudinary");
//     }
//   };
//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-gray-100">
//       <input
//         type="text"
//         placeholder="Search"
//         className="w-full p-2 mb-6 border border-gray-300 rounded"
//       />
      
//       <form onSubmit={handleSubmit}>
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

//         <div className="mb-6">
//           <div className="relative h-32 bg-gray-200 rounded overflow-hidden mb-2">
//             {img && (
//               <img
//                 src={URL.createObjectURL(img)}
//                 alt="Course"
//                 className="w-full h-full object-cover"
//               />
//             )}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="absolute inset-0 opacity-0 cursor-pointer"
//             />
//           </div>
//           <p className="text-sm text-blue-600 text-center cursor-pointer">Click to change</p>
//         </div>

//         <div className="grid grid-cols-2 gap-4 mb-6">
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

//         <select
//           value={tools}
//           onChange={(e) => setTools(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded mb-6"
//         >
//           <option value="">Select...</option>
//           <option value="tool1">Tool 1</option>
//           <option value="tool2">Tool 2</option>
//           <option value="tool3">Tool 3</option>
//         </select>

//         <h2 className="text-xl font-bold mb-4">Content</h2>
//         {content.map((section, index) => (
//           <div key={index} className="mb-4">
//             <input
//               type="text"
//               placeholder="Section title"
//               value={section.title}
//               onChange={(e) => {
//                 const newContent = [...content];
//                 newContent[index].title = e.target.value;
//                 setContent(newContent);
//               }}
//               className="w-full p-2 border border-gray-300 rounded mb-2"
//             />
//             <textarea
//               placeholder="Section description"
//               value={section.description}
//               onChange={(e) => {
//                 const newContent = [...content];
//                 newContent[index].description = e.target.value;
//                 setContent(newContent);
//               }}
//               className="w-full p-2 border border-gray-300 rounded h-24 resize-none"
//             />
//           </div>
//         ))}
        
//         <button
//           type="button"
//           onClick={addNewSection}
//           className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
//         >
//           Add new section
//         </button>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Create Course
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Upload;

//take 4


// import React, { useState } from 'react';
// import axios from 'axios';
// import { ThreeDots } from 'react-loader-spinner';

// const Upload = () => {
//   const [courseName, setCourseName] = useState('');
//   const [description, setDescription] = useState('');
//   const [img, setImg] = useState(null);
//   const [video, setVideo] = useState(null);
//   const [trainerName, setTrainerName] = useState('');
//   const [level, setLevel] = useState('Medium');
//   const [tools, setTools] = useState('');
//   const [content, setContent] = useState([{ title: 'Week 1 - Introduction', description: 'Lorem ipsum dolor sit amet' }]);
//   const [loading, setLoading] = useState(false);
//   const [imgUrl, setImgUrl] = useState('');

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImg(file);
//     }
//   };

//   const addNewSection = () => {
//     setContent([...content, { title: '', description: '' }]);
//   };

//   const uploadFile = async (type, file) => {
//     try {
//       const data = new FormData();
//       data.append("file", file);
//       data.append(
//         "upload_preset",
//         type === "image" ? "images_preset" : "videos_preset"
//       );
  
//       const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
//       const resourceType = type === "image" ? "image" : "video";
//       const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
  
//       const res = await axios.post(api, data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
  
//       if (res.status !== 200) {
//         throw new Error(`Failed to upload file to Cloudinary: ${res.statusText}`);
//       }
  
//       const { secure_url } = res.data; // Extract secure URL from Cloudinary response
//       return secure_url; // Return the Cloudinary URL
//     } catch (error) {
//       console.error("Error uploading file to Cloudinary:", error);
//       throw new Error("Failed to upload file to Cloudinary");
//     }
//   };
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
  
//       // Upload image to Cloudinary
//       const imgUrl = await uploadFile("image", img);
  
//       // Optionally, upload video to Cloudinary if needed
//       // const videoUrl = await uploadFile("video", video);
  
//       console.log("Image uploaded to Cloudinary:", imgUrl);
//       // console.log("Video uploaded to Cloudinary:", videoUrl);
  
//       // Optionally, instead of logging, you can update state or perform other actions
  
//       // Reset form state and loading indicator
//       setLoading(false);
//       setImg(null);
//       setVideo(null);
  
//       console.log("Image uploaded successfully to Cloudinary");
  
//       // Temporarily commenting out backend API call
//       /*
//       try {
//         const response = await axios.post(
//           `${import.meta.env.VITE_BACKEND_BASEURL}/api/courses`,
//           { imgUrl, videoUrl }
//         );
//         console.log("Response from backend:", response.data);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//       */
  
//       console.log("Course creation process complete");
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//       // Implement error handling or user notification as needed
//     }
//   };
  
//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-gray-100">
//       <input
//         type="text"
//         placeholder="Search"
//         className="w-full p-2 mb-6 border border-gray-300 rounded"
//       />
      
//       <form onSubmit={handleSubmit}>
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

//         <div className="mb-6">
//           <div className="relative h-32 bg-gray-200 rounded overflow-hidden mb-2">
//             {img && (
//               <img
//                 src={URL.createObjectURL(img)}
//                 alt="Course"
//                 className="w-full h-full object-cover"
//               />
//             )}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="absolute inset-0 opacity-0 cursor-pointer"
//             />
//           </div>
//           <p className="text-sm text-blue-600 text-center cursor-pointer">Click to change</p>
//         </div>

//         <div className="grid grid-cols-2 gap-4 mb-6">
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

//         <select
//           value={tools}
//           onChange={(e) => setTools(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded mb-6"
//         >
//           <option value="">Select...</option>
//           <option value="tool1">Tool 1</option>
//           <option value="tool2">Tool 2</option>
//           <option value="tool3">Tool 3</option>
//         </select>

//         <h2 className="text-xl font-bold mb-4">Content</h2>
//         {content.map((section, index) => (
//           <div key={index} className="mb-4">
//             <input
//               type="text"
//               placeholder="Section title"
//               value={section.title}
//               onChange={(e) => {
//                 const newContent = [...content];
//                 newContent[index].title = e.target.value;
//                 setContent(newContent);
//               }}
//               className="w-full p-2 border border-gray-300 rounded mb-2"
//             />
//             <textarea
//               placeholder="Section description"
//               value={section.description}
//               onChange={(e) => {
//                 const newContent = [...content];
//                 newContent[index].description = e.target.value;
//                 setContent(newContent);
//               }}
//               className="w-full p-2 border border-gray-300 rounded h-24 resize-none"
//             />
//           </div>
//         ))}
        
//         <button
//           type="button"
//           onClick={addNewSection}
//           className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
//         >
//           Add new section
//         </button>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Create Course
//         </button>

//         {loading && (
//           <ThreeDots
//             visible={true}
//             height={80}
//             width={80}
//             color="#4fa94d"
//             radius={9}
//             ariaLabel="three-dots-loading"
//             wrapperStyle={{}}
//             wrapperClass=""
//           />
//         )}
//       </form>
//     </div>
//   );
// };


// export default Upload;

// take 5 = everything working where adding aall the

// import React, { useState } from 'react';
// import axios from 'axios';
// import { ThreeDots } from 'react-loader-spinner';

// const Upload = () => {
//   const [courseName, setCourseName] = useState('');
//   const [description, setDescription] = useState('');
//   const [img, setImg] = useState(null);
//   const [trainerName, setTrainerName] = useState('');
//   const [level, setLevel] = useState('Medium');
//   const [tools, setTools] = useState('');
//   const [content, setContent] = useState([{ title: 'Week 1 - Introduction', description: 'Lorem ipsum dolor sit amet', pdf: null, video: null }]);
//   const [loading, setLoading] = useState(false);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImg(file);
//     }
//   };

//   const handleContentFileChange = (index, type, file) => {
//     const newContent = [...content];
//     newContent[index][type] = file;
//     setContent(newContent);
//   };

//   const addNewSection = () => {
//     setContent([...content, { title: '', description: '', pdf: null, video: null }]);
//   };

//   const uploadFile = async (type, file) => {
//     try {
//       const data = new FormData();
//       data.append("file", file);
//       data.append("upload_preset", type === "image" ? "images_preset" : type === "pdf" ? "samples_preset" : "videos_preset");

//       const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
//       const resourceType = type === "image" ? "image" : type === "pdf" ? "raw" : "video";
//       const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

//       const res = await axios.post(api, data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (res.status !== 200) {
//         throw new Error(`Failed to upload file to Cloudinary: ${res.statusText}`);
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

//       const contentWithUrls = await Promise.all(content.map(async (section) => {
//         const pdfUrl = section.pdf ? await uploadFile("pdf", section.pdf) : null;
//         const videoUrl = section.video ? await uploadFile("video", section.video) : null;
//         return { ...section, pdfUrl, videoUrl };
//       }));

//       console.log("Image uploaded to Cloudinary:", imgUrl);
//       console.log("Content uploaded with URLs:", contentWithUrls);

//       // Reset form state and loading indicator
//       setLoading(false);
//       setImg(null);

//       console.log("Course creation process complete");
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-gray-100">
//       <input
//         type="text"
//         placeholder="Search"
//         className="w-full p-2 mb-6 border border-gray-300 rounded"
//       />

//       <form onSubmit={handleSubmit}>
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

//         <div className="mb-6">
//           <div className="relative h-32 bg-gray-200 rounded overflow-hidden mb-2">
//             {img && (
//               <img
//                 src={URL.createObjectURL(img)}
//                 alt="Course"
//                 className="w-full h-full object-cover"
//               />
//             )}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="absolute inset-0 opacity-0 cursor-pointer"
//             />
//           </div>
//           <p className="text-sm text-blue-600 text-center cursor-pointer">Click to change</p>
//         </div>

//         <div className="grid grid-cols-2 gap-4 mb-6">
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

//         <select
//           value={tools}
//           onChange={(e) => setTools(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded mb-6"
//         >
//           <option value="">Select...</option>
//           <option value="tool1">Tool 1</option>
//           <option value="tool2">Tool 2</option>
//           <option value="tool3">Tool 3</option>
//         </select>

//         <h2 className="text-xl font-bold mb-4">Content</h2>
//         {content.map((section, index) => (
//           <div key={index} className="mb-4">
//             <input
//               type="text"
//               placeholder="Section title"
//               value={section.title}
//               onChange={(e) => {
//                 const newContent = [...content];
//                 newContent[index].title = e.target.value;
//                 setContent(newContent);
//               }}
//               className="w-full p-2 border border-gray-300 rounded mb-2"
//             />
//             <textarea
//               placeholder="Section description"
//               value={section.description}
//               onChange={(e) => {
//                 const newContent = [...content];
//                 newContent[index].description = e.target.value;
//                 setContent(newContent);
//               }}
//               className="w-full p-2 border border-gray-300 rounded h-24 resize-none"
//             />
//             <input
//               type="file"
//               accept=".pdf"
//               onChange={(e) => handleContentFileChange(index, 'pdf', e.target.files[0])}
//               className="mt-2"
//             />
//             <input
//               type="file"
//               accept="video/*"
//               onChange={(e) => handleContentFileChange(index, 'video', e.target.files[0])}
//               className="mt-2"
//             />
//           </div>
//         ))}

//         <button
//           type="button"
//           onClick={addNewSection}
//           className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
//         >
//           Add new section
//         </button>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Create Course
//         </button>

//         {loading && (
//           <ThreeDots
//             visible={true}
//             height={80}
//             width={80}
//             color="#4fa94d"
//             radius={9}
//             ariaLabel="three-dots-loading"
//             wrapperStyle={{}}
//             wrapperClass=""
//           />
//         )}
//       </form>
//     </div>
//   );
// };

// export default Upload;

// final one and correct
// import React, { useState } from 'react';
// import axios from 'axios';
// import { ThreeDots } from 'react-loader-spinner';

// const Upload = () => {
//   const [courseName, setCourseName] = useState('');
//   const [description, setDescription] = useState('');
//   const [img, setImg] = useState(null);
//   const [trainerName, setTrainerName] = useState('');
//   const [level, setLevel] = useState('Medium');
//   const [tools, setTools] = useState('');
//   const [content, setContent] = useState([{ title: 'Week 1 - Introduction', description: 'Lorem ipsum dolor sit amet' }]);
//   const [loading, setLoading] = useState(false);
//  // const [successMessage, setSuccessMessage] = useState('');
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImg(file);
//     }
//   };

//   const addNewSection = () => {
//     setContent([...content, { title: '', description: '', pdf: null, video: null }]);
//   };

//   const uploadFile = async (type, file) => {
//     try {
//       const data = new FormData();
//       data.append("file", file);
//       data.append(
//         "upload_preset",
//         type === "image" ? "images_preset" : type === "video" ? "videos_preset" : "samples_preset"
//       );
  
//       const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
//       const resourceType = type === "image" ? "image" : type === "video" ? "video" : "raw";
//       const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
  
//       const res = await axios.post(api, data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
  
//       if (res.status !== 200) {
//         throw new Error(`Failed to upload file to Cloudinary: ${res.statusText}`);
//       }
  
//       const { secure_url } = res.data; // Extract secure URL from Cloudinary response
//       return secure_url; // Return the Cloudinary URL
//     } catch (error) {
//       console.error("Error uploading file to Cloudinary:", error);
//       throw new Error("Failed to upload file to Cloudinary");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
  
//       // Upload image to Cloudinary
//       const imgUrl = await uploadFile("image", img);
  
//       // Upload content files (PDF and video)
//       const contentWithUrls = await Promise.all(content.map(async (section) => {
//         const pdfUrl = section.pdf ? await uploadFile("pdf", section.pdf) : null;
//         const videoUrl = section.video ? await uploadFile("video", section.video) : null;
//         return { ...section, pdfUrl, videoUrl };
//       }));
  
//       const courseData = {
//         courseName,
//         description,
//         trainerName,
//         level,
//         tools,
//         imgUrl,
//         content: contentWithUrls,
//       };
  
//       // Send course data to backend
//       await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/courses`, courseData);
//       // setSuccessMessage('Course created successfully!');

//       // Reset form state and loading indicator
//       setLoading(false);
//       setImg(null);
//       setCourseName('');
//       setDescription('');
//       setTrainerName('');
//       setLevel('Medium');
//       setTools('');
//       setContent([{ title: 'Week 1 - Introduction', description: 'Lorem ipsum dolor sit amet' }]);
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//       // Implement error handling or user notification as needed
//     }
//   };
  

//   const handleFileChange = (e, index, type) => {
//     const file = e.target.files[0];
//     if (file) {
//       const newContent = [...content];
//       newContent[index][type] = file;
//       setContent(newContent);
//     }
//   };

//   return (
    
//     <div className="max-w-4xl mx-auto p-6 bg-gray-100">
//       <input
//         type="text"
//         placeholder="Search"
//         className="w-full p-2 mb-6 border border-gray-300 rounded"
//       />
      
//       <form onSubmit={handleSubmit}>
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
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
        
//         <h2 className="text-xl font-bold mb-4">Course Image</h2>
//         <div className="mb-6">
//           <input type="file" accept="image/*" onChange={handleImageChange} />
//         </div>
        
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
        
//         <h2 className="text-xl font-bold mb-4">Content</h2>
//         {content.map((section, index) => (
//           <div key={index} className="mb-6">
//             <input
//               type="text"
//               placeholder="Section title"
//               value={section.title}
//               onChange={(e) => {
//                 const newContent = [...content];
//                 newContent[index].title = e.target.value;
//                 setContent(newContent);
//               }}
//               className="w-full p-2 mb-2 border border-gray-300 rounded"
//             />
//             <textarea
//               placeholder="Section description"
//               value={section.description}
//               onChange={(e) => {
//                 const newContent = [...content];
//                 newContent[index].description = e.target.value;
//                 setContent(newContent);
//               }}
//               className="w-full p-2 mb-2 border border-gray-300 rounded"
//             />
//             <div className="flex items-center gap-4 mb-2">
//               <input
//                 type="file"
//                 accept=".pdf"
//                 onChange={(e) => handleFileChange(e, index, 'pdf')}
//               />
//               <input
//                 type="file"
//                 accept="video/*"
//                 onChange={(e) => handleFileChange(e, index, 'video')}
//               />
//             </div>
//           </div>
//         ))}
        
//         <button
//           type="button"
//           onClick={addNewSection}
//           className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
//         >
//           Add new section
//         </button>
        
//         <button
//           type="submit"
//           className="w-full mt-4 py-2 bg-blue-500 text-white rounded"
//           disabled={loading}
//         >
//           {loading ? (
//             <div className="flex justify-center">
//               <ThreeDots
//                 height="40"
//                 width="40"
//                 radius="9"
//                 color="#ffffff"
//                 ariaLabel="three-dots-loading"
//                 visible={true}
//               />
//             </div>
//           ) : (
//             'Create Course'
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Upload;



import React, { useState } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';

const Upload = () => {
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState(null);
  const [trainerName, setTrainerName] = useState('');
  const [level, setLevel] = useState('Medium');
  const [tools, setTools] = useState('');
  const [content, setContent] = useState([{ title: 'Week 1 - Introduction', description: 'Lorem ipsum dolor sit amet', pdf: null, video: null }]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
    }
  };

  const addNewSection = () => {
    setContent([...content, { title: '', description: '', pdf: null, video: null }]);
  };

  const uploadFile = async (type, file) => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append(
        "upload_preset",
        type === "image" ? "images_preset" : type === "video" ? "videos_preset" : "samples_preset"
      );
  
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const resourceType = type === "image" ? "image" : type === "video" ? "video" : "raw";
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
  
      const res = await axios.post(api, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (res.status !== 200) {
        throw new Error(`Failed to upload file to Cloudinary: ${res.statusText}`);
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
  
      const imgUrl = await uploadFile("image", img);
  
      const contentWithUrls = await Promise.all(content.map(async (section) => {
        const pdfUrl = section.pdf ? await uploadFile("pdf", section.pdf) : null;
        const videoUrl = section.video ? await uploadFile("video", section.video) : null;
        return { ...section, pdfUrl, videoUrl };
      }));
  
      const courseData = {
        courseName,
        description,
        trainerName,
        level,
        tools,
        imgUrl,
        content: contentWithUrls,
      };
  
      await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/courses`, courseData);
  
      setSuccessMessage('Course created successfully!');
      setLoading(false);
      setImg(null);
      setCourseName('');
      setDescription('');
      setTrainerName('');
      setLevel('Medium');
      setTools('');
      setContent([{ title: 'Week 1 - Introduction', description: 'Lorem ipsum dolor sit amet', pdf: null, video: null }]);

      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setSuccessMessage('Error creating course. Please try again.');
      setTimeout(() => setSuccessMessage(''), 5000);
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
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
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
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">PDF File</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange(e, index, 'pdf')}
                  className="w-full"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Video File</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileChange(e, index, 'video')}
                  className="w-full"
                />
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
        
        <button
          type="submit"
          className="w-full mt-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
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
            'Create Course'
          )}
        </button>
      </form>
    </div>
  );
};

export default Upload;