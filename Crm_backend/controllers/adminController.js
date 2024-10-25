const Admin = require('../models/Admin');

const createAdmin = async (req, res) => {
  const { name, contact_no,department,email, password } = req.body;
  const admin = new Admin({ name, contact_no,department,email, password });

  try {
    await admin.save();
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    await Admin.findByIdAndDelete(id);
    res.status(200).json({ message: 'Admin deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createAdmin, getAdmins, updateAdmin, deleteAdmin };
