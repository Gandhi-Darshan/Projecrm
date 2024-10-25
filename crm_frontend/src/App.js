import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/authContext';
import Navbar from './components/Common/Navbar';
import Sidebar from './components/Common/SIdebar';
import Dashboard from './components/Dashboard/Dashboard';
import TaskDetails from './components/Task/Taskdetails';
import EmployeeDetails from './components/Employees/employeeDetails';
import CreateCustomer from './components/Customer/CreateCustomer';
import CustomerDetail from './components/Customer/CustomerDetails';
import FollowUpList from './components/FollowUps/ListFollowup';
import Login from './components/Auth/login';
import CustomerList from './components/Customer/CustomerList';
import PrivateRoute from './utils/PrivateRoute';
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Assuming you have a user object in your auth context

  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route
          path="/*" // Matches all other routes
          element={
            <PrivateRoute>
            
              <div className="app">
                <Navbar />
                <div className="content-area">
                  <Sidebar />
                  <div className="main-content">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/customers" element={<CustomerList />} />
                      <Route path="/CreateCustomer" element={<CreateCustomer />} />
                      <Route path="/customers/:customerId" element={<CustomerDetail />} />
                      <Route path="/tasks/:id" element={<TaskDetails />} />
                      <Route path="/employees/:id" element={<EmployeeDetails />} />
                      <Route path="/followups" element={<FollowUpList />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  </AuthProvider>
  );
};

export default App;
