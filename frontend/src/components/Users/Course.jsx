import React from 'react';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faSearch, faBell } from "@fortawesome/free-solid-svg-icons";
import ProfileBoy from "../../assets/Profile.webp"

const AdminCourse = () => {
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
            <Link to="/profile"><img src={ProfileBoy} // Placeholder image
              alt="Profile"
              className="w-10 h-10 rounded-full" /></Link>
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
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-around ">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />

      </div>

      <div className="bg-white p-4 mt-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">Courses</h2>
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Instructor</th>
              <th className="py-2 px-4 border-b text-left">Level</th>
              <th className="py-2 px-4 border-b text-left">Tools</th>
              <th className="py-2 px-4 border-b text-left">Modules</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b">Introduction to Cyber Security</td>
              <td className="py-2 px-4 border-b">
                <FontAwesomeIcon icon={faUser} className="mr-2" /> Prof Raj Sharma
              </td>
              <td className="py-2 px-4 border-b">
                <span className="bg-yellow-400 text-black py-1 px-3 rounded-full text-xs">Medium</span>
              </td>
              <td className="py-2 px-4 border-b">Kali Linux</td>
              <td className="py-2 px-4 border-b">5 Modules</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Ethical Hacking Essentials</td>
              <td className="py-2 px-4 border-b">
                <FontAwesomeIcon icon={faUser} className="mr-2" /> Prof Raj Sharma
              </td>
              <td className="py-2 px-4 border-b">
                <span className="bg-red-400 text-black py-1 px-3 rounded-full text-xs">Hard</span>
              </td>
              <td className="py-2 px-4 border-b">Open VAS</td>
              <td className="py-2 px-4 border-b">10 Modules</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Network Scanning</td>
              <td className="py-2 px-4 border-b">
                <FontAwesomeIcon icon={faUser} className="mr-2" /> Prof Raj Sharma
              </td>
              <td className="py-2 px-4 border-b">
                <span className="bg-green-400 text-black py-1 px-3 rounded-full text-xs">Easy</span>
              </td>
              <td className="py-2 px-4 border-b">Angry IP Scanner</td>
              <td className="py-2 px-4 border-b">13 Modules</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCourse;
