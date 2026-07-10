import { runQuery } from "../database/helpers/database.js";

async function getProjectSkillsbyProjectId(projectId) {
  const result = await runQuery("SELECT * FROM project_skills WHERE project_id = $1", [projectId]);
  return result.rows
}

async function createProjectSkill(projectId, skillId) {
  const query = "INSERT INTO cases (project_id, skillId) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;"
  const result = await runQuery(query, [projectId, skillId])
  return result.rows[0].id
}

async function patchProjectSkill(id) {
  const keys = Object.keys(updates)
  const values = Object.values(updates)

  if (keys.length === 0) {
   throw new Error("No update fields provided.");
  }

  const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");
  const query = `UPDATE project_skills SET ${setClause} WHERE id = $${keys.length + 1} RETURNING id`

  const result = await runQuery(query, [...values, id])
  return result.rows[0].id
}

async function deleteProjectSkill(id) {
  return await runQuery("DELETE FROM project_skills WHERE id = $1", [id]);
}

export const projectSkillModel = {
  getProjectSkillsbyProjectId,
  createProjectSkill,
  patchProjectSkill,
  deleteProjectSkill
};
