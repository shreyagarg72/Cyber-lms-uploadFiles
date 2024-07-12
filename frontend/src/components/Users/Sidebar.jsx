import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBars,
  faPeopleGroup,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import dashlogo from "../../assets/dashboard.svg";
import image01 from "../../assets/CyberPeace Logo Verticle-03.png";
import { useMediaQuery } from "react-responsive";
import LowerBar from './LowerBar';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeSidebar();
  };

  const isMobile = useMediaQuery({ maxWidth: 1024 });

  const navItems = [
    { to: "/Dashboard", icon: dashlogo, label: "Dashboard" },
    { to: "/course", icon: faBook, label: "Courses" },
    { to: "/community", icon: faPeopleGroup, label: "Community" },
  ];

  return (
    <div className="flex">

      {(isOpen || !isMobile) && (
        <div className={`bg-gray-800 text-white w-56 min-h-screen flex flex-col rounded-3xl  ${isMobile ? 'absolute top-0 left-0 h-full z-50' : 'fixed top-0 left-0 ml-3'}`}>
          <div className="p-3 flex justify-center ">
            <img src={image01} alt="logo" className="mt-3 w-4/5" />
          </div>
          <nav className="flex-1 mt-8">
            <ul>
              {navItems.map(({ to, icon, label }) => (
                <li key={to}>
                  <div className="block" onClick={() => handleNavigation(to)}>
                    <div className={`flex items-center p-4 cursor-pointer ${location.pathname.startsWith(to) ? 'bg-blue-500 rounded-full mx-2.5 translate-x-1 -translate-y-2 shadow-2xl transition duration-200 shadow-blue-700 my-3' : 'hover:bg-gray-600 transition duration-200 hover:translate-x-1 hover:-translate-y-1 hover:mx-2.5 hover:rounded-2xl hover:text-lg'} transition-colors`}>
                      {typeof icon === 'string' ? (
                        <img src={icon} alt={label} className="h-5 w-5 mr-3" />
                      ) : (
                        <FontAwesomeIcon icon={icon} className="h-5 w-5 mr-3" />
                      )}
                      <span className={`${location.pathname.startsWith(to) ? "text-lg" : ""}`}>{label}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {isMobile && !isOpen && <LowerBar navItems={navItems} handleNavigation={handleNavigation} />}
    </div>
  );
};

export default Sidebar;
