// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faReply,
//   faPlus,
//   faPaperPlane,
// } from "@fortawesome/free-solid-svg-icons";
// import image01 from "../../assets/Discussion_Ellipse2.png";
// import { useMediaQuery } from "react-responsive";
// import Axios from "axios";

// const DiscussionEntry = () => {
//   const [showNewConversation, setShowNewConversation] = useState(false);
//   const [newConversationText, setNewConversationText] = useState("");
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState("");
//   const [userId, setUserId] = useState(null);
//   const isTablet = useMediaQuery({ maxWidth: 544 });
//   const isMobile = useMediaQuery({ maxWidth: 426 });
//   const [user, setUser] = useState(null);
//   useEffect(() => {
//     // Fetch the list of available courses from the API
//     const fetchCourses = async () => {
//       try {
//         const response = await Axios.get(
//           `${import.meta.env.VITE_BACKEND_BASEURL}/api/courses`
//         );
//         setCourses(response.data);
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//       }
//     };

//     fetchCourses();

//     // Fetch user details to get userId
//     const fetchUserData = async () => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         try {
//           const response = await Axios.get(
//             `${import.meta.env.VITE_BACKEND_BASEURL}/api/userData`,
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );
//           console.log(response);
//           setUser(response.data);
//           setUserId(response.data._id);
//         } catch (error) {
//           console.error("Error fetching user details:", error);
//         }
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleNewConversation = () => {
//     setShowNewConversation(!showNewConversation);
//   };

//   const handleNewConversationTextChange = (e) => {
//     setNewConversationText(e.target.value);
//   };

//   const handleCourseChange = (e) => {
//     setSelectedCourse(e.target.value);
//   };

//   const handlePostNewConversation = async () => {
//     // Handle posting the new conversation
//     if (!userId || !selectedCourse || !newConversationText) {
//       alert("Please select a course and enter conversation text");
//       return;
//     }

//     console.log(
//       "Posting conversation with:",
//       userId,
//       selectedCourse,
//       newConversationText
//     );

//     const token = localStorage.getItem("token");
//     try {
//       const response = await Axios.post(
//         `${import.meta.env.VITE_BACKEND_BASEURL}/api/comments`,
//         {
//           courseid: selectedCourse,
//           userid: userId,
//           text: newConversationText,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.status === 201) {
//         alert("Conversation saved successfully");
//         setNewConversationText("");
//         setSelectedCourse("");
//         setShowNewConversation(false);
//         // Optionally, you can refresh the list of conversations here
//       }
//     } catch (error) {
//       console.error("Error saving conversation:", error);
//       if (error.response) {
//         console.error("Response data:", error.response.data);
//       }
//       alert("Failed to save conversation. Please try again.");
//     }
//   };

//   const entries = [
//     {
//       id: 1,
//       name: "Andrew Smith",
//       date: "11 July, 2024",
//       content: "Here's a sample entry for the discussion platform",
//     },
//     {
//       id: 2,
//       name: "Andrew Smith",
//       date: "11 July, 2024",
//       content: "Here's a sample entry for the discussion platform",
//     },
//     {
//       id: 3,
//       name: "Andrew Smith",
//       date: "11 July, 2024",
//       content: "Here's a sample entry for the discussion platform",
//     },
//     {
//       id: 4,
//       name: "Andrew Smith",
//       date: "11 July, 2024",
//       content: "Here's a sample entry for the discussion platform",
//     },
//   ];

//   return (
//     <div className={`${isMobile ? "p-3" : "p-6"}`}>
//       <div
//         className={`flex justify-between mt-4 mb-4 ${
//           isMobile ? "flex-col space-y-3" : ""
//         }`}
//       >
//         <div
//           className={`flex bg-white rounded-full ${
//             isTablet ? "py-1 px-2 text-sm space-x-5" : "p-3 space-x-10"
//           }`}
//         >
//           <button className="text-gray-600 ml-1">Recent</button>
//           <button className="text-gray-600">Popular</button>
//           <button className="text-gray-600 mr-1">Last Reply</button>
//         </div>

//         <div
//           className={`flex bg-white rounded-full ${
//             isTablet ? "py-1 px-2 text-sm" : "p-3"
//           }`}
//         >
//           <button className="text-gray-600">By Category:</button>
//           <select className="text-sm focus:outline-none">
//             <option>General</option>
//             <option>Security</option>
//             <option>Privacy</option>
//           </select>
//         </div>
//       </div>

//       <div className="flex justify-end mb-4">
//         <button
//           onClick={handleNewConversation}
//           className={`flex items-center ${
//             isMobile
//               ? "text-blue-500"
//               : "px-4 py-2 bg-blue-500 text-white rounded-full"
//           }`}
//         >
//           <FontAwesomeIcon icon={faPlus} className="mr-2" /> Start a New
//           Conversation
//         </button>
//       </div>

//       {showNewConversation && (
//         <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
//           <div className="mb-2">
//             <label
//               htmlFor="course-select"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Select Course
//             </label>
//             <select
//               id="course-select"
//               value={selectedCourse}
//               onChange={handleCourseChange}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
//             >
//               <option value="">Select a course</option>
//               {courses.map((course) => (
//                 <option key={course._id} value={course._id}>
//                   {course.courseName}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <textarea
//             value={newConversationText}
//             onChange={handleNewConversationTextChange}
//             className="w-full p-2 border rounded-lg focus:outline-none"
//             rows="4"
//             placeholder="Type your conversation here..."
//           ></textarea>
//           <div className="flex justify-end mt-2">
//             <button
//               onClick={handlePostNewConversation}
//               className="px-4 py-2 bg-blue-500 text-white rounded-full"
//             >
//               <FontAwesomeIcon icon={faPaperPlane} className="mr-2" /> Post
//             </button>
//           </div>
//         </div>
//       )}

//       {entries.map((entry) => (
//         <div
//           key={entry.id}
//           className={`flex bg-blue-50 p-4 rounded-lg mb-4 ${
//             isMobile ? "text-sm" : ""
//           }`}
//         >
//           <img
//             src={image01}
//             alt={entry.name}
//             className={`rounded-full mr-4 ${
//               isMobile ? "w-6 h-6" : "w-12 h-12"
//             }`}
//           />
//           <div className="flex-1">
//             <h2 className={`font-semibold ${isMobile ? "text-sm" : "text-lg"}`}>
//               {entry.name}
//             </h2>
//             <p className={`${isMobile ? "text-xs" : ""}`}>{entry.content}</p>
//           </div>
//           <div className="flex flex-col items-end">
//             <span
//               className={`text-gray-500 ${isMobile ? "text-xs" : "text-sm"}`}
//             >
//               {entry.date}
//             </span>
//             <button
//               className={`mt-2 ${
//                 isMobile
//                   ? "text-blue-500"
//                   : "px-4 py-2 bg-blue-500 text-white rounded-full"
//               }`}
//             >
//               <FontAwesomeIcon icon={faReply} /> Reply
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DiscussionEntry;

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faPlus, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import image01 from "../../assets/Discussion_Ellipse2.png";
import { useMediaQuery } from "react-responsive";
import Axios from "axios";

const DiscussionEntry = () => {
  const [showNewConversation, setShowNewConversation] = useState(false);
  const [newConversationText, setNewConversationText] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [userId, setUserId] = useState(null);
  const isTablet = useMediaQuery({ maxWidth: 544 });
  const isMobile = useMediaQuery({ maxWidth: 426 });
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await Axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/courses`);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await Axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/userData`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
          setUserId(response.data._id);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    const fetchDiscussionEntries = async () => {
      try {
        const response = await Axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/comments`);
        setEntries(response.data);
      } catch (error) {
        console.error("Error fetching discussion entries:", error);
      }
    };

    fetchCourses();
    fetchUserData();
    fetchDiscussionEntries();
  }, []);

  const handleNewConversation = () => {
    setShowNewConversation(!showNewConversation);
  };

  const handleNewConversationTextChange = (e) => {
    setNewConversationText(e.target.value);
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handlePostNewConversation = async () => {
    if (!userId || !selectedCourse || !newConversationText) {
      alert("Please select a course and enter conversation text");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await Axios.post(
        `${import.meta.env.VITE_BACKEND_BASEURL}/api/comments`,
        {
          courseid: selectedCourse,
          userid: userId,
          text: newConversationText,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        alert("Conversation saved successfully");
        setNewConversationText("");
        setSelectedCourse("");
        setShowNewConversation(false);
        // Refresh the list of conversations here if needed
      }
    } catch (error) {
      console.error("Error saving conversation:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
      alert("Failed to save conversation. Please try again.");
    }
  };

  return (
    <div className={`${isMobile ? "p-3" : "p-6"}`}>
      <div className={`flex justify-between mt-4 mb-4 ${isMobile ? "flex-col space-y-3" : ""}`}>
        <div className={`flex bg-white rounded-full ${isTablet ? "py-1 px-2 text-sm space-x-5" : "p-3 space-x-10"}`}>
          <button className="text-gray-600 ml-1">Recent</button>
          <button className="text-gray-600">Popular</button>
          <button className="text-gray-600 mr-1">Last Reply</button>
        </div>

        <div className={`flex bg-white rounded-full ${isTablet ? "py-1 px-2 text-sm" : "p-3"}`}>
          <button className="text-gray-600">By Category:</button>
          <select className="text-sm focus:outline-none">
            <option>General</option>
            <option>Security</option>
            <option>Privacy</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleNewConversation}
          className={`flex items-center ${isMobile ? "text-blue-500" : "px-4 py-2 bg-blue-500 text-white rounded-full"}`}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" /> {showNewConversation ? "Close" : "Start a New Conversation"}
        </button>
      </div>

      {showNewConversation && (
        <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
          <div className="mb-2">
            <label htmlFor="course-select" className="block text-sm font-medium text-gray-700">
              Select Course
            </label>
            <select
              id="course-select"
              value={selectedCourse}
              onChange={handleCourseChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>
          <textarea
            value={newConversationText}
            onChange={handleNewConversationTextChange}
            className="w-full p-2 border rounded-lg focus:outline-none"
            rows="4"
            placeholder="Type your conversation here..."
          ></textarea>
          <div className="flex justify-end mt-2">
            <button onClick={handlePostNewConversation} className="px-4 py-2 bg-blue-500 text-white rounded-full">
              <FontAwesomeIcon icon={faPaperPlane} className="mr-2" /> Post
            </button>
          </div>
        </div>
      )}

      {entries.map((entry) => (
        <div key={entry._id} className={`flex items-start bg-white p-3 mt-4 ${isMobile ? "flex-col" : ""}`}>
          <img src={image01} alt="User" className={`rounded-full ${isMobile ? "w-8 h-8" : "w-14 h-14"}`} />
          <div className={`ml-4 ${isMobile ? "mt-2" : ""}`}>
            <h2 className={`font-semibold ${isMobile ? "text-sm" : "text-lg"}`}>
              {entry.userid ? entry.userid.name : "Unknown"}
            </h2>
            <p className={`${isMobile ? "text-xs" : ""}`}>{entry.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiscussionEntry;
