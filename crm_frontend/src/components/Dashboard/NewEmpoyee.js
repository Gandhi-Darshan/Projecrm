import React, { useState, useEffect } from 'react';
import { fetchEmployees, addEmployee, deleteEmployee, updateEmployee } from '../../utils/api';
import CreateEmployee from 'crm_frontend/src/components/Employees/Createemployee.js';
import './Css/EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [message, setMessage] = useState('');

  const fetchAndSetEmployees = async () => {
    const employeeData = await fetchEmployees();
    setEmployees(employeeData);
  };

  useEffect(() => {
    fetchAndSetEmployees();
  }, []);

  const handleCreateEmployee = async (newEmployee) => {
    try {
      await addEmployee(newEmployee);
      setIsCreating(false);
      await fetchAndSetEmployees();
      setMessage('Employee added successfully!');
    } catch (error) {
      console.error("Error creating employee:", error);
      setMessage('Error adding employee.');
    }
  };

  const handleEditClick = (employee) => {
    setCurrentEmployee(employee);
    setIsEditing(true);
  };

  const handleUpdateEmployee = async (updatedEmployee) => {
    try {
      await updateEmployee(currentEmployee._id, updatedEmployee);
      setIsEditing(false);
      setCurrentEmployee(null);
      await fetchAndSetEmployees();
      setMessage('Employee updated successfully!');
    } catch (error) {
      console.error("Error updating employee:", error);
      setMessage('Error updating employee.');
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      try {
        await deleteEmployee(employeeId);
        await fetchAndSetEmployees();
        window.confirm('Employee deleted successfully!');
      } catch (error) {
        console.error("Error deleting employee:", error);
        window.confirm('Error deleting employee.');
      }
    }
  };

  return (
    <div className="employee-card">
      <div className="card-header">
        <h3>Employee List</h3>
        <button onClick={() => setIsCreating(true)} className="add-employee-btn">
          <span className="plus-icon">+</span>
        </button>
      </div>

      <ul className="employee-list">
        {employees.map(employee => (
          <li className="employee-item" key={employee._id}>
            <div className="employee-details">
              <p className="employee-name">{employee.name}</p>
              <p className="employee-role">{employee.role}</p>
            </div>
            <div className="employee-actions">
              <span className="edit-icon" onClick={() => handleEditClick(employee)}>✏️</span>
              <span className="delete-icon" onClick={() => handleDeleteEmployee(employee._id)}>🗑️</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Create Employee Modal */}
      <CreateEmployee
        onCreate={handleCreateEmployee}
        onCancel={() => setIsCreating(false)}
        isOpen={isCreating} // Pass isOpen prop for creating
      />

      {/* Edit Employee Modal */}
      {isEditing && currentEmployee && (
        <CreateEmployee
          onCreate={handleUpdateEmployee} // Use onCreate for update as well
          employeeToEdit={currentEmployee}
          onCancel={() => { setIsEditing(false); setCurrentEmployee(null); }}
          isOpen={isEditing} // Pass isOpen prop for editing
        />
      )}

      {/* Message Display */}
      {message && (
        <div className="message">
          {message}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
