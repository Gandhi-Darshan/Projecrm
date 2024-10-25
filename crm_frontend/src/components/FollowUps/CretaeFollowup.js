import React, { useState, useEffect } from "react";
import { fetchCustomers, fetchEmployees } from "../../utils/api"; // Adjust based on your API functions
import "./Css/CreateFollowup.css"; // Ensure correct styling

const CreateFollowup = ({ onCreate, followupToEdit, onCancel, isOpen }) => {
  const [emailType, setEmailType] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [triggerDate, setTriggerDate] = useState("");
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);

  // Fetch customers and employees on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersData = await fetchCustomers();
        const employeesData = await fetchEmployees();
        setCustomers(customersData);
        setEmployees(employeesData);

        // If editing, pre-fill the form with the follow-up data
        if (followupToEdit) {
          setEmailType(followupToEdit.email_type || "");
          setCustomerId(followupToEdit.customer_id?._id || "");
          setAssignedTo(followupToEdit.employee_id?._id || "");
          setTriggerDate(
            followupToEdit.trigger_date
              ? new Date(followupToEdit.trigger_date).toISOString().split("T")[0]
              : ""
          );
        } else {
          // If not editing, reset the form
          resetForm();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [followupToEdit]);

  // Reset form when creating a new follow-up
  const resetForm = () => {
    setEmailType("");
    setCustomerId("");
    setAssignedTo("");
    setTriggerDate("");
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const followupData = {
      email_type: emailType,
      customer_id: customerId,
      employee_id: assignedTo,
      trigger_date: triggerDate,
      status: "due", // Default status
    };
  
    console.log("Follow-up data being sent:", followupData); // Log the request data
  
    // If editing, pass the ID of the follow-up to edit
    console.log(followupToEdit)
    if (followupToEdit) {
      onCreate(followupToEdit._id, followupData); // Call parent handler for editing
    } else {
      onCreate(followupData); // Call parent handler for creating
    }
  
    resetForm(); // Reset form after submission
  };
  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal">
          <h3>{followupToEdit ? "Edit Follow-Up" : "Create Follow-Up"}</h3>
          <form onSubmit={handleSubmit}>
            {/* Email Type Field */}
            <label>
              Email Type:
              <input
                type="text"
                value={emailType}
                onChange={(e) => setEmailType(e.target.value)}
                required
              />
            </label>

            {/* Customer Dropdown */}
            <label>
              Customer:
              <select
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                
              >
                <option value="">Select Customer</option>
                {customers.map((customer) => (
                  <option key={customer._id} value={customer._id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </label>

            {/* Assigned To (Employee) Dropdown */}
            <label>
              Assigned To (Employee):
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                required
              >
                <option value="">Select Employee</option>
                {employees.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </label>

            {/* Trigger Date */}
            <label>
              Trigger Date:
              <input
                type="date"
                value={triggerDate}
                onChange={(e) => setTriggerDate(e.target.value)}
                required
              />
            </label>

            {/* Modal Actions */}
            <div className="modal-actions">
              <button type="submit">
                {followupToEdit ? "Update Follow-Up" : "Create Follow-Up"}
              </button>
              <button type="button" onClick={onCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default CreateFollowup;
