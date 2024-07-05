// src/hoc/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider"; // Adjust the import path as necessary

const ProtectedRoute = ({ children, adminOnly }) => {
  const { auth } = useAuth();

  if (!auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (adminOnly && auth.userType !== "admin") {
    return <Navigate to="/Dashboard" />;
  }

  return children;
};

export default ProtectedRoute;
