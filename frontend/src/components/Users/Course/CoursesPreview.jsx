import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  faShieldAlt,
  faShieldVirus,
  faNetworkWired,
  faKey,
  faChevronLeft,
  faChevronRight,
  faBackward,
  faForward,
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import ToggleProfile from "../ToggleProfile";
import image01 from "../../../assets/01.jpg";
import ProfileBoy from "../../../assets/Profile.webp";
import Notification from "../Notification";
import { useLocation } from "react-router-dom";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import AssignmentSection from "./AssignmentSection";
import Axios from "../../../helper/Axios";
import FileReader from "./FileReader";

const CoursePreviewPage = () => {
  const location = useLocation();

  const { course } = location.state || {}; // Default to an empty object if state is undefined

  // Example usage of the updateBackendData function
  const courseId = course._id;

  const finalAssignment = course.finalAssignment || {};

  const weekContent = course.content || {};

  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedSubmodule, setSelectedSubmodule] = useState(
    weekContent[0].submodules[0]
  );

  const [checkedSubmodules, setCheckedSubmodules] = useState(new Set());
  const [showProfile, setShowProfile] = useState(false);
  const [showAssignment, setShowAssignment] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 450 });
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

  const handleNotification = () => {
    setShowNotifications(!showNotifications);
  };

  const handleSubmoduleClick = (submodule) => {
    setSelectedSubmodule(submodule);
    setShowAssignment(false);
  };

  useEffect(() => {
    const fetchData = async (courseId) => {
      try {
        const axiosConfig = {
          url: "/api/completedSubmodules",
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { courseId }, // Pass courseId as a parameter in the URL query string
        };

        const response = await Axios(axiosConfig);
        const completedSubmoduleIds = new Set(response.data);

        setCheckedSubmodules(completedSubmoduleIds);
      } catch (error) {
        console.error("Error fetching completed submodules:", error);
      }
    };

    fetchData(courseId);
  }, []);

  const handleSubmoduleCheck = (e) => {
    const { value } = e.target;

    setCheckedSubmodules((prevSelected) => {
      const newSelected = new Set(prevSelected);

      // Only add to the set if it's not already present
      if (!newSelected.has(value)) {
        newSelected.add(value);
      }
      return newSelected;
    });
  };

  const handleAssignment = () => {
    setSelectedAssignment(finalAssignment);
    setShowAssignment(true); // Show assignment view when button is clicked
    setSelectedSubmodule([]);
  };

  const handleModuleAssignment = (assignment) => {
    console.log(assignment.questions);
    setSelectedAssignment(assignment.questions);
    setShowAssignment(true);
    setSelectedSubmodule([]);
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    // Define your asynchronous update function
    const updateBackendData = async (courseId, submodules) => {
      try {
        const sendingData = {
          courseId: courseId,
          submodules: [...submodules],
        };
        console.log("sending data");
        console.log(sendingData);

        const axiosConfig = {
          url: "/api/updateCourseProgress",
          method: "put",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: sendingData,
        };

        const response = await Axios(axiosConfig);

        console.log("Backend update response:", response.data);

        // Optionally return data from backend response
        return response.data;
      } catch (error) {
        console.error("Error updating backend:", error);
        throw error; // Propagate the error for handling in the calling function
      }
    };
    console.log("checkedSubmodules:", checkedSubmodules);
    updateBackendData(courseId, checkedSubmodules)
      .then((data) => {
        // Handle success response from backend
        console.log("Backend update successful:", data);
      })
      .catch((error) => {
        // Handle error from backend
        console.error("Backend update failed:", error);
      });
  }, [checkedSubmodules]);

  let document = null;
  if (selectedSubmodule.docUrl !== null) {
    document = {
      uri: selectedSubmodule.docUrl,
      fileType: "doc", // Adjust file type based on your submodule data
    };
  }

  return (
    <>
      <div className="max-w-7xl mx-auto p-6 bg-gray-100 mt-10">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="xl:w-2/3 sm:w-full">
            <h2 className="mb-4 text-gray-800 font-semibold">
              {course.courseName}
            </h2>
            <div className="bg-white p-3 pt-5 pb-7 rounded-lg shadow-md ">
              <div className="relative">
                {showAssignment ? (
                  <AssignmentSection assignments={selectedAssignment} />
                ) : (
                  <>
                    {selectedSubmodule && selectedSubmodule.docUrl ? (
                      <FileReader
                        docUrl={selectedSubmodule.docUrl}
                        className="ml-3"
                        style={{
                          height: "50vh",
                          width: "45vw",
                          borderRadius: "20px",
                        }}
                      />
                    ) : (
                      selectedSubmodule &&
                      selectedSubmodule.videoUrl && (
                        <video
                          controls
                          className="w-full h-auto rounded-lg m-auto"
                          style={{ height: "50vh", width: "45vw" }}
                        >
                          <source
                            src={selectedSubmodule.videoUrl}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      )
                    )}
                  </>
                )}
              

              
              </div>
            </div>

            
          </div>
          <div className="w-full md:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Course Content
              </h2>
              <div className="space-y-4">
                {weekContent.map((week, index) => (
                  <details key={index} className="p-4 bg-gray-100 rounded-lg">
                    <summary className="font-semibold text-gray-800 cursor-pointer">
                      {week.title}
                    </summary>
                    <ul className="mt-2 list-inside">
                      {week.submodules.map((item, index) => (
                        <li key={index} className="text-gray-600">
                          <input
                            type="checkbox"
                            value={item._id}
                            onChange={handleSubmoduleCheck}
                            className="mr-2"
                            checked={checkedSubmodules.has(item._id.toString())}
                            readOnly={checkedSubmodules.has(
                              item._id.toString()
                            )}
                          />

                          <button
                            onClick={() => handleSubmoduleClick(item)}
                            className={`pl-2 pr-2 rounded ${
                              selectedSubmodule === item
                                ? "bg-blue-500 text-white border border-blue-500"
                                : "hover:bg-gray-300 text-gray-600"
                            }`}
                          >
                            {item.title}
                          </button>
                        </li>
                      ))}
                      <li>
                        <button
                        className={`mt-3 pl-2 pr-2 border rounded ${
                              selectedAssignment === week.assignment.questions
                                ? "bg-blue-500 text-white border border-blue-500"
                                : "hover:bg-gray-300 text-gray-600"
                            }`}
                          onClick={() =>
                            handleModuleAssignment(week.assignment)
                          }
                        >
                          Assignment
                        </button>
                      </li>
                    </ul>
                  </details>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mt-2">
              <button
                // className="hover:bg-gray-300 text-gray-600 pl-2 pr-2 pt-1 pb-1 border rounded-lg "
                className={`pl-2 pr-2 pt-1 pb-1 border rounded-lg ${
                             selectedAssignment === finalAssignment 
                                ? "bg-blue-500 text-white border border-blue-500"
                                : "hover:bg-gray-300 text-gray-600"
                            }`}
                onClick={handleAssignment}
              >
                Final Assignment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePreviewPage;
