import request from "supertest";
import app from "../../app.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import dotenv from "dotenv";

dotenv.config();

export const validToken = jwt.sign({}, process.env.JWT_SECRET);

export const validLoginPayload = {
    email: "admin@example.com",
    password : "testPassword"
  }

export async function loginUser(payload = validLoginPayload) {
  const plainTextPassword = "testPassword";

  process.env.ADMIN_EMAIL = "admin@example.com";
  process.env.JWT_SECRET = "test_secret_key";

  process.env.ADMIN_PASSWORD = bcrypt.hashSync(plainTextPassword, 12);

  return await request(app.callback()).post("/api/auth/login").send(payload)
}

export async function verifyUser(token = validToken) {
  return await request(app.callback()).post("/api/auth/verify").set("Authorization", token ? `Bearer ${token}` : "")
}
