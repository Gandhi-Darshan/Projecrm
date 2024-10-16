import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Specific styles for Sidebar
import logo from 'crm_frontend/src/assets/Img/TeamLogo.jpeg';
const Sidebar = () => {
  return (
    <aside className="sidebar">
      {/* Sidebar Header with Logo and Text */}
      <div className="sidebar-header">
      <img src={logo} alt="Logo" className="sidebar-logo" />
     
      </div>

      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/customers">Customers</Link></li>
        <li><Link to="/insurance">Insurance</Link></li>
        <li><Link to="/followups">Follow-Ups</Link></li>
        <li><Link to="/reports">Reports</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
