import request from "supertest";
import app from "../../app.js";
import { validToken } from "./authHelpers.js"

const validSkillPayload = {
  name: "React",
  year: 2025
}

export async function getSkills() {
  return await request(app.callback()).get("/api/skills")
}

export async function createSkill(payload = validSkillPayload, token = validToken) {
  return await request(app.callback()).post("/api/skills").send(payload).set("Authorization", token ? `Bearer ${token}` : "")
}

export async function putSkill(id, payload = validSkillPayload, token = validToken) {
  return await request(app.callback()).put(`/api/skills/${id}`).send(payload).set("Authorization", token ? `Bearer ${token}` : "")
}

export async function deleteSkill(id, token = validToken) {
  return await request(app.callback()).delete(`/api/skills/${id}`).set("Authorization", token ? `Bearer ${token}` : "")
}
