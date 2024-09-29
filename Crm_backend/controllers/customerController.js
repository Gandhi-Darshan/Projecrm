const Customer = require('../models/Customer');

const createCustomer = async (req, res) => {
  const { name, age, gender, medical_history, contact_details, insurance_details, email_subscribed } = req.body;
  const customer = new Customer({ name, age, gender, medical_history, contact_details, insurance_details, email_subscribed });

  try {
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getCustomersByid = async (req, res) => {
  const { id } = req.params;
  try {
    const customers = await Customer.findById(id, req.body);
    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const updateCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    await Customer.findByIdAndDelete(id);
    res.status(204).json({ message: 'Customer deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createCustomer, getCustomers, getCustomersByid, updateCustomer, deleteCustomer };
