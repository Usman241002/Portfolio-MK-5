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

async function putSkillById(id, data) {
   const { name, year } = data
   const query = `UPDATE skills SET name = $1, year = $2 WHERE id = $3 RETURNING *`
   const result = await runQuery(query, [name, year, id])
   return result[0]
 }

async function deleteSkillById(id) {
  const result = await runQuery("DELETE FROM skills WHERE id = $1 RETURNING id", [id]);
  return result[0]
}

export const skillModel = {
  getAllSkills,
  createSkill,
  putSkillById,
  deleteSkillById
};
