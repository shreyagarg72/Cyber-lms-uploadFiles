import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from 'react-router-dom';

const LowerBar = ({ navItems, handleNavigation }) => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white flex justify-around py-2 z-50">
      {navItems.map(({ to, icon, label }) => (
        <div key={to} className="flex items-center" onClick={() => handleNavigation(to)}>
          <div className={`flex flex-col space-y-2 justify-center items-center  ${location.pathname.startsWith(to) ? 'text-blue-500' : 'text-white'} transition duration-200`}>
            {typeof icon === 'string' ? (
              <img src={icon} alt={label} className=" h-5 w-5" />
            ) : (
              <FontAwesomeIcon icon={icon} className="h-5 w-5" />
            )}
            <span className="text-xs ">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LowerBar;
