import request from "supertest";
import app from "../../app.js";
import { validToken } from "./authHelpers.js"

const validProfilePayload = {
  name: "Jane Smith",
  role: "Backend Developer",
  location: "Manchester, UK",
  status: "open to work",
  email: "jane.smith@example.com",
  github_url: "https://github.com/janesmith",
  linkedin_url: "https://www.linkedin.com/in/janesmith",
}

export async function getProfile() {
  return await request(app.callback()).get("/api/profile")
}

export async function putProfile(payload = validProfilePayload, token = validToken) {
  return await request(app.callback()).put(`/api/profile`).send(payload).set("Authorization", token ? `Bearer ${token}` : "")
}
