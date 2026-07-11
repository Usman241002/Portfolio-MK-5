import { runQuery } from "../../database/helpers/database.js";

export async function resetDatabase() {
  try {
    const query = `
      TRUNCATE TABLE
        profile,
        projects,
        cases,
        skills,
        project_skills,
        education,
        experiences
      RESTART IDENTITY CASCADE;
    `;

    await runQuery(query);
    console.log("Database successfully reset.");
  } catch (error) {
    console.error("Failed to reset database:", error);
    throw error;
  }
}
