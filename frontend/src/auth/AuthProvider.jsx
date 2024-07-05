// src/context/AuthProvider.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, userType: null });
 
  const login = (token, userType) => {
    // Save token to localStorage or cookies
    localStorage.setItem('token', token);
    localStorage.setItem('userType', userType);
    setAuth({ isAuthenticated: true, userType });
  };

  const logout = () => {
    // Remove token from localStorage or cookies
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    setAuth({ isAuthenticated: false, userType: null });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    if (token && userType) {
      setAuth({ isAuthenticated: true, userType });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
