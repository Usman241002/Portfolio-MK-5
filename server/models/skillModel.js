import { runQuery } from "../database/helpers/database.js";

async function getAllSkills() {
  const result = await runQuery("SELECT * FROM skills;");
  return result
}

async function createSkill({name, year}) {
  const query = "INSERT INTO skills (name, year) VALUES ($1, $2) RETURNING id;"
  const result = await runQuery(query, [name, year])
  return result[0].id
}

async function patchSkillById(id, updates) {
  const keys = Object.keys(updates)
  const values = Object.values(updates)

  if (keys.length === 0) {
   throw new Error("No update fields provided.");
  }

  const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");
  const query = `UPDATE skills SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`

  const result = await runQuery(query, [...values, id])
  return result[0]
}

async function deleteSkillById(id) {
  const result = await runQuery("DELETE FROM skills WHERE id = $1 RETURNING id", [id]);
  return result[0]
}

export const skillModel = {
  getAllSkills,
  createSkill,
  patchSkillById,
  deleteSkillById
};
