const request = require("supertest");
const express = require("express");
const routes = require("../routes");
const { users } = require("../store");

const app = express();
app.use(express.json());
app.use("/api", routes);

describe("Auth Routes", () => {
  test("Login with valid credentials should return token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "employee", password: "emp123" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.username).toBe("employee");
  });

  test("Login with invalid credentials should fail", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "wrong", password: "user" });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid Credentials");
  });
});
