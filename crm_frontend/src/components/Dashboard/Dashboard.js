import React from 'react';
import LatestTask from './LatestTask';
import CustomerCard from './TodayCustomer';
import EmployeeList from './NewEmpoyee';
// import UpcomingMeetings from './UpcomingMeetings';
// import NewTask from './NewTask';
import './Css/dashboard.css'; // Styles for Dashboard
import AutomatedMail from './AutomatedMail';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <CustomerCard />
      <AutomatedMail/>
      <LatestTask />
      <EmployeeList />
    </div>
  );
};

export default Dashboard;
