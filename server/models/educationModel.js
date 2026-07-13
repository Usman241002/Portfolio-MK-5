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

 async function patchEducationById(id, updates) {
   const keys = Object.keys(updates)
   const values = Object.values(updates)

   if (keys.length === 0) {
    throw new Error("No update fields provided.");
   }

   const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");
   const query = `UPDATE education SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`

   const result = await runQuery(query, [...values, id])
   return result[0]
 }

async function deleteEducationById(id) {
  const result = await runQuery("DELETE FROM education WHERE id = $1 RETURNING id", [id]);
  return result[0]
}

export const educationModel = {
  getAllEducation,
  createEducation,
  patchEducationById,
  deleteEducationById
};
