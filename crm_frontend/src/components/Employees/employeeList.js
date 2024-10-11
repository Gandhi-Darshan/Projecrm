import React, { useState, useEffect } from 'react';
import { fetchEmployees, addEmployee } from '../../utils/api'; // Adjust based on your API functions
import { useNavigate } from 'react-router-dom';
import CreateEmployee from './Createemployee'; // Ensure the correct path
import './css/Empployeelist.css';

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
    <div className="employee-list-container">
      <h2>Employee List</h2>
      <button onClick={() => setIsCreating(true)} className="create-employee-btn">Create Employee</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee._id} onClick={() => handleEmployeeClick(employee._id)}>
              <td>{employee._id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
