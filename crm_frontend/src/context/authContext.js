import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // To make HTTP requests to your backend

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check for authentication state and user details on initial load
  useEffect(() => {
    const token = localStorage.getItem('token'); // Check for token in local storage
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated') === 'true'; // Check for authentication state

    if (token && storedIsAuthenticated) {
      setIsAuthenticated(true);
      // Fetch user data based on the token
      axios.get('http://localhost:5000/api/user', { // Adjust this API endpoint to fetch user data
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => {
          setUser(response.data.user); // Update user state with fetched data
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          logout(); // Call logout on error
        });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth', { email, password });
      const { token, user } = response.data;

      // Save token and authentication state to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('isAuthenticated', 'true'); // Set authentication state to true

      // Update authentication state and user details
      setIsAuthenticated(true);
      setUser(user);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    // localStorage.removeItem('token'); // Remove token
    // localStorage.removeItem('isAuthenticated'); // Clear authentication state
    // setIsAuthenticated(false);
    // setUser(null);

    // // Redirect to login page
    // window.location.href = '/login'; // Redirect to the login page
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
