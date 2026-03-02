const request = require("supertest");
const app = require("../server");

describe("Debt API", () => {
  it("GET /api/debts returns 200", async () => {
    const res = await request(app).get("/api/debts");
    expect(res.statusCode).toBe(200);
  });

  it("POST /api/debts without required fields returns 400", async () => {
    const res = await request(app).post("/api/debts").send({});
    expect(res.statusCode).toBe(400);
  });
});
