import pg from 'pg'
const { Pool, Client } = pg
import fs from "fs/promises";

import { config } from "../config.js";

const SCHEMA_PATH = "./database/schema.sql";
const SCHEMA_TEST_PATH = "./database/schema_test.sql";

export async function runQuery(query, values) {
  const client = new Client(config)
  try {
    await client.connect()
    const data = await client.query(query, values)
    return data.rows
  } catch (error) {
      console.error(`Database Error: ${error.code} - ${error}`);
      throw error;
  }
  finally {
    await client.end();
  }
}

export const initDB = async () => {
  const client = new Client({
    host: config.host,
    user: config.user,
    password: config.password,
    port: config.port,
    database: config.database, // Ensure your config has the target database
  });

  try {
    await client.connect();

    const schema = await fs.readFile(
      process.env.NODE_ENV === "test" ? SCHEMA_TEST_PATH : SCHEMA_PATH,
      "utf8",
    );

    await client.query(schema);
    console.log("Schema Loaded");
  } catch (error) {
    console.error(`Database Error: ${error}`);
    throw error;
  } finally {
    await client.end();
  }
};
