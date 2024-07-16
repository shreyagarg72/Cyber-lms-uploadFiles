import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserCourseCard from "./CourseCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell } from "@fortawesome/free-solid-svg-icons";
import ProfileBoy from "../../../assets/Profile.webp";
import { useMediaQuery } from "react-responsive";
import Notification from "../Notification";
import ToggleProfile from "../ToggleProfile";
import Axios from "../../../helper/Axios";
const AdminCourse = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [nonEnrolledCourses, setNonEnrolledCourses] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
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
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_BASEURL}/api/courses`
        );
        if (response.ok) {
          const data = await response.json();
          setCourses(data.filter(course => course && course._id)); // Filter out any invalid courses
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
  
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const endpoint = `${
        import.meta.env.VITE_BACKEND_BASEURL
      }/api/enrolled-courses`;
  
      try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        setEnrolledCourses(data.enrolledCourses.filter(course => course && course.course_id && course.course_id._id)); // Filter out any invalid enrolled courses
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      }
    };
  
    fetchEnrolledCourses();
  }, []);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const endpoint = `${
        import.meta.env.VITE_BACKEND_BASEURL
      }/api/enrolled-courses`;

      try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the response data
        const data = await response.json();

        // Handle the data (e.g., update state or return it)
        console.log("Data from backend:", data);
        setEnrolledCourses(data.enrolledCourses);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      }
    };

    fetchEnrolledCourses();
  }, []);

  useEffect(() => {
    const determineNonEnrolledCourses = () => {
      const enrolledCourseIds = new Set(
        enrolledCourses
          .filter(course => course && course.course_id && course.course_id._id)
          .map((course) => course.course_id._id)
      );
      const nonEnrolled = courses.filter(
        (course) => course && course._id && !enrolledCourseIds.has(course._id)
      );
      setNonEnrolledCourses(nonEnrolled);
    };
  
    if (enrolledCourses.length && courses.length) {
      determineNonEnrolledCourses();
    }
  }, [enrolledCourses, courses]);
  return (
    <div className="min-h-screen p-6" >
      <div className="flex justify-center">
        
      </div>
      <div className=" bg-white mt-6 rounded-3xl shadow-md p-2 mb-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <button className="px-4 py-2 rounded-3xl focus:outline-none focus:bg-gray-200 ">
              All
            </button>
            <button className="px-4 py-2 rounded-3xl focus:outline-none focus:bg-gray-200 ">
              Completed
            </button>
            <button className="px-4 py-2 rounded-3xl focus:outline-none focus:bg-gray-200 ">
              Active
            </button>
          </div>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Sort By:</span>
              <select className="focus:outline-none cursor-pointer text-sm">
              
                <option>Newest</option>
                <option>Oldest</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Filter:</span>
              <select className="text-sm focus:outline-none">
                <option>Free</option>
                <option>Paid</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-4">Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {nonEnrolledCourses.map((course) => (
            <Link
              key={course._id}
              to="/course/coursePage"
              state={{ course: course }}
            >
              <UserCourseCard course={course} />
            </Link>
          ))}
        </div>
        <h2 className="m-3 font-bold">My Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
         
          {Array.isArray(enrolledCourses) && enrolledCourses.length > 0 ? (
            enrolledCourses.map((course) =>
              course && course.course_id && course.course_id._id ? (
                <Link
                  key={course.course_id._id}
                  to="/course/coursePage"
                  state={{ course: course.course_id }}
                >
                  <UserCourseCard
                    course={course.course_id}
                    progress={course.progressPercentage}
                  />
                </Link>
              ) : null
            )
          ) : (
            <p>No courses enrolled</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCourse;
