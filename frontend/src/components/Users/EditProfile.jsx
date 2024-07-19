
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";

const EditProfile = ({ userData, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: userData.name || "",
    email: userData.email || "",
    region: userData.region || "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate(formData);
  };

  const isSmallScreen = useMediaQuery({ maxWidth: 425 });

  return (
    <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50`}>
      <div className={`bg-white p-6 rounded-lg shadow-lg ${isSmallScreen ? "w-11/12" : "w-1/3"}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Edit Profile</h3>
          <FontAwesomeIcon icon={faTimes} className="cursor-pointer" onClick={onClose} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Region</label>
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
