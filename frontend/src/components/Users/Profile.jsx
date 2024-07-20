// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faCamera, faTimes } from "@fortawesome/free-solid-svg-icons";
// import ProfileBoy from "../../assets/Profile.webp";

// import { useAuth0 } from "@auth0/auth0-react";

// import Axios from "../../helper/Axios";
// import { useMediaQuery } from "react-responsive";
// import EditProfile from "./EditProfile";

// const Profile = () => {
//   const [photo, setPhoto] = useState(null);
//   const [showAllCourses, setShowAllCourses] = useState(false);
//   // const { user, loginWithRedirect, isAuthenticated,logout } = useAuth0();
//   const [isEditing, setIsEditing] = useState(false);
//   const { user, isAuthenticated, isLoading } = useAuth0();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     region: "",
//   });

//   const [userData, setUserData] = useState({
//     courses: [],
//   });

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem("token");
//       console.log(token);
//       if (token) {
//         try {
//           const response = await Axios.get("/api/userDetails", {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setUserData(response.data);
//           console.log(response.data);
//         } catch (error) {
//           console.error("Failed to fetch user:", error);
//         }
//       }
//     };

//     fetchUser();
//   }, []);

//   const handlePhotoChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPhoto(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const triggerFileInput = () => {
//     document.getElementById("photoInput").click();
//   };

//   const handleFormChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
//   const toggleViewAll = () => {
//     setShowAllCourses(!showAllCourses);
//   };
//   // Media queries
//   const isSmallScreen = useMediaQuery({ maxWidth: 425 });

//   return (
//     <div
//       className={`relative max-w-5xl min-h-screen mx-auto bg-white shadow-md rounded-lg p-10 ${
//         isSmallScreen ? "p-4" : "p-10"
//       } flex flex-col sm:flex-row`}
//     >
//       <div
//         className={`flex flex-col items-center ${
//           isSmallScreen ? "w-full mb-4" : "w-1/3 mb-0"
//         }`}
//       >
//         <div
//           className={`relative ${
//             isSmallScreen ? "w-24 h-24" : "w-32 h-32"
//           } mb-4`}
//         >
//           {photo ? (
//             <img
//               src={photo}
//               alt="Profile"
//               className="h-full w-full rounded-full object-cover"
//             />
//           ) : (
//             <img
//               src={ProfileBoy}
//               alt="Profile"
//               className="w-full h-full rounded-full"
//             />
//           )}
//           <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer">
//             <FontAwesomeIcon
//               icon={faCamera}
//               className="text-white"
//               onClick={triggerFileInput}
//             />
//           </div>
//           <input
//             type="file"
//             id="photoInput"
//             className="hidden"
//             accept="image/*"
//             onChange={handlePhotoChange}
//           />
//         </div>
//         <div className="text-center">
//           {isAuthenticated ? (
//             <h2
//               className={`font-semibold ${
//                 isSmallScreen ? "text-lg" : "text-xl"
//               }`}
//             >{`${user.name}`}</h2>
//           ) : (
//             <h2
//               className={`font-semibold ${
//                 isSmallScreen ? "text-lg" : "text-xl"
//               }`}
//             >{`${userData.name}`}</h2>
//           )}
//         </div>
//         {/* <button
//           className="text-blue-500 hover:underline mt-4"
//           onClick={handleEditClick}
//         >
//           <FontAwesomeIcon icon={faEdit} /> Edit
//         </button> */}
//         <EditProfile></EditProfile>
//       </div>
//       <div className={`pl-0 ${isSmallScreen ? "w-full" : "w-2/3 pl-8"}`}>
//         <div className="mb-6">
//           <h3
//             className={`font-semibold ${
//               isSmallScreen ? "text-base" : "text-lg"
//             }`}
//           >
//             Personal Details
//           </h3>
//           <ul
//             className={`mt-2 text-gray-700 ${
//               isSmallScreen ? "space-y-2" : "space-y-4"
//             }`}
//           >
//             {isAuthenticated ? (
//               <li>
//                 <strong>Email:</strong> {user.email}
//               </li>
//             ) : (
//               <li>
//                 <strong>Email:</strong> {userData.email}
//               </li>
//             )}
//             {isAuthenticated ? (
//               <li>
//                 <strong>Username:</strong> {user.given_name}
//               </li>
//             ) : (
//               <li>
//                 <strong>Region:</strong> {userData.region}
//               </li>
//             )}
//           </ul>
//         </div>
//         <div className="mb-6">
//           <h3
//             className={`font-semibold ${
//               isSmallScreen ? "text-base" : "text-lg"
//             }`}
//           >
//             Course Details
//           </h3>
//           <ul
//             className={`mt-2 text-gray-700 ${
//               isSmallScreen ? "space-y-2" : "space-y-4"
//             }`}
//           >
//             <li>
//               <strong>No. of Courses:</strong> {userData.courses?.length || 0}
//             </li>
//             <li>
//               <strong>Courses:</strong>
//               <ul>
//                 {userData.courses?.length > 0 ? (
//                   userData.courses.map((course) => (
//                     <li key={course.course_id}>
//                       {course.courseDetails?.courseName ||
//                         "Course name not found"}
//                     </li>
//                   ))
//                 ) : (
//                   <li>No courses enrolled</li>
//                 )}
//               </ul>
//             </li>
//           </ul>
//         </div>
//         <div>
//           <div className="flex justify-between mb-4">
//             <h3
//               className={`font-semibold ${
//                 isSmallScreen ? "text-base" : "text-lg"
//               }`}
//             >
//               Recent Courses
//             </h3>
//             <div
//               onClick={toggleViewAll}
//               className={`px-2 py-1 bg-slate-700 text-white rounded-full text-sm ${
//                 isSmallScreen ? "text-xs" : "text-sm"
//               }`}
//             >
//               {showAllCourses ? "Show Less" : "View All"}
//             </div>
//           </div>
//         </div>
//         <div
//           className={`mt-2 flex ${showAllCourses ? "flex-col" : "space-x-4"}`}
//         >
//           {userData.courses?.length > 0 ? (
//             userData.courses
//               .slice(0, showAllCourses ? userData.courses.length : 2)
//               .map((course) => {
//                 const percentage =
//                   course.total_no_of_modules > 0
//                     ? (
//                         (course.no_of_modules_completed /
//                           course.total_no_of_modules) *
//                         100
//                       ).toFixed(2)
//                     : 0;

