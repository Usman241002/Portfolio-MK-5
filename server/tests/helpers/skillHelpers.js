import request from "supertest";
import app from "../../app";
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

export async function patchSkillById(id, payload = validSkillPayload, token = validToken) {
  return await request(app.callback()).patch(`/api/skills/${id}`).send(payload).set("Authorization", token ? `Bearer ${token}` : "")
}

export async function deleteSkillById(id, token = validToken) {
  return await request(app.callback()).delete(`/api/skills/${id}`).set("Authorization", token ? `Bearer ${token}` : "")
}
