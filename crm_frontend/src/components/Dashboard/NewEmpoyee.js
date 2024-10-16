import React, { useState, useEffect } from 'react';
import { fetchEmployees, addEmployee } from '../../utils/api'; // Adjust based on your API functions
import { useNavigate } from 'react-router-dom';
import CreateEmployee from 'crm_frontend/src/components/Employees/Createemployee.js'; // Ensure the correct path
import './Css/EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [isCreating, setIsCreating] = useState(false); // State to open Create Employee modal
  const navigate = useNavigate();

  useEffect(() => {
    const getEmployees = async () => {
      const employeeData = await fetchEmployees();
      setEmployees(employeeData);
    };
    getEmployees();
  }, []);

  const handleEmployeeClick = (employeeId) => {
    navigate(`/employees/${employeeId}`); // Navigate to Employee Details page
  };

  const handleCreateEmployee = async (newEmployee) => {
    try {
      await addEmployee(newEmployee); // Ensure you have this function in your API
      setIsCreating(false); // Close modal

      // Refresh employee list or re-fetch employees
      const employeeData = await fetchEmployees();
      setEmployees(employeeData);
    } catch (error) {
      console.error("Error creating employee:", error);
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
              <span className="edit-icon" onClick={() => handleEmployeeClick(employee._id)}>✏️</span>
              <span className="delete-icon" onClick={() => console.log('Delete employee', employee._id)}>🗑️</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Create Employee Modal */}
      {isCreating && (
        <CreateEmployee
          onCreate={handleCreateEmployee} // Call to handle new employee creation
          onCancel={() => setIsCreating(false)} // Close modal on cancel
        />
      )}
    </div>
  );
};

export default EmployeeList;
