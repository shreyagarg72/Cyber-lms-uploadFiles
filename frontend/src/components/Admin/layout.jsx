import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useMediaQuery } from "react-responsive";

const MainLayout = ({ children }) => {
  const isMobileandTablet = useMediaQuery({maxWidth : 1024})
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <div className={`flex justify-center h-14 ${isMobileandTablet ? "" : ""}`}>
        <Navbar />
      </div>
      
      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={`${isMobileandTablet ? "" : "w-64"}`}>
          <Sidebar />
        </div>
        
        {/* Main Content Area */}
        <main className="flex-1 p-4 pb-20 w-5/6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
