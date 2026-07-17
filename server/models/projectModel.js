import { runQuery } from "../database/helpers/database.js";

async function getAllProjects() {
  const result = await runQuery("SELECT * FROM projects WHERE deleted = false");
  return result
}

async function getFeaturedProjects() {
  const result = await runQuery("SELECT * FROM projects WHERE deleted = false AND featured = true");
  return result
}

async function createProject({ title, subtitle, client, role, year, description, status, repository_url, live_demo_url, thumbnail_url }) {
   const query = "INSERT INTO projects (title, subtitle, client, role, year, description, status, repository_url, live_demo_url, thumbnail_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;"
   const result = await runQuery(query, [title, subtitle, client, role, year, description, status, repository_url, live_demo_url, thumbnail_url])
   return result[0].id
}

async function getProjectById(id) {
  const result = await runQuery("SELECT * FROM projects WHERE id = $1", [id]);
  return result[0]
}

async function putProjectById(id, updates) {
  const keys = Object.keys(updates)
  const values = Object.values(updates)

  if (keys.length === 0) {
   throw new Error("No update fields provided.");
  }

  const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");
  const query = `UPDATE projects SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`

  const result = await runQuery(query, [...values, id])
  return result[0]
}

async function deleteProjectById(id) {
  const result = await runQuery("UPDATE projects SET deleted = true WHERE id = $1 RETURNING id", [id]);
  return result[0]
}

export const projectModel = {
  getAllProjects,
  getFeaturedProjects,
  createProject,
  getProjectById,
  putProjectById,
  deleteProjectById
};
