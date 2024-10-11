const express = require('express');
const { createEmployee, getEmployees,getEmployeeById, updateEmployee, deleteEmployee } = require('../controllers/employeeController');
const router = express.Router();

router.route('/')
  .get(getEmployees)
  .post(createEmployee);

router.route('/:id')
  .get(getEmployeeById)
  .put(updateEmployee)
  .delete(deleteEmployee);

module.exports = router;
