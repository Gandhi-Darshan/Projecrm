import React, { useState, useEffect } from 'react';
import { fetchEmployees } from '../../utils/api'; // Adjust based on your API functions
import './css/CreateEmployee.css'; // Ensure you have a CSS file for styling

const CreateEmployee = ({ onCreate, onEdit, employeeToEdit, onCancel, isOpen }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (employeeToEdit) {
      // Populate fields if editing an employee
      setName(employeeToEdit.name);
      setEmail(employeeToEdit.email);
      setRole(employeeToEdit.role);
    }
  }, [employeeToEdit]); // Re-fetch data if employeeToEdit changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeData = {
      name,
      email,
      role,
    };
    if (employeeToEdit) {
      await onEdit(employeeToEdit._id, employeeData); // Call onEdit if editing
    } else {
      await onCreate(employeeData); // Call onCreate if creating
    }
    // Reset form fields
    setName('');
    setEmail('');
    setRole('');
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal">
          <h3>{employeeToEdit ? 'Edit Employee' : 'Create Employee'}</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Role:
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </label>
            <div className="modal-actions">
              <button type="submit">{employeeToEdit ? 'Update Employee' : 'Create Employee'}</button>
              <button type="button" onClick={onCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default CreateEmployee;
