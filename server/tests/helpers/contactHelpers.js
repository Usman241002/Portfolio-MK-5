import request from "supertest";
import app from "../../app";

export const validContactPayload = {
  name: "Test User",
  email: "test@example.com",
  message: "Just saying hello!"
}

export async function sendEmail(payload = validContactPayload) {
  return await request(app.callback()).post("/api/contact").send(payload)
}
