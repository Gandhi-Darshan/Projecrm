const Task = require('../models/Task');

const createTask = async (req, res) => {
  const { task_name, customer_id, assigned_to, due_date, priority, desprition,remark,status } = req.body;
  const task = new Task({ task_name, customer_id, assigned_to, due_date, priority,desprition,remark,status });

  try {
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('customer_id assigned_to');
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getTasksById = async (req, res) => {
  const { id } = req.params;
  try {
    const tasks = await Task.findById(id, req.body).populate('customer_id assigned_to');
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getTasksByEmployeeId = async (req, res) => {
    const { employee_id } = req.params;
    try {
      const tasks = await Task.find({ assigned_to: employee_id }).populate('customer_id assigned_to');
      if (!tasks || tasks.length === 0) {
        return res.status(404).json({ message: 'No tasks found for this employee' });
      }
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteAllTasks = async (req, res) => {
    try {
      await Task.deleteMany(); // Deletes all documents in the Task collection
      res.status(200).json({ message: 'All tasks have been deleted.' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting tasks', error: error.message });
    }
  };

  const deleteTask = async (req, res) => {
    try {
      const taskId = req.params.id;
      const task = await Task.findByIdAndDelete(taskId);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(200).json({ message: "Task deleted successfully", task });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

module.exports = { createTask, getTasks, deleteAllTasks, updateTask, getTasksByEmployeeId,getTasksById, deleteTask };
