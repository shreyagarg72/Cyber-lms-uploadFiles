import React from "react";
// import Navbar from "./components/Navbar";
import Sidebar from "./Sidebar";
// import Footer from "./components/Footer";
import { useMediaQuery } from "react-responsive";

const MainLayout = ({ children }) => {
  const isMobile = useMediaQuery({maxWidth : 767})
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <div className="flex flex-grow overflow-hidden pt-16">
        <Sidebar className="h-full flex-shrink-0 bg-slate-200" />
        <main className={`flex-grow p-6 h-full ${isMobile ? "" : "ml-64"}`}>
          {children}
        </main>
      </div>
      {/* Uncomment if you want to include the Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
