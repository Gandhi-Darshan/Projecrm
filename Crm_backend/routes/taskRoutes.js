const express = require('express');
const { createTask, getTasks, updateTask, getTasksByEmployeeId, deleteAllTasks,deleteTask } = require('../controllers/taskController');
const router = express.Router();

router.route('/')
  .get(getTasks)
  .post(createTask)
  .delete(deleteAllTasks);

  router.route('/employee/:employee_id')
  .get(getTasksByEmployeeId);

router.route('/:id')
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;
