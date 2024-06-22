import React, { useState } from "react";
import "./auth-testpage.css";
import SignInForm from "./signinform";
import SignUpForm from "./signupform";
import logo from '../assets/logo.png';
export default function Auth() {
  const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="App testpage-container"> {/* Add testpage-container class */}
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
            <div>
              <img src={logo} alt="Logo" className="w-60 z-20 relative" />
            </div>
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
            <div>
              <img src={logo} alt="Logo" className="w-60 z-20 relative" />
            </div>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost "
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}
