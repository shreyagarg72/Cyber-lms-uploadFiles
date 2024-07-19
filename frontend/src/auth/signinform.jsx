import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../helper/Axios";
import { useAuth } from "../auth/AuthProvider";
import { useAuth0 } from "@auth0/auth0-react";
function SignInForm() {
  const navigate = useNavigate();
  const { user, loginWithRedirect, isAuthenticated,logout } = useAuth0();
  const { login } = useAuth();
  const [state, setState] = useState({
    email: "",
    password: "",
    userType: "user",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isStoringUser, setIsStoringUser] = useState(false);
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  useEffect(() => {
    const storeAuth0User = async () => {
      if (isAuthenticated && user) {
        setIsStoringUser(true);
        try {
          const response = await Axios({
            url: "/api/auth0-login",
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            data: JSON.stringify({
              auth0Id: user.sub,
              email: user.email,
              name: user.name,
            }),
          });

          const data = response.data;
          login(data.token, data.userType);

          localStorage.setItem("token", data.token);
          localStorage.setItem("userType", data.userType);

          navigate('/Dashboard');
        } catch (error) {
          console.error("Failed to store Auth0 user:", error);
          // Handle error (e.g., show error message to user)
        } finally {
          setIsStoringUser(false);
        }
      }
    };

    storeAuth0User();
  }, [isAuthenticated, user, login, navigate]);

console.log(user);
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { email, password, userType } = state;
    setLoading(true);
    try {
      const sendingData = { email, password };
      const axiosConfig = {
        url: "/api/login",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: JSON.stringify(sendingData),
      };

      const response = await Axios(axiosConfig);
      const data = await response.data;

      login(data.token, data.userType);

      // Store the token and user type
      localStorage.setItem("token", data.token);
      localStorage.setItem("userType", data.userType);

      if (data.userType !== userType && userType === "admin") {
        alert("You do not have admin access");
        return;
      }

      if (data.userType === "admin" && userType === "admin") {
        navigate("/AdminDashboard");
      } else {
        navigate("/Dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/Dashboard');
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="form-container sign-in-container">
      
      { isAuthenticated &&<h3>Hello {user.name}</h3>}
      <form onSubmit={handleOnSubmit} className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Sign in</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
          className="mb-2 p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          className="mb-2 p-2 border rounded"
          required
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
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <h2>OR</h2>

        {isAuthenticated ? (
         <div>
         {isStoringUser ? (
           <p>Storing user data...</p>
         ) : (
           <>
             <button onClick={() => logout({ returnTo: window.location.origin })}>
               Logout
             </button>
           </>
         )}
       </div>
     ) : (
       <div>
         <h1 className="text-2xl font-bold mb-4">Sign in</h1>
         <button onClick={() => loginWithRedirect({
           appState: { returnTo: '/Dashboard' }
         })}>
           Login with Auth0
         </button>
       </div>
        )}

        {errorMessage && (
          <p className="error-message text-red-500 mt-2">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}

export default SignInForm;
