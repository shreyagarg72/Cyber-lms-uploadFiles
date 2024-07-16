import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faBell,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Notification from "./Notification";
import ToggleProfile from "./ToggleProfile";
import { useMediaQuery } from "react-responsive";
import ProfileBoy from "../../assets/Profile.webp";

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 450 });
  const isMobileandTablet = useMediaQuery({ maxWidth: 1024 });

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const closeProfile = () => {
    setShowProfile(false);
  };

  return (
    <div
       className={`bg-white shadow-md fixed top-8 w-4/5 left-20 z-10 rounded-3xl  ${
        isMobileandTablet ? "w-full" : "w-3/6"
      }`}
      style={{ left: `17rem` }}
    >
      <div
       className={`flex justify-between items-center ${
          isMobile ? "p-2" : "py-2 pl-2 pr-6"
        }`}
      >
        <div
          className={`flex items-center bg-slate-200 rounded-full px-4 py-2 ${
            isMobile ? "w-52" : "w-80"
          }`}
        >
          <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent focus:outline-none"
          />
        </div>
        <div className="flex items-center space-x-4 md:space-x-6 lg:space-x-8">
          <Link onClick={toggleNotifications}>
            <FontAwesomeIcon
              icon={faBell}
              className="text-gray-700 text-xl lg:text-2xl"
            />
          </Link>
          <Link onClick={toggleProfile}>
            <img
              src={ProfileBoy}
              alt="Profile"
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
            />
          </Link>
          {showProfile && <ToggleProfile closeProfile={closeProfile} />}
          {showNotifications && <Notification />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
