const request = require("supertest");
const express = require("express");
const routes = require("../routes");
const { leavesList } = require("../store");

const app = express();
app.use(express.json());
app.use("/api", routes);

let token;

beforeAll(async () => {
  const res = await request(app)
    .post("/api/auth/login")
    .send({ username: "employee", password: "emp123" });
  token = res.body.token;
});

afterEach(() => {
  leavesList.length = 0;
});

describe("Leave Routes", () => {
  test("Employee can apply for leave", async () => {
    const res = await request(app)
      .post("/api/leaves")
      .set("Authorization", `Bearer ${token}`)
      .send({
        fromDate: "2023-10-01",
        toDate: "2023-10-05",
        reason: "Vacation",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("status", "Pending");
  });

  test("Employee cannot apply with invalid date range", async () => {
    const res = await request(app)
      .post("/api/leaves")
      .set("Authorization", `Bearer ${token}`)
      .send({
        fromDate: "2023-10-25",
        toDate: "2023-10-20",
        reason: "Vacation",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "Invalid date range");
  });
});
