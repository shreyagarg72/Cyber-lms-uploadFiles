import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faFileAlt,
  faCheckCircle,
  faTimesCircle,
  faClock,
  faSearch,
  faUsers,
  faBell,
  faFolderOpen,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import image01 from "../../assets/Screenshot 2024-06-19 001148.png";
import ProfileBoy from "../../assets/Profile.webp";
import PT from "../../assets/DashboardUI__109615071.png";
import NS from "../../assets/DashboardUI_images1.png";
import DC from "../../assets/DashboardUI__30764161.png";
import DM from "../../assets/DashboardUI__183600437cryptographyiconblockchaintechnologyrelatedvectorillustration1.png";
import WD from "../../assets/DashboardUI_malwaresymbolredisolatedonwhitebackgroundfreevector1.png";
import CourseCard from "../Users/Course/DashCourseCard";
import Notification from './Notification';
import ToggleProfile from './ToggleProfile';
import { useAuth } from "../../auth/AuthProvider";


const DashboardContent = () => {
  const { auth } = useAuth();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const [courses, setCourses] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const isMobile = useMediaQuery({maxWidth : 450})
  const isTablet = useMediaQuery({maxWidth : 768})

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  }

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const closeProfile = () => {
    setShowProfile(false);
  }
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

  return (
    <div className="min-h-full">
      {/* <Navbar /> */}
      <div className={`flex justify-center ${isMobile ? 'p-2' : 'py-2'}`}>
        <div className={`bg-white px-2 rounded-3xl ${isMobile ? 'py-2 w-full mx-2' : 'py-2 w-5/6 mr-3'} shadow-xl`}>
          <div className='w-full flex flex-row justify-between'>
            <div className="flex items-center bg-slate-200 rounded-full px-4 py-2 w-52">
              <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent focus:outline-none"
              />
            </div>
            <div className="flex items-center space-x-2 md:space-x-10 md:mr-10">
              <Link onClick={toggleNotifications}>
                <FontAwesomeIcon icon={faBell} className="text-gray-700 text-3xl" />
              </Link>
              <Link onClick={toggleProfile}>
                <img src={ProfileBoy} alt="Profile" className="w-10 h-10 rounded-full" />
              </Link>
              {showProfile && (<ToggleProfile closeProfile={closeProfile} />)}
              {showNotifications && (<Notification />)}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-10">
        <div className="col-span-2">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Courses</h2>
            <table className="min-w-full bg-white text-sm">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Course</th>
                  <th className="py-2 px-4 border-b text-left">Instructor</th>
                  <th className="py-2 px-4 border-b text-left">Level</th>
                  <th className="py-2 px-4 border-b text-left">
                    Next Assignment
                  </th>
                  <th className="py-2 px-4 border-b text-left">Progress</th>
                </tr>
              </thead>
              <tbody>
              {courses.slice(0,3).map((course) => (
                  <tr key={course._id}>
                    <td className="py-2 px-4 border-b">{course.courseName}</td>
                    <td className="py-2 px-4 border-b">
                      <FontAwesomeIcon icon={faUser} className="mr-2" />{" "}
                      {course.trainerName}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <span className={`py-1 px-3 rounded-full text-xs ${
                        course.level === "Easy"
                          ? "bg-green-400"
                          : course.level === "Medium"
                          ? "bg-yellow-400"
                          : "bg-red-400"
                      } text-black`}>
                        {course.level}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">{course.nextAssignment}</td>
                    <td className="py-2 px-4 border-b">
                      {/* <div className="w-28 bg-gray-200 rounded-full h-1.5">
                         <div
                          className="bg-green-500 h-full rounded-full"
                          style={{ width: "80%" }}
                        ></div> 
                      </div> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-slate-100 p-4 rounded-lg shadow-md mt-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold mb-4">Explore Courses</h2>
              <Link to="/Course">
                <button className="mr-5 w-20 bg-blue-950 text-white rounded-full">
                  View all
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {courses.slice(0,3).map((course) => (
                <Link
                key={course._id}
                to="/course/coursePage"
                state={{course:course}}
              >
                <CourseCard
                  key={course._id}
                  imgUrl={course.imgUrl}
                  level={course.level}
                  courseName={course.courseName}
                  trainerName={course.trainerName}
                  description={course.description}
                  duration={course.content.reduce((acc, module) => acc + module.submodules.length, 0)}
                  students={course.students}
                  modules={course.content.length}
                />
                 </Link>
              ))}
            </div>
            {/* <CourseCard/> */}
          </div>
        </div>
        <div>
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-bold">Today</h2>
                <h1 className="mb-2 text-sm">June 18, 2024</h1>
              </div>
              <Link>
                <button className="w-20 bg-blue-950 rounded-xl text-white text-sm">
                  View all
                </button>
              </Link>
            </div>
            <div className="flex flex-col">
              <div className="bg-gray-100 p-4 rounded-lg mb-2 flex justify-between items-center">
                <div>
                  <h3 className="text-md font-bold">Ethical Hacking</h3>
                  <p className="text-gray-500 text-sm">
                    <FontAwesomeIcon icon={faClock} className="mx-2" />
                    3:00-4:00pm <br /> <br /> Prof Raj Sharma
                  </p>
                </div>
                <button className="bg-blue-900 text-white py-1 px-7 rounded-full">
                  Join
                </button>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg mb-4 flex justify-between items-center">
                <div>
                  <h3 className="text-md font-bold">Ethical Hacking</h3>
                  <p className="text-gray-500 text-sm">
                    <FontAwesomeIcon icon={faClock} className="mx-2" />
                    3:00-4:00pm <br /> <br /> Prof Raj Sharma
                  </p>
                </div>
                <button className="bg-blue-900 text-white py-1 px-7 rounded-full">
                  Join
                </button>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg mb-4 flex justify-between items-center">
                <div>
                  <h3 className="text-md font-bold">Ethical Hacking</h3>
                  <p className="text-gray-500 text-sm">
                    <FontAwesomeIcon icon={faClock} className="mx-2" />
                    3:00-4:00pm <br /> <br /> Prof Raj Sharma
                  </p>
                </div>
                <button className="bg-blue-900 text-white py-1 px-7 rounded-full">
                  Join
                </button>
              </div>
              {/* Repeat for other events */}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Course Overview</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faFileAlt}
                    className="text-blue-500 mr-2"
                  />
                  <span>10 Courses</span>
                </div>
                <span className="text-gray-500">enrolled</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-green-500 mr-2"
                  />
                  <span>56 Lessons</span>
                </div>
                <span className="text-gray-500">contained</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="text-red-500 mr-2"
                  />
                  <span>5 Practical Labs</span>
                </div>
                <span className="text-gray-500">involvement</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-yellow-500 mr-2"
                  />
                  <span>12 Reviews</span>
                </div>
                <span className="text-gray-500">given</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-white p-3 rounded-lg shadow-md mt-4">
        <h2 className="text-xl font-bold mb-4">Popular Course Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="flex items-center text-sm p-4 rounded-lg cursor-pointer hover:scale-110 transition duration-200">
            <img src={PT} alt="" className="w-9 h-9 mr-4" />
            <span>Penetration Testing</span>
          </div>
          <div className="flex items-center text-sm p-4 rounded-lg cursor-pointer hover:scale-110 transition duration-200">
            <img src={NS} alt="" className="w-9 h-9 mr-4" />
            <span>Network Security</span>
          </div>
          <div className="flex items-center text-sm p-4 rounded-lg cursor-pointer hover:scale-110 transition duration-200">
            <img src={DC} alt="" className="w-9 h-9 mr-4" />
            <span>Data Privacy</span>
          </div>
          <div className="flex items-center text-sm p-4 rounded-lg cursor-pointer hover:scale-110 transition duration-200">
            <img src={DM} alt="" className="w-9 h-9 mr-4" />
            <span>Digital Marketing</span>
          </div>
          <div className="flex items-center text-sm p-4 rounded-lg cursor-pointer hover:scale-110 transition duration-200">
            <img src={WD} alt="" className="w-9 h-9 mr-4" />
            <span>Web Development</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
