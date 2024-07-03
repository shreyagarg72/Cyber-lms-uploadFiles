import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faPlayCircle,
  faQuestionCircle,
  faGear,
  faFile,
  faComments,
  faTimes,
  faBars,
  faPeopleGroup,
  faCalendar
} from "@fortawesome/free-solid-svg-icons";
import dashlogo from "../../assets/dashboard.svg";
import image01 from "../../assets/CyberPeace Logo Verticle-03.png"
import { useMediaQuery } from "react-responsive";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const navItems = [
    { to: "/Dashboard", icon: dashlogo, label: "Dashboard" },
    { to: "/course", icon: faBook, label: "Courses" },
    { to: "/community", icon: faPeopleGroup, label: "Community" },
    { to: "/calendar", icon: faCalendar, label: "Calendar" },
    // { to: "/doubt", icon: faQuestionCircle, label: "Doubts" },
    // { to: "/feedback", icon: faComments, label: "Feedback" },
    // { to: "/report", icon: faFile, label: "Report" },
    // { to: "/settings", icon: faGear, label: "Settings" },
  ];

  return (
    <div className="relative">
      {isMobile && (
        <button
          className="md:hidden bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-sm absolute top-2 left-0 ml-2 border-black z-20"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-lg" />
        </button>
      )}
      {(isOpen || !isMobile) && (
        <div className={`bg-gray-800 text-white w-56 min-h-screen flex flex-col top-8 ml-7 rounded-3xl ${isMobile ? 'absolute top-0 left-0 h-full' : 'fixed left-3'}`}>
          <div className="p-3 flex justify-center ">
            <img src={image01} alt="logo" className="mt-3 w-4/5" />
          </div>
          <nav className="flex-1 mt-8">
            <ul>
              {navItems.map(({ to, icon, label }) => (
                <li key={to}>
                  <Link to={to} className="block" onClick={closeSidebar}>
                    <div className={`flex items-center p-4 ${location.pathname.startsWith(to) ? 'bg-blue-500 rounded-full mx-2.5 translate-x-1 -translate-y-2 shadow-2xl transition duration-200 shadow-blue-700 my-3' : 'hover:bg-gray-600 transition duration-200 hover:translate-x-1 hover:-translate-y-1 hover:mx-2.5 hover:rounded-2xl hover:text-lg'} transition-colors`}>
                      {typeof icon === 'string' ? (
                        <img src={icon} alt={label} className="h-5 w-5 mr-3" />
                      ) : (
                        <FontAwesomeIcon icon={icon} className="h-5 w-5 mr-3" />
                      )}
                      <span className={`${location.pathname.startsWith(to) ? "text-lg" : ""}`}>{label}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
