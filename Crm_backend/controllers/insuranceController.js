//findbyid
//save
//find
//findbyidandupdate
//findbyidanddelete

// InsuranceController.js

const Insurance = require('../models/Insurance'); // Assuming Insurance model is here

// Create a new insurance record
const createInsurance = async (req, res) => {
    const { provider, policyNumber, coverageDetails, expiryDate} = req.body;
    const insurance = new Insurance({ provider, policyNumber, coverageDetails, expiryDate});
  
    try {
      await insurance.save();
      res.status(201).json(insurance);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    
};

// Get all insurance records
const getAllInsuranceDetails = async (req, res) => {
  try {
    const allInsurance = await Insurance.find();
    res.status(200).json(allInsurance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching insurance details', error });
  }
};

// Get insurance by insurance ID
const getInsuranceDetailsById = async (req, res) => {
  const { insuranceId } = req.params;
  try {
    const insurance = await Insurance.findById({ insuranceId });
    if (!insurance) return res.status(404).json({ message: 'Insurance not found' });
    res.status(200).json(insurance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching insurance detail', error });
  }
};

// Update insurance by insurance ID
const updateInsuranceDetails = async (req, res) => {
  const { insuranceId } = req.params;
  try {
    const updatedInsurance = await Insurance.findByIdAndUpdate(
      { insuranceId },
      { $set: req.body },
      { new: true }
    );
    if (!updatedInsurance) return res.status(404).json({ message: 'Insurance not found' });
    res.status(200).json(updatedInsurance);
  } catch (error) {
    res.status(500).json({ message: 'Error updating insurance details', error });
  }
};

// Delete insurance by insurance ID
const deleteInsuranceDetails = async (req, res) => {
  const { insuranceId } = req.params;
  try {
    const deletedInsurance = await Insurance.findByIdAndDelete({ insuranceId });
    if (!deletedInsurance) return res.status(404).json({ message: 'Insurance not found' });
    res.status(200).json({ message: 'Insurance deleted', deletedInsurance });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting insurance', error });
  }
};



module.exports = {
  createInsurance,
  getAllInsuranceDetails,
  getInsuranceDetailsById,
  updateInsuranceDetails,
  deleteInsuranceDetails
};
