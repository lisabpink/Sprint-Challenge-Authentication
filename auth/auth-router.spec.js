const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

describe("auth endpoints", function() {
  describe("POST /api/auth/register", function() {
    beforeEach(async () => {
      await db("users").truncate();
    });

    it("should return 200 OK", async function() {
      return await request(server)
        .post("/api/auth/register")
        .send({ username: "Cookie Monster", password: "1234" })
        .set("Accept", "application/json")
        .expect(201);
    });

    it("should return json", async function() {
      return await request(server)
        .post("/api/auth/register")
        .send({ username: "Cookie Monster2", password: "1234" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/i);
    });
  });

  describe("POST /api/auth/login", function() {
    it("should return 200 OK", async function() {
      return await request(server)
        .post("/api/auth/login")
        .send({ username: "Cookie Monster2", password: "1234" })
        .set("Accept", "application/json")
        .expect(200);
    });

    it("should test user logging in", async () => {});
  });

  describe("should test registring and loggin in", () => {
    it("should register users", async () => {
      const newUser = { username: "Pie Monster", password: "1234" };
      const res = await request(server)
        .post("/api/auth/register")
        .send(newUser);
      expect(res.status).toBe(201);
    });

    it("should test the login function", async () => {
      const credential = { username: "Pie Monster", password: "1234" };
      const res = await request(server)
        .post("/api/auth/login")
        .send(credential);

      expect(res.status).toBe(200);
    });
  });
});
