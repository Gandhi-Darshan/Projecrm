const express = require('express');
const { loginUser } = require('../controllers/authController');
const router = express.Router();

// POST request to log in
router.post('/', loginUser);

module.exports = router;
