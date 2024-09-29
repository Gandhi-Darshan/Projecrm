const express = require('express');
const { createTask, getTasks, updateTask, deleteAllTasks,deleteTask } = require('../controllers/taskController');
const router = express.Router();

router.route('/')
  .get(getTasks)
  .post(createTask)
  .delete(deleteAllTasks);

router.route('/:id')
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;
