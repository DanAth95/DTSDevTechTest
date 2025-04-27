const db = require("../connection");

const seed = () => {
  return db.query(`DROP TABLE IF EXISTS tasks;`).then(() => {
    return db.query(`CREATE TABLE tasks (
            task_id SERIAL PRIMARY KEY,
            title VARCHAR NOT NULL,
            description VARCHAR,
            status VARCHAR NOT NULL DEFAULT 'Incomplete',
            due_date TIMESTAMP NOT NULL
            )`);
  });
};

module.exports = seed;
