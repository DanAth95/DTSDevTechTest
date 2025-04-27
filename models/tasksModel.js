const db = require("../db/connection");
const format = require("pg-format");

exports.fetchTasks = () => {
  return db.query("SELECT * FROM tasks").then(({ rows }) => {
    return rows;
  });
};

exports.fetchTaskByID = (id) => {
  return db
    .query(`SELECT * FROM tasks WHERE task_id = $1`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Task Not Found" });
      }
      return rows[0];
    });
};

exports.createTask = (newTask) => {
  if (!newTask.title || !newTask.due_date || !newTask.due_time) {
    return Promise.reject({ status: 400, msg: "Invalid Task" });
  }
  const { title, description, status, due_date, due_time } = newTask;

  const sql = format(
    `INSERT INTO tasks (title, description, status, due_date, due_time) VALUES (%L) RETURNING task_id`,
    [title, description, status, due_date, due_time]
  );

  return db.query(sql).then(({ rows }) => {
    const id = rows[0].task_id;
    return this.fetchTaskByID(id).then((newTask) => {
      return newTask;
    });
  });
};

exports.updateTask = (update, id) => {
  return db
    .query(`UPDATE tasks SET status = $1 WHERE task_id = $2 RETURNING *`, [
      update,
      id,
    ])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Task Not Found" });
      }
      return rows[0];
    });
};

exports.removeTask = (id) => {
  return db
    .query(`DELETE FROM tasks WHERE task_id = $1 RETURNING *`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Task Not Found" });
      }
    });
};
