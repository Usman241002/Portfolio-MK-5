import { runQuery } from "../database/helpers/database.js";

async function getAllEducation() {
  const result = await runQuery("SELECT * FROM education");
  return result.rows
}

async function createEducation({ start_date, end_date, title, company, location, description }) {
   const query = "INSERT INTO education (start_date, end_date, title, company, location, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;"
   const result = await runQuery(query, [start_date, end_date, title, company, location, description])
   return result.rows[0].id
}

 async function patchEducationById(id, updates) {
   const keys = object.keys(updates)
   const values = object.values(updates)

   if (keys.length === 0) {
    throw new Error("No update fields provided.");
   }

   const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");
   const query = `UPDATE education SET ${setClause} WHERE id = $${keys.length + 1} RETURNING id`

   const result = await runQuery(query, [...values, id])
   return result.rows[0].id
 }

async function deleteEducationById(id) {
  return await runQuery("DELETE FROM education WHERE id = $1", [id]);
}

export const educationModel = {
  getAllEducation,
  createEducation,
  patchEducationById,
  deleteEducationById
};
