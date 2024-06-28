import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserCourseCard from "./CourseCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell } from "@fortawesome/free-solid-svg-icons";
import ProfileBoy from "../../../assets/Profile.webp";

const   AdminCourse = () => {
  const [courses, setCourses] = useState([]);

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
    <div className="min-h-screen p-6">
      <div className="flex justify-center">
        <div className=" bg-white px-2 rounded-3xl py-2 w-4/5 flex items-center justify-between absolute top-11 shadow-xl">
          <div className="flex items-center bg-slate-200 rounded-full px-4 py-2 w-full max-w-md ">
            <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent focus:outline-none"
            />
          </div>
          <div className="flex items-center space-x-10 mr-10">
            <Link>
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
        </div>
      </div>
      <div className=" bg-white mt-6 rounded-lg shadow-md p-2 mb-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <button className="px-4 py-2 rounded-lg focus:outline-none focus:bg-gray-300">
              All
            </button>
            <button className="px-4 py-2 rounded-lg focus:outline-none focus:bg-gray-300">
              Completed
            </button>
            <button className="px-4 py-2 rounded-lg focus:outline-none focus:bg-gray-300">
              Active
            </button>
          </div>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Sort By:</span>
              <select className="focus:outline-none cursor-pointer text-sm">
                <option>Last Active</option>
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
          {courses.map((course) => (
            <Link
              key={course._id}
              to="/course/coursePage"
              state={{course:course}}
            >
              <UserCourseCard course={course} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCourse;
