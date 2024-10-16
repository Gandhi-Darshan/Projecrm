// CustomerCard.js
import React from 'react';
import './Css/CustomerCard.css';

const customers = [
  { id: 1, name: 'John Doe', location: 'London', appointment: '10:00 AM' },
  { id: 2, name: 'Jane Smith', location: 'Toronto', appointment: '11:30 AM' },
  { id: 3, name: 'Emma Johnson', location: 'New York', appointment: '1:15 PM' },
  { id: 4, name: 'David Brown', location: 'San Francisco', appointment: '3:45 PM' },
  { id: 5, name: 'Sophia Lee', location: 'Berlin', appointment: '4:30 PM' },
  { id: 6, name: 'Liam Harris', location: 'Paris', appointment: '5:00 PM' }
];

const CustomerCard = () => {
  return (
    <div className="customer-card">
      <h2 className="card-title">Today's Customers</h2>
      <div className="customer-list-scroll">
        {customers.map((customer) => (
          <div className="customer-item" key={customer.id}>
            <div className="customer-name">{customer.name}</div>
            <div className="customer-info">
              <p>Location: <span className="customer-location">{customer.location}</span></p>
              <p>Appointment: <span className="customer-appointment">{customer.appointment}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerCard;
