const express = require("express");
const app = express();

app.get("*", (req, res, next) => {
  next({ status: 404, msg: "Not Found" });
});

module.exports = app;
