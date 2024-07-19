// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faCamera, faTimes } from "@fortawesome/free-solid-svg-icons";
// import { useState } from "react";
// import { useMediaQuery } from "react-responsive";
// const EditProfile = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     region: "",
//   });
//   const handleEditClick = () => {
//     setIsEditing(true);
//   };
//   const handleFormChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
//     // const handleEditClick = () => {
//   //   setIsEditing(true);
//   // };

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     setIsEditing(false);
//   };
//   const isSmallScreen = useMediaQuery({ maxWidth: 425 });
//   return (
//     <div>
//       <button
//           className="text-blue-500 hover:underline mt-4"
//           onClick={handleEditClick}
//         >
//           <FontAwesomeIcon icon={faEdit} /> Edit
//         </button>


//       {isEditing && (
//         <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div
//             className={`bg-white p-6 rounded-lg shadow-lg ${
//               isSmallScreen ? "w-11/12" : "w-3/5"
//             } mb-10`}
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h2
//                 className={`font-semibold ${
//                   isSmallScreen ? "text-lg" : "text-xl"
//                 }`}
//               >
//                 Edit Details
//               </h2>
//               <FontAwesomeIcon
//                 icon={faTimes}
//                 className="text-gray-500 cursor-pointer"
//                 onClick={() => setIsEditing(false)}
//               />
//             </div>
//             <form onSubmit={handleFormSubmit} className="space-y-4">
//               <div className="flex flex-row justify-between items-center">
//                 <h3 className="text-medium font-semibold mr-4">First Name</h3>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleFormChange}
//                   className="border w-4/6 border-gray-300 p-1 rounded-md"
//                 />
//               </div>
//               <div className="flex flex-row justify-between items-center">
//                 <h3 className="text-medium font-semibold mr-4">Last Name</h3>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleFormChange}
//                   className="w-4/6 border border-gray-300 p-1 rounded-md"
//                 />
//               </div>
//               <div className="flex flex-row items-center justify-between">
//                 <label className="text-medium font-semibold mr-4">Gender</label>
//                 <div className="flex w-4/6 items-center space-x-4">
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="gender"
//                       value="Male"
//                       checked={formData.gender === "Male"}
//                       onChange={handleFormChange}
//                       className="mr-2"
//                     />
//                     Male
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="gender"
//                       value="Female"
//                       checked={formData.gender === "Female"}
//                       onChange={handleFormChange}
//                       className="mr-2"
//                     />
//                     Female
//                   </label>
//                 </div>
//               </div>
//               <div className="flex flex-row items-center justify-between">
//                 <label className="text-medium font-semibold mr-4">
//                   Mobile No
//                 </label>
//                 <div className="w-4/6 border flex justify-between border-gray-300 p-1 rounded-md">
//                   <input
//                     type="text"
//                     name="mobile"
//                     value={formData.mobile}
//                     onChange={handleFormChange}
//                   />
//                   <button className="text-blue-500 hover:underline">
//                     Update Number
//                   </button>
//                 </div>
//               </div>
//               <div className="flex flex-row justify-between items-center">
//                 <label className="text-medium font-semibold mr-4">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleFormChange}
//                   className="w-4/6 border border-gray-300 p-1 rounded-md"
//                 />
//               </div>
//               <div className="flex flex-row justify-between items-center">
//                 <label className="text-medium font-semibold mr-4">State</label>
//                 <select
//                   name="state"
//                   value={formData.state}
//                   onChange={handleFormChange}
//                   className="w-4/6 border border-gray-300 p-2 rounded-md"
//                 >
//                   <option value="Select State">Select State</option>
//                   <option value="State 1">State 1</option>
//                   <option value="State 2">State 2</option>
//                 </select>
//               </div>
//               <div className="flex flex-row justify-between items-center">
//                 <label className="text-medium font-semibold mr-4">City</label>
//                 <input
//                   type="text"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleFormChange}
//                   className="w-4/6 border border-gray-300 p-2 rounded-md"
//                 />
//               </div>
//               <div className="flex justify-between">
//                 <button
//                   type="button"
//                   className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
//                   onClick={() => setIsEditing(false)}
//                 >
//                   Close
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                 >
//                   Update & Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EditProfile;
// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimes } from "@fortawesome/free-solid-svg-icons";
// import { useMediaQuery } from "react-responsive";

// const EditProfile = ({ userData, onClose, onUpdate }) => {
//   const [formData, setFormData] = useState({
//     name: userData.name || "",
//     email: userData.email || "",
//     region: userData.region || "",
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     onUpdate(formData);
//   };

//   const isSmallScreen = useMediaQuery({ maxWidth: 425 });

//   return (
//     <div
//       className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50`}
//     >
//       <div
//         className={`bg-white p-6 rounded-lg shadow-lg ${
//           isSmallScreen ? "w-11/12" : "w-1/3"
//         }`}
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">Edit Profile</h3>
//           <FontAwesomeIcon
//             icon={faTimes}
//             className="cursor-pointer"
//             onClick={onClose}
//           />
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="w-full p-2 border border-gray-300 rounded mt-1"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="w-full p-2 border border-gray-300 rounded mt-1"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Region</label>
//             <input
//               type="text"
//               name="region"
//               value={formData.region}
//               onChange={handleInputChange}
//               className="w-full p-2 border border-gray-300 rounded mt-1"
//             />
//           </div>
//           <div className="flex justify-end">
//             <button
//               type="button"
//               onClick={onClose}
//               className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;
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
