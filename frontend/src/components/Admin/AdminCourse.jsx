
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import CourseCard from "./CourseCard";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch, faBell, faPlus } from "@fortawesome/free-solid-svg-icons";
// import ProfileBoy from "../../assets/Profile.webp";
// import { useMediaQuery } from "react-responsive";
// import Notification from "../Users/Notification";
// import ToggleProfile from "../Users/ToggleProfile";

// const AdminCourse = () => {
//   const navigate = useNavigate();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [courses, setCourses] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);
//   const isMobile = useMediaQuery({ maxWidth: 544 });
//   const isTablet = useMediaQuery({ maxWidth: 426 });

//   const toggleProfile = () => {
//     setShowProfile(!showProfile);
//   };

//   const toggleNotifications = () => {
//     setShowNotifications(!showNotifications);
//   };

//   const closeProfile = () => {
//     setShowProfile(false);
//   };

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_BACKEND_BASEURL}/api/courses`
//         );
//         if (response.ok) {
//           const data = await response.json();
//           setCourses(data);
//         } else {
//           const errorData = await response.text();
//           console.error("Error fetching courses:", errorData);
//         }
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//       }
//     };
//     fetchCourses();
//   }, []);

//   const handleDropdownToggle = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const handleNavigate = (path) => {
//     setShowDropdown(false); // Close the dropdown when navigating
//     navigate(path);
//   };

//   return (
//     <div
//       className={`min-h-screen p-6 bg-gray-100 ${isMobile ? "p-2" : ""} ${
//         isTablet && !isMobile ? "p-4" : ""
//       }`}
//     >
//       <div
//         className={`bg-white mt-6 rounded-3xl shadow-md p-2 mb-4 ${
//           isMobile ? "p-2" : "p-4"
//         }`}
//       >
//         <div
//           className={`flex justify-between items-center flex-wrap ${
//             isMobile ? "space-y-2" : ""
//           }`}
//         >
//           <div className="flex space-x-4 text-gray-600">
//             <button className="px-4 py-2 rounded-3xl focus:outline-none focus:bg-gray-200">
//               All
//             </button>
//             <button className="px-4 py-2 rounded-3xl focus:outline-none focus:bg-gray-200">
//               Completed
//             </button>
//             <button className="px-4 py-2 rounded-3xl focus:outline-none focus:bg-gray-200">
//               Active
//             </button>
//           </div>
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2">
//               <span className="text-gray-600">Sort By:</span>
//               <select className="focus:outline-none cursor-pointer text-sm">
//                 <option>Newest</option>
//                 <option>Oldest</option>
//               </select>
//             </div>
//             <div className="flex items-center space-x-2">
//               <span className="text-gray-600">Filter:</span>
//               <select className="text-sm focus:outline-none">
//                 <option>Free</option>
//                 <option>Paid</option>
//               </select>
//             </div>
//             <div className="relative">
//               <button onClick={handleDropdownToggle}>
//                 <div className="flex items-center space-x-3 bg-green-500 px-2 py-1 text-white rounded-2xl">
//                   <span className="text-white font-medium">Add</span>
//                   <FontAwesomeIcon icon={faPlus} />
//                 </div>
//               </button>
//               {showDropdown && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
//                   <button
//                     onClick={() => handleNavigate("/upload")}
//                     className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
//                   >
//                     Upload
//                   </button>
//                   <button
//                     onClick={() => handleNavigate("/secure-upload")}
//                     className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
//                   >
//                     Secure Upload
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div>
//         <h1 className="text-2xl font-bold mb-4">Courses</h1>
//         <div
//           className={`grid ${
//             isMobile
//               ? "grid-cols-1"
//               : isTablet
//               ? "grid-cols-2"
//               : "grid-cols-3 lg:grid-cols-4"
//           } gap-4`}
//         >
//           {courses.map((course) => (
//             <CourseCard key={course._id} course={course} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminCourse;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CourseCard from "./CourseCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";

const AdminCourse = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [courses, setCourses] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 426 });
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

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_BASEURL}/api/courses`
        );
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        } else {
          const errorData = await response.text();
          console.error("Error fetching courses:", errorData);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleNavigate = (path) => {
    setShowDropdown(false); // Close the dropdown when navigating
    navigate(path);
  };

  return (
    <div className={`${isMobile ? "p-3" : "p-6"} bg-gray-100 min-h-screen`}>
      <div className={`bg-white mt-4 rounded-3xl shadow-md ${isMobile ? "p-3" : "p-4"} mb-4`}>
        <div className={`flex ${isMobile ? "flex-col space-y-3" : "justify-between"} items-center`}>
          <div className={`flex ${isTablet ? "py-1 px-2 text-sm space-x-5" : "p-3 space-x-10"} text-gray-600`}>
            <button className="px-4 py-2 rounded-3xl focus:outline-none focus:bg-gray-200">
              All
            </button>
            <button className="px-4 py-2 rounded-3xl focus:outline-none focus:bg-gray-200">
              Completed
            </button>
            <button className="px-4 py-2 rounded-3xl focus:outline-none focus:bg-gray-200">
              Active
            </button>
          </div>
          <div className={`flex ${isMobile ? "flex-col space-y-2" : "space-x-4"} items-center`}>
            <div className={`flex items-center space-x-2 ${isMobile ? "text-sm" : ""}`}>
              <span className="text-gray-600">Sort By:</span>
              <select className="focus:outline-none cursor-pointer text-sm">
                <option>Newest</option>
                <option>Oldest</option>
              </select>
            </div>
            <div className={`flex items-center space-x-2 ${isMobile ? "text-sm" : ""}`}>
              <span className="text-gray-600">Filter:</span>
              <select className="text-sm focus:outline-none">
                <option>Free</option>
                <option>Paid</option>
              </select>
            </div>
            <div className="relative">
              <button onClick={handleDropdownToggle} className="w-full">
                <div className={`flex items-center justify-center space-x-2 bg-green-500 px-4 py-2 text-white rounded-2xl ${isMobile ? "text-sm" : "text-base"}`}>
                  <span className="font-medium">Add</span>
                  <FontAwesomeIcon icon={faPlus} />
                </div>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                  <button
                    onClick={() => handleNavigate("/upload")}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Upload
                  </button>
                  <button
                    onClick={() => handleNavigate("/secure-upload")}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Secure Upload
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className={`text-2xl font-bold mb-4 ${isMobile ? "text-lg" : ""}`}>Courses</h1>
        <div className={`grid ${isMobile ? "grid-cols-1 gap-4" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"}`}>
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCourse;
