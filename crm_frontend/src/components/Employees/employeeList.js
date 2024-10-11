import React, { useState, useEffect } from 'react';
import { fetchEmployees } from '../../utils/api'; // Adjust based on your API functions
import { useNavigate } from 'react-router-dom';
import CreateEmployee from './Createemployee';
//import './css/EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
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
          onCreate={() => setIsCreating(false)}
          onCancel={() => setIsCreating(false)}
        />
      )}
    </div>
  );
};

export default EmployeeList;
