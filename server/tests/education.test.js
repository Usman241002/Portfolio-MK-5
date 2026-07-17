import { beforeEach, afterEach, after, describe, it, mock } from "node:test"
import { expect } from 'expect';

import { resetDatabase, seedEducations, seedEducation } from "./helpers/dbHelpers.js";
import { educationModel } from "../models/educationModel.js";
import { getAllEducation, createEducation, putEducation, deleteEducation } from "./helpers/educationHelpers.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

describe("Education API", () => {
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

  describe("GET /api/education", () => {
    beforeEach(async () => {
      await seedEducations()
    })

    it("should return 200 if education fetched", async () => {
      const res = await getAllEducation()

      expect(res.status).toBe(200)
      expect(res.body.message).toBe("Education fetched successfully")
      expect(res.body.education).toBeDefined()
      expect(res.body.education.length).toEqual(3)
      expect(res.body.education).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            start_date: expect.any(String),
            end_date: expect.any(String),
            title: expect.any(String),
            company: expect.any(String),
            location: expect.any(String),
            description: expect.any(String),
          })
        ])
      );
    })

    it("should return 404 if no education is found", async () => {
      await resetDatabase();

      const res = await getAllEducation()

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("No education found")
    })

    it("should return 500 if database error", async () => {
      mock.method(educationModel, "getAllEducation", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await getAllEducation();
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to fetch education");
    });
  });

  describe("POST /api/education", () => {
    beforeEach(async () => {
      await resetDatabase()
    })

    it("should return 201 if education created", async () => {
      const res = await createEducation()

      expect(res.status).toBe(201)
      expect(res.body.message).toBe("Education created successfully")
      expect(res.body.educationId).toEqual(expect.any(Number))
    })

    it("should return 400 if invalid input", async () => {
      const payload = {
        name: "React",
        year: "string"
      }

      const res = await createEducation(payload, undefined)

      expect(res.status).toBe(400)
    })

    it("should return 401 if token is invalid", async () => {
      const token =  jwt.sign({}, "invalid_token");

      const res = await createEducation(undefined, token)

      expect(res.status).toBe(401)
    } )

    it("should return 401 if token is expired", async () => {
      const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "-1h" });

      const res = await createEducation(undefined, token)

      expect(res.status).toBe(401)
    } )

    it("should return 500 if database error", async () => {
      mock.method(educationModel, "createEducation", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await createEducation();
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to create education");
    });
  })

  describe("PUT /api/education/:id", () => {
    beforeEach(async () => {
      await seedEducation()
    })

    it("should return 200 if education updated", async () => {
      const res = await putEducation(1)
      expect(res.status).toBe(200)
    })

    it("should return 400 if invalid input", async () => {
      const payload = {
        name: "React",
        year: "string"
      }

      const res = await putEducation("number", payload, undefined)

      expect(res.status).toBe(400)
    })

    it("should return 401 if token is invalid", async () => {
      const token =  jwt.sign({}, "invalid_token");

      const res = await putEducation(1, undefined, token)

      expect(res.status).toBe(401)
    } )

    it("should return 401 if token is expired", async () => {
      const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "-1h" });

      const res = await putEducation(1, undefined, token)

      expect(res.status).toBe(401)
    } )

    it("should return 404 if education not found", async () => {
      const res = await putEducation(999)

      expect(res.status).toBe(404)
      expect(res.body.message).toBe("Education not found")
    })

    it("should return 500 if database error", async () => {
      mock.method(educationModel, "putEducationById", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await putEducation(1);
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to update education");
    });
  })

  describe("DELETE /api/education/:id", () => {
    beforeEach(async () => {
      await seedEducation()
    });

    it("should return 200 if education deleted", async () => {
      const res = await deleteEducation(1);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Education deleted successfully")
    })

    it("should return 400 if invalid input", async () => {
      const res = await deleteEducation("number", undefined)

      expect(res.status).toBe(400)
    })

    it("should return 401 if token is invalid", async () => {
      const token =  jwt.sign({}, "invalid_token");

      const res = await deleteEducation(1, token)

      expect(res.status).toBe(401)
    } )

    it("should return 401 if token is expired", async () => {
      const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "-1h" });

      const res = await deleteEducation(1, token)

      expect(res.status).toBe(401)
    })

    it("should return 404 if education not found", async () => {
      const res = await deleteEducation(999)

      expect(res.status).toBe(404)
      expect(res.body.message).toBe("Education not found")
    })

    it("should return 500 if database error", async () => {
      mock.method(educationModel, "deleteEducationById", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await deleteEducation(1);
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to delete education");
    });
  })
})
