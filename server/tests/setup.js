import { jest } from "@jest/globals";
import { initDB } from "../database/helpers/database";

// jest.spyOn(console, "error").mockImplementation(() => {});
// jest.spyOn(console, "log").mockImplementation(() => {});
// jest.spyOn(console, "warn").mockImplementation(() => {});

await initDB();
