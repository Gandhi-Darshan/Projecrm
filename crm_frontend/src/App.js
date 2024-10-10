import React from 'react';
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Navbar from './components/Common/Navbar';
// import PrivateRoute from './components/Common/PrivateRoute';
// import Dashboard from './components/Dashboard/Dashboard';
import TasksList from './components/Task/Tasklist';
import TaskDetails from './components/Task//Taskdetails';
// import EmployeeList from './components/Employees/EmployeeList';
// import CreateEmployee from './components/Employees/CreateEmployee';
// import UpdateEmployee from './components/Employees/UpdateEmployee';
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
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<TasksList />} />
          <Route path="/tasks/:id" element={<TaskDetails />} /> {/* Task Details route */}
          {/* 
          <PrivateRoute path="/" element={<Dashboard />} />
          <PrivateRoute path="/employees" element={<EmployeeList />} />
          <PrivateRoute path="/employees/create" element={<CreateEmployee />} />
          <PrivateRoute path="/employees/update/:employeeId" element={<UpdateEmployee />} />
          <PrivateRoute path="/customers" element={<CustomerList />} />
          <PrivateRoute path="/customers/create" element={<CreateCustomer />} />
          <PrivateRoute path="/customers/update/:customerId" element={<UpdateCustomer />} />
          <PrivateRoute path="/insurance" element={<InsuranceList />} />
          <PrivateRoute path="/insurance/create" element={<CreateInsurance />} />
          <PrivateRoute path="/followups" element={<FollowUpList />} />
          <PrivateRoute path="/followups/create" element={<CreateFollowUp />} />
          <PrivateRoute path="/reports" element={<ReportList />} />
          <PrivateRoute path="/reports/generate" element={<GenerateReport />} />
          */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