//                 return (
//                   <div
//                     key={course.course_id}
//                     className={`bg-gray-100 p-4 rounded-md ${
//                       isSmallScreen ? "w-full" : "w-1/2"
//                     } h-44 text-center shadow-xl`}
//                   >
//                     <p className="text-gray-600">
//                       {course.courseDetails?.courseName ||
//                         "Course name not found"}
//                     </p>
//                     <p
//                       className={`font-semibold ${
//                         isSmallScreen ? "text-xl" : "text-2xl"
//                       }`}
//                     >
//                       {percentage}% completed
//                     </p>
//                   </div>
//                 );
//               })
//           ) : (
//             <div
//               className={`bg-gray-100 p-4 rounded-md ${
//                 isSmallScreen ? "w-full" : "w-1/2"
//               } h-44 text-center shadow-xl`}
//             >
//               <p className="text-gray-600">No recent courses enrolled</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
// import { faCamera } from "@fortawesome/free-solid-svg-icons";
// import ProfileBoy from "../../assets/Profile.webp";
// import { useAuth0 } from "@auth0/auth0-react";
// import Axios from "../../helper/Axios";
// import { useMediaQuery } from "react-responsive";
// import EditProfile from "./EditProfile";

// const Profile = () => {
//   const [photo, setPhoto] = useState(null);
//   const [showAllCourses, setShowAllCourses] = useState(false);
//   const { user, isAuthenticated, isLoading } = useAuth0();
//   const [isEditing, setIsEditing] = useState(false);
//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     region: "",
//     courses: [],
//   });

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         try {
//           const response = await Axios.get("/api/userDetails", {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setUserData(response.data);
//         } catch (error) {
//           console.error("Failed to fetch user:", error);
//         }
//       }
//     };

//     fetchUser();
//   }, []);

//   const handlePhotoChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPhoto(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const triggerFileInput = () => {
//     document.getElementById("photoInput").click();
//   };

//   const toggleViewAll = () => {
//     setShowAllCourses(!showAllCourses);
//   };

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleProfileUpdate = async (updatedData) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await Axios.put(
//         "/api/userDetails",
//         { ...updatedData },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setUserData(response.data);
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Failed to update user:", error);
//     }
//   };

//   const isSmallScreen = useMediaQuery({ maxWidth: 425 });

//   return (
//     <div
//       className={`relative max-w-5xl min-h-screen mx-auto bg-white shadow-md rounded-lg p-10 ${
//         isSmallScreen ? "p-4" : "p-10"
//       } flex flex-col sm:flex-row`}
//     >
//       <div
//         className={`flex flex-col items-center ${
//           isSmallScreen ? "w-full mb-4" : "w-1/3 mb-0"
//         }`}
//       >
//         <div
//           className={`relative ${
//             isSmallScreen ? "w-24 h-24" : "w-32 h-32"
//           } mb-4`}
//         >
//           {photo ? (
//             <img
//               src={photo}
//               alt="Profile"
//               className="h-full w-full rounded-full object-cover"
//             />
//           ) : (
//             <img
//               src={ProfileBoy}
//               alt="Profile"
//               className="w-full h-full rounded-full"
//             />
//           )}
//           <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer">
//             <FontAwesomeIcon
//               icon={faCamera}
//               className="text-white"
//               onClick={triggerFileInput}
//             />
//           </div>
//           <input
//             type="file"
//             id="photoInput"
//             className="hidden"
//             accept="image/*"
//             onChange={handlePhotoChange}
//           />
//         </div>
//         <div className="text-center">
//           <h2
//             className={`font-semibold ${isSmallScreen ? "text-lg" : "text-xl"}`}
//           >
//             {userData.name}
//           </h2>
//         </div>
//         <button
//           className="text-blue-500 hover:underline mt-4"
//           onClick={handleEditClick}
//         >
//           <FontAwesomeIcon icon={faEdit} /> Edit
//         </button>
//         {isEditing && (
//           <EditProfile
//             userData={userData}
//             onClose={() => setIsEditing(false)}
//             onUpdate={handleProfileUpdate}
//           />
//         )}
//       </div>
//       <div className={`pl-0 ${isSmallScreen ? "w-full" : "w-2/3 pl-8"}`}>
//         <div className="mb-6">
//           <h3
//             className={`font-semibold ${isSmallScreen ? "text-base" : "text-lg"}`}
//           >
//             Personal Details
//           </h3>
//           <ul
//             className={`mt-2 text-gray-700 ${
//               isSmallScreen ? "space-y-2" : "space-y-4"
//             }`}
//           >
//             <li>
//               <strong>Email:</strong> {userData.email}
//             </li>
//             <li>
//               <strong>Region:</strong> {userData.region}
//             </li>
//           </ul>
//         </div>
//         <div className="mb-6">
//           <h3
//             className={`font-semibold ${isSmallScreen ? "text-base" : "text-lg"}`}
//           >
//             Course Details
//           </h3>
//           <ul
//             className={`mt-2 text-gray-700 ${
//               isSmallScreen ? "space-y-2" : "space-y-4"
//             }`}
//           >
//             <li>
//               <strong>No. of Courses:</strong> {userData.courses.length || 0}
//             </li>
//             <li>
//               <strong>Courses:</strong>
//               <ul>
//                 {userData.courses.length > 0 ? (
//                   userData.courses.map((course) => (
//                     <li key={course.course_id}>
//                       {course.courseDetails?.courseName || "Course name not found"}
//                     </li>
//                   ))
//                 ) : (
//                   <li>No courses enrolled</li>
//                 )}
//               </ul>
//             </li>
//           </ul>
//         </div>
//         <div>
//           <div className="flex justify-between mb-4">
//             <h3
//               className={`font-semibold ${
//                 isSmallScreen ? "text-base" : "text-lg"
//               }`}
//             >
//               Recent Courses
//             </h3>
//             <div
//               onClick={toggleViewAll}
//               className={`px-2 py-1 bg-slate-700 text-white rounded-full text-sm ${
//                 isSmallScreen ? "text-xs" : "text-sm"
//               }`}
//             >
//               {showAllCourses ? "Show Less" : "View All"}
//             </div>
//           </div>
//         </div>
//         <div
//           className={`mt-2 flex ${showAllCourses ? "flex-col" : "space-x-4"}`}
//         >
//           {userData.courses.length > 0 ? (
//             userData.courses
//               .slice(0, showAllCourses ? userData.courses.length : 2)
//               .map((course) => {
//                 const percentage =
//                   course.total_no_of_modules > 0
//                     ? (
//                         (course.no_of_modules_completed /
//                           course.total_no_of_modules) *
//                         100
//                       ).toFixed(2)
//                     : 0;

//                 return (
//                   <div
//                     key={course.course_id}
//                     className={`bg-gray-100 p-4 rounded-md ${
//                       isSmallScreen ? "w-full" : "w-1/2"
//                     } h-44 text-center shadow-xl`}
//                   >
//                     <p className="text-gray-600">
//                       {course.courseDetails?.courseName || "Course name not found"}
//                     </p>
//                     <p
//                       className={`font-semibold ${
//                         isSmallScreen ? "text-xl" : "text-2xl"
//                       }`}
//                     >
//                       {percentage}% completed
//                     </p>
//                   </div>
//                 );
//               })
//           ) : (
//             <div
//               className={`bg-gray-100 p-4 rounded-md ${
//                 isSmallScreen ? "w-full" : "w-1/2"
//               } h-44 text-center shadow-xl`}
//             >
//               <p className="text-gray-600">No recent courses enrolled</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCamera, faEdit } from "@fortawesome/free-solid-svg-icons";
// import ProfileBoy from "../../assets/Profile.webp";
// import { useAuth0 } from "@auth0/auth0-react";
// import Axios from "../../helper/Axios";
// import { useMediaQuery } from "react-responsive";

// import EditProfile from "./EditProfile";

// const Profile = () => {
//   const [photo, setPhoto] = useState(null);
//   const [showAllCourses, setShowAllCourses] = useState(false);
//   const { user, isAuthenticated, isLoading } = useAuth0();
//   const [isEditing, setIsEditing] = useState(false);
//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     region: "",
//     courses: [],
//   });

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         try {
//           const response = await Axios.get("/api/userDetails", {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setUserData(response.data);
//         } catch (error) {
//           console.error("Failed to fetch user:", error);
//         }
//       }
//     };

//     fetchUser();
//   }, []);

//   const handlePhotoChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPhoto(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const triggerFileInput = () => {
//     document.getElementById("photoInput").click();
//   };

//   const toggleViewAll = () => {
//     setShowAllCourses(!showAllCourses);
//   };

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleProfileUpdate = async (updatedData) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await Axios.put(
//         `${import.meta.env.VITE_BACKEND_BASEURL}/api/userDetails`,
//         { ...updatedData },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setUserData(response.data);
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Failed to update user:", error);
//     }
//   };

//   const isSmallScreen = useMediaQuery({ maxWidth: 425 });

//   return (
//     <div
//       className={`relative max-w-5xl min-h-screen mx-auto bg-white shadow-md rounded-lg p-10 ${
//         isSmallScreen ? "p-4" : "p-10"
//       } flex flex-col sm:flex-row`}
//     >
//       <div
//         className={`flex flex-col items-center ${
//           isSmallScreen ? "w-full mb-4" : "w-1/3 mb-0"
//         }`}
//       >
//         <div
//           className={`relative ${
//             isSmallScreen ? "w-24 h-24" : "w-32 h-32"
//           } mb-4`}
//         >
//           {photo ? (
//             <img
//               src={photo}
//               alt="Profile"
//               className="h-full w-full rounded-full object-cover"
//             />
//           ) : (
//             <img
//               src={ProfileBoy}
//               alt="Profile"
//               className="w-full h-full rounded-full"
//             />
//           )}
//           <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer">
//             <FontAwesomeIcon
//               icon={faCamera}
//               className="text-white"
//               onClick={triggerFileInput}
//             />
//           </div>
//           <input
//             type="file"
//             id="photoInput"
//             className="hidden"
//             accept="image/*"
//             onChange={handlePhotoChange}
//           />
//         </div>
//         <div className="text-center">
//           {isAuthenticated ? (
//             <h2
//               className={`font-semibold ${
//                 isSmallScreen ? "text-lg" : "text-xl"
//               }`}
//             >{`${user.name}`}</h2>
//           ) : (
//             <h2
//               className={`font-semibold ${
//                 isSmallScreen ? "text-lg" : "text-xl"
//               }`}
//             >{`${userData.name}`}</h2>
//           )}
//         </div>
//         <button
//           className="text-blue-500 hover:underline mt-4"
//           onClick={handleEditClick}
//         >
//           <FontAwesomeIcon icon={faEdit} /> Edit
//         </button>
//         {isEditing && (
//           <EditProfile
//             userData={userData}
//             onClose={() => setIsEditing(false)}
//             onUpdate={handleProfileUpdate}
//           />
//         )}
//       </div>
//       <div className={`pl-0 ${isSmallScreen ? "w-full" : "w-2/3 pl-8"}`}>
//         <div className="mb-6">
//           <h3
//             className={`font-semibold ${
//               isSmallScreen ? "text-base" : "text-lg"
//             }`}
//           >
//             Personal Details
//           </h3>
//           <ul
//             className={`mt-2 text-gray-700 ${
//               isSmallScreen ? "space-y-2" : "space-y-4"
//             }`}
//           >
//             {isAuthenticated ? (
//               <li>
//                 <strong>Email:</strong> {user.email}
//               </li>
//             ) : (
//               <li>
//                 <strong>Email:</strong> {userData.email}
//               </li>
//             )}
//             {isAuthenticated ? (
//               <li>
//                 <strong>Username:</strong> {user.given_name}
//               </li>
//             ) : (
//               <li>
//                 <strong>Region:</strong> {userData.region}
//               </li>
//             )}
//           </ul>
//         </div>
//         <div className="mb-6">
//           <h3
//             className={`font-semibold ${
//               isSmallScreen ? "text-base" : "text-lg"
//             }`}
//           >
//             Course Details
//           </h3>
//           <ul
//             className={`mt-2 text-gray-700 ${
//               isSmallScreen ? "space-y-2" : "space-y-4"
//             }`}
//           >
//             <li>
//               <strong>No. of Courses:</strong> {userData.courses.length || 0}
//             </li>
//             <li>
//               <strong>Courses:</strong>
//               <ul>
//                 {userData.courses.length > 0 ? (
//                   userData.courses.map((course) => (
//                     <li key={course.course_id}>
//                       {course.courseDetails?.courseName ||
//                         "Course name not found"}
//                     </li>
//                   ))
//                 ) : (
//                   <li>No courses enrolled</li>
//                 )}
//               </ul>
//             </li>
//           </ul>
//         </div>
//         <div>
//           <div className="flex justify-between mb-4">
//             <h3
//               className={`font-semibold ${
//                 isSmallScreen ? "text-base" : "text-lg"
//               }`}
//             >
//               Recent Courses
//             </h3>
//             <div
//               onClick={toggleViewAll}
//               className={`px-2 py-1 bg-slate-700 text-white rounded-full text-sm ${
//                 isSmallScreen ? "text-xs" : "text-sm"
//               }`}
//             >
//               {showAllCourses ? "Show Less" : "View All"}
//             </div>
//           </div>
//         </div>
//         <div
//           className={`mt-2 flex ${showAllCourses ? "flex-col" : "space-x-4"}`}
//         >
//           {userData.courses.length > 0 ? (
//             userData.courses
//               .slice(0, showAllCourses ? userData.courses.length : 2)
//               .map((course) => {
//                 const percentage =
//                   course.total_no_of_modules > 0
//                     ? (
//                         (course.no_of_modules_completed /
//                           course.total_no_of_modules) *
//                         100
//                       ).toFixed(2)
//                     : 0;

//                 return (
//                   <div
//                     key={course.course_id}
//                     className={`bg-gray-100 p-4 rounded-md ${
//                       isSmallScreen ? "w-full" : "w-1/2"
//                     } h-44 text-center shadow-xl`}
//                   >
//                     <p className="text-gray-600">
//                       {course.courseDetails?.courseName ||
//                         "Course name not found"}
//                     </p>
//                     <p
//                       className={`font-semibold ${
//                         isSmallScreen ? "text-xl" : "text-2xl"
//                       }`}
//                     >
//                       {percentage}% completed
//                     </p>
//                   </div>
//                 );
//               })
//           ) : (
//             <div
//               className={`bg-gray-100 p-4 rounded-md ${
//                 isSmallScreen ? "w-full" : "w-1/2"
//               } h-44 text-center shadow-xl`}
//             >
//               <p className="text-gray-600">No recent courses enrolled</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCamera, faEdit } from "@fortawesome/free-solid-svg-icons";
// import ProfileBoy from "../../assets/Profile.webp";
// import { useAuth0 } from "@auth0/auth0-react";
// import Axios from "../../helper/Axios";
// import { useMediaQuery } from "react-responsive";

// import EditProfile from "./EditProfile";

// const Profile = () => {
//   const [photo, setPhoto] = useState(null);
//   const [showAllCourses, setShowAllCourses] = useState(false);
//   const { user, isAuthenticated, isLoading } = useAuth0();
//   const [isEditing, setIsEditing] = useState(false);
//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     region: "",
//     courses: [],
//     hasCyberPeaceFoundation: false,
//     universityName: "",
//   });

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         try {
//           const response = await Axios.get("/api/userDetails", {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setUserData(response.data);
//         } catch (error) {
//           console.error("Failed to fetch user:", error);
//         }
//       }
//     };

//     fetchUser();
//   }, []);

//   const handlePhotoChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPhoto(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const triggerFileInput = () => {
//     document.getElementById("photoInput").click();
//   };

//   const toggleViewAll = () => {
//     setShowAllCourses(!showAllCourses);
//   };

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleProfileUpdate = async (updatedData) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await Axios.put(
//         `${import.meta.env.VITE_BACKEND_BASEURL}/api/userDetails`,
//         { ...updatedData },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setUserData(response.data);
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Failed to update user:", error);
//     }
//   };

//   const isSmallScreen = useMediaQuery({ maxWidth: 425 });

//   return (
//     <div
//       className={`relative max-w-5xl min-h-screen mx-auto bg-white shadow-md rounded-lg p-10 ${
//         isSmallScreen ? "p-4" : "p-10"
//       } flex flex-col sm:flex-row`}
//     >
//       <div
//         className={`flex flex-col items-center ${
//           isSmallScreen ? "w-full mb-4" : "w-1/3 mb-0"
//         }`}
//       >
//         <div
//           className={`relative ${
//             isSmallScreen ? "w-24 h-24" : "w-32 h-32"
//           } mb-4`}
//         >
//           {photo ? (
//             <img
//               src={photo}
//               alt="Profile"
//               className="h-full w-full rounded-full object-cover"
//             />
//           ) : (
//             <img
//               src={ProfileBoy}
//               alt="Profile"
//               className="w-full h-full rounded-full"
//             />
//           )}
//           <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer">
//             <FontAwesomeIcon
//               icon={faCamera}
//               className="text-white"
//               onClick={triggerFileInput}
//             />
//           </div>
//           <input
//             type="file"
//             id="photoInput"
//             className="hidden"
//             accept="image/*"
//             onChange={handlePhotoChange}
//           />
//         </div>
//         <div className="text-center">
//           {isAuthenticated ? (
//             <h2
//               className={`font-semibold ${
//                 isSmallScreen ? "text-lg" : "text-xl"
//               }`}
//             >{`${user.name}`}</h2>
//           ) : (
//             <h2
//               className={`font-semibold ${
//                 isSmallScreen ? "text-lg" : "text-xl"
//               }`}
//             >{`${userData.name}`}</h2>
//           )}
//         </div>
//         <button
//           className="text-blue-500 hover:underline mt-4"
//           onClick={handleEditClick}
//         >
//           <FontAwesomeIcon icon={faEdit} /> Edit
//         </button>
//         {isEditing && (
//           <EditProfile
//             userData={userData}
//             onClose={() => setIsEditing(false)}
//             onUpdate={handleProfileUpdate}
//           />
//         )}
//       </div>
//       <div className={`pl-0 ${isSmallScreen ? "w-full" : "w-2/3 pl-8"}`}>
//         <div className="mb-6">
//           <h3
//             className={`font-semibold ${
//               isSmallScreen ? "text-base" : "text-lg"
//             }`}
//           >
//             Personal Details
//           </h3>
//           <ul
//             className={`mt-2 text-gray-700 ${
//               isSmallScreen ? "space-y-2" : "space-y-4"
//             }`}
//           >
//             {isAuthenticated ? (
//               <li>
//                 <strong>Email:</strong> {user.email}
//               </li>
//             ) : (
//               <li>
//                 <strong>Email:</strong> {userData.email}
//               </li>
//             )}
//             {isAuthenticated ? (
//               <li>
//                 <strong>Username:</strong> {user.given_name}
//               </li>
//             ) : (
//               <>
//                 <li>
//                   <strong>Region:</strong> {userData.region}
//                 </li>
//                 {userData.hasCyberPeaceFoundation && (
//                   <li>
//                     <strong>University:</strong> {userData.universityName || "University name not available"}
//                   </li>
//                 )}
//               </>
//             )}
//           </ul>
//         </div>
//         <div className="mb-6">
//           <h3
//             className={`font-semibold ${
//               isSmallScreen ? "text-base" : "text-lg"
//             }`}
//           >
//             Course Details
//           </h3>
//           <ul
//             className={`mt-2 text-gray-700 ${
//               isSmallScreen ? "space-y-2" : "space-y-4"
//             }`}
//           >
//             <li>
//               <strong>No. of Courses:</strong> {userData.courses.length || 0}
//             </li>
//             <li>
//               <strong>Courses:</strong>
//               <ul>
//                 {userData.courses.length > 0 ? (
//                   userData.courses.map((course) => (
//                     <li key={course.course_id}>
//                       {course.courseDetails?.courseName ||
//                         "Course name not found"}
//                     </li>
//                   ))
//                 ) : (
//                   <li>No courses enrolled</li>
//                 )}
//               </ul>
//             </li>
//           </ul>
//         </div>
//         <div>
//           <div className="flex justify-between mb-4">
//             <h3
//               className={`font-semibold ${
//                 isSmallScreen ? "text-base" : "text-lg"
//               }`}
//             >
//               Recent Courses
//             </h3>
//             <div
//               onClick={toggleViewAll}
//               className={`px-2 py-1 bg-slate-700 text-white rounded-full text-sm ${
//                 isSmallScreen ? "text-xs" : "text-sm"
//               }`}
//             >
//               {showAllCourses ? "Show Less" : "View All"}
//             </div>
//           </div>
//         </div>
//         <div
//           className={`mt-2 flex ${showAllCourses ? "flex-col" : "space-x-4"}`}
//         >
//           {userData.courses.length > 0 ? (
//             userData.courses
//               .slice(0, showAllCourses ? userData.courses.length : 2)
//               .map((course) => {
//                 const percentage =
//                   course.total_no_of_modules > 0
//                     ? (
//                         (course.no_of_modules_completed /
//                           course.total_no_of_modules) *
//                         100
//                       ).toFixed(2)
//                     : 0;

//                 return (
//                   <div
//                     key={course.course_id}
//                     className={`bg-gray-100 p-4 rounded-md ${
//                       isSmallScreen ? "w-full" : "w-1/2"
//                     } h-44 text-center shadow-xl`}
//                   >
//                     <p className="text-gray-600">
//                       {course.courseDetails?.courseName ||
//                         "Course name not found"}
//                     </p>
//                     <p
//                       className={`font-semibold ${
//                         isSmallScreen ? "text-xl" : "text-2xl"
//                       }`}
//                     >
//                       {percentage}% completed
//                     </p>
//                   </div>
//                 );
//               })
//           ) : (
//             <div
//               className={`bg-gray-100 p-4 rounded-md ${
//                 isSmallScreen ? "w-full" : "w-1/2"
//               } h-44 text-center shadow-xl`}
//             >
//               <p className="text-gray-600">No recent courses enrolled</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faEdit } from "@fortawesome/free-solid-svg-icons";
import ProfileBoy from "../../assets/Profile.webp";
import { useAuth0 } from "@auth0/auth0-react";
import Axios from "../../helper/Axios";
import { useMediaQuery } from "react-responsive";
import EditProfile from "./EditProfile";

const Profile = () => {
  const [photo, setPhoto] = useState(null);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    region: "",
    courses: [],
    hasCyberPeaceFoundation: "No",
    universityName: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await Axios.get("/api/userDetails", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data);
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      }
    };

    fetchUser();
  }, []);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("photoInput").click();
  };

  const toggleViewAll = () => {
    setShowAllCourses(!showAllCourses);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleProfileUpdate = async (updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await Axios.put(
        `${import.meta.env.VITE_BACKEND_BASEURL}/api/userDetails`,
        { ...updatedData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const isSmallScreen = useMediaQuery({ maxWidth: 425 });

  return (
    <div
      className={`relative max-w-5xl min-h-screen mx-auto bg-white shadow-md rounded-lg p-10 ${
        isSmallScreen ? "p-4" : "p-10"
      } flex flex-col sm:flex-row`}
    >
      <div
        className={`flex flex-col items-center ${
          isSmallScreen ? "w-full mb-4" : "w-1/3 mb-0"
        }`}
      >
        <div
          className={`relative ${
            isSmallScreen ? "w-24 h-24" : "w-32 h-32"
          } mb-4`}
        >
          {photo ? (
            <img
              src={photo}
              alt="Profile"
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <img
              src={ProfileBoy}
              alt="Profile"
              className="w-full h-full rounded-full"
            />
          )}
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer">
            <FontAwesomeIcon
              icon={faCamera}
              className="text-white"
              onClick={triggerFileInput}
            />
          </div>
          <input
            type="file"
            id="photoInput"
            className="hidden"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </div>
        <div className="text-center">
          {isAuthenticated ? (
            <h2
              className={`font-semibold ${
                isSmallScreen ? "text-lg" : "text-xl"
              }`}
            >{`${user.name}`}</h2>
          ) : (
            <h2
              className={`font-semibold ${
                isSmallScreen ? "text-lg" : "text-xl"
              }`}
            >{`${userData.name}`}</h2>
          )}
        </div>
        <button
          className="text-blue-500 hover:underline mt-4"
          onClick={handleEditClick}
        >
          <FontAwesomeIcon icon={faEdit} /> Edit
        </button>
        {isEditing && (
          <EditProfile
            userData={userData}
            onClose={() => setIsEditing(false)}
            onUpdate={handleProfileUpdate}
          />
        )}
      </div>
      <div className={`pl-0 ${isSmallScreen ? "w-full" : "w-2/3 pl-8"}`}>
        <div className="mb-6">
          <h3
            className={`font-semibold ${
              isSmallScreen ? "text-base" : "text-lg"
            }`}
          >
            Personal Details
          </h3>
          <ul
            className={`mt-2 text-gray-700 ${
              isSmallScreen ? "space-y-2" : "space-y-4"
            }`}
          >
            {isAuthenticated ? (
              <li>
                <strong>Email:</strong> {user.email}
              </li>
            ) : (
              <li>
                <strong>Email:</strong> {userData.email}
              </li>
            )}
            {isAuthenticated ? (
              <li>
                <strong>Username:</strong> {user.given_name}
              </li>
            ) : (
              <>
                <li>
                  <strong>Region:</strong> {userData.region}
                </li>
                {userData.hasCyberPeaceFoundation === "Yes" && (
                  <li>
                    <strong>University:</strong> {userData.universityName || "University name not available"}
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
        <div className="mb-6">
          <h3
            className={`font-semibold ${
              isSmallScreen ? "text-base" : "text-lg"
            }`}
          >
            Course Details
          </h3>
          <ul
            className={`mt-2 text-gray-700 ${
              isSmallScreen ? "space-y-2" : "space-y-4"
            }`}
          >
            <li>
              <strong>No. of Courses:</strong> {userData.courses.length || 0}
            </li>
            <li>
              <strong>Courses:</strong>
              <ul>
                {userData.courses.length > 0 ? (
                  userData.courses.map((course) => (
                    <li key={course.course_id}>
                      {course.courseDetails?.courseName ||
                        "Course name not found"}
                    </li>
                  ))
                ) : (
                  <li>No courses enrolled</li>
                )}
              </ul>
            </li>
          </ul>
        </div>
        <div>
          <div className="flex justify-between mb-4">
            <h3
              className={`font-semibold ${
                isSmallScreen ? "text-base" : "text-lg"
              }`}
            >
              Recent Courses
            </h3>
            <div
              onClick={toggleViewAll}
              className={`px-2 py-1 bg-slate-700 text-white rounded-full text-sm ${
                isSmallScreen ? "text-xs" : "text-sm"
              }`}
            >
              {showAllCourses ? "Show Less" : "View All"}
            </div>
          </div>
        </div>
        <div
          className={`mt-2 flex ${showAllCourses ? "flex-col" : "space-x-4"}`}
        >
          {userData.courses.length > 0 ? (
            userData.courses
              .slice(0, showAllCourses ? userData.courses.length : 2)
              .map((course) => {
                const percentage =
                  course.total_no_of_modules > 0
                    ? (
                        (course.no_of_modules_completed /
                          course.total_no_of_modules) *
                        100
                      ).toFixed(2)
                    : 0;

                return (
                  <div
                    key={course.course_id}
                    className={`bg-gray-100 p-4 rounded-md ${
                      isSmallScreen ? "w-full" : "w-1/2"
                    } h-44 text-center shadow-xl`}
                  >
                    <p className="text-gray-600">
                      {course.courseDetails?.courseName ||
                        "Course name not found"}
                    </p>
                    <p
                      className={`font-semibold ${
                        isSmallScreen ? "text-xl" : "text-2xl"
                      }`}
                    >
                      {percentage}% completed
                    </p>
                  </div>
                );
              })
          ) : (
            <div
              className={`bg-gray-100 p-4 rounded-md ${
                isSmallScreen ? "w-full" : "w-1/2"
              } h-44 text-center shadow-xl`}
            >
              <p className="text-gray-600">No recent courses enrolled</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
