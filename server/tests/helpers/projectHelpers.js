import request from "supertest";
import app from "../../app";
import { validToken } from "./authHelpers.js"


export async function getProjects() {
  return await request(app.callback()).get("/api/projects")
}

// export async function createProject(payload = validProjectPayload, token = validToken) {
//   return await request(app.callback()).post("/api/projects").send(payload).set("Authorization", token ? `Bearer ${token}` : "")
// }

export async function getProject(id) {
  return await request(app.callback()).get(`/api/projects/${id}`)
}

// export async function patchProject(id, payload = validProjectPayload, token = validToken) {
//   return await request(app.callback()).patch(`/api/projects/${id}`).send(payload).set("Authorization", token ? `Bearer ${token}` : "")
// }

export async function deleteProject(id, token = validToken) {
  return await request(app.callback()).delete(`/api/projects/${id}`).set("Authorization", token ? `Bearer ${token}` : "")
}
