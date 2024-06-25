// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faUsers, faCalendarDays, faFolderOpen, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
// import image01 from "../../assets/Screenshot 2024-06-19 001148.png";
// import { faUserCircle } from '@fortawesome/free-solid-svg-icons/faUserCircle';

// const CourseCard = () => {
//   return (
//     <div className="bg-white rounded-lg shadow-lg p-4 w-64 mb-4 cursor-pointer hover:scale-105 transition duration-200">
//       <div className="relative">
//         <img
//           src={image01}
//           alt="Course"
//           className="w-full h-32 object-cover rounded-xl"
//         />
//         <button>
//           <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white flex justify-center items-center">
//             <FontAwesomeIcon icon={faPencilAlt} />
//           </div>
//         </button>
//       </div>
//       <h2 className="text-xl font-semibold mt-4">Introduction to Cyber Security</h2>
//       <div className='flex items-center space-x-1 text-sm mt-2'>
//         <FontAwesomeIcon icon={faUserCircle} className='text-sm' />
//         <p className="text-gray-600 text-xs">by Alam Lin</p>
//       </div>
//       <div className="flex flex-row gap-3 items-center mt-2">
//         <div className="flex items-center space-x-1 text-xs mr-2">
//           <FontAwesomeIcon icon={faFolderOpen} className="text-gray-600 mr-1" />
//           <span className="text-gray-600">5 modules</span>
//         </div>
//         <div className="flex items-center space-x-1 text-xs mr-2">
//           <FontAwesomeIcon icon={faCalendarDays} />
//           <span className="text-gray-600">12 days</span>
//         </div>
//         <div className="flex items-center space-x-1 text-xs">
//           <FontAwesomeIcon icon={faUsers} className="text-gray-600 mr-1" />
//           <span className="text-gray-600">45</span>
//         </div>
//       </div>
//       <div className="mt-4">
//         <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
//           <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
//         </div>
//         <div className="flex justify-between mt-2 text-gray-600 text-xs">
//           <span>Completed: 45%</span>
//           <span>Days: 4/12</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseCard;


// CourseCard.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faCalendarDays, faFolderOpen, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import image01 from "../../assets/Screenshot 2024-06-19 001148.png";
import { faUserCircle } from '@fortawesome/free-solid-svg-icons/faUserCircle';
import { Link, useNavigate } from 'react-router-dom';

const CourseCard = () => {
  const navigate = useNavigate();

  const courseData = {
    courseName: "Introduction to Cyber Security",
    description: "Course Description",
    img: image01,
    trainerName: "Alam Lin",
    level: "Medium",
    tools: "List of tools",
    content: [
      {
        title: "Week 1 - Introduction",
        description: "Lorem ipsum dolor sit amet",
        pdf: null,
        video: null,
      },
      // Add more content sections as needed
    ],
  };

  const editAction = () => {
    navigate('/edit-course', { state: courseData });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-64 mb-4 cursor-pointer hover:scale-105 transition duration-200">
      <div className="relative">
        <img
          src={courseData.img}
          alt="Course"
          className="w-full h-32 object-cover rounded-xl"
        />
        <button onClick={editAction}>
          <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white flex justify-center items-center">
            <FontAwesomeIcon icon={faPencilAlt} />
          </div>
        </button>
      </div>
      <h2 className="text-xl font-semibold mt-4">{courseData.courseName}</h2>
      <div className='flex items-center space-x-1 text-sm mt-2'>
        <FontAwesomeIcon icon={faUserCircle} className='text-sm' />
        <p className="text-gray-600 text-xs">by {courseData.trainerName}</p>
      </div>
      <div className="flex flex-row gap-3 items-center mt-2">
        <div className="flex items-center space-x-1 text-xs mr-2">
          <FontAwesomeIcon icon={faFolderOpen} className="text-gray-600 mr-1" />
          <span className="text-gray-600">5 modules</span>
        </div>
        <div className="flex items-center space-x-1 text-xs mr-2">
          <FontAwesomeIcon icon={faCalendarDays} />
          <span className="text-gray-600">12 days</span>
        </div>
        <div className="flex items-center space-x-1 text-xs">
          <FontAwesomeIcon icon={faUsers} className="text-gray-600 mr-1" />
          <span className="text-gray-600">45</span>
        </div>
      </div>
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
          <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
        </div>
        <div className="flex justify-between mt-2 text-gray-600 text-xs">
          <span>Completed: 45%</span>
          <span>Days: 4/12</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
