// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faStar,
//   faUser,
//   faBell,
//   faSearch,
//   faUsers,
//   faFileAlt,
//   faVideo,
//   faClock,
//   faTools,
//   faDesktop,
//   faShieldAlt,
//   faShieldVirus,
//   faNetworkWired,
//   faKey,
// } from "@fortawesome/free-solid-svg-icons";
// import image01 from "../../../assets/01.jpg";
// import WeekContent from "./WeekContent";
// import ProfileBoy from "../../../assets/Profile.webp";
// import Notification from "../Notification";
// import { useLocation } from "react-router-dom";
// import { useAuth } from "../../../auth/AuthProvider";
// import axios from 'axios'
// const enrollInCourse = async (courseId, token) => {
//   try {
//     const sendingData = { courseId };
//     const axiosConfig = {
//       url: "http://localhost:5000/api/enroll",
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       data: JSON.stringify(sendingData),
//     };

//     const response = await axios(axiosConfig);
//     const data = await response.data;

//     return data;
//   } catch (error) {
//     console.error("Error enrolling in course", error);
//     throw error;
//   }
// };
// const CoursePage = () => {
//   const [isEnrolled, setIsEnrolled] = useState(false);
//   const [showNotifications, setShowNotifications] = useState(false);
 
//   const { auth } = useAuth();

//   const handleEnroll = async () => {
//     if (!auth.isAuthenticated || !auth.token) {
//       console.error("No authentication token available. Please log in.");
//       navigate('/login');
//       return;
//     }

//     if (!course || !course._id) {
//       console.error("Course ID is not available");
//       return;
//     }

//     try {
//       const data = await enrollInCourse(course._id, auth.token);
//       console.log("Enrolled successfully:", data);
//       setIsEnrolled(true);
//     } catch (error) {
//       console.error("Failed to enroll:", error);
//     }
//   };

//   const handleNotification = () => {
//     setShowNotifications(!showNotifications);
//   };

//   const location = useLocation();

//   const { course } = location.state || {}; // Default to an empty object if state is undefined

//   const weekContent = course.content;

