import React from 'react';
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Navbar from './components/Common/Navbar';
import Sidebar from './components/Common/SIdebar';
// import PrivateRoute from './components/Common/PrivateRoute';
 import Dashboard from './components/Dashboard/Dashboard';
import TaskDetails from './components/Task//Taskdetails';

 import EmployeeDetails from './components/Employees/employeeDetails';
// import CustomerList from './components/Customers/CustomerList';
// import CreateCustomer from './components/Customers/CreateCustomer';
// import UpdateCustomer from './components/Customers/UpdateCustomer';
// import InsuranceList from './components/Insurance/InsuranceList';
// import CreateInsurance from './components/Insurance/CreateInsurance';
// import FollowUpList from './components/FollowUps/FollowUpList';
// import CreateFollowUp from './components/FollowUps/CreateFollowUp';
// import ReportList from './components/Reports/ReportList';
// import GenerateReport from './components/Reports/GenerateReport';
import Login from './components/Auth/login';

const App = () => {
  return (
    <AuthProvider>
      <Router>
      <div className="app">
          <Navbar />
          <div className="content-area">
            <Sidebar />  {/* Include Sidebar */}
            <div className="main-content"> {/* Container for the main content */}
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/tasks/:id" element={<TaskDetails />} />
                <Route path="/employees/:id" element={<EmployeeDetails />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
