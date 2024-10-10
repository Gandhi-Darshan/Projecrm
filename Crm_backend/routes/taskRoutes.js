const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  getTasksByEmployeeId,
  getTasksById,
  deleteAllTasks,
  deleteTask,
} = require("../controllers/taskController");
const router = express.Router();

router.route("/").get(getTasks).post(createTask).delete(deleteAllTasks);

router.route("/employee/:employee_id").get(getTasksByEmployeeId);

router.route("/:id").get(getTasksById).put(updateTask).delete(deleteTask);

module.exports = router;
