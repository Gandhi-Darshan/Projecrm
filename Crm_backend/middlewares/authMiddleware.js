const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Employee = require('../models/employee');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if the token belongs to admin or employee
      if (decoded.role === 'admin') {
        req.user = await Admin.findById(decoded.id).select('-password');
      } else if (decoded.role === 'employee') {
        req.user = await Employee.findById(decoded.id).select('-password');
      } else {
        return res.status(401).json({ message: 'Not authorized' });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
