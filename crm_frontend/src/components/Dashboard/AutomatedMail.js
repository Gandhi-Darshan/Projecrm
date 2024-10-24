import React, { useEffect, useState } from "react";
import "./Css/AutomatedMail.css"; // Import the stylesheet
import { fetchAutomated } from "../../utils/api"; // Import the API function
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CampaignIcon from '@mui/icons-material/Campaign';
import { Link } from "react-router-dom";

const AutomatedMail = () => {
  // State to store the email processes fetched from the API
  const [emailProcesses, setEmailProcesses] = useState([]);

  // Function to calculate duration
  const calculateDuration = (triggerDate) => {
    const now = new Date();
    const triggeredDate = new Date(triggerDate);
    const durationInMillis = triggeredDate - now; // Duration in milliseconds
  
    // Check if the trigger date is in the future
    const isFuture = durationInMillis > 0;
  
    const absDurationInMillis = Math.abs(durationInMillis); // Get the absolute value for uniform calculations
    const seconds = Math.floor(absDurationInMillis / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    let durationMessage = "";
  
    if (days > 0) {
      durationMessage = `${days} day${days > 1 ? "s" : ""}`;
    } else if (hours > 0) {
      durationMessage = `${hours} hour${hours > 1 ? "s" : ""}`;
    } else if (minutes > 0) {
      durationMessage = `${minutes} minute${minutes > 1 ? "s" : ""}`;
    } else {
      durationMessage = `${seconds} second${seconds > 1 ? "s" : ""}`;
    }
  
    if (isFuture) {
      return `In ${durationMessage}`;
    } else {
      return `${durationMessage} ago`;
    }
  };
  
  // Fetch the data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAutomated(); 

        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        const todayfollowups = data.filter(followup => {
          const followup_trigger_date = new Date(followup.trigger_date).toISOString().split('T')[0]; // Extract date from createdAt
          return followup_trigger_date === today; // Compare dates
        });
        
        const formattedData = todayfollowups.map((followUp) => ({
          id: followUp._id,
          emailType: followUp.email_type,
          customer_id: followUp.customer_id,
          name: followUp.customer_id
            ? followUp.customer_id.name
            : followUp.employee_id.name, // Select name based on presence
          trigger_date: followUp.trigger_date,
          duration: calculateDuration(followUp.trigger_date), 
          // Calculate duration based on trigger_date
        }));
        setEmailProcesses(formattedData); // Set the state with the formatted data
      
      } catch (error) {
        console.error("Error fetching automated email processes:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="automated-mail-container">
      <div className="automated-mail-header">
        <h2>Automated Email Process</h2>
        {/* <button className="add-button">+</button> */}
      </div>

      <div className="scroll">
        <ul className="process-list">
          {/* Map over the emailProcesses state to display each process dynamically */}
          {emailProcesses.length >0 ?(
           emailProcesses.map((process) => (
            <li key={process.id} className="process-item">
              <div className="process-details">
                <CampaignIcon sx={{ color: 'green', marginRight: '10px' }}/>
                <div className="process-info">
                  <h3>
                  {console.log(process.customer_id ? "Customer" : "Employee")}
                    {process.customer_id ? "Customer" : "Employee"}  
                    : {process.name}
                  </h3>{" "}
                  {/* Display either Customer or Employee */}
                </div>
              </div>

              <div className="process-meta">
                <div className="meta-item">
                  <CalendarTodayIcon sx={{ color: 'green', marginRight: '10px' }}/>
                  <span>
                    {new Date(process.trigger_date).toLocaleDateString()}
                  </span>{" "}
                  {/* Show trigger_date */}
                </div>
                <div className="meta-item">
                  <AccessTimeIcon sx={{ color: 'green', marginRight: '10px'}}/>
                  <span className="dureation-text">{process.duration}</span> {/* Show duration */}
                </div>
              </div>
            </li>
          ))
          ):(
            <div className="all-followup">
            No FollowUp for today.
            <li><a><Link to="/followup">View History for FollowUp</Link></a></li>
            </div> 
          )}

        </ul>
      </div>
    </div>
  );
};

export default AutomatedMail;
