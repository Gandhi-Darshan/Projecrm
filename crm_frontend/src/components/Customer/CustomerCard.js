import React from 'react';
import './css/CustomerCard.css'; // Import CSS for styling

const CustomerCard = ({ customer }) => {
  return (
    <div className="customer-card">
      <div className="customer-header">
        <h3>{customer.name}</h3>
        <p>{customer.role}</p>
      </div>
      <div className="customer-details">
        <p>Email: {customer.email}</p>
        <p>Phone: {customer.phone}</p>
        <p>Status: <span className={`status ${customer.status.toLowerCase()}`}>{customer.status}</span></p>
      </div>
      <div className="customer-actions">
        <button className="view-details-btn">View Details</button>
        <button className="edit-btn">Edit</button>
        <button className="delete-btn">Delete</button>
      </div>
    </div>
  );
};

export default CustomerCard;
