import React, { useState, useEffect } from 'react';
import { fetchCustomers, fetchEmployees } from '../../utils/api'; // Adjust based on your API functions
import './css/CreateTask.css';

const CreateTask = ({ onCreate, onEdit, taskToEdit, onCancel, isOpen }) => {
  const [taskName, setTaskName] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status] = useState('pending'); // Automatically set to pending
  const [customers, setCustomers] = useState([]); // Store customers
  const [employees, setEmployees] = useState([]); // Store employees

  useEffect(() => {
    const fetchData = async () => {
      const customersData = await fetchCustomers();
      const employeesData = await fetchEmployees();
      setCustomers(customersData);
      setEmployees(employeesData);

      if (taskToEdit) {
        // Populate fields if editing a task
        setTaskName(taskToEdit.task_name);
        setCustomerId(taskToEdit.customer_id._id); // Assuming customer_id is an object with _id
        setAssignedTo(taskToEdit.assigned_to._id); // Assuming assigned_to is an object with _id
        setDueDate(new Date(taskToEdit.due_date).toISOString().split('T')[0]); // Format due_date
      }
    };
    fetchData();
  }, [taskToEdit]); // Re-fetch data if taskToEdit changes

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      task_name: taskName,
      customer_id: customerId,
      assigned_to: assignedTo,
      due_date: dueDate,
      status,
    };
    if (taskToEdit) {
    //console.log(taskData);
      onEdit(taskToEdit._id, taskData); // Call onEdit if editing
    } else {
      onCreate(taskData); // Call onCreate if creating
    }
    // Reset form fields
    setTaskName('');
    setCustomerId('');
    setAssignedTo('');
    setDueDate('');
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal">
          <h3>{taskToEdit ? 'Edit Task' : 'Create Task'}</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Task Name:
              <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} required />
            </label>
            <label>
              Customer:
              <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} required>
                <option value="">Select Customer</option>
                {customers.map(customer => (
                  <option key={customer._id} value={customer._id}>{customer.name}</option>
                ))}
              </select>
            </label>
            <label>
              Assigned To:
              <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required>
                <option value="">Select Employee</option>
                {employees.map(employee => (
                  <option key={employee._id} value={employee._id}>{employee.name}</option>
                ))}
              </select>
            </label>
            <label>
              Due Date:
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
            </label>
            <button type="submit">{taskToEdit ? 'Update Task' : 'Create Task'}</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </form>
        </div>
      </div>
    )
  );
};

export default CreateTask;
