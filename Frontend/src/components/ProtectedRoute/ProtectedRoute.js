import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {

  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token) : null;

  if (!user || user.role !== 'admin') {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;