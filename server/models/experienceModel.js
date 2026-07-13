import { runQuery } from "../database/helpers/database.js";

async function getAllExperiences() {
  const result = await runQuery("SELECT * FROM experiences");
  return result
}

async function createExperience({ start_date, end_date, title, company, employment_type, location, description }) {
   const query = "INSERT INTO experiences (start_date, end_date, title, company, employment_type, location, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;"
   const result = await runQuery(query, [start_date, end_date, title, company, employment_type, location, description])
   return result[0].id
}

async function patchExperienceById(id, updates) {
  const keys = Object.keys(updates)
  const values = Object.values(updates)

  if (keys.length === 0) {
   throw new Error("No update fields provided.");
  }

  const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");
  const query = `UPDATE experiences SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`

  const result = await runQuery(query, [...values, id])
  return result[0]
}

async function deleteExperienceById(id) {
  const result = await runQuery("DELETE FROM experiences WHERE id = $1 RETURNING id", [id]);
  return result[0]
}

export const experienceModel = {
  getAllExperiences,
  createExperience,
  patchExperienceById,
  deleteExperienceById
};
