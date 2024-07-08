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

import Axios from "../../../helper/Axios";

const CoursePreviewPage = () => {
  const location = useLocation();

  const { course } = location.state || {}; // Default to an empty object if state is undefined

  // Example usage of the updateBackendData function
  const courseId = course._id;

  const weekContent = course.content || {};

  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedSubmodule, setSelectedSubmodule] = useState(
    weekContent[0].submodules[0]
  );

  const [checkedSubmodules, setCheckedSubmodules] = useState(new Set());
  const [showProfile, setShowProfile] = useState(false);
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
  };

  //this is the useEffect that will run once when the react component is mounted
  // useEffect(() => {
  //   // Fetch completed submodules when the component mounts
  //   // axios.get('/api/completedSubmodules')
  //   //   .then(response => {
  //   //     const completedSubmoduleIds = new Set(response.data); // Assuming the backend returns an array of completed submodule IDs
  //   //     setSelectedSubmodules(completedSubmoduleIds);
  //   //   })
  //   //   .catch(error => {
  //   //     console.error('Error fetching completed submodules:', error);
  //   //   });

   
  // }, []);
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
        console.error('Error fetching completed submodules:', error);
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

  const token = localStorage.getItem("token");
  useEffect(() => {
    

    // Define your asynchronous update function
    const updateBackendData = async (courseId, submodules) => {
      try {
        const sendingData = {
          courseId: courseId,
          submodules:[...submodules],
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
      <div className="max-w-7xl mx-auto p-6 bg-gray-100">
        <div className="flex justify-center pb-9">
          <div className=" bg-white px-2 rounded-3xl py-2 w-4/5 flex items-center justify-between absolute top-11 shadow-xl">
            <div className="flex items-center bg-slate-200 rounded-full px-4 py-2 w-full max-w-md ">
              <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent focus:outline-none"
              />
            </div>
            <div className="flex items-center space-x-2 md:space-x-10 md:mr-10">
              <Link onClick={toggleNotifications}>
                <FontAwesomeIcon
                  icon={faBell}
                  className="text-gray-700 text-3xl"
                />
              </Link>
              <Link onClick={toggleProfile}>
                <img
                  src={ProfileBoy}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              </Link>
              {showProfile && <ToggleProfile closeProfile={closeProfile} />}
              {showNotifications && <Notification />}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="w-2/3">
            <div className="bg-white p-3 rounded-lg shadow-md">
              <div className="relative">
                {/* <DocViewer
                  pluginRenderers={DocViewerRenderers}
                  documents={[document]}
                  className="ml-3"
                  style={{ height: "50vh", width: "45vw", borderRadius: "20" }}
                /> */}
                {selectedSubmodule && selectedSubmodule.docUrl ? (
                  <DocViewer
                    pluginRenderers={DocViewerRenderers}
                    documents={[document]}
                    className="ml-3"
                    style={{
                      height: "50vh",
                      width: "45vw",
                      borderRadius: "20",
                    }}
                  />
                ) : (
                  selectedSubmodule &&
                  selectedSubmodule.videoUrl && (
                    <video
                      controls
                      className="w-full h-auto rounded-lg m-auto "
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
                <div className="absolute bottom-4 left-4 flex items-center space-x-2"></div>
                {/* <div className="flex justify-between mt-4">
                  <button className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-full">
                    <FontAwesomeIcon icon={faBackward} className="mr-1" />{" "}
                    Previous
                  </button>
                  <button className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-full">
                    Next <FontAwesomeIcon icon={faForward} className="ml-1" />
                  </button>
                </div> */}
              </div>
            </div>
            <div className="bg-white p-6 mt-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-2 mb-2">
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <span className="text-yellow-500">4.6</span>
                <span className="text-sm text-gray-600">based on</span>
                <a href="#" className="underline text-blue-400">
                  10 reviews
                </a>
              </div>
              <h1 className="text-3xl font-bold text-gray-800">
                {course.courseName}
              </h1>
              <div className="flex items-center mt-2 space-x-2">
                <span className="px-2 py-1 bg-yellow-300 text-yellow-800 rounded">
                  Medium
                </span>
                <span className="px-2 py-1 bg-gray-300 text-gray-800 rounded flex items-center">
                  <FontAwesomeIcon icon={faTools} className="mr-2" />
                  Kali Linux
                </span>
              </div>
              <p className="mt-4 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className="flex items-center space-x-2 mt-4">
                <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                <span className="text-gray-500">{course.trainerName}</span>
                <FontAwesomeIcon icon={faUsers} className="text-gray-500" />
                <span className="text-gray-500">100+ students enrolled</span>
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
                    </ul>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePreviewPage;