//   if (!course) {
//     return <div>No course data available</div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-gray-100">
//       <div className="flex justify-center pb-9">
//         <div className=" bg-white px-2 rounded-3xl py-2 w-4/5 flex items-center justify-between absolute top-11 shadow-xl">
//           <div className="flex items-center bg-slate-200 rounded-full px-4 py-2 w-full max-w-md ">
//             <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
//             <input
//               type="text"
//               placeholder="Search"
//               className="w-full bg-transparent focus:outline-none"
//             />
//           </div>
//           <div className="flex items-center space-x-10 mr-10">
//             <Link onClick={handleNotification}>
//               <FontAwesomeIcon
//                 icon={faBell}
//                 className="text-gray-700 text-3xl"
//               />
//             </Link>
//             <Link to="/profile">
//               <img
//                 src={ProfileBoy} // Placeholder image
//                 alt="Profile"
//                 className="w-10 h-10 rounded-full"
//               />
//             </Link>
//           </div>
//           {showNotifications && <Notification />}
//         </div>
//       </div>
//       <div className="flex flex-col gap-2 md:flex-row justify-between h-full">
//         <div className="w-2/3">
//           <div className="flex flex-col justify-between items-start md:items-center bg-white p-6 rounded-lg shadow-md">
//             <div className="md:flex-1">
//               <div className="flex items-center space-x-2 mb-2">
//                 <div className=" space-x-2 py-1 px-2 bg-yellow-300 rounded-3xl text-sm">
//                   <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
//                   <a href="#" className="text-yellow-500">
//                     4.6
//                   </a>
//                 </div>
//                 <div className=" text-sm">based on</div>
//                 <div className=" underline cursor-pointer text-blue-400">
//                   10 review
//                 </div>
//               </div>
//               <h1 className="text-3xl font-bold text-gray-800">
//                 {course.courseName}
//               </h1>
//               <div className="flex items-center mt-2 space-x-2">
//                 <span className="px-2 py-1 bg-yellow-300 text-yellow-800 rounded">
//                   Medium
//                 </span>
//                 <span className="px-2 py-1 bg-gray-300 text-gray-800 rounded">
//                   <FontAwesomeIcon icon={faTools} className="mr-2" />
//                   Kali Linux
//                 </span>
//               </div>
//               <p className="mt-4 text-gray-600">
//                 {course.description} adipiscing elit, sed do eiusmod tempor
//                 incididunt ut labore et dolore magna aliqua. Ut enim ad minim ve
//               </p>
//               <div className="flex items-center space-x-2 mt-4">
//                 <FontAwesomeIcon icon={faUser} className="text-gray-500" />
//                 <span className="text-gray-500">{course.trainerName}</span>
//                 <span className="text-gray-500"> </span>
//                 <FontAwesomeIcon icon={faUsers} className="text-gray-500" />
//                 <span className="text-gray-500">100+ students enrolled</span>
//               </div>
//             </div>
//           </div>
//           <div className="mt-6 bg-white p-6 w-full rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">
//               Course Content
//             </h2>
//             <div className="flex items-center space-x-4 text-gray-600 mb-4">
//               <div className="flex items-center space-x-2">
//                 <FontAwesomeIcon icon={faFileAlt} className="text-gray-500" />
//                 <span>21 sections</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <FontAwesomeIcon icon={faVideo} className="text-gray-500" />
//                 <span>100 lectures</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <FontAwesomeIcon icon={faClock} className="text-gray-500" />
//                 <span>72 hours</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <FontAwesomeIcon icon={faDesktop} className="text-gray-500" />
//                 <span>10 labs</span>
//               </div>
//             </div>
//             <div className="space-y-4">
//               {weekContent.map((content, i) => (
//                 <WeekContent
//                   key={i}
//                   weekTitle={content.title}
//                   content={content.submodules}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="mt-6 md:mt-0 md:ml-6 bg-white p-6 w-5/6 md:w-1/3 rounded-lg shadow-md">
//           <img
//             src={course.imgUrl}
//             alt="Enrollment card"
//             className="rounded-lg"
//           />
//           {isEnrolled ? (
//             <>
//               <Link
//                 to="/course/coursePage/coursePreview"
//                 state={{ course: course }}
//               >
//                 <button className="w-full bg-blue-500 text-white py-2 rounded mt-4">
//                   Preview
//                 </button>
//               </Link>
//               <div className="mt-4 text-green-600 text-center font-semibold">
//                 Enrolled Successfully
//               </div>
//             </>
//           ) : (
//             <button
//               onClick={handleEnroll}
//               className="w-full bg-blue-500 text-white py-2 rounded mt-4"
//             >
//               Enroll Now
//             </button>
//           )}
//           <div className="mt-4">
//             <h2 className="text-xl font-semibold text-gray-800">
//               This course includes
//             </h2>
//             <div className="space-y-2 text-gray-600 mt-2">
//               <div>
//                 <FontAwesomeIcon icon={faShieldAlt} className="mr-3" />
//                 Cybersecurity Fundamentals
//               </div>
//               <div>
//                 <FontAwesomeIcon icon={faShieldVirus} className="mr-3" />
//                 Malware Types
//               </div>
//               <div>
//                 <FontAwesomeIcon icon={faNetworkWired} className="mr-3" />
//                 Network Security Basics
//               </div>
//               <div>
//                 <FontAwesomeIcon icon={faKey} className="mr-3" />
//                 Authentication & Authorization
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CoursePage;

// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faStar,
//   faUser,
//   faBell,
//   faSearch,
//   faUsers,
//   faFileAlt,
//   faVideo,
//   faClock,
//   faTools,
//   faDesktop,
//   faShieldAlt,
//   faShieldVirus,
//   faNetworkWired,
//   faKey,
// } from "@fortawesome/free-solid-svg-icons";
// import WeekContent from "./WeekContent";
// import ProfileBoy from "../../../assets/Profile.webp";
// import Notification from "../Notification";
// import { useAuth } from "../../../auth/AuthProvider";

// const enrollInCourse = async (courseId, token) => {
//   try {
//     const sendingData = { courseId };
//     const axiosConfig = {
//       url: "http://localhost:5000/api/enroll",
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       data: JSON.stringify(sendingData),
//     };

//     const response = await axios(axiosConfig);
//     return response.data;
//   } catch (error) {
//     console.error("Error enrolling in course", error);
//     throw error;
//   }
// };

