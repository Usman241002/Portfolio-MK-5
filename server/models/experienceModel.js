import { runQuery } from "../database/helpers/database.js";

async function getAllExperiences() {
  const result = await runQuery("SELECT * FROM experiences");
  return result.rows
}

async function createExperience({ start_date, end_date, title, company, employment_type, location, description }) {
   const query = "INSERT INTO experiences (start_date, end_date, title, company, employment_type, location, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;"
   const result = await runQuery(query, [start_date, end_date, title, company, employment_type, location, description])
   return result.rows[0].id
}

async function patchExperienceById(id, updates) {
  const keys = object.keys(updates)
  const values = object.values(updates)

  if (keys.length === 0) {
   throw new Error("No update fields provided.");
  }

  const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");
  const query = `UPDATE experiences SET ${setClause} WHERE id = ${keys.length + 1} RETURNING id`

  const result = runQuery(query, values)
  return result.rows[0].id
}

async function deleteExperienceById(id) {
  return await runQuery("DELETE FROM experiences WHERE id = $1", [id]);
}

export const experienceModel = {
  getAllExperiences,
  createExperience,
  patchExperienceById,
  deleteExperienceById
};
