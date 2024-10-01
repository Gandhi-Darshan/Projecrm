const express = require('express');
const { createCustomer, getCustomers, getCustomersByid, updateCustomer, deleteCustomer } = require('../controllers/customerController');
const router = express.Router();

router.route('/')
  .get(getCustomers)
  .post(createCustomer);

router.route('/:id')
  .get(getCustomersByid)
  .put(updateCustomer)
  .delete(deleteCustomer);

module.exports = router;
