import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from '/src/assets/64d28d4c5130957a48d0e325_Logo.svg';
import { auth } from '../firebase';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      // Sign-out successful.
      console.log("User logged out");
      // Redirect to the sign-in page
      window.location.href = "/";
    }).catch((error) => {
      // An error happened.
      console.error(error);
    });
  };

  return (
    <div className=' flex justify-center'>
      <nav className=' bg-gray-300 w-full flex items-center justify-between px-4 py-3 fixed top-0 shadow-md '>
        <div className="flex items-center w-44 h-7 rounded-full ml-5">
          <img src={logo} alt="Logo" />
        </div>

        <div className="flex items-center space-x-10 mr-10">
          <Link><FontAwesomeIcon icon={faBell} className="text-gray-700 text-3xl" /></Link>
          <Link><FontAwesomeIcon icon={faUser} className="text-gray-700 text-3xl" /></Link>
        </div>

        {/* Dropdown */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 bg-blue-800 w-full border border-gray-300 rounded-md shadow-md z-50">
            <Link to="/profile" className="block px-4 py-3 hover:bg-blue-700">
              <FontAwesomeIcon icon={faBell} className="text-white mr-2" />
            </Link>
            <button className="block px-4 py-3 hover:bg-blue-700 w-full text-left" onClick={handleLogout}>
              <FontAwesomeIcon icon={faUser} className="text-white mr-2" />
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
