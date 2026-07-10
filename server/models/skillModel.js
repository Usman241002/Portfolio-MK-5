import { runQuery } from "../database/helpers/database.js";

async function getAllSkills() {
  const result = await runQuery("SELECT * FROM skills");
  return result.rows
}

async function createSkill({name, year}) {
  const query = "INSERT INTO skills (name, year) VALUES ($1, $2) RETURNING id;"
  const result = await runQuery(query, [name, year])
  return result.rows[0].id
}

async function patchSkillById(id, updates) {
  const keys = Object.keys(updates)
  const values = Object.values(updates)

  if (keys.length === 0) {
   throw new Error("No update fields provided.");
  }

  const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");
  const query = `UPDATE skills SET ${setClause} WHERE id = $${keys.length + 1} RETURNING id`

  const result = await runQuery(query, [...values, id])
  return result.rows[0].id
}

async function deleteSkillById(id) {
  return await runQuery("DELETE FROM skills WHERE id = $1", [id]);
}

export const skillModel = {
  getAllSkills,
  createSkill,
  patchSkillById,
  deleteSkillById
};
