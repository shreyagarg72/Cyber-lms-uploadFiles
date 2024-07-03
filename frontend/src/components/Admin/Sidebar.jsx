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
  faPeopleGroup
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
    { to: "/AdminDashboard", icon: dashlogo, label: "Dashboard" },
    { to: "/AdminCourse", icon: faBook, label: "Courses" },
    { to: "/AdminCommunity", icon: faPeopleGroup, label: "Community" },
    { to: "/Calendar", icon: faPeopleGroup, label: "Calendar" },
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
// import React, { useState } from "react";
// import axios from "axios";
// import { ThreeDots } from "react-loader-spinner";

// const Upload = () => {
//   const [img, setImg] = useState(null);
//   const [video, setVideo] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const uploadFile = async (type) => {
//     const data = new FormData();
//     data.append("file", type === 'image' ? img : video);
//     data.append("upload_preset", type === 'image' ? 'images_preset' : 'videos_preset');

//     try {
//       const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
//       const resourceType = type === 'image' ? 'image' : 'video';
//       const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
//       const res = await axios.post(api, data);
//       const { secure_url } = res.data; // Use secure_url for Cloudinary
//       return secure_url;
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const imgUrl = await uploadFile('image');
//       const videoUrl = await uploadFile('video');

//       // Example of using backend base URL from environment variable
//       const backendBaseUrl = import.meta.env.VITE_BACKEND_BASEURL;
//       await axios.post(`${backendBaseUrl}/api/videos/upload`, { imgUrl, videoUrl });

//       setImg(null);
//       setVideo(null);
//       console.log("Files uploaded and saved successfully");
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//     } 
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="video">Video:</label>
//           <br />
//           <input type="file" accept="video/*" id="video" onChange={(e) => setVideo(e.target.files[0])} />
//         </div>
//         <br />
//         <div>
//           <label htmlFor="img">Image:</label>
//           <br />
//           <input type="file" accept="image/*" id="img" onChange={(e) => setImg(e.target.files[0])} />
//           <br />
//         </div>
//         <br />
//         <button type="submit">Upload</button>
//       </form>
//       {loading && (
//         <ThreeDots
//           visible={true}
//           height={80}
//           width={80}
//           color="#4fa94d"
//           radius={9}
//           ariaLabel="three-dots-loading"
//           wrapperStyle={{}}
//           wrapperClass=""
//         />
//       )}
//     </div>
//   );
// };

// export default Upload;
