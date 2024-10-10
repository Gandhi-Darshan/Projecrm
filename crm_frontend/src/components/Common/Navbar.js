import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/tasks">Task</Link></li>
        <li><Link to="/employees">Employees</Link></li>
        <li><Link to="/customers">Customers</Link></li>
        <li><Link to="/insurance">Insurance</Link></li>
        <li><Link to="/followups">Follow-Ups</Link></li>
        <li><Link to="/reports">Reports</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
