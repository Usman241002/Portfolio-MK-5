import { beforeEach, afterEach, after, describe, it, mock } from "node:test"
import { expect } from 'expect';

import { resetDatabase, seedExperiences, seedExperience } from "./helpers/dbHelpers.js";
import { experienceModel } from "../models/experienceModel.js";
import { getExperiences, createExperience, patchExperience, deleteExperience } from "./helpers/experienceHelpers.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

describe("Experience API", () => {
  const originalEnv = { ...process.env };

  beforeEach(async () => {
    process.env = { ...originalEnv };
    await resetDatabase()
  })

  afterEach(() => {
    mock.restoreAll();
  });

  after(() => {
    process.env = originalEnv;
  });

  describe("GET /api/experience", () => {
    beforeEach(async () => {
      await seedExperiences()
    })

    it("should return 200 if experience fetched", async () => {
      const res = await getExperiences()

      expect(res.status).toBe(200)
      expect(res.body.message).toBe("Experience fetched successfully")
      expect(res.body.experiences).toBeDefined()
      expect(res.body.experiences.length).toEqual(3)
      expect(res.body.experiences).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            start_date: expect.any(String),
            end_date: expect.any(String),
            title: expect.any(String),
            company: expect.any(String),
            employment_type: expect.any(String),
            location: expect.any(String),
            description: expect.any(String),
          })
        ])
      );
    })

    it("should return 404 if no experience is found", async () => {
      await resetDatabase();

      const res = await getExperiences()

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("No experience found")
    })

    it("should return 500 if database error", async () => {
      mock.method(experienceModel, "getAllExperiences", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await getExperiences();
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to fetch experience");
    });
  });

  describe("POST /api/experience", () => {
    beforeEach(async () => {
      await resetDatabase()
    })

    it("should return 201 if experience created", async () => {
      const res = await createExperience()

      expect(res.status).toBe(201)
      expect(res.body.message).toBe("Experience created successfully")
      expect(res.body.experienceId).toEqual(expect.any(Number))
    })

    it("should return 400 if invalid input", async () => {
      const payload = {
        name: "React",
        year: "string"
      }

      const res = await createExperience(payload, undefined)

      expect(res.status).toBe(400)
    })

    it("should return 401 if token is invalid", async () => {
      const token =  jwt.sign({}, "invalid_token");

      const res = await createExperience(undefined, token)

      expect(res.status).toBe(401)
    } )

    it("should return 401 if token is expired", async () => {
      const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "-1h" });

      const res = await createExperience(undefined, token)

      expect(res.status).toBe(401)
    } )

    it("should return 500 if database error", async () => {
      mock.method(experienceModel, "createExperience", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await createExperience();
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to create experience");
    });
  })

  describe("PATCH /api/experience/:id", () => {
    beforeEach(async () => {
      await seedExperience()
    })

    it("should return 200 if experience updated", async () => {
      const res = await patchExperience(1)
      expect(res.status).toBe(200)
    })

    it("should return 400 if invalid input", async () => {
      const payload = {
        name: "React",
        year: "string"
      }

      const res = await patchExperience("number", payload, undefined)

      expect(res.status).toBe(400)
    })

    it("should return 401 if token is invalid", async () => {
      const token =  jwt.sign({}, "invalid_token");

      const res = await patchExperience(1, undefined, token)

      expect(res.status).toBe(401)
    } )

    it("should return 401 if token is expired", async () => {
      const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "-1h" });

      const res = await patchExperience(1, undefined, token)

      expect(res.status).toBe(401)
    } )

    it("should return 404 if experience not found", async () => {
      const res = await patchExperience(999)

      expect(res.status).toBe(404)
      expect(res.body.message).toBe("Experience not found")
    })

    it("should return 500 if database error", async () => {
      mock.method(experienceModel, "patchExperienceById", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await patchExperience(1);
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to update experience");
    });
  })

  describe("DELETE /api/experience/:id", () => {
    beforeEach(async () => {
      await seedExperience()
    });

    it("should return 200 if experience deleted", async () => {
      const res = await deleteExperience(1);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Experience deleted successfully")
    })

    it("should return 400 if invalid input", async () => {
      const res = await deleteExperience("number", undefined)

      expect(res.status).toBe(400)
    })

    it("should return 401 if token is invalid", async () => {
      const token =  jwt.sign({}, "invalid_token");

      const res = await deleteExperience(1, token)

      expect(res.status).toBe(401)
    } )

    it("should return 401 if token is expired", async () => {
      const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "-1h" });

      const res = await deleteExperience(1, token)

      expect(res.status).toBe(401)
    })

    it("should return 404 if experience not found", async () => {
      const res = await deleteExperience(999)

      expect(res.status).toBe(404)
      expect(res.body.message).toBe("Experience not found")
    })

    it("should return 500 if database error", async () => {
      mock.method(experienceModel, "deleteExperienceById", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await deleteExperience(1);
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to delete experience");
    });
  })
})
