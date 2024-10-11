import React, { useState, useEffect } from 'react';
import { fetchTasks, deleteTask, AddTasks , updateTask } from '../../utils/api'; // Adjust based on your API functions
import { useNavigate } from 'react-router-dom';
import CreateTask from './CreateTask'; // Import CreateTask for modal
import './css/Tasklist.css';

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
    // Call your API to create a new task
    // Assuming there's a createTask function in your API
    await AddTasks(newTask);
    setIsCreating(false); // Close moda
    // Refresh task list or re-fetch tasks
    const tasksData = await fetchTasks();
    setTasks(tasksData);
  };

 

  return (
    <div>
      <h2>Task List</h2>
      <button onClick={() => setIsCreating(true)}>Create Task</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Customer</th>
            <th>Assigned To</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task._id} onClick={() => handleTaskClick(task._id)}> {/* Navigate on click */}
              <td>{task._id}</td>
              <td>{task.task_name}</td>
              <td>{task.customer_id?.name}</td>
              <td>{task.assigned_to?.name}</td>
              <td>{new Date(task.due_date).toLocaleDateString()}</td>
              <td>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
  );
};

export default TaskList;
