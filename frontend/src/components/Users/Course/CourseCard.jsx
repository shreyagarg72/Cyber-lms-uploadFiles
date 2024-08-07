import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUsers, faCalendarDays, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { ProgressBar } from '../ProgressBar';

const CourseCard = ({ course ,progress}) => {
  const numberOfModules = course.content.length;
  const numberOfSubmodules = course.content.reduce((acc, module) => acc + module.submodules.length, 0);
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
      <div className="flex flex-row gap-2 items-center mt-2">
        <div className="flex items-center space-x-1 text-xs mr-2">
          <FontAwesomeIcon icon={faFolderOpen} className="text-gray-600 mr-1" />
          <span className="text-gray-600">{numberOfModules} modules</span>
        </div>
        <div className="flex items-center space-x-1 text-xs mr-2">
          <FontAwesomeIcon icon={faCalendarDays} />
          <span className="text-gray-600">{numberOfSubmodules} days</span>
        </div>
        <div className="flex items-center space-x-1 text-xs">
          <FontAwesomeIcon icon={faUsers} className="text-gray-600 mr-1" />
          <span className="text-gray-600">100+</span>
        </div>
       
      </div>
      <ProgressBar progress={progress}></ProgressBar>
    </div>
  );
};

export default CourseCard;
