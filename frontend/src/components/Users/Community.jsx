
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faPlus, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import image01 from "../../assets/Discussion_Ellipse2.png";
import { useMediaQuery } from 'react-responsive';
import axios from 'axios'; // Assuming you use axios for API calls

const DiscussionEntry = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showNewConversation, setShowNewConversation] = useState(false);
    const [newConversationText, setNewConversationText] = useState('');
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const isTablet = useMediaQuery({ maxWidth: 544 });
    const isMobile = useMediaQuery({ maxWidth: 426 });

    useEffect(() => {
        // Fetch the list of available courses from the API
        axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/courses`) // Update with your API endpoint
            .then(response => {
                console.log(response.data);
                setCourses(response.data);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    }, []);
    const [userData, setUserData] = useState({
        courses: [],
      });
    
      useEffect(() => {
        const fetchUser = async () => {
          const token = localStorage.getItem("token");
          console.log(token);
          if (token) {
            try {
              const response = await axios.get("/api/userDetails", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              setUserData(response.data);
              console.log(response.data);
            } catch (error) {
              console.error("Failed to fetch user:", error);
            }
          }
        };
    
        fetchUser();
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

    const handlePostNewConversation = () => {
        // Handle posting the new conversation
        console.log("New Conversation Posted:", { text: newConversationText, course: selectedCourse });
        setNewConversationText('');
        setSelectedCourse('');
        setShowNewConversation(false);
    };

    const entries = [
        {
            id: 1,
            name: 'Andrew Smith',
            date: '11 July, 2024',
            content: "Here's a sample entry for the discussion platform",
            avatar: 'https://via.placeholder.com/50'
        },
        {
            id: 2,
            name: 'Andrew Smith',
            date: '11 July, 2024',
            content: "Here's a sample entry for the discussion platform",
            avatar: 'https://via.placeholder.com/50'
        },
        {
            id: 3,
            name: 'Andrew Smith',
            date: '11 July, 2024',
            content: "Here's a sample entry for the discussion platform",
            avatar: 'https://via.placeholder.com/50'
        },
        {
            id: 4,
            name: 'Andrew Smith',
            date: '11 July, 2024',
            content: "Here's a sample entry for the discussion platform",
            avatar: 'https://via.placeholder.com/50'
        },
    ];

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
                <button onClick={handleNewConversation} className={`flex items-center ${isMobile ? "text-blue-500" : "px-4 py-2 bg-blue-500 text-white rounded-full"}`}>
                    <FontAwesomeIcon icon={faPlus} className="mr-2" /> Start a New Conversation
                </button>
            </div>

            {showNewConversation && (
                <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
                    <div className="mb-2">
                        <label htmlFor="course-select" className="block text-sm font-medium text-gray-700">Select Course</label>
                        <select
                            id="course-select"
                            value={selectedCourse}
                            onChange={handleCourseChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                        >
                            <option value="">Select a course</option>
                            {courses.map(course => (
                                <option key={course.id} value={course.id}>{course.courseName}</option>
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

            {entries.map(entry => (
                <div key={entry.id} className={`flex bg-blue-50 p-4 rounded-lg mb-4 ${isMobile ? "text-sm" : ""}`}>
                    <img src={image01} alt={entry.name} className={`rounded-full mr-4 ${isMobile ? "w-6 h-6" : "w-12 h-12"}`} />
                    <div className="flex-1">
                        <h2 className={`font-semibold ${isMobile ? "text-sm" : "text-lg"}`}>{entry.name}</h2>
                        <p className={`${isMobile ? "text-xs" : ""}`}>{entry.content}</p>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className={`text-gray-500 ${isMobile ? "text-xs" : "text-sm"}`}>{entry.date}</span>
                        <button className={`mt-2 ${isMobile ? "text-blue-500" : "px-4 py-2 bg-blue-500 text-white rounded-full"}`}>
                            <FontAwesomeIcon icon={faReply} /> Reply
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DiscussionEntry;
// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faReply, faPlus, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
// import image01 from "../../assets/Discussion_Ellipse2.png";
// import { useMediaQuery } from 'react-responsive';
// import axios from 'axios';
// import { useAuth } from '../../auth/AuthProvider'; // Adjust the import path accordingly

// const DiscussionEntry = () => {
//     const { auth } = useAuth();
//     const [showNewConversation, setShowNewConversation] = useState(false);
//     const [newConversationText, setNewConversationText] = useState('');
//     const [courses, setCourses] = useState([]);
//     const [selectedCourse, setSelectedCourse] = useState('');
//     const isTablet = useMediaQuery({ maxWidth: 544 });
//     const isMobile = useMediaQuery({ maxWidth: 426 });

//     useEffect(() => {
//         axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/courses`)
//             .then(response => {
//                 setCourses(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching courses:', error);
//             });
//     }, []);

//     const handleNewConversation = () => {
//         setShowNewConversation(!showNewConversation);
//     };

//     const handleNewConversationTextChange = (e) => {
//         setNewConversationText(e.target.value);
//     };

//     const handleCourseChange = (e) => {
//         setSelectedCourse(e.target.value);
//     };

//     const handlePostNewConversation = () => {
//         const newConversation = {
//             text: newConversationText,
//             courseid: selectedCourse,
//             userid: auth.token // Assuming the token is the user ID, adjust if necessary
//         };

//         axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/comments`, newConversation)
//             .then(response => {
//                 console.log('New conversation posted:', response.data);
//                 setNewConversationText('');
//                 setSelectedCourse('');
//                 setShowNewConversation(false);
//             })
//             .catch(error => {
//                 console.error('Error posting new conversation:', error);
//             });
//     };

//     const entries = [
//         {
//             id: 1,
//             name: 'Andrew Smith',
//             date: '11 July, 2024',
//             content: "Here's a sample entry for the discussion platform",
//             avatar: 'https://via.placeholder.com/50'
//         },
//         {
//             id: 2,
//             name: 'Andrew Smith',
//             date: '11 July, 2024',
//             content: "Here's a sample entry for the discussion platform",
//             avatar: 'https://via.placeholder.com/50'
//         },
//         {
//             id: 3,
//             name: 'Andrew Smith',
//             date: '11 July, 2024',
//             content: "Here's a sample entry for the discussion platform",
//             avatar: 'https://via.placeholder.com/50'
//         },
//         {
//             id: 4,
//             name: 'Andrew Smith',
//             date: '11 July, 2024',
//             content: "Here's a sample entry for the discussion platform",
//             avatar: 'https://via.placeholder.com/50'
//         },
//     ];

//     return (
//         <div className={`${isMobile ? "p-3" : "p-6"}`}>
//             <div className={`flex justify-between mt-4 mb-4 ${isMobile ? "flex-col space-y-3" : ""}`}>
//                 <div className={`flex bg-white rounded-full ${isTablet ? "py-1 px-2 text-sm space-x-5" : "p-3 space-x-10"}`}>
//                     <button className="text-gray-600 ml-1">Recent</button>
//                     <button className="text-gray-600">Popular</button>
//                     <button className="text-gray-600 mr-1">Last Reply</button>
//                 </div>

//                 <div className={`flex bg-white rounded-full ${isTablet ? "py-1 px-2 text-sm" : "p-3"}`}>
//                     <button className="text-gray-600">By Category:</button>
//                     <select className="text-sm focus:outline-none">
//                         <option>General</option>
//                         <option>Security</option>
//                         <option>Privacy</option>
//                     </select>
//                 </div>
//             </div>

//             <div className="flex justify-end mb-4">
//                 <button onClick={handleNewConversation} className={`flex items-center ${isMobile ? "text-blue-500" : "px-4 py-2 bg-blue-500 text-white rounded-full"}`}>
//                     <FontAwesomeIcon icon={faPlus} className="mr-2" /> Start a New Conversation
//                 </button>
//             </div>

//             {showNewConversation && (
//                 <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
//                     <div className="mb-2">
//                         <label htmlFor="course-select" className="block text-sm font-medium text-gray-700">Select Course</label>
//                         <select
//                             id="course-select"
//                             value={selectedCourse}
//                             onChange={handleCourseChange}
//                             className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
//                         >
//                             <option value="">Select a course</option>
//                             {courses.map(course => (
//                                 <option key={course.id} value={course.id}>{course.courseName}</option>
//                             ))}
//                         </select>
//                     </div>
//                     <textarea
//                         value={newConversationText}
//                         onChange={handleNewConversationTextChange}
//                         className="w-full p-2 border rounded-lg focus:outline-none"
//                         rows="4"
//                         placeholder="Type your conversation here..."
//                     ></textarea>
//                     <div className="flex justify-end mt-2">
//                         <button onClick={handlePostNewConversation} className="px-4 py-2 bg-blue-500 text-white rounded-full">
//                             <FontAwesomeIcon icon={faPaperPlane} className="mr-2" /> Post
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {entries.map(entry => (
//                 <div key={entry.id} className={`flex bg-blue-50 p-4 rounded-lg mb-4 ${isMobile ? "text-sm" : ""}`}>
//                     <img src={image01} alt={entry.name} className={`rounded-full mr-4 ${isMobile ? "w-6 h-6" : "w-12 h-12"}`} />
//                     <div className="flex-1">
//                         <h2 className={`font-semibold ${isMobile ? "text-sm" : "text-lg"}`}>{entry.name}</h2>
//                         <p className={`${isMobile ? "text-xs" : ""}`}>{entry.content}</p>
//                     </div>
//                     <div className="flex flex-col items-end">
//                         <span className={`text-gray-500 ${isMobile ? "text-xs" : "text-sm"}`}>{entry.date}</span>
//                         <button className={`mt-2 ${isMobile ? "text-blue-500" : "px-4 py-2 bg-blue-500 text-white rounded-full"}`}>
//                             <FontAwesomeIcon icon={faReply} /> Reply
//                         </button>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };


// export default DiscussionEntry;


// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faReply, faPlus, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
// import image01 from '../../assets/Discussion_Ellipse2.png';
// import { useMediaQuery } from 'react-responsive';
// import axios from 'axios';
// import { useAuth } from '../../auth/AuthProvider'; // Adjust the import path accordingly

// const DiscussionEntry = () => {
//   const { auth } = useAuth();
//   const [showNewConversation, setShowNewConversation] = useState(false);
//   const [newConversationText, setNewConversationText] = useState('');
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState('');
//   const isTablet = useMediaQuery({ maxWidth: 544 });
//   const isMobile = useMediaQuery({ maxWidth: 426 });

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/courses`)
//       .then((response) => {
//         setCourses(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching courses:', error);
//       });
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


//   const handlePostNewConversation = () => {
//     const newConversation = {
//       text: newConversationText,
//       courseid: selectedCourse,
//     };
  
//     axios
//       .post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/comments`, newConversation, {
//         headers: {
//           Authorization: `Bearer ${auth.token}`,
//         },
//       })
//       .then((response) => {
//         console.log('New conversation posted:', response.data);
//         setNewConversationText('');
//         setSelectedCourse('');
//         setShowNewConversation(false);
//       })
//       .catch((error) => {
//         console.error('Error posting new conversation:', error);
//       });
//   };
  

//   const entries = [
//     {
//       id: 1,
//       name: 'Andrew Smith',
//       date: '11 July, 2024',
//       content: "Here's a sample entry for the discussion platform",
//       avatar: 'https://via.placeholder.com/50',
//     },
//     {
//       id: 2,
//       name: 'Andrew Smith',
//       date: '11 July, 2024',
//       content: "Here's a sample entry for the discussion platform",
//       avatar: 'https://via.placeholder.com/50',
//     },
//     {
//       id: 3,
//       name: 'Andrew Smith',
//       date: '11 July, 2024',
//       content: "Here's a sample entry for the discussion platform",
//       avatar: 'https://via.placeholder.com/50',
//     },
//     {
//       id: 4,
//       name: 'Andrew Smith',
//       date: '11 July, 2024',
//       content: "Here's a sample entry for the discussion platform",
//       avatar: 'https://via.placeholder.com/50',
//     },
//   ];

//   return (
//     <div className={`${isMobile ? 'p-3' : 'p-6'}`}>
//       <div className={`flex justify-between mt-4 mb-4 ${isMobile ? 'flex-col space-y-3' : ''}`}>
//         <div className={`flex bg-white rounded-full ${isTablet ? 'py-1 px-2 text-sm space-x-5' : 'p-3 space-x-10'}`}>
//           <button className="text-gray-600 ml-1">Recent</button>
//           <button className="text-gray-600">Popular</button>
//           <button className="text-gray-600 mr-1">Last Reply</button>
//         </div>

//         <div className={`flex bg-white rounded-full ${isTablet ? 'py-1 px-2 text-sm' : 'p-3'}`}>
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
//           className={`flex items-center ${isMobile ? 'text-blue-500' : 'px-4 py-2 bg-blue-500 text-white rounded-full'}`}
//         >
//           <FontAwesomeIcon icon={faPlus} className="mr-2" /> Start a New Conversation
//         </button>
//       </div>

//       {showNewConversation && (
//         <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
//           <div className="mb-2">
//             <label htmlFor="course-select" className="block text-sm font-medium text-gray-700">
//               Select Course
//             </label>
//             <select
//               id="course-select"
//               value={selectedCourse}
//               onChange={(e) => setSelectedCourse(e.target.value)}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
//             >
//               <option value="">Select a course</option>
//               {courses.map((course) => (
//                 <option key={course.id} value={course.id}>
//                   {course.courseName}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <textarea
//             value={newConversationText}
//             onChange={(e) =>setNewConversationText(e.target.value)}
//             className="w-full p-2 border rounded-lg focus:outline-none"
//             rows="4"
//             placeholder="Type your conversation here..."
//           ></textarea>
//           <div className="flex justify-end mt-2">
//             <button onClick={handlePostNewConversation} className="px-4 py-2 bg-blue-500 text-white rounded-full">
//               <FontAwesomeIcon icon={faPaperPlane} className="mr-2" /> Post
//             </button>
//           </div>
//         </div>
//       )}

//       {entries.map((entry) => (
//         <div key={entry.id} className={`flex bg-blue-50 p-4 rounded-lg mb-4 ${isMobile ? 'text-sm' : ''}`}>
//           <img src={image01} alt={entry.name} className={`rounded-full mr-4 ${isMobile ? 'w-6 h-6' : 'w-12 h-12'}`} />
//           <div className="flex-1">
//             <h2 className={`font-semibold ${isMobile ? 'text-sm' : 'text-lg'}`}>{entry.name}</h2>
//             <p className={`${isMobile ? 'text-xs' : ''}`}>{entry.content}</p>
//           </div>
//           <div className="flex flex-col items-end">
//             <span className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'}`}>{entry.date}</span>
//             <button className={`mt-2 ${isMobile ? 'text-blue-500' : 'px-4 py-2 bg-blue-500 text-white rounded-full'}`}>
//               <FontAwesomeIcon icon={faReply} /> Reply
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// // export default DiscussionEntry;
// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faReply, faPlus, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
// import image01 from '../../assets/Discussion_Ellipse2.png';
// import { useMediaQuery } from 'react-responsive';
// import axios from 'axios';
// import { useAuth } from '../../auth/AuthProvider'; // Adjust the import path accordingly
// import Snackbar from '@material-ui/core/Snackbar';
// import Alert from '@material-ui/lab/Alert';

// const DiscussionEntry = () => {
//   const { auth } = useAuth();
//   const [showNewConversation, setShowNewConversation] = useState(false);
//   const [newConversationText, setNewConversationText] = useState('');
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState('');
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');
//   const isTablet = useMediaQuery({ maxWidth: 544 });
//   const isMobile = useMediaQuery({ maxWidth: 426 });

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/courses`)
//       .then((response) => {
//         setCourses(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching courses:', error);
//       });
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

//   const handlePostNewConversation = () => {
//     const newConversation = {
//       text: newConversationText,
//       courseid: selectedCourse,
//       userid: auth.userId,
//     };

//     axios
//     .post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/comments`, newConversation, {
//       headers: {
//         Authorization: `Bearer ${auth.token}`,
//       },
//     })
//     .then((response) => {
//       console.log('New conversation posted:', response.data);
//       setSnackbarMessage('Conversation posted successfully!');
//       setSnackbarSeverity('success');
//       setSnackbarOpen(true);
//       setNewConversationText('');
//       setSelectedCourse('');
//       setShowNewConversation(false);
//     })
//     .catch((error) => {
//       console.error('Error posting new conversation:', error);
//       setSnackbarMessage('Error posting conversation.');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     });
// };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const entries = [
//     {
//       id: 1,
//       name: 'Andrew Smith',
//       date: '11 July, 2024',
//       content: "Here's a sample entry for the discussion platform",
//       avatar: 'https://via.placeholder.com/50',
//     },
//     {
//       id: 2,
//       name: 'Andrew Smith',
//       date: '11 July, 2024',
//       content: "Here's a sample entry for the discussion platform",
//       avatar: 'https://via.placeholder.com/50',
//     },
//     {
//       id: 3,
//       name: 'Andrew Smith',
//       date: '11 July, 2024',
//       content: "Here's a sample entry for the discussion platform",
//       avatar: 'https://via.placeholder.com/50',
//     },
//     {
//       id: 4,
//       name: 'Andrew Smith',
//       date: '11 July, 2024',
//       content: "Here's a sample entry for the discussion platform",
//       avatar: 'https://via.placeholder.com/50',
//     },
//   ];

//   return (
//     <div className={`${isMobile ? 'p-3' : 'p-6'}`}>
//       <div className={`flex justify-between mt-4 mb-4 ${isMobile ? 'flex-col space-y-3' : ''}`}>
//         <div className={`flex bg-white rounded-full ${isTablet ? 'py-1 px-2 text-sm space-x-5' : 'p-3 space-x-10'}`}>
//           <button className="text-gray-600 ml-1">Recent</button>
//           <button className="text-gray-600">Popular</button>
//           <button className="text-gray-600 mr-1">Last Reply</button>
//         </div>

//         <div className={`flex bg-white rounded-full ${isTablet ? 'py-1 px-2 text-sm' : 'p-3'}`}>
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
//           className={`flex items-center ${isMobile ? 'text-blue-500' : 'px-4 py-2 bg-blue-500 text-white rounded-full'}`}
//         >
//           <FontAwesomeIcon icon={faPlus} className="mr-2" /> Start a New Conversation
//         </button>
//       </div>

//       {showNewConversation && (
//         <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
//           <div className="mb-2">
//             <label htmlFor="course-select" className="block text-sm font-medium text-gray-700">
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
//                 <option key={course.id} value={course.id}>
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
//             <button onClick={handlePostNewConversation} className="px-4 py-2 bg-blue-500 text-white rounded-full">
//               <FontAwesomeIcon icon={faPaperPlane} className="mr-2" /> Post
//             </button>
//           </div>
//         </div>
//       )}

//       {entries.map((entry) => (
//         <div key={entry.id} className={`flex bg-blue-50 p-4 rounded-lg mb-4 ${isMobile ? 'text-sm' : ''}`}>
//           <img src={image01} alt={entry.name} className={`rounded-full mr-4 ${isMobile ? 'w-6 h-6' : 'w-12 h-12'}`} />
//           <div className="flex-1">
//             <h2 className={`font-semibold ${isMobile ? 'text-sm' : 'text-lg'}`}>{entry.name}</h2>
//             <p className={`${isMobile ? 'text-xs' : ''}`}>{entry.content}</p>
//           </div>
//           <div className="flex flex-col items-end">
//             <span className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'}`}>{entry.date}</span>
//             <button className={`mt-2 ${isMobile ? 'text-blue-500' : 'px-4 py-2 bg-blue-500 text-white rounded-full'}`}>
//               <FontAwesomeIcon icon={faReply} /> Reply
//             </button>
//           </div>
//         </div>
//       ))}

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//       >
//         <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default DiscussionEntry;
