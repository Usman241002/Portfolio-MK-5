import { runQuery } from "../database/helpers/database.js";

async function getProjectSkillsByProjectId(projectId) {
  const result = await runQuery("SELECT * FROM project_skills ps LEFT JOIN skills s ON ps.skill_id = s.id WHERE project_id = $1 ORDER BY s.id", [projectId]);
  return result
}

async function createProjectSkill(projectId, skillId) {
  const query = "INSERT INTO project_skills (project_id, skill_id) VALUES ($1, $2) RETURNING *;"
  const result = await runQuery(query, [projectId, skillId])
  return result[0]
}

async function putProjectSkill(id, updates) {
  const keys = Object.keys(updates)
  const values = Object.values(updates)

  if (keys.length === 0) {
   throw new Error("No update fields provided.");
  }

  const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");
  const query = `UPDATE project_skills SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`

  const result = await runQuery(query, [...values, id])
  return result[0]
}

async function deleteProjectSkillsByProjectId(id) {
  const result = await runQuery("DELETE FROM project_skills WHERE project_id = $1 RETURNING project_id", [id]);
  return result[0]
}

export const projectSkillModel = {
  getProjectSkillsByProjectId,
  createProjectSkill,
  putProjectSkill,
  deleteProjectSkillsByProjectId
};
