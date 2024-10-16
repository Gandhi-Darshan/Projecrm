import React, { useState } from 'react';
import './Navbar.css'; // Specific styles for Navbar

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
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
