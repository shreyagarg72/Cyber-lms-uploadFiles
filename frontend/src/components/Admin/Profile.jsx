import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCamera, faTimes } from '@fortawesome/free-solid-svg-icons';
import ProfileBoy from "../../assets/Profile.webp";

const Profile = () => {
  const [photo, setPhoto] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'First Name',
    lastName: 'Last Name',
    gender: 'Male',
    mobile: '',
    email: 'Email',
    state: 'Select State',
    city: 'City',
  });

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

  return (
    <div className="relative max-w-5xl h-4/5 mx-auto bg-white shadow-md rounded-lg p-10 flex">
      <div className="flex flex-col items-center w-1/3">
        <div className="relative w-32 h-32 mb-4">
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
          <h2 className="text-xl font-semibold">{`${formData.firstName} ${formData.lastName}`}</h2>
        </div>
        <button className="text-blue-500 hover:underline mt-4" onClick={handleEditClick}>
          <FontAwesomeIcon icon={faEdit} /> Edit
        </button>
      </div>
      <div className="w-2/3 pl-8">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Personal Details</h3>
          <ul className="mt-2 text-gray-700 space-y-4">
            <li><strong>Mobile No:</strong> {formData.mobile}</li>
            <li><strong>Email:</strong> {formData.email}</li>
            <li><strong>Living City/Village/Town:</strong> {formData.city}</li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Course Details</h3>
          <ul className="mt-2 text-gray-700 space-y-4">
            <li><strong>Language:</strong> English</li>
            <li><strong>No. of Courses:</strong> 12</li>
            <li><strong>Courses:</strong> name of courses</li>
          </ul>
        </div>
        <div>
          <div className='flex justify-between mb-4'>
            <h3 className="text-lg font-semibold">Recent Courses</h3>
            <div className='px-2 py-1 bg-slate-700 text-white rounded-full text-sm'>
              View All
            </div>
          </div>
          <div className="mt-2 flex space-x-4">
            <div className="bg-gray-100 p-4 rounded-md w-1/2 h-44 text-center shadow-xl">
              <p className="text-gray-600">Course 1</p>
              <p className="text-2xl font-semibold">56%</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-md w-1/2 h-44 text-center shadow-xl">
              <p className="text-gray-600">Course 2</p>
              <p className="text-2xl font-semibold">50%</p>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/5 mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Details</h2>
              <FontAwesomeIcon icon={faTimes} className="text-gray-500 cursor-pointer" onClick={() => setIsEditing(false)} />
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className='flex flex-row justify-between items-center'>
                <h3 className="text-medium font-semibold mr-20">First Name</h3>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleFormChange}
                  className="border w-4/6 border-gray-300 p-1 rounded-md"
                />
              </div>
              <div className='flex flex-row justify-between items-center'>
                <h3 className="text-medium font-semibold mr-20">Last Name</h3>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleFormChange}
                  className="w-4/6 border border-gray-300 p-1 rounded-md"
                />
              </div>
              <div className='flex flex-row items-center justify-between '>
                <label className="text-medium font-semibold mr-20">Gender</label>
                <div className="flex w-4/6  items-center space-x-4">
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
                <label className="text-medium font-semibold mr-20">Mobile No</label>
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
                <label className="text-medium font-semibold mr-20">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-4/6 border border-gray-300 p-1 rounded-md"
                />
              </div>
              <div className='flex flex-row justify-between items-center'>
                <label className="text-medium font-semibold mr-20">State</label>
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
                <label className="text-medium font-semibold ">City</label>
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
