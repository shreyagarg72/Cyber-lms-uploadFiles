import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faBell,
  faSearch,
  faTimes,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import Notification from "./Users/Notification";
import ToggleProfile from "./Users/ToggleProfile";
import { useMediaQuery } from "react-responsive";
import ProfileBoy from "../assets/Profile.webp";
import { io } from "socket.io-client";
import axios from "axios";
import { useAuth } from "../auth/AuthProvider";
import image01 from "../assets/CyberPeace Logo Verticle-03.png";

const socket = io(import.meta.env.VITE_BACKEND_BASEURL);

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notificationCount, setNotificationCount] = useState(() => {
    return parseInt(localStorage.getItem("notificationCount"), 10) || 0;
  });
  const [isProfileComplete, setIsProfileComplete] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(false); // New state for search bar visibility
  const isMobile = useMediaQuery({ maxWidth: 450 });
  const isMobileandTablet = useMediaQuery({ maxWidth: 1024 });
  const [search,setSearch]= useState("");
  const [searchData,setSearchData]= useState([]);
  const [selectedItem,setSelectedItem]= useState(-1);

  const { auth } = useAuth();

  const navigate = useNavigate();

  const handleSearchChange = e=>{
    setSearch(e.target.value);
   
  }

  const handleSearchClose = e=>{
    setSearch("");
    setSearchData([]);
  };

  const handleKeyDown = e=>{
    const key = e.key;
    if(selectedItem<searchData.length){
      if(key === "ArrowUp" && selectedItem>0){
        setSelectedItem(prev=>prev-1);
      }
      else if(key === "ArrowDown" && selectedItem<searchData.length-1){
        setSelectedItem(prev=>prev+1);
      }
      else if(key === "Enter" && selectedItem>=0){
        navigate('/course/coursePage', { state: { course: searchData[selectedItem] } });
        setSearchData([]);
      }
    }else{
      setSelectedItem(-1);
    }
    
  }

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_BASEURL}/api/courses`
        );
        if (response.ok) {
          const data = await response.json();
          const newFilterData= data.filter(
            course=>{
              console.log(search);
              return course.courseName.includes(search)
            }
          )
          setSearchData(newFilterData);
        } else {
          const errorData = await response.text();
          console.error("Error fetching courses:", errorData);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    if(search!==""){
      fetchCourses();
    }
    else{
      setSearchData([]);
    }
  }, [search]);

  useEffect(() => {
    const fetchProfileStatus = async () => {
      if (auth.isAuthenticated && auth.token) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_BASEURL}/api/userProfileStatus`,
            {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            }
          );
          setIsProfileComplete(response.data.isProfileComplete);
        } catch (error) {
          console.error("Failed to fetch profile status:", error);
        }
      }
    };

    fetchProfileStatus();

    socket.on("newEvent", (event) => {
      setNotificationCount((prevCount) => {
        const newCount = prevCount + 1;
        localStorage.setItem("notificationCount", newCount);
        return newCount;
      });
    });

    return () => {
      socket.off("newEvent");
    };
  }, [auth]);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const closeProfile = () => {
    setShowProfile(false);
  };

  const handleNotificationCountUpdate = (count) => {
    setNotificationCount(count);
    localStorage.setItem("notificationCount", count);
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <div
      className={`bg-white shadow-md fixed top-8 w-4/5 left-20 z-10 rounded-3xl ${
        isMobileandTablet ? "w-full" : "w-3/6"
      }`}
      style={isMobile ? { left: "0" } : { left: "17rem" }}
    >
      <div
        className={`flex items-center ${
          isMobile
            ? "p-2 justify-end space-x-5"
            : "py-2 pl-2 pr-6 justify-between"
        }`}
      >
        {isMobile && (
          <div className="w-32 absolute left-5">
            <img
              src={image01}
              alt="logo"
              className="filter grayscale brightness-50 contrast-200"
            />
          </div>
        )}
        {isMobile ? (
          <div onClick={toggleSearchBar}>
            <FontAwesomeIcon
              icon={showSearchBar ? faTimes : faSearch}
              className="text-gray-500 text-xl"
            />
          </div>
        ) : (
          <div
            className={`flex items-center bg-slate-200 rounded-3xl px-4 py-2 ${
              isMobile ? "w-52" : "w-80"
            } m-0`}
          >
            <FontAwesomeIcon icon={search ? faTimes : faSearch} onClick={handleSearchClose} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent focus:outline-none"
              onChange={handleSearchChange}
              value={search}
              onKeyDown={handleKeyDown}
            />
          </div>
        )}
        {showSearchBar && isMobile && (
          <div className="flex items-center bg-white rounded-3xl px-4 py-2 h-12 w-64 absolute top-0 left-0 z-20">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent focus:outline-none"
              onChange={handleSearchChange}
              value={search}
            />
          </div>
        )}
        <div className="search-results absolute w-80 bg-white top-12  rounded flex flex-col shadow-md">
        {/* map through search data and display its contents */}
         {searchData.map((course,index)=>{
         return  <Link
                key={course._id}
                to="/course/coursePage"
                state={{course:course}}
                className={selectedItem=== index? "bg-gray-200  px-4 py-3":"  px-4 py-3"}
              >{course.courseName}</Link>
         })}
          
        </div>
        <div className="flex items-center space-x-4 md:space-x-6 lg:space-x-8">
          <Link onClick={toggleNotifications} className="relative">
            <FontAwesomeIcon
              icon={faBell}
              className="text-gray-700 text-xl lg:text-2xl"
            />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-2 h-2 p-2 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </Link>
          <Link onClick={toggleProfile} className="relative">
            <img
              src={ProfileBoy}
              alt="Profile"
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
            />
            {!isProfileComplete && (
              <FontAwesomeIcon
                icon={faExclamationCircle}
                className="text-red-500 absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2"
              />
            )}
          </Link>
          {showProfile && <ToggleProfile closeProfile={closeProfile} />}
          {showNotifications && (
            <Notification
              setNotificationCount={handleNotificationCountUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
