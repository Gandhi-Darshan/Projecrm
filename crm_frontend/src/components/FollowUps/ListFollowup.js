import React, { useState, useEffect } from "react";
import { deleteFollowups, fetchAutomated, createFollowup } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreateFollowUp from "./CretaeFollowup";
import './Css/ListFollow.css';

const FollowupList = () => {
  const navigate = useNavigate();
  const [FollowUp, setFollowUp] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [followUpToEdit, setFollowUpToEdit] = useState(null);

  const calculateDuration = (triggerDate) => {
    const now = new Date();
    const triggeredDate = new Date(triggerDate);
    const durationInMillis = triggeredDate - now;
    const isFuture = durationInMillis > 0;
    const absDurationInMillis = Math.abs(durationInMillis);
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

    return isFuture ? `In ${durationMessage}` : `${durationMessage} ago`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAutomated();
        const formattedData = data.map((followUp) => ({
          id: followUp._id,
          emailType: followUp.email_type,
          customer_id: followUp.customer_id,
          name: followUp.customer_id
            ? followUp.customer_id.name
            : followUp.employee_id.name,
          trigger_date: followUp.trigger_date,
          status: followUp.status,
          duration: calculateDuration(followUp.trigger_date),
        }));
        setFollowUp(formattedData);
      } catch (error) {
        console.error("Error fetching automated email processes:", error);
      }
    };
    fetchData();
  }, []);

  const handleCreateClick = async (newFollowUp) => {
    await CreateFollowUp(newFollowUp); // Call your API to create a new task
    setIsCreating(false); // Close modal
    const data = await fetchAutomated();
    const formattedData = data.map((followUp) => ({
      id: followUp._id,
      emailType: followUp.email_type,
      customer_id: followUp.customer_id,
      name: followUp.customer_id
        ? followUp.customer_id.name
        : followUp.employee_id.name,
      trigger_date: followUp.trigger_date,
      status: followUp.status,
      duration: calculateDuration(followUp.trigger_date),
    }));
    setFollowUp(formattedData);
  };

  // const handleEditClick = (followup) => {
  //   setFollowUpToEdit(followup);
  //   setIsEditing(true);
  // };

  const handleDelete = async (followupId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Follow Up?');
    if (confirmDelete) {
      try {
        await deleteFollowups(followupId);
        setFollowUp((prevFollowUps) => prevFollowUps.filter((item) => item.id !== followupId));
        window.confirm('Follow Up deleted successfully!');
      } catch (error) {
        console.error("Error deleting Follow Up:", error);
        window.confirm('Error deleting Follow Up.');
      }
    }
  };


  return (
    <div className="followup-card-list-container">
      <div className="followup-header-container">
        <h3 className="followup-card-list-header">Follow Up</h3>
        <button className="add-followups" onClick={() => setIsCreating(true)}>
          <AddCircleOutlineIcon style={{ verticalAlign: "middle", marginRight: "8px" }}/>
          Generate Follow Up
        </button>
      </div>
      <div className="followup-cards-container">
        {FollowUp.map((automatedmails) => (
          <div key={automatedmails.id} className="followup-card">
            <div className="followup-card-content">
              <div className="followup-card-row">
                <span className="followup-label">Name (E/C):</span>
                <span className="followup-value">
                  {automatedmails.customer_id ? "(C)" : "(E)"} {automatedmails.name}
                </span>
              </div>
              <div className="followup-card-row">
                <span className="followup-label">Email Type:</span>
                <span className="followup-value">{automatedmails.emailType}</span>
              </div>
              <div className="followup-card-row">
                <span className="followup-label">Trigger Date:</span>
                <span className="followup-value">
                  {new Date(automatedmails.trigger_date).toLocaleDateString()}
                </span>
              </div>
              <div className="followup-card-row">
                <span className="followup-label">Duration:</span>
                <span className="followup-value">{automatedmails.duration}</span>
              </div>
              <div className="followup-card-row">
                <span className="followup-label">Status:</span>
                <span className="followup-value">{automatedmails.status}</span>
              </div>
            </div>
            <div className="followup-card-actions">
              <button className="followup-card-btn followup-edit-btn" >Edit</button>
              <button className="followup-card-btn followup-delete-btn" onClick={() => handleDelete(automatedmails.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <CreateFollowUp
          onCreate={handleCreateClick}
          followUpToEdit={followUpToEdit}
          onCancel={() => {
            setFollowUpToEdit(null);
            setIsCreating(false);
          }}
          isOpen={isCreating || followUpToEdit !== null} // Open modal if creating or editing
        />
    </div>
  );
};

export default FollowupList;
