import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css'; // Specific styles for Sidebar
import logo from 'crm_frontend/src/assets/Img/TeamLogo.jpeg';

const Sidebar = () => {
  const location = useLocation(); // Get the current location
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility on mobile

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle sidebar visibility on mobile
  };

  return (
    <>
      <button className="hamburger" onClick={toggleSidebar}>
        &#9776; {/* Hamburger Icon */}
      </button>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Sidebar Header with Logo */}
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="sidebar-logo" />
        </div>

        <ul>
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Dashboard</Link>
          </li>
          <li>
            <Link to="/customers" className={location.pathname === '/customers' ? 'active' : ''}>Customers</Link>
          </li>
          <li>
            <Link to="/followups" className={location.pathname === '/followups' ? 'active' : ''}>Follow-Ups</Link>
          </li>
          <li>
            <Link to="/reports" className={location.pathname === '/reports' ? 'active' : ''}>Reports</Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
