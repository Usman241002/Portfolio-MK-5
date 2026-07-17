import request from "supertest";
import app from "../../app.js";
import { validToken } from "./authHelpers.js"
import dayjs from "dayjs";

const validExperiencePayload = {
  id: 1,
  start_date: dayjs().subtract(1, "year").format("YYYY-MM-DD"),
  end_date: null,
  title: "MSc Computer Science",
  company: "Example University",
  employment_type: "full-time",
  location: "London, United Kingdom",
  description: "Currently studying advanced computer science topics.",
}

export async function getExperiences() {
  return await request(app.callback()).get("/api/experiences")
}

export async function createExperience(payload = validExperiencePayload, token = validToken) {
  return await request(app.callback()).post("/api/experiences").send(payload).set("Authorization", token ? `Bearer ${token}` : "")
}

export async function putExperience(id, payload = validExperiencePayload, token = validToken) {
  return await request(app.callback()).put(`/api/experiences/${id}`).send(payload).set("Authorization", token ? `Bearer ${token}` : "")
}

export async function deleteExperience(id, token = validToken) {
  return await request(app.callback()).delete(`/api/experiences/${id}`).set("Authorization", token ? `Bearer ${token}` : "")
}
