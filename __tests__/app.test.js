const request = require("supertest");
const app = require("../app");
const data = require("../db/data/test-data");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");

beforeEach(() => {
  return seed(data);
});
afterAll(() => db.end());

describe("/api/tasks", () => {
  test("GET 200: responds with array of all tasks", () => {
    return request(app)
      .get("/api/tasks")
      .expect(200)
      .then((response) => {
        expect(response.body.tasks.length).toBe(4);
        response.body.tasks.forEach((task) => {
          expect(typeof task.title).toBe("string");
          expect(typeof task.description).toBe("string");
          expect(typeof task.status).toBe("string");
          expect(typeof task.due_date).toBe("string");
          expect(typeof task.due_time).toBe("string");
        });
      });
  });
  test("GET 200: responds with task by ID where ID exists", () => {
    return request(app)
      .get("/api/tasks/1")
      .expect(200)
      .then((response) => {
        expect(response.body.task.task_id).toBe(1);
      });
  });
  test("GET 404: responds with 404 when task ID is not found", () => {
    return request(app)
      .get("/api/tasks/14")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Task Not Found");
      });
  });
  test("POST 201: responds with 201 when new task is successfully created", () => {
    const newTask = {
      title: "Task 5",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      status: "Incomplete",
      due_date: "2025-05-01",
      due_time: "12:00:00",
    };
    return request(app)
      .post("/api/tasks")
      .send(newTask)
      .expect(201)
      .then((response) => {
        expect(response.body.newTask.title).toBe("Task 5");
        expect(response.body.newTask.description).toBe(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        );
        expect(response.body.newTask.status).toBe("Incomplete");
        expect(response.body.newTask.due_date).toBe("2025-05-01");
        expect(response.body.newTask.due_time).toBe("12:00:00");
      });
  });
  test("POST 201: successful without description", () => {
    const newTask = {
      title: "Task 5",
      status: "Incomplete",
      due_date: "2025-05-01",
      due_time: "12:00:00",
    };
    return request(app)
      .post("/api/tasks")
      .send(newTask)
      .expect(201)
      .then((response) => {
        expect(response.body.newTask.title).toBe("Task 5");
        expect(response.body.newTask.status).toBe("Incomplete");
        expect(response.body.newTask.due_date).toBe("2025-05-01");
        expect(response.body.newTask.due_time).toBe("12:00:00");
      });
  });
  test("POST 400: responds with 400 when missing elements", () => {
    const newTask = {
      due_date: "2025-05-01",
      due_time: "12:00:00",
    };
    return request(app)
      .post("/api/tasks")
      .send(newTask)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Invalid Task");
      });
  });
  test("PATCH 200: responds with 200 when new task is successfully updated", () => {
    return request(app)
      .patch("/api/tasks/1")
      .send({ status: "Complete" })
      .expect(200)
      .then((response) => {
        expect(response.body.task.status).toBe("Complete");
      });
  });
  test("PATCH 404 for valid id that doesnt exist", () => {
    return request(app)
      .patch("/api/tasks/100")
      .send({ status: "Complete" })
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Task Not Found");
      });
  });
  test("DELETE 204 for task successfully deleted", () => {
    return request(app).delete("/api/tasks/1").expect(204);
  });
});
test("DELETE 404 for invalid task id", () => {
  return request(app).delete("/api/tasks/100").expect(404);
});
