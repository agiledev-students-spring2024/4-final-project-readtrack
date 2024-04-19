import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children, loggedInUser }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('loggedInUser');

  console.log('loggedInUser in ProtectedRoute: ', loggedInUser);
  console.log('token in ProtectedRoute: ', token);

  useEffect(() => {
    if (storedUser && token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [storedUser, token]);

  if (!storedUser || !token) {
    console.log('navigating to login')
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
