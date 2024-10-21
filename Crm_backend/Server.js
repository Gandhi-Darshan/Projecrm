const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorMiddleware");

// Route imports
const customerRoutes = require("./routes/customerRoutes");
const taskRoutes = require("./routes/taskRoutes");
const followUpRoutes = require('./routes/followupRoutes');
const employeeRoutes = require("./routes/employeeRoutes");
const adminRoutes = require("./routes/adminRoutes");
const insuranceRoutes = require("./routes/insuranceRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

  require('./Jobs/followUpcron');
// Routes
app.use("/api/customers", customerRoutes);
app.use("/api/tasks", taskRoutes);
app.use('/api/followups', followUpRoutes);
app.use("/api/insurances", insuranceRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/auth", authRoutes);

// Error middleware
app.use(errorHandler);

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
