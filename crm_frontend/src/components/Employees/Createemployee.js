import React, { useState, useEffect } from 'react';
import './css/CreateEmployee.css'; // Ensure you have a CSS file for styling

const CreateEmployee = ({ onCreate, employeeToEdit, onCancel, isOpen }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (employeeToEdit) {
      setName(employeeToEdit.name);
      setEmail(employeeToEdit.email);
      setRole(employeeToEdit.role);
    } else {
      setName('');
      setEmail('');
      setRole('');
    }
  }, [employeeToEdit]);

  // Function to generate a random password
  const generateRandomPassword = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let employeeData;

    if (employeeToEdit) {
      // If editing, use the existing employee data and update only the name, email, and role
      employeeData = {
        ...employeeToEdit,
        name,
        email,
        role,
      };
    } else {
      // If creating, generate a new password
      const generatedPassword = generateRandomPassword(8);
      employeeData = {
        name,
        email,
        role,
        password: generatedPassword,
        admin_id: '66fdb0b565783eb6f3a321a9',
      };

      // Show alert with generated password
      alert(`Employee created successfully with password: ${generatedPassword}`);
    }

    try {
      await onCreate(employeeData); // Send data to the API
      if (employeeToEdit) {
        alert('Employee updated successfully!'); // Show update success alert
      }
      // Reset form fields
      setName('');
      setEmail('');
      setRole('');
    } catch (error) {
      console.error("Error creating/updating employee:", error);
      alert("Error creating/updating employee."); // Show error alert
    }
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
