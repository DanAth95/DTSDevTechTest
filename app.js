const express = require("express");
const cors = require("cors");
const app = express();

const tasksRouter = require("./routers/tasksRouter");

app.use(cors());
app.use(express.json());
app.use("/api/tasks", tasksRouter);

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
});

module.exports = app;
