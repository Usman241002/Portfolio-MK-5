import { runQuery } from "../database/helpers/database.js";

async function getAllEducation() {
  const result = await runQuery("SELECT * FROM education");
  return result
}

async function createEducation({ start_date, end_date, title, company, location, description }) {
   const query = "INSERT INTO education (start_date, end_date, title, company, location, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;"
   const result = await runQuery(query, [start_date, end_date, title, company, location, description])
   return result[0].id
}

async function putEducationById(id, data) {
   const { start_date, end_date, title, company, location, description } = data
   const query = `UPDATE education SET start_date = $1, end_date = $2, title = $3, company = $4, location = $5, description = $6 WHERE id = $7 RETURNING *`
   const result = await runQuery(query, [start_date, end_date, title, company, location, description, id])
   return result[0]
 }

async function deleteEducationById(id) {
  const result = await runQuery("DELETE FROM education WHERE id = $1 RETURNING id", [id]);
  return result[0]
}

export const educationModel = {
  getAllEducation,
  createEducation,
  putEducationById,
  deleteEducationById
};
