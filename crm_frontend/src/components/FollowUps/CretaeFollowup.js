import React, { useState, useEffect } from "react";
import { fetchCustomers, fetchEmployees } from "../../utils/api"; // Adjust based on your API functions
import "./Css/CreateFollowup.css";

const CreateFollowup = ({ onCreate, onEdit, followupToEdit, onCancel, isOpen }) => {
  
  const [emailType, setEmailType] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [triggerDate, setTriggerDate] = useState("");
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const customersData = await fetchCustomers();
      const employeesData = await fetchEmployees();
      setCustomers(customersData);
      setEmployees(employeesData);

      if (followupToEdit) {
        // Populate fields if editing a follow-up
        setEmailType(followupToEdit.email_type);
        setCustomerId(followupToEdit.customer_id?._id || ""); // Assuming customer_id is an object with _id
        setAssignedTo(followupToEdit.assigned_to?._id || ""); // Assuming assigned_to is an object with _id
        setTriggerDate(new Date(followupToEdit.trigger_date).toISOString().split("T")[0]); // Format trigger_date
      } else {
        // Reset fields for creating a new follow-up
        setEmailType("");
        setCustomerId("");
        setAssignedTo("");
        setTriggerDate("");
      }
    };

    fetchData();
  }, [followupToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const followupData = {
      email_type: emailType,
      customer_id: customerId,
      assigned_to: assignedTo,
      trigger_date: triggerDate,
      status: "due", // Set default status to "due"
    };
    console.log(followupData);
    if (followupToEdit) {
      onEdit(followupToEdit._id, followupData); // Call onEdit if editing
    } else {
      onCreate(followupData); // Call onCreate if creating
    }

    // Reset form fields after submission
    setEmailType("");
    setCustomerId("");
    setAssignedTo("");
    setTriggerDate("");
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal">
          <h3>{followupToEdit ? "Edit Follow-Up" : "Create Follow-Up"}</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Email Type:
              <input
                type="text"
                value={emailType}
                onChange={(e) => setEmailType(e.target.value)}
                required
              />
            </label>
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
            <label>
              Assigned To:
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              >
                <option value="">Select Employee</option>
                {employees.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Trigger Date:
              <input
                type="date"
                value={triggerDate}
                onChange={(e) => setTriggerDate(e.target.value)}
                required
              />
            </label>

            <button type="submit">
              {followupToEdit ? "Update Follow-Up" : "Create Follow-Up"}
            </button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default CreateFollowup;
