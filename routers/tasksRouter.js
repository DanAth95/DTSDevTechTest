const tasksRouter = require("express").Router();
const {
  postTask,
  getTasks,
  getTaskByID,
  patchTask,
  deleteTask,
} = require("../controllers/tasksController");

tasksRouter.get("/", getTasks);
tasksRouter.get("/:task_id", getTaskByID);
tasksRouter.post("/", postTask);
tasksRouter.patch("/:task_id", patchTask);
tasksRouter.delete("/:task_id", deleteTask);

module.exports = tasksRouter;
