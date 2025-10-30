import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthState();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
};

export default ProtectedRoute;