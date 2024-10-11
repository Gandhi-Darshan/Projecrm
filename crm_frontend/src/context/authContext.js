import React, { createContext, useContext, useState } from 'react';
import axios from 'axios'; // To make HTTP requests to your backend

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://healthcare-crm.onrender.com/api/auth', { email, password });
      const { token, user } = response.data;

      // Save token to localStorage or cookies
      localStorage.setItem('token', token);

      // Update authentication state and user details
      setIsAuthenticated(true);
      setUser(user);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token'); // Remove token
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
