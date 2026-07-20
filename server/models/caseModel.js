import { runQuery } from "../database/helpers/database.js";

async function getCasesByProjectId(projectId) {
  const result = await runQuery("SELECT * FROM cases WHERE project_id = $1 ORDER BY id", [projectId]);
  return result
}

async function createCaseByProjectId(projectId, caseData) {
  const { heading, subheading, description, stat, stat_description, image_url } = caseData

  const query = "INSERT INTO cases (project_id, heading, subheading, description, stat, stat_description, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;"
  const result = await runQuery(query, [projectId, heading, subheading, description, stat, stat_description, image_url])
  return result[0].id
}

async function putCaseById(id, data) {
  // Explicitly extract only the fields that belong in the cases table
  const { heading, subheading, description, stat, stat_description, image_url } = data;

  const result = await runQuery(
    `UPDATE cases
     SET heading = $1, subheading = $2, description = $3,
         stat = $4, stat_description = $5, image_url = $6
     WHERE id = $7
     RETURNING *`,
    [heading, subheading, description, stat, stat_description, image_url, id]
  );

  return result[0];
}

async function deleteCaseById(id) { // Renamed from deleteCasesByProjectId
  const result = await runQuery("DELETE FROM cases WHERE id = $1 RETURNING id", [id]);
  return result[0]
}

export const caseModel = {
  getCasesByProjectId,
  createCaseByProjectId,
  putCaseById,
  deleteCaseById
};
