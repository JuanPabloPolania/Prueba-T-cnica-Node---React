import { describe, it, after } from "node:test";
import { equal } from "node:assert/strict";
import request from "supertest";

import { app, server } from "../index.js";

describe("Tasks Routes", () => {
  let taskId = null;

  after(() => {
    server.close();
  });

  it("should fetch all tasks", async () => {
    const response = await request(app).get("/roaster/tasks/");

    equal(response.statusCode, 200);
    equal(Array.isArray(response.body.tasks), true);
  });

  it("should add a new task", async () => {
    const response = await request(app).post("/roaster/tasks").send({
      name: "Recoger cajas",
      description: "Recoger cajas del camión",
      duration: "20",
      id_priority: 1,
      id_status: 1,
    });

    equal(response.statusCode, 201);
    equal(response.body.description, "Recoger cajas del camión");
    taskId = response.body.id;

    const { statusCode, body } = await request(app).get(
      `/roaster/tasks/${taskId}`
    );
    equal(statusCode, 200);
    equal(body.description, "Recoger cajas del camión");
    equal(body.id, taskId);
  });

  it("should delete a task", async () => {
    const { statusCode } = await request(app).delete(
      `/roaster/tasks/${taskId}`
    );
    equal(statusCode, 200);
  });
});
