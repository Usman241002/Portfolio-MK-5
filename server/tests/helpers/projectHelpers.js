import request from "supertest";
import app from "../../app.js";
import { validToken } from "./authHelpers.js"

export const validProjectPayload = {
  id: 1,
  title: "Customer Support Portal",
  subtitle: "Internal ticket management platform",
  client: "Example Corporation",
  role: "Backend Developer",
  year: 2026,
  description:
    "A web application for managing customer support tickets, user accounts, reporting, and team workflows.",
  status: "completed",
  repository_url: "https://github.com/example/customer-support-portal",
  live_demo_url: "https://support.example.com",
  thumbnail_url: "https://picsum.photos/600/400?200",
  deleted: false,
  featured: true,
  skills: [
    { id: 1 },
    { id: 2 },
    { id: 3 }
  ],
  cases: [
    {
      heading: "Challenge",
      subheading: "Fragmented support process",
      description:
        "Customer requests were handled across multiple email inboxes with no central tracking.",
      stat: "45%",
      stat_description: "Reduction in response time",
      image_url: "https://picsum.photos/800/500?201"
    },
    {
      heading: "Solution",
      subheading: "Unified support dashboard",
      description:
        "Implemented ticket assignment, priority queues, reporting, and role-based permissions.",
      stat: "8k+",
      stat_description: "Tickets processed",
      image_url: "https://picsum.photos/800/500?202"
    }
  ]
};

export async function getProjects() {
  return await request(app.callback()).get("/api/projects")
}

export async function getFeaturedProjects() {
  return await request(app.callback()).get("/api/projects/featured")
}

export async function createProject(payload = validProjectPayload, token = validToken) {
  return await request(app.callback()).post("/api/projects").send(payload).set("Authorization", token ? `Bearer ${token}` : "")
}

export async function getProject(id) {
  return await request(app.callback()).get(`/api/projects/${id}`)
}

export async function putProject(id, payload = validProjectPayload, token = validToken) {
  return await request(app.callback()).put(`/api/projects/${id}`).send(payload).set("Authorization", token ? `Bearer ${token}` : "")
}

export async function deleteProject(id, token = validToken) {
  return await request(app.callback()).delete(`/api/projects/${id}`).set("Authorization", token ? `Bearer ${token}` : "")
}
