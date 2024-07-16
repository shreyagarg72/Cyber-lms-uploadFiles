import React, { useState } from "react";
import { Link } from "react-router-dom";
import profile from "../../assets/Profile.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";

const ToggleProfile = ({ closeProfile }) => {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const [close, setClose] = useState(false);
  const ToggleProfileClose = () => {
    setClose(!close);
    closeProfile();
  };
  return (
    <div className="absolute z-520 top-10 right-0 bg-white shadow-lg rounded-lg p-4 w-72">
      <div className="flex justify-end">
        <FontAwesomeIcon
          icon={faMultiply}
          className="cursor-pointer"
          onClick={closeProfile}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex justify-center">
          <img src={profile} alt="profile" className="w-32 h-32 rounded-full" />
        </div>
        <Link to="/profile" onClick={ToggleProfileClose}>
          <div className="bg-gray-200 p-2 rounded-lg shadow-sm hover:scale-105 duration-200">
            <div className="flex justify-center mb-1">
              <h1 className="text-lg  font-semibold">My Profile</h1>
            </div>
          </div>
        </Link>
        <Link>
          <div className="bg-gray-200 p-2 rounded-lg shadow-sm hover:scale-105 duration-200">
            <div className="flex justify-center mb-1">
              <h1 className="text-lg  font-semibold">Setting</h1>
            </div>
          </div>
        </Link>
        <Link to="/">
          <div className="bg-gray-200 p-2 rounded-lg shadow-sm hover:scale-105 duration-200">
            <div className="flex justify-center mb-1">
              {isAuthenticated ? (
                <h1
                  className="text-lg  font-semibold"
                  onClick={(e) => logout()}
                >
                  Logout
                </h1>
              ) : (
                <h1 className="text-lg  font-semibold">Logout</h1>
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ToggleProfile;
