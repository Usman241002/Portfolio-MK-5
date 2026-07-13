import { runQuery } from "../database/helpers/database.js";

async function getProfile() {
  const result = await runQuery("SELECT * FROM profile");
  return result[0]
}

async function patchProfile(updates) {
  const keys = Object.keys(updates)
  const values = Object.values(updates)

  if (keys.length === 0) {
   throw new Error("No update fields provided.");
  }

  const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");
  const query = `UPDATE profile SET ${setClause} RETURNING *`

  const result = await runQuery(query, values)
  return result[0]
}

export const profileModel = {
  getProfile,
  patchProfile
};
