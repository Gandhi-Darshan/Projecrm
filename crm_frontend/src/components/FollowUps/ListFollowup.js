import React, { useState, useEffect } from "react";
import {
  deleteFollowups,
  fetchAutomated,
  createFollowup,
  updateFollowup,
} from "../../utils/api"; // Adjust based on your API functions
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreateFollowUp from "./CretaeFollowup"; // Ensure you have this component correctly named
import "./Css/ListFollow.css";

const FollowupList = () => {
  const [followUpList, setFollowUpList] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFollowUp, setCurrentFollowUp] = useState(null);
  const [message, setMessage] = useState("");

  // Calculate the time duration from the current date to the follow-up trigger date
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

    if (days > 0) return `${days} day${days > 1 ? "s" : ""}`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""}`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    return `${seconds} second${seconds > 1 ? "s" : ""}`;
  };

  // Fetch follow-up data from API
  const fetchFollowups = async () => {
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
      setFollowUpList(formattedData);
    } catch (error) {
      console.error("Error fetching follow-ups:", error);
    }
  };

  // Fetch follow-ups when component is mounted
  useEffect(() => {
    fetchFollowups();
  }, []);

  // Handle creating a new follow-up
  const handleCreateFollowUp = async (newFollowUp) => {
    try {
      console.log("Creating follow-up with data:", newFollowUp); // Log the data
      await createFollowup(newFollowUp);
      setIsCreating(false);
      await fetchFollowups();
      setMessage("Follow-up created successfully!");
    } catch (error) {
      console.error("Error creating follow-up:", error);
      setMessage("Error creating follow-up.");
    }
  };

  // Set the follow-up to be edited
  const handleEditFollowUp = (followUp) => {
    setCurrentFollowUp(followUp);
    setIsEditing(true);
  };

  // Handle updating an existing follow-up
  const handleUpdateFollowUp = async (updatedFollowUp) => {
    try {
      await updateFollowup(currentFollowUp.id, updatedFollowUp);
      setIsEditing(false);
      setCurrentFollowUp(null);
      await fetchFollowups();
      setMessage("Follow-up updated successfully!");
    } catch (error) {
      console.error("Error updating follow-up:", error);
      setMessage("Error updating follow-up.");
    }
  };

  // Handle deleting a follow-up
  const handleDeleteFollowUp = async (followUpId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this follow-up?"
    );
    if (confirmDelete) {
      try {
        await deleteFollowups(followUpId);
        setFollowUpList((prevList) =>
          prevList.filter((followUp) => followUp.id !== followUpId)
        );
        setMessage("Follow-up deleted successfully!");
      } catch (error) {
        console.error("Error deleting follow-up:", error);
        setMessage("Error deleting follow-up.");
      }
    }
  };

  return (
    <div className="followup-card-list-container">
      <div className="followup-header-container">
        <h3 className="followup-card-list-header">Follow Ups</h3>
        <button className="add-followups" onClick={() => setIsCreating(true)}>
          <AddCircleOutlineIcon
            style={{ verticalAlign: "middle", marginRight: "8px" }}
          />
          Generate Follow Up
        </button>
      </div>

      <div className="followup-cards-container">
        {followUpList.map((followUp) => (
          <div key={followUp.id} className="followup-card">
            <div className="followup-card-content">
              <div className="followup-card-row">
                <span className="followup-label">Name (E/C):</span>
                <span className="followup-value">
                  {followUp.customer_id ? "(C)" : "(E)"} {followUp.name}
                </span>
              </div>
              <div className="followup-card-row">
                <span className="followup-label">Email Type:</span>
                <span className="followup-value">{followUp.emailType}</span>
              </div>
              <div className="followup-card-row">
                <span className="followup-label">Trigger Date:</span>
                <span className="followup-value">
                  {new Date(followUp.trigger_date).toLocaleDateString()}
                </span>
              </div>
              <div className="followup-card-row">
                <span className="followup-label">Duration:</span>
                <span className="followup-value">{followUp.duration}</span>
              </div>
              <div className="followup-card-row">
                <span className="followup-label">Status:</span>
                <span className="followup-value">{followUp.status}</span>
              </div>
            </div>
            <div className="followup-card-actions">
              <button
                className="followup-card-btn followup-edit-btn"
                onClick={() => handleEditFollowUp(followUp)}
              >
                Edit
              </button>
              <button
                className="followup-card-btn followup-delete-btn"
                onClick={() => handleDeleteFollowUp(followUp.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Follow-up Modal */}
      <CreateFollowUp
        onCreate={handleCreateFollowUp}
        onCancel={() => setIsCreating(false)}
        isOpen={isCreating}
      />

      {/* Edit Follow-up Modal */}
      {isEditing && currentFollowUp && (
        <CreateFollowUp
          onCreate={handleUpdateFollowUp}
          followupToEdit={currentFollowUp}
          onCancel={() => {
            setIsEditing(false);
            setCurrentFollowUp(null);
          }}
          isOpen={isEditing}
        />
      )}

      {/* Message Display */}
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default FollowupList;
