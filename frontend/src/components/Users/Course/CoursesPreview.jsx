import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUser, faBell, faSearch, faUsers, faFileAlt, faVideo, faClock, faTools, faShieldAlt, faShieldVirus, faNetworkWired, faKey, faChevronLeft, faChevronRight, faBackward, faForward } from '@fortawesome/free-solid-svg-icons';
import image01 from "../../../assets/01.jpg";
import ProfileBoy from "../../../assets/Profile.webp"
import Notification from '../Notification';
import { useLocation } from "react-router-dom";

const CoursePreviewPage = () => {
    const location = useLocation();

    const { course } = location.state || {}; // Default to an empty object if state is undefined
    console.log(course);
    const weekContent = course.content;
  

    const [showNotifications, setShowNotifications] = useState(false);
  
    const handleNotification = ()=>{
        setShowNotifications(!showNotifications);
    }

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-100">
            <div className='flex justify-center pb-9'>
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
                        <Link onClick={handleNotification}><FontAwesomeIcon icon={faBell} className="text-gray-700 text-3xl" /></Link>
                        <Link to="/profile"><img src={ProfileBoy} // Placeholder image
                            alt="Profile"
                            className="w-10 h-10 rounded-full" /></Link>
                    </div>
                    {showNotifications && (<Notification/>)}
                </div>
            </div>
            <div className="flex flex-col gap-6 md:flex-row">
                <div className="w-2/3">
                    <div className="bg-white p-3 rounded-lg shadow-md">
                        <div className="relative">
                            <img src={image01} alt="Course Image" className="w-full h-96 rounded-lg" />
                            <div className="absolute bottom-4 left-4 flex items-center space-x-2">

                            </div>
                            <div className='flex justify-between mt-4'>
                                <button className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-full">
                                    <FontAwesomeIcon icon={faBackward} className='mr-1' /> Previous
                                </button>
                                <button className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-full">
                                    Next <FontAwesomeIcon icon={faForward} className='ml-1' />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 mt-6 rounded-lg shadow-md">
                        <div className="flex items-center space-x-2 mb-2">
                            <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                            <span className="text-yellow-500">4.6</span>
                            <span className="text-sm text-gray-600">based on</span>
                            <a href="#" className="underline text-blue-400">10 reviews</a>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800">{course.courseName}</h1>
                        <div className="flex items-center mt-2 space-x-2">
                            <span className="px-2 py-1 bg-yellow-300 text-yellow-800 rounded">Medium</span>
                            <span className="px-2 py-1 bg-gray-300 text-gray-800 rounded flex items-center">
                                <FontAwesomeIcon icon={faTools} className='mr-2' />
                                Kali Linux
                            </span>
                        </div>
                        <p className="mt-4 text-gray-600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Content</h2>
                        <div className="space-y-4">
                        {weekContent.map((week,index)=>(
                            <details key={index}  className="p-4 bg-gray-100 rounded-lg">
                                <summary className="font-semibold text-gray-800 cursor-pointer">{week.title}</summary>
                                <ul className="mt-2 list-disc list-inside">
                                    {week.submodules.map((item, index) => (
                                        <li key={index} className="text-gray-600">{item.title}</li>
                                    ))}
                                </ul>
                            </details>
                        ))}
                           
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoursePreviewPage;
