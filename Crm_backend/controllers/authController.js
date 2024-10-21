const Admin = require("../models/Admin");
const Employee = require("../models/employee");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Admin and Employee Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user;
    let role;

    // First, check if the user is an Admin
    user = await Admin.findOne({
      email: { $regex: new RegExp(`^${email.toLowerCase()}$`, "i") },
    });

    if (user) {
      role = "admin";
    } else {
      // If not found in Admins, check in Employees with case-insensitive search
      user = await Employee.findOne({
        email: { $regex: new RegExp(`^${email.toLowerCase()}$`, "i") },
      });

      if (user) {
        role = "employee";
      }
    }

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      token, // Return token to the client
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { loginUser };
