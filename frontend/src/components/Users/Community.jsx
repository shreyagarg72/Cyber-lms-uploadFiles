import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReply,
  faPlus,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import image01 from "../../assets/Discussion_Ellipse2.png";
import { useMediaQuery } from "react-responsive";
import Axios from "../../helper/Axios.js";

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
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [visibleReplies, setVisibleReplies] = useState({});


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await Axios.get(
          `${import.meta.env.VITE_BACKEND_BASEURL}/api/courses`
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await Axios(
            `${import.meta.env.VITE_BACKEND_BASEURL}/api/userData`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUser(response.data);
          setUserId(response.data._id);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchCourses();
    fetchUserData();
    fetchDiscussionEntries();
  }, []);

  const fetchDiscussionEntries = async () => {
    try {
      const response = await Axios(
        `${import.meta.env.VITE_BACKEND_BASEURL}/api/comments`
      );
      setEntries(response.data);
    } catch (error) {
      console.error("Error fetching discussion entries:", error);
    }
  };

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
        fetchDiscussionEntries();
      }
    } catch (error) {
      console.error("Error saving conversation:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
      alert("Failed to save conversation. Please try again.");
    }
  };

  const handleReplyChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleReply = (entryId) => {
    setReplyingTo(entryId);
  };

  const handlePostReply = async (entryId) => {
    if (!userId || !replyText) {
      alert("Please enter reply text");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await Axios.post(
        `${import.meta.env.VITE_BACKEND_BASEURL}/api/${entryId}/reply`,
        {
          userid: userId,
          text: replyText,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        alert("Reply saved successfully");
        setReplyText("");
        setReplyingTo(null);
        fetchDiscussionEntries();
      }
    } catch (error) {
      console.error("Error saving reply:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
      alert("Failed to save reply. Please try again.");
    }
  };

  const toggleRepliesVisibility = (entryId) => {
    setVisibleReplies((prev) => ({
      ...prev,
      [entryId]: !prev[entryId],
    }));
  };
  

  return (
    <div className={`${isMobile ? "p-3" : "p-6"}`}>
      <div
        className={`flex justify-between mt-4 mb-4 ${
          isMobile ? "flex-col space-y-3" : ""
        }`}
      >
        <div
          className={`flex bg-white rounded-full ${
            isTablet ? "py-1 px-2 text-sm space-x-5" : "p-3 space-x-10"
          }`}
        >
          <button className="text-gray-600 ml-1">Recent</button>
          <button className="text-gray-600">Popular</button>
          <button className="text-gray-600 mr-1">Last Reply</button>
        </div>

        <div
          className={`flex bg-white rounded-full ${
            isTablet ? "py-1 px-2 text-sm" : "p-3"
          }`}
        >
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
          className={`flex items-center ${
            isMobile
              ? "text-blue-500"
              : "px-4 py-2 bg-blue-500 text-white rounded-full"
          }`}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />{" "}
          {showNewConversation ? "Close" : "Start a New Conversation"}
        </button>
      </div>

      {showNewConversation && (
        <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
          <div className="mb-2">
            <label
              htmlFor="course-select"
              className="block text-sm font-medium text-gray-700"
            >
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
            <button
              onClick={handlePostNewConversation}
              className="px-4 py-2 bg-blue-500 text-white rounded-full"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="mr-2" /> Post
            </button>
          </div>
        </div>
      )}

      {entries.map((entry) => (
        <div className="outer-div">
          {console.log(entry)}
          <div
            key={entry._id}
            className={`flex items-start bg-white p-3 rounded-md mt-3 ${
              isMobile ? "flex-col" : ""
            }`}
          >
            <img
              src={image01}
              alt="User"
              className={`rounded-full ${isMobile ? "w-8 h-8" : "w-14 h-14"}`}
            />
            <div className={`ml-4 ${isMobile ? "mt-2" : ""} w-full`}>
              <h2
                className={`font-semibold ${isMobile ? "text-sm" : "text-lg"}`}
              >
                {entry.userid ? entry.userid.name : "Unknown"}
              </h2>
              <p className={`${isMobile ? "text-xs" : ""}`}>{entry.text}</p>
              {replyingTo === entry._id && (
                <div className="mt-4">
                  <textarea
                    value={replyText}
                    onChange={handleReplyChange}
                    className="w-full p-4 border rounded-lg focus:outline-none"
                    rows="4"
                    placeholder="Type your reply here..."
                  ></textarea>
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => handlePostReply(entry._id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-full"
                    >
                      <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />{" "}
                      Post Reply
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="ml-auto">
              <button
                onClick={() => handleReply(entry._id)}
                className="px-4 py-2 text-blue-500"
              >
                <FontAwesomeIcon icon={faReply} className="mr-2" /> Reply
              </button>
            </div>
            <div className="ml-auto my-auto">
              <button
                onClick={() => toggleRepliesVisibility(entry._id)}
                className="px-2 py-2 text-gray-400 text-sm w-28 hover:underline hover:decoration-gray-400"
              >
                {visibleReplies[entry._id]
                  ? "Hide all replies"
                  : "View all replies"}
              </button>
            </div>
          </div>
         { visibleReplies[entry._id] &&   <div className="bg-white rounded-md pb-2">
            <div className="text-gray-400 ml-20">
              {entry.replies.length} replies
            </div>

            {entry.replies.length > 0 && (
              <div className="ml-20">
                {entry.replies.map((reply) => (
                  <div
                    className={`flex items-start bg-white p-3 rounded-md mt-3 ${
                      isMobile ? "flex-col" : ""
                    }`}
                  >
                    <img
                      src={image01}
                      alt="User"
                      className={`rounded-full ${
                        isMobile ? "w-8 h-8" : "w-14 h-14"
                      }`}
                    />
                    <div className={`ml-4 ${isMobile ? "mt-2" : ""} w-full`}>
                      <h2
                        className={`font-semibold ${
                          isMobile ? "text-sm" : "text-lg"
                        }`}
                      >
                        {reply.userid.name}
                      </h2>
                      <p key={reply._id} className="">
                        {reply.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>}
        </div>
      ))}
    </div>
  );
};

export default DiscussionEntry;