// const CoursePage = () => {
//   const [isEnrolled, setIsEnrolled] = useState(false);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const { auth } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { course } = location.state || {};

//   useEffect(() => {
//     if (!course) {
//       console.error("No course data available");
//       navigate('/courses'); // Redirect to courses page if no course data
//     }
//   }, [course, navigate]);

  // const handleEnroll = async () => {
  //   if (!auth.isAuthenticated || !auth.token) {
  //     console.error("No authentication token available. Please log in.");
  //     navigate('/login');
  //     return;
  //   }

  //   if (!course || !course._id) {
  //     console.error("Course ID is not available");
  //     return;
  //   }

  //   try {
  //     const data = await enrollInCourse(course._id, auth.token);
  //     console.log("Enrolled successfully:", data);
  //     setIsEnrolled(true);
  //   } catch (error) {
  //     console.error("Failed to enroll:", error);
  //   }
  // };

//   const handleNotification = () => {
//     setShowNotifications(!showNotifications);
//   };

//   if (!course) {
//     return <div>Loading...</div>;
//   }

//   const weekContent = course.content || [];

//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-gray-100">
//       <div className="flex justify-center pb-9">
//         <div className="bg-white px-2 rounded-3xl py-2 w-4/5 flex items-center justify-between absolute top-11 shadow-xl">
//           <div className="flex items-center bg-slate-200 rounded-full px-4 py-2 w-full max-w-md">
//             <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
//             <input
//               type="text"
//               placeholder="Search"
//               className="w-full bg-transparent focus:outline-none"
//             />
//           </div>
//           <div className="flex items-center space-x-10 mr-10">
//             <Link onClick={handleNotification}>
//               <FontAwesomeIcon
//                 icon={faBell}
//                 className="text-gray-700 text-3xl"
//               />
//             </Link>
//             <Link to="/profile">
//               <img
//                 src={ProfileBoy}
//                 alt="Profile"
//                 className="w-10 h-10 rounded-full"
//               />
//             </Link>
//           </div>
//           {showNotifications && <Notification />}
//         </div>
//       </div>
//       <div className="flex flex-col gap-2 md:flex-row justify-between h-full">
//         <div className="w-2/3">
//           <div className="flex flex-col justify-between items-start md:items-center bg-white p-6 rounded-lg shadow-md">
//             <div className="md:flex-1">
//               <div className="flex items-center space-x-2 mb-2">
//                 <div className="space-x-2 py-1 px-2 bg-yellow-300 rounded-3xl text-sm">
//                   <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
//                   <a href="#" className="text-yellow-500">
//                     4.6
//                   </a>
//                 </div>
//                 <div className="text-sm">based on</div>
//                 <div className="underline cursor-pointer text-blue-400">
//                   10 reviews
//                 </div>
//               </div>
//               <h1 className="text-3xl font-bold text-gray-800">
//                 {course.courseName}
//               </h1>
//               <div className="flex items-center mt-2 space-x-2">
//                 <span className="px-2 py-1 bg-yellow-300 text-yellow-800 rounded">
//                   Medium
//                 </span>
//                 <span className="px-2 py-1 bg-gray-300 text-gray-800 rounded">
//                   <FontAwesomeIcon icon={faTools} className="mr-2" />
//                   Kali Linux
//                 </span>
//               </div>
//               <p className="mt-4 text-gray-600">
//                 {course.description}
//               </p>
//               <div className="flex items-center space-x-2 mt-4">
//                 <FontAwesomeIcon icon={faUser} className="text-gray-500" />
//                 <span className="text-gray-500">{course.trainerName}</span>
//                 <span className="text-gray-500"> </span>
//                 <FontAwesomeIcon icon={faUsers} className="text-gray-500" />
//                 <span className="text-gray-500">100+ students enrolled</span>
//               </div>
//             </div>
//           </div>
//           <div className="mt-6 bg-white p-6 w-full rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">
//               Course Content
//             </h2>
//             <div className="flex items-center space-x-4 text-gray-600 mb-4">
//               <div className="flex items-center space-x-2">
//                 <FontAwesomeIcon icon={faFileAlt} className="text-gray-500" />
//                 <span>21 sections</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <FontAwesomeIcon icon={faVideo} className="text-gray-500" />
//                 <span>100 lectures</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <FontAwesomeIcon icon={faClock} className="text-gray-500" />
//                 <span>72 hours</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <FontAwesomeIcon icon={faDesktop} className="text-gray-500" />
//                 <span>10 labs</span>
//               </div>
//             </div>
//             <div className="space-y-4">
//               {weekContent.map((content, i) => (
//                 <WeekContent
//                   key={i}
//                   weekTitle={content.title}
//                   content={content.submodules}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="mt-6 md:mt-0 md:ml-6 bg-white p-6 w-5/6 md:w-1/3 rounded-lg shadow-md">
//           <img
//             src={course.imgUrl}
//             alt="Enrollment card"
//             className="rounded-lg"
//           />
//           {!isEnrolled ? (
//             <button
//               onClick={handleEnroll}
//               className="w-full bg-blue-500 text-white py-2 rounded mt-4"
//             >
//               Enroll Now
//             </button>
//           ) : (
//             <>
//               <Link
//                 to="/course/coursePage/coursePreview"
//                 state={{ course: course }}
//               >
//                 <button className="w-full bg-blue-500 text-white py-2 rounded mt-4">
//                   Preview
//                 </button>
//               </Link>
//               <div className="mt-4 text-green-600 text-center font-semibold">
//                 Enrolled Successfully
//               </div>
//             </>
//           )}
//           <div className="mt-4">
//             <h2 className="text-xl font-semibold text-gray-800">
//               This course includes
//             </h2>
//             <div className="space-y-2 text-gray-600 mt-2">
//               <div>
//                 <FontAwesomeIcon icon={faShieldAlt} className="mr-3" />
//                 Cybersecurity Fundamentals
//               </div>
//               <div>
//                 <FontAwesomeIcon icon={faShieldVirus} className="mr-3" />
//                 Malware Types
//               </div>
//               <div>
//                 <FontAwesomeIcon icon={faNetworkWired} className="mr-3" />
//                 Network Security Basics
//               </div>
//               <div>
//                 <FontAwesomeIcon icon={faKey} className="mr-3" />
//                 Authentication & Authorization
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CoursePage;

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faUser,
  faBell,
  faSearch,
  faUsers,
  faFileAlt,
  faVideo,
  faClock,
  faTools,
  faDesktop,
  faShieldAlt,
  faShieldVirus,
  faNetworkWired,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import WeekContent from "./WeekContent";
