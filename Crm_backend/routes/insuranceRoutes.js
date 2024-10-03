const express = require('express');
const {
  createInsurance,
  getAllInsuranceDetails,
  getInsuranceDetailsById,
  updateInsuranceDetails,
  deleteInsuranceDetails
} = require('../controllers/insuranceController');

const router = express.Router();

// Route for getting all insurance details and creating a new insurance entry
router.route('/')
  .get(getAllInsuranceDetails)  // Get all insurance details
  .post(createInsurance);       // Create a new insurance detail

// Route for getting, updating, and deleting insurance details by insurance ID
router.route('/:insuranceId')
  .get(getInsuranceDetailsById)  // Get insurance details by insurance ID
  .put(updateInsuranceDetails)   // Update insurance details by insurance ID
  .delete(deleteInsuranceDetails); // Delete insurance details by insurance ID

module.exports = router;
