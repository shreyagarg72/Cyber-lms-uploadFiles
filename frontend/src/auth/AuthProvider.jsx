// src/context/AuthProvider.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, userType: null, token: null });
 
  const login = (token, userType) => {
    // Save token to sessionStorage or cookies
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userType', userType);
    setAuth({ isAuthenticated: true, userType,token });
  };

  const logout = () => {
    // Remove token from sessionStorage or cookies
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userType');
    setAuth({ isAuthenticated: false, userType: null,token:null });
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const userType = sessionStorage.getItem('userType');
    if (token && userType) {
      setAuth({ isAuthenticated: true, userType,token });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
  // const { token } = useContext(AuthContext);
  // return { token };
};
