import { beforeEach, afterEach, after, describe, it, mock } from "node:test"
import { expect } from 'expect';

import { resetDatabase, seedProfile } from "./helpers/dbHelpers.js";
import { profileModel } from "../models/profileModel.js";
import { getProfile, patchProfile } from "./helpers/profileHelpers.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

describe("Profile API", () => {
  const originalEnv = { ...process.env };

  beforeEach(async () => {
    process.env = { ...originalEnv };
    await resetDatabase()
    await seedProfile()
  })

  afterEach(() => {
    mock.restoreAll();
  });

  after(() => {
    process.env = originalEnv;
  });

  describe("GET /api/profile", () => {
    it("should return 200 if profile fetched", async () => {
      const res = await getProfile()

      expect(res.status).toBe(200)
      expect(res.body.message).toBe("Profile fetched successfully")
      expect(res.body.profile).toBeDefined()
      expect(res.body.profile).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          role: expect.any(String),
          location: expect.any(String),
          status: expect.any(String),
          email: expect.any(String),
          github_url: expect.any(String),
          linkedin_url: expect.any(String)
        })
      );
    })

    it("should return 404 if no profile is found", async () => {
      await resetDatabase();

      const res = await getProfile()

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Profile not found")
    })

    it("should return 500 if database error", async () => {
      mock.method(profileModel, "getProfile", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await getProfile();
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to fetch profile");
    });
  });

  describe("PATCH /api/profile/", () => {
      it("should return 200 if profile updated", async () => {
        const res = await patchProfile()
        expect(res.status).toBe(200)
      })

      it("should return 400 if invalid input", async () => {
        const payload = {
          name: "err",
          role: "err",
          location: "",
          status: "invalid enum",
          email: "not_email",
          github_url: 1234,
          linkedin_url: 5678,
        }

        const res = await patchProfile(payload, undefined)

        expect(res.status).toBe(400)
      })

      it("should return 401 if token is invalid", async () => {
        const token =  jwt.sign({}, "invalid_token");

        const res = await patchProfile(undefined, token)

        expect(res.status).toBe(401)
      } )

      it("should return 401 if token is expired", async () => {
        const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "-1h" });

        const res = await patchProfile(undefined, token)

        expect(res.status).toBe(401)
      } )

      it("should return 500 if database error", async () => {
        mock.method(profileModel, "patchProfile", () => {
          throw new Error("Simulated Server Error");
        });

        const res = await patchProfile();
        expect(res.status).toBe(500);
        expect(res.body.message).toBe("Failed to update profile");
      });
  })

})
