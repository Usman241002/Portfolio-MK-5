import { beforeEach, afterEach, after, describe, it, mock } from "node:test"
import { expect } from 'expect';

import { resetDatabase, seedSkill, seedSkills } from "./helpers/dbHelpers.js";
import { skillModel } from "../models/skillModel.js";
import { getSkills, createSkill, patchSkill, deleteSkill } from "./helpers/skillHelpers.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

describe("Skill API", () => {
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

  describe("GET /api/skills", () => {
    beforeEach(async () => {
      await seedSkills()
    })

    it("should return 200 if skills fetched", async () => {
      const res = await getSkills()

      expect(res.status).toBe(200)
      expect(res.body.message).toBe("Skills fetched successfully")
      expect(res.body.skills).toBeDefined()
      expect(res.body.skills.length).toEqual(3)
      expect(res.body.skills).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            year: expect.any(Number),
          })
        ])
      );
    })

    it("should return 404 if no skills are found", async () => {
      await resetDatabase();

      const res = await getSkills()

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("No skills found")
    })

    it("should return 500 if database error", async () => {
      mock.method(skillModel, "getAllSkills", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await getSkills();
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to fetch skills");
    });
  });

  describe("POST /api/skills", () => {
    beforeEach(async () => {
      await resetDatabase()
    })

    it("should return 201 if skill created", async () => {
      const res = await createSkill()

      expect(res.status).toBe(201)
      expect(res.body.message).toBe("Skill created successfully")
      expect(res.body.skillId).toEqual(expect.any(Number))
    })

    it("should return 400 if invalid input", async () => {
      const payload = {
        name: "React",
        year: "string"
      }

      const res = await createSkill(payload, undefined)

      expect(res.status).toBe(400)
    })

    it("should return 401 if token is invalid", async () => {
      const token =  jwt.sign({}, "invalid_token");

      const res = await createSkill(undefined, token)

      expect(res.status).toBe(401)
    } )

    it("should return 401 if token is expired", async () => {
      const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "-1h" });

      const res = await createSkill(undefined, token)

      expect(res.status).toBe(401)
    } )

    it("should return 500 if database error", async () => {
      mock.method(skillModel, "createSkill", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await createSkill();
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to create skill");
    });
  })

  describe("PATCH /api/skills/:id", () => {
    beforeEach(async () => {
      await seedSkill()
    })

    it("should return 200 if skill updated", async () => {
      const res = await patchSkill(1)
      expect(res.status).toBe(200)
      expect(res.body.message).toBe("Skill updated successfully")
    })

    it("should return 400 if invalid input", async () => {
      const payload = {
        name: "React",
        year: "string"
      }

      const res = await patchSkill("number", payload, undefined)

      expect(res.status).toBe(400)
    })

    it("should return 401 if token is invalid", async () => {
      const token =  jwt.sign({}, "invalid_token");

      const res = await patchSkill(1, undefined, token)

      expect(res.status).toBe(401)
    } )

    it("should return 401 if token is expired", async () => {
      const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "-1h" });

      const res = await patchSkill(1, undefined, token)

      expect(res.status).toBe(401)
    } )

    it("should return 404 if skill not found", async () => {
      const res = await patchSkill(999)

      expect(res.status).toBe(404)
      expect(res.body.message).toBe("Skill not found")
    })

    it("should return 500 if database error", async () => {
      mock.method(skillModel, "patchSkillById", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await patchSkill(1);
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to update skill");
    });
  })

  describe("DELETE /api/skills/:id", () => {
    beforeEach(async () => {
      await seedSkill()
    });

    it("should return 200 if skill deleted", async () => {
      const res = await deleteSkill(1);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Skill deleted successfully")
    })

    it("should return 400 if invalid input", async () => {
      const res = await deleteSkill("number", undefined)

      expect(res.status).toBe(400)
    })

    it("should return 401 if token is invalid", async () => {
      const token =  jwt.sign({}, "invalid_token");

      const res = await deleteSkill(1, token)

      expect(res.status).toBe(401)
    } )

    it("should return 401 if token is expired", async () => {
      const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "-1h" });

      const res = await deleteSkill(1, token)

      expect(res.status).toBe(401)
    })

    it("should return 404 if skill not found", async () => {
      const res = await deleteSkill(999)

      expect(res.status).toBe(404)
      expect(res.body.message).toBe("Skill not found")
    })

    it("should return 500 if database error", async () => {
      mock.method(skillModel, "deleteSkillById", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await deleteSkill(1);
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to delete skill");
    });
  })
})
