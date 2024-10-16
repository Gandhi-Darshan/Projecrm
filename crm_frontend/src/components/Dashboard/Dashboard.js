import React from 'react';
import LatestTask from './LatestTask';
import CustomerCard from './TodayCustomer';
import EmployeeList from './NewEmpoyee';
// import UpcomingMeetings from './UpcomingMeetings';
// import NewTask from './NewTask';
import './Css/dashboard.css'; // Styles for Dashboard

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* <LatestTask />
     
      {/* <UpcomingMeetings />
      <NewTask /> */} 
      <CustomerCard />
      <EmployeeList/>
      <LatestTask/>
    </div>
  );
};

export default Dashboard;
