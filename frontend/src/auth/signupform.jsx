// import React, { useState } from "react";
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
// import { auth, firestore } from '../firebase';
// import { doc, setDoc } from "firebase/firestore";

// import Axios from "../helper/Axios.js";

// function SignUpForm() {
//   const navigate = useNavigate();
//   const [state, setState] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     userType: "user"
//   });
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleChange = evt => {
//     const { name, value } = evt.target;
//     setState({
//       ...state,
//       [name]: value
//     });
//   };

//   const handleOnSubmit = async (e) => {
//     e.preventDefault();
//     const { name, email, password, confirmPassword, userType } = state;

//     if (password !== confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }

//     try {
    
//       const sendingData = {
//         name: name,
//         email: email,
//         password: password,
//         userType: userType
//       }

//       const axiosConfig = {
//         url: "/api/register",
//         method: "post",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         data: JSON.stringify(sendingData),
//       };

//       const response = await Axios(axiosConfig);
//       const data = await response.data;
//       // console.log(data);
//       if (data.message === "User registered successfully") {
//         alert("Registration Successful! Please proceed to login.");
       
//       } else {
        
//         alert("Registration failed. Please try again.");
//       }
//     } catch (error) {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(errorCode, errorMessage);
//       setErrorMessage(errorMessage);
//     }
//   };

//   return (
//     <div className="form-container sign-up-container">
//       <form onSubmit={handleOnSubmit} className="flex flex-col items-center">
//         <h1 className="text-2xl font-bold mb-4">Create Account</h1>
//         <input
//           type="text"
//           name="name"
//           value={state.name}
//           onChange={handleChange}
//           placeholder="Name"
//           className="mb-2 p-2 border rounded"
//         />
//         <input
//           type="email"
//           name="email"
//           value={state.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className="mb-2 p-2 border rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           value={state.password}
//           onChange={handleChange}
//           placeholder="Password"
//           className="mb-2 p-2 border rounded"
//         />
//         <input
//           type="password"
//           name="confirmPassword"
//           value={state.confirmPassword}
//           onChange={handleChange}
//           placeholder="Confirm Password"
//           className="mb-2 p-2 border rounded"
//         />
//         <div className="flex justify-center mb-4">
//           <label className="flex items-center mr-4">
//             <input
//               type="radio"
//               name="userType"
//               value="admin"
//               checked={state.userType === "admin"}
//               onChange={handleChange}
//               className="form-radio h-4 w-4 text-gray-600"
//             />
//             <span className="ml-2">Admin</span>
//           </label>
//           <label className="flex items-center">
//             <input
//               type="radio"
//               name="userType"
//               value="user"
//               checked={state.userType === "user"}
//               onChange={handleChange}
//               className="form-radio h-4 w-4 text-gray-600"
//             />
//             <span className="ml-2">User</span>
//           </label>
//         </div>
//         <button className="bg-blue-500 text-white p-2 rounded">Sign Up</button>
//         {errorMessage && <p className="error-message text-red-500 mt-2">{errorMessage}</p>}
//       </form>
//     </div>
//   );
// }

// export default SignUpForm;

// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import Axios from "../helper/Axios.js";

// function SignUpForm() {
//   const navigate = useNavigate();
//   const [state, setState] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     userType: "user"
//   });
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleChange = evt => {
//     const { name, value } = evt.target;
//     setState({
//       ...state,
//       [name]: value
//     });
//   };

//   const handleOnSubmit = async (e) => {
//     e.preventDefault();
//     const { name, email, password, confirmPassword, userType } = state;

//     if (password !== confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }

//     try {
//       const sendingData = {
//         name: name,
//         email: email,
//         password: password,
//         userType: userType
//       };

//       const axiosConfig = {
//         url: "https://cyber-lms-server.vercel.app/api/register",
//         method: "post",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         data: JSON.stringify(sendingData),
//       };

//       const response = await Axios(axiosConfig);
//       const data = await response.data;

//       if (data.message === "User registered successfully") {
//         alert("Registration Successful! Please proceed to login.");
//         navigate("/signin");
//       } else {
//         alert("Registration failed. Please try again.");
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || error.message;
//       setErrorMessage(errorMessage);
//     }
//   };

//   return (
//     <div className="form-container sign-up-container">
//       <form onSubmit={handleOnSubmit} className="flex flex-col items-center">
//         <h1 className="text-2xl font-bold mb-4">Create Account</h1>
//         <input
//           type="text"
//           name="name"
//           value={state.name}
//           onChange={handleChange}
//           placeholder="Name"
//           className="mb-2 p-2 border rounded"
//         />
//         <input
//           type="email"
//           name="email"
//           value={state.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className="mb-2 p-2 border rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           value={state.password}
//           onChange={handleChange}
//           placeholder="Password"
//           className="mb-2 p-2 border rounded"
//         />
//         <input
//           type="password"
//           name="confirmPassword"
//           value={state.confirmPassword}
//           onChange={handleChange}
//           placeholder="Confirm Password"
//           className="mb-2 p-2 border rounded"
//         />
//         <div className="flex justify-center mb-4">
//           <label className="flex items-center mr-4">
//             <input
//               type="radio"
//               name="userType"
//               value="admin"
//               checked={state.userType === "admin"}
//               onChange={handleChange}
//               className="form-radio h-4 w-4 text-gray-600"
//             />
//             <span className="ml-2">Admin</span>
//           </label>
//           <label className="flex items-center">
//             <input
//               type="radio"
//               name="userType"
//               value="user"
//               checked={state.userType === "user"}
//               onChange={handleChange}
//               className="form-radio h-4 w-4 text-gray-600"
//             />
//             <span className="ml-2">User</span>
//           </label>
//         </div>
//         <button className="bg-blue-500 text-white p-2 rounded">Sign Up</button>
//         {errorMessage && <p className="error-message text-red-500 mt-2">{errorMessage}</p>}
//       </form>
//     </div>
//   );
// }

// export default SignUpForm;

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "../helper/Axios";

function SignUpForm() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "user"
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = evt => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, userType } = state;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await Axios.post("/api/register", {
        name,
        email,
        password,
        userType
      });

      const data = response.data;

      if (data.message === "User registered successfully") {
        alert("Registration Successful! Please proceed to login.");
        navigate('/');
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      setErrorMessage(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit} className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Create Account</h1>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
          className="mb-2 p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          className="mb-2 p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          className="mb-2 p-2 border rounded"
        />
        <input
          type="password"
          name="confirmPassword"
          value={state.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="mb-2 p-2 border rounded"
        />
        <div className="flex justify-center mb-4">
          <label className="flex items-center mr-4">
            <input
              type="radio"
              name="userType"
              value="admin"
              checked={state.userType === "admin"}
              onChange={handleChange}
              className="form-radio h-4 w-4 text-gray-600"
            />
            <span className="ml-2">Admin</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="userType"
              value="user"
              checked={state.userType === "user"}
              onChange={handleChange}
              className="form-radio h-4 w-4 text-gray-600"
            />
            <span className="ml-2">User</span>
          </label>
        </div>
        <button className="bg-blue-500 text-white p-2 rounded">Sign Up</button>
        {errorMessage && <p className="error-message text-red-500 mt-2">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default SignUpForm;
