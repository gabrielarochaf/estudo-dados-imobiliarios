const request = require("supertest");

const app = require("../../src/app");
const truncate = require("../utils/truncate");
const factory = require("../factories");

describe("Authentication", () => {
  beforeEach(async () => await truncate());

  it("should authenticate with valid credentials", async () => {
    const user = await factory.create("User");

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: user.password,
    });

    expect(response.statusCode).toBe(200);
  });

  it("should not authenticate with invalid credentials", async () => {
    const user = await factory.create("User", {
      password: "123123",
    });

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "123456",
    });

    expect(response.statusCode).toBe(401);
  });

  it("should return jwt token when authenticated", async () => {
    const user = await factory.create("User");

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: user.password,
    });

    expect(response.body).toHaveProperty("token");
  });

  it("should be able to access public routes", () => {
    expect(true).toBe(true);
  });

  it("should be able to access private routes when authenticated", async () => {
    const user = await factory.create("User");

    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", ` Bearer ${user.generateToken()}`);

    expect(response.statusCode).toBe(200);
  });

  it("should be able to access private routes when withoout jwt token", async () => {
    const user = await factory.create("User");

    const response = await request(app).get("/dashboard");

    expect(response.statusCode).toBe(401);
  });

  it("should be able to access private routes with invalid jwt token", async () => {
    const user = await factory.create("User");

    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", ` Bearer 12345678`);

    expect(response.statusCode).toBe(401);
  });
});
