import { runQuery } from "../database/helpers/database.js";

async function getCasesByProjectId(projectId) {
  const result = await runQuery("SELECT * FROM cases WHERE project_id = $1", [projectId]);
  return result.rows
}

async function createCaseByProjectId(projectId, caseData) {
  const { heading, subheading, descriptionstat, stat_description, image_url } = caseData

  const query = "INSERT INTO cases (project_id, heading, subheading, descriptionstat, stat_description, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;"
  const result = await runQuery(query, [projectId, heading, subheading, descriptionstat, stat_description, image_url])
  return result.rows[0].id
}

async function patchCaseById(id, updates) {
  const keys = Object.keys(updates)
  const values = Object.values(updates)

  if (keys.length === 0) {
   throw new Error("No update fields provided.");
  }

  const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");
  const query = `UPDATE cases SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`

  const result = await runQuery(query, [...values, id])
  return result[0]
}

async function deleteCaseById(id) {
  const result = await runQuery("DELETE FROM cases WHERE id = $1 RETURNING id", [id]);
  return result[0]
}

export const caseModel = {
  getCasesByProjectId,
  createCaseByProjectId,
  patchCaseById,
  deleteCaseById
};
