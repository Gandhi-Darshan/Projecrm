const FollowUp = require('../models/FollowUp');

// Create a follow-up
const createFollowUp = async (req, res) => {
  const { employee_id, customer_id, email_type, trigger_date, status } = req.body;
  const followUp = new FollowUp({ employee_id, customer_id, email_type, trigger_date, status });

  try {
    await followUp.save();
    res.status(201).json(followUp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all follow-ups
const getFollowUps = async (req, res) => {
  try {
    const followUps = await FollowUp.find().populate('employee_id customer_id');
    res.status(200).json(followUps);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a follow-up
const updateFollowUp = async (req, res) => {
  const { id } = req.params;
  try {
    const followUp = await FollowUp.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(followUp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a follow-up
const deleteFollowUp = async (req, res) => {
  const { id } = req.params;
  try {
    await FollowUp.findByIdAndDelete(id);
    res.status(200).json({ message: 'Follow-Up deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};  

module.exports = { createFollowUp, getFollowUps, updateFollowUp, deleteFollowUp };
