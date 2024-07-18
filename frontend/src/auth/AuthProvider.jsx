import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, userType: null, token: null });
  const [loading, setLoading] = useState(true);

  const login = (token, userType) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userType', userType);
    setAuth({ isAuthenticated: true, userType, token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    setAuth({ isAuthenticated: false, userType: null, token: null });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    if (token && userType) {
      setAuth({ isAuthenticated: true, userType, token });
    }
    setLoading(false); // Set loading to false after checking localStorage
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Add a loading state or spinner here if needed
  }

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
};
