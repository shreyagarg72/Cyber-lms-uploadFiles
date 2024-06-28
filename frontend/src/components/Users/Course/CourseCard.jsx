import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUsers, faCalendarDays, faFolderOpen } from "@fortawesome/free-solid-svg-icons";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-64 mb-4 cursor-pointer hover:scale-105 transition duration-200">
      <div className="relative">
        <img
          src={course.imgUrl}
          alt={course.courseName}
          className="w-full h-32 object-cover rounded-xl"
        />
      </div>
      <h2 className="text-xl font-semibold mt-4">{course.courseName}</h2>
      <div className='flex items-center space-x-1 text-sm mt-2'>
        <FontAwesomeIcon icon={faUserCircle} className='text-sm' />
        <p className="text-gray-600 text-xs">by {course.trainerName}</p>
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
