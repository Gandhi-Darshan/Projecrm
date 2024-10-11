import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTaskById, deleteTask, updateTask } from "../../utils/api"; // Import API functions
import CreateTask from "./CreateTask"; // Reuse the CreateTask component for updating
import "./css/TaskDetails.css";

const TaskDetails = () => {
  const { id } = useParams(); // Get task ID from URL params
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // For toggling edit mode

  useEffect(() => {
    const getTaskDetails = async () => {
      if (id) {
        const taskData = await fetchTaskById(id); // Fetch task details by ID
        setTask(taskData);
      }
    };
    getTaskDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteTask(id);
      console.log("Task deleted, navigating to /tasks"); // Debug log
      navigate("/tasks");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdate = async (id, updatedTaskData) => {
    console.log(updatedTaskData);
    await updateTask(id, updatedTaskData);
    setTask(updatedTaskData);
    window.location.reload();
    setIsEditing(false); // Close edit mode after updating
  };

  return (
    <div className="task-details-container">
      <h2>Task Details</h2>
      {task ? (
        <>
          <p>
            <strong>Task Name:</strong> {task.task_name}
          </p>
          <p>
            <strong>Description:</strong> {task.desprition}
          </p>
          <p>
            <strong>Due Date:</strong>{" "}
            {new Date(task.due_date).toLocaleDateString()}
          </p>
          <p>
            <strong>Created Date:</strong>{" "}
            {new Date(task.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Priority:</strong>
            <span
              style={{
                padding: "5px 10px", // Optional padding for better spacing
                borderRadius: "5px", // Optional rounded corners
                backgroundColor:
                  task.priority === "Low"
                    ? "green"
                    : task.priority === "Medium"
                    ? "#FEBE10"
                    : "red",
                color: "white", // Text color for better contrast
              }}
            >
              {task.priority}
            </span>
          </p>
          <p>
            <strong>Remark:</strong> {task.remark}
          </p>
          <p>
            <strong>Status:</strong> {task.status}
          </p>

          <h3>Customer Details</h3>
          <p>
            <strong>Name:</strong> {task.customer_id?.name}
          </p>
          <p>
            <strong>Age:</strong> {task.customer_id?.age}
          </p>
          <p>
            <strong>Gender:</strong> {task.customer_id?.gender}
          </p>
          <p>
            <strong>Medical History:</strong>{" "}
            {task.customer_id?.medical_history}
          </p>
          <p>
            <strong>Contact:</strong> {task.customer_id?.contact_details}
          </p>

          <h3>Assigned Employee</h3>
          <p>
            <strong>Name:</strong> {task.assigned_to?.name}
          </p>
          <p>
            <strong>Role:</strong> {task.assigned_to?.role}
          </p>
          <p>
            <strong>Email:</strong> {task.assigned_to?.email}
          </p>

          <button onClick={() => setIsEditing(true)}>Edit Task</button>
          <button onClick={handleDelete}>Delete Task</button>
        </>
      ) : (
        <p>Loading task details...</p>
      )}

      {/* Render Edit Task Modal */}
      {isEditing && (
        <CreateTask
          onEdit={handleUpdate}
          taskToEdit={task} // Pass existing task data for editing
          onCancel={() => setIsEditing(false)}
          isOpen={isEditing}
        />
      )}
    </div>
  );
};

export default TaskDetails;
