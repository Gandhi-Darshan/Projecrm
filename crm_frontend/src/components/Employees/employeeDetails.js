import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEmployeeById, deleteEmployee, updateEmployee } from '../../utils/api'; // Import API functions
import CreateEmployee from './Createemployee'; // Reuse CreateEmployee component for editing
  import './css/EmployeeDetails.css';

const EmployeeDetails = () => {
  const { id } = useParams(); // Get employee ID from URL params
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // For toggling edit mode

  useEffect(() => {
    const getEmployeeDetails = async () => {
      if (id) {
        console.log(id);
        const employeeData = await fetchEmployeeById(id); // Fetch employee details by ID
        console.log(employeeData);
        setEmployee(employeeData);
      }
    };
    getEmployeeDetails();
  }, [id]);

  const handleDelete = async () => {
    await deleteEmployee(id);
    navigate('/employees'); // Redirect back to employee list after deletion
  };

  const handleUpdate = async (updatedEmployeeData) => {
    await updateEmployee(id, updatedEmployeeData);
    setEmployee(updatedEmployeeData);
    setIsEditing(false); // Close edit mode after updating
  };

  return (
    <div className="employee-details-container">
      <h2>Employee Details</h2>
      {employee ? (
        <>
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Role:</strong> {employee.role}</p>

          <button onClick={() => setIsEditing(true)}>Edit Employee</button>
          <button onClick={handleDelete}>Delete Employee</button>
        </>
      ) : (
        <p>Loading employee details...</p>
      )}

      {/* Render Edit Employee Modal */}
      {isEditing && (
        <CreateEmployee
          onEdit={handleUpdate}
          employeeToEdit={employee} // Pass existing employee data for editing
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default EmployeeDetails;
