import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CourseCard from './CourseCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faBell, faPlus } from "@fortawesome/free-solid-svg-icons";
import ProfileBoy from "../../assets/Profile.webp";

const AdminCourse = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="min-h-screen p-6">
      <div className='flex justify-center'>
        <div className=' bg-white px-2 rounded-3xl py-2 w-4/5 flex items-center justify-between absolute top-11 shadow-xl'>
          <div className="flex items-center bg-slate-200 rounded-full px-4 py-2 w-full max-w-md ">
            <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent focus:outline-none"
            />
          </div>
          <div className="flex items-center space-x-10 mr-10">
            <Link><FontAwesomeIcon icon={faBell} className="text-gray-700 text-3xl" /></Link>
            <Link to="/profile"><img src={ProfileBoy} alt="Profile" className="w-10 h-10 rounded-full" /></Link>
          </div>
        </div>
      </div>
      <div className=" bg-white mt-6 rounded-lg shadow-md p-2 mb-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <button className="px-4 py-2 rounded-lg focus:outline-none focus:bg-gray-300">All</button>
            <button className="px-4 py-2 rounded-lg focus:outline-none focus:bg-gray-300">Completed</button>
            <button className="px-4 py-2 rounded-lg focus:outline-none focus:bg-gray-300">Active</button>
          </div>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Sort By:</span>
              <select className="focus:outline-non cursor-pointer text-sm">
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
            <div className="relative">
              <button onClick={handleDropdownToggle}>
                <div className="flex items-center space-x-3 bg-blue-400 p-2 rounded-2xl">
                  <span className="text-black font-medium">Add</span>
                  <FontAwesomeIcon icon={faPlus} />
                </div>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                  <button onClick={() => navigate('/upload')} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Upload</button>
                  <button onClick={() => navigate('/secure-upload')} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Secure Upload</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-around">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </div>
  );
};

export default AdminCourse;
