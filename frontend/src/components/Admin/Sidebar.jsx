import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCalendar,
  faTimes,
  faBars,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import dashlogo from "../../assets/dashboard.svg";
import image01 from "../../assets/CyberPeace Logo Verticle-03.png";
import { useMediaQuery } from "react-responsive";
import LowerBar from "./LowerBar";

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

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const navItems = [
    { to: "/AdminDashboard", icon: dashlogo, label: "Dashboard" },
    { to: "/AdminCourse", icon: faBook, label: "Courses" },
    { to: "/AdminCommunity", icon: faPeopleGroup, label: "Community" },
    { to: "/Admincalander", icon: faCalendar, label: "Calendar" },
  ];

  return (
    <div className="flex">
      {(isOpen || !isMobile) && (
        <div
          className={`bg-gray-800 text-white w-56 flex flex-col rounded-3xl ${
    isMobile
      ? "absolute top-0 left-0 h-full z-50"
      : "fixed top-0 bottom-0 mx-3 my-4"
  }`}
        >
          <div className="p-3 flex justify-center ">
            <img src={image01} alt="logo" className="mt-3 w-4/5" />
          </div>
          <nav className="flex-1 mt-8">
            <ul>
              {navItems.map(({ to, icon, label }) => (
                <li key={to}>
                  <div className="block mb-5" onClick={() => handleNavigation(to)}>
                    <div
                        className={`flex items-center px-4 py-3 cursor-pointer rounded-full mx-5 ${
                        location.pathname.startsWith(to)
                          ? "bg-white text-gray-800 "
                          : "hover:bg-gray-600 "
                      } transition-colors`}
                    >
                      {typeof icon === "string" ? (
                        <img src={icon} alt={label} className="h-5 w-5 mr-3" style={{
                            filter: location.pathname.startsWith(to)
                              ? "invert(0%)"
                              : "invert(100%)",
                          }}/>
                      ) : (
                        <FontAwesomeIcon icon={icon} className="h-5 w-5 mr-3" />
                      )}
                      <span
                        className={`${
                          location.pathname.startsWith(to) ? "text-lg" : ""
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {isMobile && !isOpen && (
        <LowerBar navItems={navItems} handleNavigation={handleNavigation} />
      )}
    </div>
  );
};

export default Sidebar;
