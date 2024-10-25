import React, { useState, useEffect } from "react";
import { fetchCustomers, deleteCustomer } from "../../utils/api"; // Adjust based on your API functions
import { useNavigate } from "react-router-dom";
import "./css/CustomerList.css"; // Assuming similar styling to TaskList

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCustomers = async () => {
      const customersData = await fetchCustomers();
      console.log(customersData);
      setCustomers(customersData);
    };
    getCustomers();
  }, []);

  const handleCustomerClick = (customerId) => {
    navigate(`/customers/${customerId}`); // Navigate to Customer Details page
  };

  const handleEditCustomer = (e, customerId) => {
    e.stopPropagation(); // Prevent the click from propagating to the row
    navigate(`/createcustomer?edit=${customerId}`); // Navigate to CreateCustomer with edit flag
  };

  const handleDeleteCustomer = async (e, customerId) => {
    e.stopPropagation(); // Prevent the click from propagating to the row

    const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
    if (confirmDelete) {
      try {
        await deleteCustomer(customerId); // Call the API method to delete the customer
        // Filter out the deleted customer from the state
        setCustomers(customers.filter((customer) => customer._id !== customerId));
        alert("Customer deleted successfully!");
      } catch (error) {
        console.error("Error deleting customer:", error);
        alert("Failed to delete customer.");
      }
    }
  };

  return (
    <div className="customer-list-container">
      <div className="card-header">
        <h3>Customer List</h3>
      </div>

      <div className="table-container">
        <table className="customer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Subscribed</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id} onClick={() => handleCustomerClick(customer._id)}>
                <td>{customer.name}</td>
                <td>{customer.age}</td>
                <td>{customer.gender}</td>
                <td>{customer.email}</td>
                <td>{customer.email_subscribed.toString()}</td>
                <td>{customer.contact_details}</td>
                <td>
                  <button className="action-btn edit-btn" onClick={(e) => handleEditCustomer(e, customer._id)}>Edit</button>
                  <button className="action-btn delete-btn" onClick={(e) => handleDeleteCustomer(e, customer._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;
