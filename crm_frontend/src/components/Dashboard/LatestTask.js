import React, { useState, useEffect } from "react";
import { fetchTasks, AddTasks } from "../../utils/api"; // Adjust based on your API functions
import { useNavigate } from "react-router-dom";
import CreateTask from "../Task/CreateTask"; // Import CreateTask for modal
import "./Css/Tasklist.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isCreating, setIsCreating] = useState(false); // State for opening create task modal
  const [taskToEdit, setTaskToEdit] = useState(null); // State to hold the task being edited
  const navigate = useNavigate();

  useEffect(() => {
    const getTasks = async () => {
      const tasksData = await fetchTasks();
      console.log(tasksData);
      setTasks(tasksData);
    };
    getTasks();
  }, []);

  const handleTaskClick = (taskId) => {
    navigate(`/tasks/${taskId}`); // Navigate to Task Details page
  };

  const handleCreateTask = async (newTask) => {
    await AddTasks(newTask); // Call your API to create a new task
    setIsCreating(false); // Close modal
    const tasksData = await fetchTasks(); // Refresh task list or re-fetch tasks
    setTasks(tasksData);
  };

  return (
    <div className="task-list-container">
      <div className="card-header">
        <h3>Task List</h3>
        <button onClick={() => setIsCreating(true)} className="add-task-btn">
          <span className="plus-icon">+</span>
        </button>
      </div>
      <div className="Scroll">
        <div className="task-cards">
          {" "}
          {/* Container for task cards */}
          {tasks.map((task) => (
            <div
              className="task-card"
              key={task._id}
              onClick={() => handleTaskClick(task._id)}
            >
              {/* Left Section - Task Name, Due Date, Customer */}
              <div className="task-column task-left">
                <div className="task-name">{task.task_name}</div>
                <div className="task-meta">
                  <strong>Due Date:</strong>{" "}
                  {new Date(task.due_date).toLocaleDateString()}
                </div>
                <div className="task-meta">
                  <strong>Customer:</strong> {task.customer_id?.name}
                </div>
              </div>

              {/* Middle Section - Status and Priority */}
              <div className="task-divider"></div>
              <div className="task-column task-middle">
                <div className="status-container">
                  <label>Status:</label>
                  <span className={`status ${task.status.toLowerCase()}`}>
                    {task.status}
                  </span>
                </div>
                <div className="priority-container">
                  <label>Priority:</label>
                  <span className={`priority ${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                </div>
              </div>

              {/* Right Section - Description */}
              <div className="task-divider"></div>
              <div className="task-column task-right">
                <label>Description:</label>
                <p>{task.desprition}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Render Create Task Modal */}
        <CreateTask
          onCreate={handleCreateTask}
          taskToEdit={taskToEdit}
          onCancel={() => {
            setTaskToEdit(null);
            setIsCreating(false);
          }}
          isOpen={isCreating || taskToEdit !== null} // Open modal if creating or editing
        />
      </div>
    </div>
  );
};

export default TaskList;
