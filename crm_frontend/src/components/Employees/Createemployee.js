import React, { useState, useEffect } from 'react';
//import './css/CreateEmployee.css';

const CreateEmployee = ({ onCreate, onEdit, employeeToEdit, onCancel, isOpen }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState(''); // Password for new employees

  useEffect(() => {
    if (employeeToEdit) {
      // Populate fields if editing an employee
      setName(employeeToEdit.name);
      setEmail(employeeToEdit.email);
      setRole(employeeToEdit.role);
      // Password is not shown or modified when editing
    }
  }, [employeeToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const employeeData = { name, email, role, password };
    
    if (employeeToEdit) {
      onEdit(employeeToEdit._id, employeeData); // Call onEdit if editing
    } else {
      onCreate(employeeData); // Call onCreate if creating
    }

    // Reset form fields
    setName('');
    setEmail('');
    setRole('');
    setPassword('');
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal">
          <h3>{employeeToEdit ? 'Edit Employee' : 'Create Employee'}</h3>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              required
            >
              <option value="" disabled>Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Employee">Employee</option>
            </select>
            
            {!employeeToEdit && (
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            )}

            <div className="modal-actions">
              <button type="submit">{employeeToEdit ? 'Update' : 'Create'}</button>
              <button type="button" onClick={onCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default CreateEmployee;
