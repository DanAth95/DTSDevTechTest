const db = require("../connection");
const format = require("pg-format");

const seed = (tasksData) => {
  return db
    .query(`DROP TABLE IF EXISTS tasks;`)
    .then(() => {
      return db.query(`CREATE TABLE tasks (
            task_id SERIAL PRIMARY KEY,
            title VARCHAR NOT NULL,
            description VARCHAR,
            status VARCHAR NOT NULL DEFAULT 'Incomplete',
            due_date VARCHAR NOT NULL,
            due_time VARCHAR NOT NULL
            )`);
    })
    .then(() => {
      const insertTasksQueryString = format(
        "INSERT INTO tasks (title, description, status, due_date, due_time) VALUES %L;",
        tasksData.map(({ title, description, status, due_date, due_time }) => [
          title,
          description,
          status,
          due_date,
          due_time,
        ])
      );
      return db.query(insertTasksQueryString);
    });
};

module.exports = seed;
