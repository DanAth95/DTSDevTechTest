const seed = require("./seed.js");
const db = require("../connection.js");
const tasksData = require("../data/test-data.js");

const runSeed = () => {
  return seed(tasksData).then(() => db.end());
};

runSeed();
