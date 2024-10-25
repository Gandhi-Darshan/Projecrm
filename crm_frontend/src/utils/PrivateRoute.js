// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext'; // Adjust the path based on your project structure

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'; // Fetching authentication state from local storage
    console.log(isAuthenticated)
    return isAuthenticated ? children : <Navigate to="/login" />;
  };
export default PrivateRoute;
