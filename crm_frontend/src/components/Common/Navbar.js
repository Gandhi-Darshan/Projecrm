import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Navbar.css'; // Specific styles for Navbar

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState('Dashboard'); // Default to Dashboard

  const location = useLocation(); // Get the current path

  useEffect(() => {
    // Determine page title based on the current path
    switch (location.pathname) {
      case '/customers':
        setPageTitle('Customers');
        break;
      case '/insurance':
        setPageTitle('Insurance');
        break;
      case '/followups':
        setPageTitle('Follow-Ups');
        break;
      case '/reports':
        setPageTitle('Reports');
        break;
      default:
        setPageTitle('Dashboard'); // Fallback to Dashboard
    }
  }, [location.pathname]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="left-side">
        <h3 className="page-title">{pageTitle}</h3> {/* Show active page title */}
      </div>
      <div className="right-side">
        <button className="add-customer">Add New Customers</button>

        <div className={`user-info ${isDropdownOpen ? 'open' : ''}`}>
          <span onClick={toggleDropdown}>Admin Name &#9662;</span> {/* Dropdown Arrow */}
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li>Profile</li>
              <li>Logout</li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
