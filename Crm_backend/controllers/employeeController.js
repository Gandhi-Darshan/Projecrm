const Employee = require('../models/employee');

const createEmployee = async (req, res) => {
  const { name, role,admin_id ,email, password } = req.body;
  const employee = new Employee({ name, role, admin_id,email, password });

  try {
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getEmployeeById = async (req, res) => {
  const {id} = req.params;
  try {
    const employees = await Employee.findById(id, req.body);
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    // Check for pending tasks associated with the employee
    const pendingTasks = await Task.find({ assignedTo: id, status: 'pending' });
    if (pendingTasks.length > 0) {
      return res.status(400).json({ message: 'Cannot delete employee with pending tasks.' });
    }

    // If no pending tasks, proceed to delete the employee
    await Employee.findByIdAndDelete(id);
    res.status(200).json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createEmployee, getEmployees,getEmployeeById, updateEmployee, deleteEmployee };
