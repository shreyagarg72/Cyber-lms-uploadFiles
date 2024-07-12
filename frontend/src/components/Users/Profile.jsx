import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCamera, faTimes } from '@fortawesome/free-solid-svg-icons';
import ProfileBoy from "../../assets/Profile.webp";

import { useAuth0 } from '@auth0/auth0-react';


import Axios from "../../helper/Axios";
import { useMediaQuery } from 'react-responsive';

const Profile = () => {
  const [photo, setPhoto] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const {user, isAuthenticated, isLoading} = useAuth0();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    region: ''
  });

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem('token');
      if (token) {
        try {
          const response = await Axios.get('/api/userDetails');
          setUserData(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      }
    };

    fetchUser();
  }, []);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('photoInput').click();
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setIsEditing(false);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Media queries
  const isSmallScreen = useMediaQuery({ maxWidth: 425 });

  return (
    <div className={`relative max-w-5xl min-h-screen mx-auto bg-white shadow-md rounded-lg p-10 ${isSmallScreen ? 'p-4' : 'p-10'} flex flex-col sm:flex-row`}>
      <div className={`flex flex-col items-center ${isSmallScreen ? 'w-full mb-4' : 'w-1/3 mb-0'}`}>
        <div className={`relative ${isSmallScreen ? 'w-24 h-24' : 'w-32 h-32'} mb-4`}>
          {photo
            ? <img src={photo} alt="Profile" className="h-full w-full rounded-full object-cover" />
            : <img src={ProfileBoy} alt="Profile" className="w-full h-full rounded-full" />
          }
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer">
            <FontAwesomeIcon icon={faCamera} className="text-white" onClick={triggerFileInput} />
          </div>
          <input type="file"
            id="photoInput"
            className="hidden"
            accept="image/*"
            onChange={handlePhotoChange} />
        </div>
        <div className="text-center">
          <h2 className={`font-semibold ${isSmallScreen ? 'text-lg' : 'text-xl'}`}>{`${userData.name}`}</h2>
        </div>
        <button className="text-blue-500 hover:underline mt-4" onClick={handleEditClick}>
          <FontAwesomeIcon icon={faEdit} /> Edit
        </button>
      </div>
      <div className={`pl-0 ${isSmallScreen ? 'w-full' : 'w-2/3 pl-8'}`}>
        <div className="mb-6">
          <h3 className={`font-semibold ${isSmallScreen ? 'text-base' : 'text-lg'}`}>Personal Details</h3>
          <ul className={`mt-2 text-gray-700 ${isSmallScreen ? 'space-y-2' : 'space-y-4'}`}>
            <li><strong>Email:</strong> {userData.email}</li>
            <li><strong>Region:</strong> {userData.region}</li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className={`font-semibold ${isSmallScreen ? 'text-base' : 'text-lg'}`}>Course Details</h3>
          <ul className={`mt-2 text-gray-700 ${isSmallScreen ? 'space-y-2' : 'space-y-4'}`}>
            <li><strong>No. of Courses:</strong> 12</li>
            <li><strong>Courses:</strong> name of courses</li>
          </ul>
        </div>
        <div>
          <div className='flex justify-between mb-4'>
            <h3 className={`font-semibold ${isSmallScreen ? 'text-base' : 'text-lg'}`}>Recent Courses</h3>
            <div className={`px-2 py-1 bg-slate-700 text-white rounded-full text-sm ${isSmallScreen ? 'text-xs' : 'text-sm'}`}>
              View All
            </div>
          </div>
          <div className={`mt-2 flex ${isSmallScreen ? 'flex-col space-y-4' : 'space-x-4'}`}>
            <div className={`bg-gray-100 p-4 rounded-md ${isSmallScreen ? 'w-full' : 'w-1/2'} h-44 text-center shadow-xl`}>
              <p className="text-gray-600">Course 1</p>
              <p className={`font-semibold ${isSmallScreen ? 'text-xl' : 'text-2xl'}`}>56%</p>
            </div>
            <div className={`bg-gray-100 p-4 rounded-md ${isSmallScreen ? 'w-full' : 'w-1/2'} h-44 text-center shadow-xl`}>
              <p className="text-gray-600">Course 2</p>
              <p className={`font-semibold ${isSmallScreen ? 'text-xl' : 'text-2xl'}`}>50%</p>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`bg-white p-6 rounded-lg shadow-lg ${isSmallScreen ? 'w-11/12' : 'w-3/5'} mb-10`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`font-semibold ${isSmallScreen ? 'text-lg' : 'text-xl'}`}>Edit Details</h2>
              <FontAwesomeIcon icon={faTimes} className="text-gray-500 cursor-pointer" onClick={() => setIsEditing(false)} />
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className='flex flex-row justify-between items-center'>
                <h3 className="text-medium font-semibold mr-4">First Name</h3>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleFormChange}
                  className="border w-4/6 border-gray-300 p-1 rounded-md"
                />
              </div>
              <div className='flex flex-row justify-between items-center'>
                <h3 className="text-medium font-semibold mr-4">Last Name</h3>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleFormChange}
                  className="w-4/6 border border-gray-300 p-1 rounded-md"
                />
              </div>
              <div className='flex flex-row items-center justify-between'>
                <label className="text-medium font-semibold mr-4">Gender</label>
                <div className="flex w-4/6 items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === 'Male'}
                      onChange={handleFormChange}
                      className="mr-2"
                    />
                    Male
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === 'Female'}
                      onChange={handleFormChange}
                      className="mr-2"
                    />
                    Female
                  </label>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between">
                <label className="text-medium font-semibold mr-4">Mobile No</label>
                <div className='w-4/6 border flex justify-between border-gray-300 p-1 rounded-md'>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleFormChange}
                  />
                  <button className="text-blue-500 hover:underline">
                    Update Number
                  </button>
                </div>
              </div>
              <div className='flex flex-row justify-between items-center'>
                <label className="text-medium font-semibold mr-4">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-4/6 border border-gray-300 p-1 rounded-md"
                />
              </div>
              <div className='flex flex-row justify-between items-center'>
                <label className="text-medium font-semibold mr-4">State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleFormChange}
                  className="w-4/6 border border-gray-300 p-2 rounded-md"
                >
                  <option value="Select State">Select State</option>
                  <option value="State 1">State 1</option>
                  <option value="State 2">State 2</option>
                </select>
              </div>
              <div className='flex flex-row justify-between items-center'>
                <label className="text-medium font-semibold mr-4">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleFormChange}
                  className="w-4/6 border border-gray-300 p-2 rounded-md"
                />
              </div>
              <div className="flex justify-between">
                <button type="button" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md" onClick={() => setIsEditing(false)}>
                  Close
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Update & Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
