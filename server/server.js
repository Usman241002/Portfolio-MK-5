import app from "./app.js";
import { initDB } from "./database/helpers/database.js";

const PORT = 3000; //server listening on port 3000

// determine if the environment is development
const isDevMode = process.env.npm_lifecycle_event === 'dev' || process.env.NODE_ENV === 'development';

if (isDevMode) {
  console.log("Development mode detected. Initializing database schema...");
  await initDB();
} else {
  console.log("Production mode detected. Skipping database schema initialization.");
}

//enabling the server to listen on port
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`)
})
