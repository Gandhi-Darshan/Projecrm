import React, { useState, useEffect } from "react";
import { fetchCustomers } from "../../utils/api"; // Adjust based on your API functions
import { useNavigate } from "react-router-dom";
// import CreateCustomer from "../Customer/CreateCustomer"; // Import CreateCustomer for modal
import "./css/CustomerList.css"; // Assuming similar styling to TaskList

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [isCreating, setIsCreating] = useState(false); // State for opening create customer modal
  const [customerToEdit, setCustomerToEdit] = useState(null); // State to hold the customer being edited
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

    // const handleCreateCustomer = async (newCustomer) => {
    //   await AddCustomer(newCustomer); // Call your API to create a new customer
    //   setIsCreating(false); // Close modal
    //   const customersData = await fetchCustomers(); // Refresh customer list or re-fetch customers
    //   setCustomers(customersData);
    // };

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
          {console.log(customers)}
            {customers.map((customer) => (
              
              <tr key={customer._id} onClick={() => handleCustomerClick(customer._id)}>
                <td>{customer.name}</td>
                <td>{customer.age}</td>
                <td>{customer.gender}</td>
                <td>{customer.email}</td>
                <td>{customer.email_subscribed.toString()}</td>
                <td>{customer.contact_details}</td>
                <td>
                  <button className="action-btn edit-btn">Edit</button>
                  <button className="action-btn delete-btn">Delete</button>
                </td>
              </tr>
              
            ))}
          </tbody>
        </table>
      </div>

      {/* Render Create Customer Modal */}
      {/* <CreateCustomer
        onCreate={handleCreateCustomer}
        customerToEdit={customerToEdit}
        onCancel={() => {
          setCustomerToEdit(null);
          setIsCreating(false);
        }}
        isOpen={isCreating || customerToEdit !== null} // Open modal if creating or editing
      /> */}
    </div>
  );
};

export default CustomerList;
