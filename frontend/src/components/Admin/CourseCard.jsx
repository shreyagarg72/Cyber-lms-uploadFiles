
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faCalendarDays, faFolderOpen, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from '@fortawesome/free-solid-svg-icons/faUserCircle';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const editAction = () => {
    navigate('/edit-course', { state: course });
  };

  const numberOfModules = course.content.length;
  const numberOfSubmodules = course.content.reduce((acc, module) => acc + module.submodules.length, 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4 cursor-pointer hover:scale-105 transition duration-200">
      <div className="relative">
        <img
          src={course.imgUrl}
          alt={course.courseName}
          className="w-full h-32 object-cover rounded-xl"
        />
        <button onClick={editAction}>
          <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white flex justify-center items-center">
            <FontAwesomeIcon icon={faPencilAlt} />
          </div>
        </button>
      </div>
      <h2 className="text-xl font-semibold mt-4">{course.courseName}</h2>
      <div className='flex items-center space-x-1 text-sm mt-2'>
        <FontAwesomeIcon icon={faUserCircle} className='text-sm' />
        <p className="text-gray-600 text-xs">by {course.trainerName}</p>
      </div>
      <div className="flex flex-row gap-3 items-center mt-2">
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
          <span className="text-gray-600">45</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
