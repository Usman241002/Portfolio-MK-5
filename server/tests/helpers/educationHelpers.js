import request from "supertest";
import app from "../../app.js";
import { validToken } from "./authHelpers.js"
import dayjs from "dayjs";

const validEducationPayload = {
  id: 1,
  start_date: dayjs().subtract(1, "year").format("YYYY-MM-DD"),
  end_date: null,
  title: "MSc Computer Science",
  company: "Example University",
  location: "London, United Kingdom",
  description: "Currently studying advanced computer science topics.",
}

export async function getAllEducation() {
  return await request(app.callback()).get("/api/education")
}

export async function createEducation(payload = validEducationPayload, token = validToken) {
  return await request(app.callback()).post("/api/education").send(payload).set("Authorization", token ? `Bearer ${token}` : "")
}

export async function putEducation(id, payload = validEducationPayload, token = validToken) {
  return await request(app.callback()).put(`/api/education/${id}`).send(payload).set("Authorization", token ? `Bearer ${token}` : "")
}

export async function deleteEducation(id, token = validToken) {
  return await request(app.callback()).delete(`/api/education/${id}`).set("Authorization", token ? `Bearer ${token}` : "")
}
