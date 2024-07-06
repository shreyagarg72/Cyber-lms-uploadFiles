// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faClock } from '@fortawesome/free-solid-svg-icons';

// const CourseCard = ({ imgUrl, level, courseName, trainerName, description, duration }) => {
//   return (
//     <div className="course-card bg-white shadow-md rounded-lg overflow-hidden">
//       <img src={imgUrl || 'defaultImagePath.jpg'} alt={courseName || 'Course Image'} className="w-full h-32 sm:h-48 object-cover" />
//       <div className="p-4">
//         <h3 className="text-lg font-bold mb-2">{courseName || 'Course Name'}</h3>
//         <p className="text-gray-700 mb-2">{description || 'Course Description'}</p>
//         <div className="flex items-center justify-between">
//           <span className="text-sm text-gray-600"><FontAwesomeIcon icon={faUser} className="mr-1" /> {trainerName || 'Trainer Name'}</span>
//           <span className="text-sm text-gray-600"><FontAwesomeIcon icon={faClock} className="mr-1" /> {duration || 'Duration'}</span>
//         </div>
//         <div className="mt-2">
//           <span className={`inline-block px-2 py-1 text-xs font-semibold text-white ${level === 'Easy' ? 'bg-green-500' : level === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'} rounded-full`}>{level || 'Level'}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseCard;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock, faLayerGroup } from '@fortawesome/free-solid-svg-icons';

const CourseCard = ({ imgUrl, level, courseName, trainerName, description, duration, modules,submodules }) => {
  // Calculate total submodules
  //const totalSubmodules = course.content.reduce((acc, module) => acc + module.submodules.length, 0);

  return (
    <div className="course-card bg-white shadow-md rounded-lg overflow-hidden">
      <img src={imgUrl || 'defaultImagePath.jpg'} alt={courseName || 'Course Image'} className="w-full h-32 sm:h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{courseName || 'Course Name'}</h3>
        {/* <p className="text-gray-700 mb-2">{description || 'Course Description'}</p> */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600"><FontAwesomeIcon icon={faUser} className="mr-1" /> {trainerName || 'Trainer Name'}</span>
          <span className="text-sm text-gray-600"><FontAwesomeIcon icon={faLayerGroup} className="mr-1" /> {modules} modules</span>
          <span className="text-sm text-gray-600"><FontAwesomeIcon icon={faClock} className="mr-1" /> {duration || 'Duration'}days</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className={`inline-block px-2 py-1 text-xs font-semibold text-white ${level === 'Easy' ? 'bg-green-500' : level === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'} rounded-full`}>{level || 'Level'}</span>
        
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

// CourseCard.jsx

// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFolderOpen, faCalendarDays, faUsers } from '@fortawesome/free-solid-svg-icons';

// const CourseCard = ({ course }) => {
//   const { name, trainer, level, description, modules, participants, duration } = course;

//   return (
//     <div className="bg-white p-3 rounded-lg shadow-2xl w-60 cursor-pointer hover:scale-105 transition duration-200">
//       {/* Replace with dynamic image URL from props */}
//       <img src={course.imgUrl} alt="Course Image" className="h-32 w-full rounded-md mb-2" />

//       {/* Dynamic level badge based on props */}
//       <span className={`bg-${level.toLowerCase()}-400 text-black py-0.5 px-2 text-center rounded-xl text-xs`}>
//         {level}
//       </span>

//       {/* Details section */}
//       <div className="grid grid-cols-3 space-x-3 mt-2">
//         <div className="flex items-center text-xs">
//           <FontAwesomeIcon icon={faFolderOpen} className="mr-1" />
//           <span>Modules: {modules}</span>
//         </div>
//         <div className="flex items-center text-xs">
//           <FontAwesomeIcon icon={faCalendarDays} className="mr-1" />
//           <span>{duration} days</span>
//         </div>
//         <div className="flex items-center text-xs">
//           <FontAwesomeIcon icon={faUsers} className="mr-1" />
//           <span>{participants}</span>
//         </div>
//       </div>

//       {/* Course title and description */}
//       <h3 className="text-md font-bold mb-1">{name}</h3>
//       <p className="text-gray-500 text-xs mb-2">{description}</p>

//       {/* Trainer information */}
//       <div className="flex items-center justify-between mb-4">
//         <span className="flex items-center text-gray-500 text-xs">
//           <FontAwesomeIcon icon={faUser} className="mr-1" />
//           {trainer}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default CourseCard;
