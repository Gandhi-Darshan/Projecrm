import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/authContext"; // Import your Auth context
import "./Navbar.css"; // Specific styles for Navbar
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("Dashboard"); // Default to Dashboard

  const location = useLocation(); // Get the current path
  const { user, logout } = useAuth(); // Access user and logout function from context

  useEffect(() => {
    // Determine page title based on the current path
    switch (location.pathname) {
      case "/customers":
        setPageTitle("Customers");
        break;
      case "/insurance":
        setPageTitle("Insurance");
        break;
      case "/followups":
        setPageTitle("Follow-Ups");
        break;
      case "/reports":
        setPageTitle("Reports");
        break;
      default:
        setPageTitle("Dashboard"); // Fallback to Dashboard
    }
  }, [location.pathname]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
     localStorage.removeItem('token'); // Remove token
    localStorage.removeItem('isAuthenticated'); // Clear authentication state

    // Redirect to login page
    window.location.href = '/login'; // Redirect to the login page
    setIsDropdownOpen(false); // Close dropdown after logout
  };

  return (
    <nav className="navbar">
      <div className="left-side">
        <h3 className="page-title">{pageTitle}</h3>
      </div>
      <div className="right-side">
        <button className="add-customer">
          <Link
            to="./createcustomer"
            style={{
              textDecoration: "none", 
              color: "black"
            }}
          >
            <AddCircleOutlineIcon
              style={{ verticalAlign: "middle", marginRight: "8px" }}
            />
            Add New Customers
          </Link>
        </button>

        <div className={`user-info ${isDropdownOpen ? "open" : ""}`}>
          <span onClick={toggleDropdown}>{user ? user.name : "Admin"} &#9662;</span>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li onClick={handleLogout}>Logout</li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
