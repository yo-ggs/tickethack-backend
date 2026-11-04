const express = require("express");
const request = require("supertest");

jest.mock("./models/trips", () => ({
  find: jest.fn().mockResolvedValue([]),
}));

const tripsRouter = require("./routes/trips");

const app = express();
app.use("/trips", tripsRouter);

test("refuse la recherche quand le départ est vide", async () => {
  const response = await request(app)
    .get("/trips")
    .query({ departure: "", arrival: "Bordeaux", date: "2026-11-06" });

  expect(response.status).toBe(400);
});
