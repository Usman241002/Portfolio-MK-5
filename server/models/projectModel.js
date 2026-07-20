import { runQuery } from "../database/helpers/database.js";

async function getAllProjects() {
  const result = await runQuery("SELECT * FROM projects WHERE deleted = false ORDER BY id");
  return result
}

async function getFeaturedProjects() {
  const result = await runQuery("SELECT * FROM projects WHERE deleted = false AND featured = true ORDER BY id");
  return result
}

async function createProject({ title, subtitle, client, role, year, description, status, repository_url, live_demo_url, featured = false }) {
  const query = "INSERT INTO projects (title, subtitle, client, role, year, description, status, repository_url, live_demo_url, featured) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;"
  const result = await runQuery(query, [title, subtitle, client, role, year, description, status, repository_url, live_demo_url, featured])
  return result[0].id
}

async function getProjectById(id) {
  const result = await runQuery("SELECT * FROM projects WHERE id = $1", [id]);
  return result[0]
}

async function putProjectById(id, data) {
  const {
    title, subtitle, client, role, year, description,
    status, repository_url, live_demo_url, thumbnail_url, featured, deleted
  } = data;

  const result = await runQuery(
    `UPDATE projects
     SET title = $1, subtitle = $2, client = $3, role = $4, year = $5,
         description = $6, status = $7, repository_url = $8, live_demo_url = $9,
         thumbnail_url = $10, featured = $11, deleted = $12
     WHERE id = $13
     RETURNING *`,
    [title, subtitle, client, role, year, description, status, repository_url, live_demo_url, thumbnail_url, featured, deleted, id]
  );

  return result[0];
}

async function deleteProjectById(id) {
  const result = await runQuery("UPDATE projects SET deleted = true WHERE id = $1 RETURNING id", [id]);
  return result[0]
}

async function updateThumbnail(id, thumbnailUrl) {
  const result = await runQuery("UPDATE projects SET thumbnail_url = $1 WHERE id = $2 RETURNING *", [thumbnailUrl, id])
  return result[0]
}

export const projectModel = {
  getAllProjects,
  getFeaturedProjects,
  createProject,
  getProjectById,
  putProjectById,
  deleteProjectById,
  updateThumbnail
};
