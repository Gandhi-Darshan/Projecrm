import React, { useState, useEffect } from "react";
import { fetchTasks, AddTasks } from "../../utils/api"; // Adjust based on your API functions
import { useNavigate } from "react-router-dom";
import CreateTask from "../Task/CreateTask"; // Import CreateTask for modal
import "./Css/Tasklist.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]); // Filtered tasks list
  const [isCreating, setIsCreating] = useState(false); // State for opening create task modal
  const [taskToEdit, setTaskToEdit] = useState(null); // State to hold the task being edited
  const [statusFilter, setStatusFilter] = useState("All"); // State for status filter
  const navigate = useNavigate();

  // Comparator for priority sorting
  const priorityComparator = (a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  };

  // Fetch tasks and apply default sorting by priority
  useEffect(() => {
    const getTasks = async () => {
      const tasksData = await fetchTasks();
      const sortedTasks = tasksData.sort(priorityComparator); // Sort tasks by priority
      setTasks(sortedTasks);
      setFilteredTasks(sortedTasks); // Initialize filtered tasks with sorted tasks
    };
    getTasks();
  }, []);

  // Filter tasks based on the selected status
  useEffect(() => {
    if (statusFilter === "All") {
      setFilteredTasks(tasks); // Show all tasks if 'All' is selected
    } else {
      const filtered = tasks.filter((task) => task.status === statusFilter);
      setFilteredTasks(filtered);
    }
  }, [statusFilter, tasks]);

  const handleTaskClick = (taskId) => {
    navigate(`/tasks/${taskId}`); // Navigate to Task Details page
  };

  const handleCreateTask = async (newTask) => {
    await AddTasks(newTask); // Call your API to create a new task
    setIsCreating(false); // Close modal
    const tasksData = await fetchTasks(); // Re-fetch tasks after creating a new one
    const sortedTasks = tasksData.sort(priorityComparator); // Sort by priority again
    setTasks(sortedTasks);
    setFilteredTasks(sortedTasks); // Update filtered tasks
  };

  return (
    <div className="task-list-container">
      <div className="card-header">
        <h3>Task List</h3>
        <button onClick={() => setIsCreating(true)} className="add-task-btn">
          <span className="plus-icon">+</span>
        </button>
        <div className="status-filter-container">
          <label>Status</label>
          <select
            className="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="Scroll">
        <div className="task-cards">
          {filteredTasks.map((task) => (
            <div
              className="task-card"
              key={task._id}
              onClick={() => handleTaskClick(task._id)}
            >
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
              <div className="task-divider"></div>
              <div className="task-column task-right">
                <label>Description:</label>
                <p>{task.description}</p>
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
