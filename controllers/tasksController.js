const {
  fetchTasks,
  createTask,
  fetchTaskByID,
  updateTask,
  removeTask,
} = require("../models/tasksModel");

exports.getTasks = (req, res, next) => {
  return fetchTasks()
    .then((tasks) => {
      res.status(200).send({ tasks });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getTaskByID = (req, res, next) => {
  const id = req.params.task_id;
  return fetchTaskByID(id)
    .then((task) => {
      res.status(200).send({ task });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postTask = (req, res, next) => {
  const newTask = req.body;
  return createTask(newTask)
    .then((newTask) => {
      res.status(201).send({ newTask });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchTask = (req, res, next) => {
  const update = req.body;
  const id = req.params.task_id;
  return updateTask(update, id)
    .then((task) => {
      res.status(200).send({ task });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteTask = (req, res, next) => {
  const id = req.params.task_id;
  return removeTask(id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
