import { runQuery } from "../database/helpers/database.js";

async function getProfile() {
  const result = await runQuery("SELECT * FROM profile");
  return result.rows
}
async function patchProfile() {
  const keys = object.keys(updates)
  const values = object.values(updates)

  if (keys.length === 0) {
   throw new Error("No update fields provided.");
  }

  const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");
  const query = `UPDATE profile SET ${setClause} RETURNING *`

  const result = await runQuery(query, values)
  return result.rows[0]
}

export const profileModel = {};
