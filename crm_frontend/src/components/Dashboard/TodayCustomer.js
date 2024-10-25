// CustomerCard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCustomers } from '../../utils/api'; // Ensure this is the correct import path
import './Css/CustomerCard.css';

const CustomerCard = () => {
  const [customers, setCustomers] = useState([]); // State for storing customers
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const customerData = await fetchCustomers(); // Fetch customers from API
        // Filter customers to only include those created today
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        const todayCustomers = customerData.filter(customer => {
          const customerDate = new Date(customer.createdAt).toISOString().split('T')[0]; // Extract date from createdAt
          return customerDate === today; // Compare dates
        });
        setCustomers(todayCustomers); // Update state with today's customers
      } catch (err) {
        setError('Failed to load customers.'); // Handle any errors
      } finally {
        setLoading(false); // Set loading to false after data fetch
      }
    };

    getCustomers();
  }, []);

  if (loading) return <div>Loading customers...</div>; // Loading state
  if (error) return <div>{error}</div>; // Error state

  return (
    <div className="customer-card">
      <h2 className="card-title">Today's Customers</h2>
      <div className="customer-list-scroll">
        {customers.length > 0 ? (
          customers.map((customer) => (
            <div className="customer-item" key={customer.id}>
              <div className="customer-name">{customer.name}</div>
              <div className="customer_dd">
                <p>Email Subscribed: <span className="customer-email">{customer.email_subscribed ? 'Yes' : 'No'}</span></p>
                <p>Visited Date: <span className="customer-visited-date">{new Date(customer.createdAt).toLocaleDateString()}</span></p>
              </div>
            </div>
          ))
        ) : (
          <div className="all-customer">No customers for today.
          <li><a><Link to="/customers" >View all customer</Link></a></li>
          </div> // Message if no customers found
        )}
      </div>
    </div>
  );
};

export default CustomerCard;
