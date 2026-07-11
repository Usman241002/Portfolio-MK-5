import { beforeEach, afterEach, afterAll, expect, describe, it, jest } from "@jest/globals";
import { loginUser, verifyUser, validLoginPayload } from "./helpers/authHelpers.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

describe("Auth API", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe("POST /api/auth/login", () => {
    const loginScenarios = [
      {
        description: "user successfully logs in and token is created",
        payload: undefined,
        expectedStatus: 200,
        expectedMsg: "Login successful",
        expectedProperties: ["token"]
      },
      {
        description: "invalid input format",
        payload: { email: "not_email", password: 1234 },
        expectedStatus: 400,
      },
      {
        description: "incorrect email",
        payload: { ...validLoginPayload, email: "wrong@gmail.com" },
        expectedStatus: 401,
        expectedMsg: "Invalid username or password"
      },
      {
        description: "incorrect password",
        payload: { ...validLoginPayload, password: "wrongPassword" },
        expectedStatus: 401,
        expectedMsg: "Invalid username or password"
      }
    ];

    it.each(loginScenarios)("should return $expectedStatus if $description", async ({ payload, expectedStatus, expectedMsg, expectedProperties = [] }) => {
      const res = await loginUser(payload);

      expect(res.status).toBe(expectedStatus);

      if (expectedMsg) expect(res.body.message).toBe(expectedMsg);

      if (expectedProperties.length > 0) {
        for (const property of expectedProperties) {
          expect(res.body).toHaveProperty(property);
        }
      }
    });

    it("should return 500 if database error", async () => {
      jest.spyOn(bcrypt, "compareSync").mockImplementation(() => {
        throw new Error("Simulated Server Error");
      });

      const res = await loginUser();
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to login user");
    });
  });

  describe("POST /api/auth/verify", () => {
    // We generate these dynamically so they use the current env secret
    const verifyScenarios = [
      {
        description: "user successfully verified",
        payload: undefined, // Valid token
        expectedStatus: 200,
      },
      {
        description: "token is invalid",
        payload: { token: "invalid_token" },
        expectedStatus: 401,
        expectedMsg: undefined
      },
      {
        description: "token is expired",
        payload: { token: jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "-1h" }) },
        expectedStatus: 401,
        expectedMsg: undefined
      }
    ];

    it.each(verifyScenarios)("should return $expectedStatus if $description", async ({ payload, expectedStatus, expectedMsg }) => {
      const res = await verifyUser(payload);

      expect(res.status).toBe(expectedStatus);
      if (expectedMsg) expect(res.body.message).toBe(expectedMsg);
    });
  });
});
