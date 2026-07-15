import { initDB } from "../database/helpers/database.js";

// ==========================================
// GLOBAL LOG TOGGLES
// Comment out a line to SEE those logs in the terminal
// ==========================================

console.log = () => {};
console.warn = () => {};
console.error = () => {};


// ==========================================
// GLOBAL DATABASE SETUP
// ==========================================

// (Optional) We use console.info here so we can still see setup steps
// in the terminal even if console.log is completely muted above.
console.info("Initializing Test Database...");

await initDB();

console.info("Database Ready! Starting tests...\n");
