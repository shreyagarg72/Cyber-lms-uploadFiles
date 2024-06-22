import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFileAlt, faCheckCircle, faTimesCircle, faClock, faSearch, faUsers, faBell, faFolderOpen, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';
import image01 from "../../assets/Screenshot 2024-06-19 001148.png"
import ProfileBoy from "../../assets/Profile.webp"
import PT from "../../assets/DashboardUI__109615071.png"
import NS from "../../assets/DashboardUI_images1.png"
import DC from "../../assets/DashboardUI__30764161.png"
import DM from "../../assets/DashboardUI__183600437cryptographyiconblockchaintechnologyrelatedvectorillustration1.png"
import WD from "../../assets/DashboardUI_malwaresymbolredisolatedonwhitebackgroundfreevector1.png"

const DashboardContent = () => {


  return (
    <div className='min-h-full'>
      {/* <Navbar /> */}
      <div className='flex justify-center'>
        <div className=' bg-white px-2 rounded-3xl py-2 w-4/5 absolute top-11 flex items-center justify-between  shadow-xl'>
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
                  <th className="py-2 px-4 border-b text-left">Next Assignment</th>
                  <th className="py-2 px-4 border-b text-left">Progress</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b">Ethical Hacking Essentials</td>
                  <td className="py-2 px-4 border-b">
                    <FontAwesomeIcon icon={faUser} className="mr-2" /> Prof Raj Sharma
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span className="bg-yellow-400 text-black py-1 px-3 rounded-full text-xs">Medium</span>
                  </td>
                  <td className="py-2 px-4 border-b">Jun 8, 2024 7:00pm</td>
                  <td className="py-2 px-4 border-b">
                    <div className="w-28 bg-gray-200 rounded-full h-1.5">
                      <div className="bg-green-500 h-full rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Ethical Hacking Essentials</td>
                  <td className="py-2 px-4 border-b">
                    <FontAwesomeIcon icon={faUser} className="mr-2" /> Prof Raj Sharma
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span className="bg-red-400 text-black py-1 px-3 rounded-full text-xs">Hard</span>
                  </td>
                  <td className="py-2 px-4 border-b">Jun 8, 2024 7:00pm</td>
                  <td className="py-2 px-4 border-b">
                    <div className="w-28 bg-gray-200 rounded-full h-1.5">
                      <div className="bg-green-500 h-full rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Ethical Hacking Essentials</td>
                  <td className="py-2 px-4 border-b">
                    <FontAwesomeIcon icon={faUser} className="mr-2" /> Prof Raj Sharma
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span className="bg-green-400 text-black py-1 px-3 rounded-full text-xs">Easy</span>
                  </td>
                  <td className="py-2 px-4 border-b">Jun 8, 2024 7:00pm</td>
                  <td className="py-2 px-4 border-b">
                    <div className="w-28 bg-gray-200 rounded-full h-1.5">
                      <div className="bg-green-500 h-full rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-slate-100 p-4 rounded-lg shadow-md mt-4">
            <div className='flex justify-between'>
              <h2 className="text-xl font-bold mb-4">Explore Courses</h2>
              <Link>
                <button className='mr-5 w-20 bg-blue-950 text-white rounded-full'>View all</button>
              </Link>
            </div>
            <div className='flex flex-row gap-4'>
              <div className="bg-white p-3 rounded-lg shadow-2xl w-60 cursor-pointer hover:scale-105 transition duration-200">
                <img src={image01} alt="image" className=' h-32 w-full rounded-md mb-2' />
                <span className="bg-yellow-200 text-yellow-700 py-0.5 px-2 text-center rounded-xl text-xs">Medium</span>
                <div className='grid grid-cols-3 space-x-3 mt-2'>
                  <div className='flex items-center text-xs'>
                    <FontAwesomeIcon icon={faFolderOpen} className="mr-1" />
                    <span>Modules</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <FontAwesomeIcon icon={faCalendarDays} className="mr-1" />
                    <span>12 days</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <FontAwesomeIcon icon={faUsers} className="mr-1" />
                    <span>45</span>
                  </div>
                </div>
                <h3 className="text-md font-bold mb-1">Introduction to Cyber Security</h3>
                <p className="text-gray-500 text-xs mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center text-gray-500 text-xs">
                    <FontAwesomeIcon icon={faUser} className="mr-1" /> by Alam Lin
                  </span>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-2xl w-60 cursor-pointer hover:scale-105 transition duration-200">
                <img src={image01} alt="image" className=' h-32 w-full rounded-md mb-2' />
                <span className="bg-yellow-200 text-yellow-700 py-0.5 px-2 text-center rounded-xl text-xs">Medium</span>
                <div className='grid grid-cols-3 space-x-3 mt-2'>
                  <div className='flex items-center text-xs'>
                    <FontAwesomeIcon icon={faFolderOpen} className="mr-1" />
                    <span>Modules</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <FontAwesomeIcon icon={faCalendarDays} className="mr-1" />
                    <span>12 days</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <FontAwesomeIcon icon={faUsers} className="mr-1" />
                    <span>45</span>
                  </div>
                </div>
                <h3 className="text-md font-bold mb-1">Introduction to Cyber Security</h3>
                <p className="text-gray-500 text-xs mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center text-gray-500 text-xs">
                    <FontAwesomeIcon icon={faUser} className="mr-1" /> by Alam Lin
                  </span>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-2xl w-60 cursor-pointer hover:scale-105 transition duration-200">
                <img src={image01} alt="image" className=' h-32 w-full rounded-md mb-2' />
                <span className="bg-yellow-200 text-yellow-700 py-0.5 px-2 text-center rounded-xl text-xs">Medium</span>
                <div className='grid grid-cols-3 space-x-3 mt-2'>
                  <div className='flex items-center text-xs'>
                    <FontAwesomeIcon icon={faFolderOpen} className="mr-1" />
                    <span>Modules</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <FontAwesomeIcon icon={faCalendarDays} className="mr-1" />
                    <span>12 days</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <FontAwesomeIcon icon={faUsers} className="mr-1" />
                    <span>45</span>
                  </div>
                </div>
                <h3 className="text-md font-bold mb-1">Introduction to Cyber Security</h3>
                <p className="text-gray-500 text-xs mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center text-gray-500 text-xs">
                    <FontAwesomeIcon icon={faUser} className="mr-1" /> by Alam Lin
                  </span>
                </div>
              </div>
            </div>


          </div>
        </div>
        <div>
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <div className='flex justify-between'>
              <div>
                <h2 className="text-xl font-bold">Today</h2>
                <h1 className='mb-2 text-sm'>June 18, 2024</h1>
              </div>
              <Link>
                <button className='w-20 bg-blue-950 rounded-xl text-white text-sm'>View all</button>
              </Link>
            </div>
            <div className="flex flex-col">
              <div className="bg-gray-100 p-4 rounded-lg mb-2 flex justify-between items-center">
                <div>
                  <h3 className="text-md font-bold">Ethical Hacking</h3>
                  <p className="text-gray-500 text-sm"><FontAwesomeIcon icon={faClock} className='mx-2' />3:00-4:00pm <br /> <br /> Prof Raj Sharma</p>
                </div>
                <button className="bg-blue-900 text-white py-1 px-7 rounded-full">Join</button>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg mb-4 flex justify-between items-center">
                <div>
                  <h3 className="text-md font-bold">Ethical Hacking</h3>
                  <p className="text-gray-500 text-sm"><FontAwesomeIcon icon={faClock} className='mx-2' />3:00-4:00pm <br /> <br /> Prof Raj Sharma</p>
                </div>
                <button className="bg-blue-900 text-white py-1 px-7 rounded-full">Join</button>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg mb-4 flex justify-between items-center">
                <div>
                  <h3 className="text-md font-bold">Ethical Hacking</h3>
                  <p className="text-gray-500 text-sm"><FontAwesomeIcon icon={faClock} className='mx-2' />3:00-4:00pm <br /> <br /> Prof Raj Sharma</p>
                </div>
                <button className="bg-blue-900 text-white py-1 px-7 rounded-full">Join</button>
              </div>
              {/* Repeat for other events */}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Course Overview</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faFileAlt} className="text-blue-500 mr-2" />
                  <span>10 Courses</span>
                </div>
                <span className="text-gray-500">enrolled</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
                  <span>56 Lessons</span>
                </div>
                <span className="text-gray-500">contained</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 mr-2" />
                  <span>5 Practical Labs</span>
                </div>
                <span className="text-gray-500">involvement</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faUser} className="text-yellow-500 mr-2" />
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
            <img src={PT} alt="" className='w-9 h-9 mr-4' />
            <span>Penetration Testing</span>
          </div>
          <div className="flex items-center text-sm p-4 rounded-lg cursor-pointer hover:scale-110 transition duration-200">
            <img src={NS} alt="" className='w-9 h-9 mr-4' />
            <span>Network Security</span>
          </div>
          <div className="flex items-center text-sm p-4 rounded-lg cursor-pointer hover:scale-110 transition duration-200">
            <img src={DC} alt="" className='w-9 h-9 mr-4' />
            <span>Data Privacy</span>
          </div>
          <div className="flex items-center text-sm p-4 rounded-lg cursor-pointer hover:scale-110 transition duration-200">
            <img src={DM} alt="" className='w-9 h-9 mr-4' />
            <span>Digital Marketing</span>
          </div>
          <div className="flex items-center text-sm p-4 rounded-lg cursor-pointer hover:scale-110 transition duration-200">
            <img src={WD} alt="" className='w-9 h-9 mr-4' />
            <span>Web Development</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
