import React, { useEffect, useState } from "react";
import "./Css/AutomatedMail.css"; // Import the stylesheet
import { fetchAutomated } from "../../utils/api"; // Import the API function
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CampaignIcon from '@mui/icons-material/Campaign';

const AutomatedMail = () => {
  // State to store the email processes fetched from the API
  const [emailProcesses, setEmailProcesses] = useState([]);

  // Function to calculate duration
  const calculateDuration = (triggerDate) => {
    const now = new Date();
    const triggeredDate = new Date(triggerDate);
    const durationInMillis = now - triggeredDate; // Duration in milliseconds

    // Convert duration from milliseconds to a more readable format
    const seconds = Math.floor(durationInMillis / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
  };

  // Fetch the data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAutomated(); // Call the API to fetch data
        const formattedData = data.map((followUp) => ({
          id: followUp._id,
          emailType: followUp.email_type,
          name: followUp.customer_id
            ? followUp.customer_id.name
            : followUp.employee_id.name, // Select name based on presence
          trigger_date: followUp.trigger_date,
          duration: calculateDuration(followUp.trigger_date), // Calculate duration based on trigger_date
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
        <button className="add-button">+</button>
      </div>

      <div className="scroll">
        <ul className="process-list">
          {/* Map over the emailProcesses state to display each process dynamically */}
          {emailProcesses.map((process) => (
            <li key={process.id} className="process-item">
              <div className="process-details">
                <CampaignIcon sx={{ color: 'green', marginRight: '10px' }}/>
                <div className="process-info">
                  <h3>
                    {process.emailType === "Customer" ? "Customer" : "Employee"}
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
                  <span>{process.duration}</span> {/* Show duration */}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AutomatedMail;
