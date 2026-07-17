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

async function putExperienceById(id, data) {
   const { start_date, end_date, title, company, employment_type, location, description } = data
   const query = `UPDATE experience SET start_date = $1, end_date = $2, title = $3, company = $4, employment_type = $5, location = $6, description = $7 WHERE id = $8 RETURNING *`
   const result = await runQuery(query, [start_date, end_date, title, company, employment_type, location, description, id])
   return result[0]
 }

async function deleteExperienceById(id) {
  const result = await runQuery("DELETE FROM experiences WHERE id = $1 RETURNING id", [id]);
  return result[0]
}

export const experienceModel = {
  getAllExperiences,
  createExperience,
  putExperienceById,
  deleteExperienceById
};
