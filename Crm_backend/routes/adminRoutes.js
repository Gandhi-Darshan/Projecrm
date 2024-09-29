const express = require('express');
const { createAdmin, getAdmins, updateAdmin, deleteAdmin } = require('../controllers/adminController');
const router = express.Router();

router.route('/')
  .get(getAdmins)
  .post(createAdmin);

router.route('/:id')
  .put(updateAdmin)
  .delete(deleteAdmin);

module.exports = router;
