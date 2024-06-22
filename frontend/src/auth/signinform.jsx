// SignInForm.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function SignInForm() {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [state, setState] = useState({
    email: "",
    password: "",
    userType: "user" // Default user type
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
    const { email, password, userType } = state; // Destructure email, password, and userType from state
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Store the email and userType in session storage
      sessionStorage.setItem('userEmail', email);
      sessionStorage.setItem('userType', userType);
      // Retrieve the name from session storage
      const userName = sessionStorage.getItem('userName');
      
      // Navigate to the appropriate dashboard
      if (userType === "admin") {
        navigate("/AdminDashboard");
      } else {
        navigate("/Dashboard");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit} className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Sign in</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
          className="mb-2 p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
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
        <button className="bg-blue-500 text-white p-2 rounded">Sign In</button>
        {errorMessage && <p className="error-message text-red-500 mt-2">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default SignInForm;
