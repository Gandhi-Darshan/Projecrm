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

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    await Employee.findByIdAndDelete(id);
    res.status(204).json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createEmployee, getEmployees, updateEmployee, deleteEmployee };