import ProfileBoy from "../../../assets/Profile.webp";
import Notification from "../Notification";
import { useAuth } from "../../../auth/AuthProvider";

const CoursePage = () => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state || {};

  useEffect(() => {
    if (!course) {
      console.error("No course data available");
      navigate('/courses'); // Redirect to courses page if no course data
      return;
    }

    const checkEnrollmentStatus = async () => {
      if (auth.isAuthenticated && auth.token && course && course._id) {
        try {
          console.log('Checking enrollment for course:', course._id);
          const response = await axios.get(
            `http://localhost:5000/api/check-enrollment/${course._id}`,
            {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            }
          );
          console.log('Enrollment response:', response.data);
          setIsEnrolled(response.data.isEnrolled);
        } catch (error) {
          console.error('Failed to fetch enrollment status:', error);
          if (error.response) {
            console.error('Error response:', error.response.data);
            console.error('Error status:', error.response.status);
          } else if (error.request) {
            console.error('No response received:', error.request);
          } else {
            console.error('Error setting up request:', error.message);
          }
        }
      } else {
        console.log('Not checking enrollment:', { auth, course });
      }
    };

    checkEnrollmentStatus();
  }, [auth, course, navigate]);

  const handleEnroll = async () => {
    if (!auth.isAuthenticated || !auth.token) {
      console.error("No authentication token available. Please log in.");
      navigate('/login');
      return;
    }

    if (!course || !course._id) {
      console.error("Course ID is not available");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/enroll",
        { courseId: course._id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      console.log("Enrolled successfully:", response.data);
      setIsEnrolled(true);
    } catch (error) {
      console.error("Failed to enroll:", error);
    }
  };

  const handleNotification = () => {
    setShowNotifications(!showNotifications);
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  const weekContent = course.content || [];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 mt-10">
      <div className="flex justify-center pb-9">
        <div className="bg-white px-2 rounded-3xl py-2 w-4/5 flex items-center justify-between absolute top-11 shadow-xl">
          <div className="flex items-center bg-slate-200 rounded-full px-4 py-2 w-full max-w-md">
            <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent focus:outline-none"
            />
          </div>
          <div className="flex items-center space-x-10 mr-10">
            <Link onClick={handleNotification}>
              <FontAwesomeIcon
                icon={faBell}
                className="text-gray-700 text-3xl"
              />
            </Link>
            <Link to="/profile">
              <img
                src={ProfileBoy}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            </Link>
          </div>
          {showNotifications && <Notification />}
        </div>
      </div>
      <div className="flex flex-col gap-2 md:flex-row justify-between h-full">
        <div className="w-2/3">
          <div className="flex flex-col justify-between items-start md:items-center bg-white p-6 rounded-lg shadow-md">
            <div className="md:flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <div className="space-x-2 py-1 px-2 bg-yellow-300 rounded-3xl text-sm">
                  <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                  <a href="#" className="text-yellow-500">
                    4.6
                  </a>
                </div>
                <div className="text-sm">based on</div>
                <div className="underline cursor-pointer text-blue-400">
                  10 reviews
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-800">
                {course.courseName}
              </h1>
              <div className="flex items-center mt-2 space-x-2">
                <span className="px-2 py-1 bg-yellow-300 text-yellow-800 rounded">
                  Medium
                </span>
                <span className="px-2 py-1 bg-gray-300 text-gray-800 rounded">
                  <FontAwesomeIcon icon={faTools} className="mr-2" />
                  Kali Linux
                </span>
              </div>
              <p className="mt-4 text-gray-600">
                {course.description}
              </p>
              <div className="flex items-center space-x-2 mt-4">
                <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                <span className="text-gray-500">{course.trainerName}</span>
                <span className="text-gray-500"> </span>
                <FontAwesomeIcon icon={faUsers} className="text-gray-500" />
                <span className="text-gray-500">100+ students enrolled</span>
              </div>
            </div>
          </div>
          <div className="mt-6 bg-white p-6 w-full rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Course Content
            </h2>
            <div className="flex items-center space-x-4 text-gray-600 mb-4">
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faFileAlt} className="text-gray-500" />
                <span>21 sections</span>
              </div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faVideo} className="text-gray-500" />
                <span>100 lectures</span>
              </div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faClock} className="text-gray-500" />
                <span>72 hours</span>
              </div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faDesktop} className="text-gray-500" />
                <span>10 labs</span>
              </div>
            </div>
            <div className="space-y-4">
              {weekContent.map((content, i) => (
                <WeekContent
                  key={i}
                  weekTitle={content.title}
                  content={content.submodules}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 md:mt-0 md:ml-6 bg-white p-6 w-5/6 md:w-1/3 rounded-lg shadow-md">
          <img
            src={course.imgUrl}
            alt="Enrollment card"
            className="rounded-lg"
          />
          {!isEnrolled ? (
            <button
              onClick={handleEnroll}
              className="w-full bg-blue-500 text-white py-2 rounded mt-4"
            >
              Enroll Now
            </button>
          ) : (
            <>
              <Link
                to="/course/coursePage/coursePreview"
                state={{ course: course }}
              >
                <button className="w-full bg-blue-500 text-white py-2 rounded mt-4">
                  Preview
                </button>
              </Link>
              <div className="mt-4 text-green-600 text-center font-semibold">
                Enrolled Successfully
              </div>
            </>
          )}
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-gray-800">
              This course includes
            </h2>
            <div className="space-y-2 text-gray-600 mt-2">
              <div>
                <FontAwesomeIcon icon={faShieldAlt} className="mr-3" />
                Cybersecurity Fundamentals
              </div>
              <div>
                <FontAwesomeIcon icon={faShieldVirus} className="mr-3" />
                Malware Types
              </div>
              <div>
                <FontAwesomeIcon icon={faNetworkWired} className="mr-3" />
                Network Security Basics
              </div>
              <div>
                <FontAwesomeIcon icon={faKey} className="mr-3" />
                Authentication & Authorization
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;