import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserCourseCard from "./CourseCard";
import { useMediaQuery } from "react-responsive";
import Axios from "../../../helper/Axios";

const AdminCourse = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [nonEnrolledCourses, setNonEnrolledCourses] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 450 });
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const [displayAll, setDisplayAll] = useState(true);
  const [displayEnrolled, setDisplayEnrolled] = useState(false);
  const [displayCompleted, setDisplayCompleted] = useState(false);
  const [sortBy, setSortBy] = useState("Newest");

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
          setCourses(data.filter((course) => course && course._id)); // Filter out any invalid courses
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

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const endpoint = `${import.meta.env.VITE_BACKEND_BASEURL}/api/enrolled-courses`;

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
        setEnrolledCourses(
          data.enrolledCourses.filter(
            (course) => course && course.course_id && course.course_id._id
          )
        ); // Filter out any invalid enrolled courses
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
          .filter(
            (course) => course && course.course_id && course.course_id._id
          )
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

  const displayAllCourses = () => {
    setDisplayAll(true);
    setDisplayEnrolled(false);
    setDisplayCompleted(false);
  };

  const displayEnrolledCourses = () => {
    setDisplayAll(false);
    setDisplayEnrolled(true);
    setDisplayCompleted(false);
  };

  const displayCompletedCourses = () => {
    setDisplayAll(false);
    setDisplayEnrolled(false);
    setDisplayCompleted(true);
  };

  const sortCourses = (coursesArray) => {
    return coursesArray.sort((a, b) => {
      if (sortBy === "Newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "Oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    });
  };
  const sortEnrolledCourses = (coursesArray) => {
    return coursesArray.sort((a, b) => {
      if (sortBy === "Newest") {
        return new Date(b.course_id.createdAt) - new Date(a.course_id.createdAt);
      } else if (sortBy === "Oldest") {
        return new Date(a.course_id.createdAt) - new Date(b.course_id.createdAt);
      }
      return 0;
    });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const filteredAndSortedCourses = () => {
    console.log("filteredAndSortedCourses called");
    console.log(enrolledCourses);
    if (displayAll) {
      return sortCourses(courses);
    } else if (displayEnrolled) {
      return sortEnrolledCourses(
        enrolledCourses.filter((course) => course.course_id && course.course_id._id)
        
      );
      
    } else if (displayCompleted) {
      return sortCourses(
        enrolledCourses.filter(
          (course) =>
            course.course_id &&
            course.course_id._id &&
            course.progressPercentage == 100.00
        )
      );
    }
  };
  

  return (
    <div className="min-h-screen p-6">
     
      <div
        className={`bg-white mt-6 rounded-3xl shadow-md p-2 mb-4 ${
          isMobile ? "" : ""
        }`}
      >
        <div
          className={`flex  items-center flex-wrap ${
            isMobile ? "w-full justify-center" : "justify-between"
          }`}
        >
          <div className="flex space-x-4">
            <button
              onClick={displayAllCourses}
              className="px-4 py-2 rounded-3xl focus:outline-none focus:bg-gray-200"
            >
              All
            </button>
            <button
              onClick={displayEnrolledCourses}
              className="px-4 py-2 rounded-3xl focus:outline-none focus:bg-gray-200"
            >
              Enrolled
            </button>
            <button
              onClick={displayCompletedCourses}
              className="px-4 py-2 rounded-3xl focus:outline-none focus:bg-gray-200"
            >
              Completed
            </button>
          </div>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Sort By:</span>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="focus:outline-none cursor-pointer text-sm"
              >
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
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
          {displayAll &&
            (courses.length > 0 ? (
              filteredAndSortedCourses().map((course) => (
                <Link
                  key={course._id}
                  to="/course/coursePage"
                  state={{ course: course }}
                >
                  <UserCourseCard course={course} />
                </Link>
              ))
            ) : (
              <p>No new courses available.</p>
            ))}
          {displayEnrolled &&
            (enrolledCourses.length > 0 ? (
              filteredAndSortedCourses().map(
                (course) =>
                  course && course.course_id && course.course_id._id && (
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
                  )
              )
            ) : (
              <p>No courses enrolled</p>
            ))}
          {displayCompleted &&
            (enrolledCourses.some(
              (course) => course.progressPercentage == 100.0
            ) ? (
              filteredAndSortedCourses().map(
                (course) =>
                  course &&
                  course.course_id &&
                  course.course_id._id &&
                  course.progressPercentage == 100.0 && (
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
                  )
              )
            ) : (
              <p>No courses completed</p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCourse;
