import { resetDatabase, seedProject, seedProjects, seedSkills } from "./helpers/dbHelpers.js";
import { projectModel } from "../models/projectModel.js";
import { caseModel } from "../models/caseModel.js";
import { projectSkillModel } from "../models/projectSkillModel.js";
import { getProjects, getProject, deleteProject } from "./helpers/projectHelpers.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

describe("Project API", () => {
  const originalEnv = { ...process.env };

  beforeEach(async () => {
    process.env = { ...originalEnv };
    await resetDatabase()
  })

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe("GET /api/projects", () => {
    beforeEach(async () => {
      await seedSkills();
      await seedProjects();
    })

    it("should return 200 if projects fetched", async () => {
      const res = await getProjects()

      expect(res.status).toBe(200)
      expect(res.body.message).toBe("Projects fetched successfully")
      expect(res.body.projects).toBeDefined()
      expect(res.body.projects.length).toEqual(3)
      expect(res.body.projects).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            subtitle: expect.any(String),
            client: expect.any(String),
            role: expect.any(String),
            year: expect.any(Number),
            description: expect.any(String),
            status: expect.any(String),
            repository_url: expect.any(String),
            live_demo_url: expect.anything(),
            thumbnail_url: expect.anything(),
            deleted: expect.any(Boolean),
            featured: expect.any(Boolean),
            skills: expect.arrayContaining([
              expect.objectContaining({
                project_id: expect.any(Number),
                skill_id: expect.any(Number),
              })
            ]),
            cases: expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(Number),
                project_id: expect.any(Number),
                heading: expect.any(String),
                subheading: expect.any(String),
                description: expect.any(String),
                stat: expect.any(String),
                stat_description: expect.any(String),
                image_url: expect.any(String)
              })
            ]),
          })
        ])
      );
    })

    it("should return 404 if no projects are found", async () => {
      await resetDatabase();

      const res = await getProjects()

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("No projects found")
    })

    it("should return 500 if database error while fetching projects", async () => {
      jest.spyOn(projectModel, "getAllProjects").mockImplementation(() => {
        throw new Error("Simulated Server Error");
      });

      const res = await getProjects();
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to fetch projects");
    });

    it("should return 500 if database error while fetching skills", async () => {
      jest.spyOn(projectSkillModel, "getProjectSkillsByProjectId").mockImplementation(() => {
        throw new Error("Simulated Server Error");
      });

      const res = await getProjects();
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to fetch projects");
    });

    it("should return 500 if database error while fetching cases", async () => {
      jest.spyOn(caseModel, "getCasesByProjectId").mockImplementation(() => {
        throw new Error("Simulated Server Error");
      });

      const res = await getProjects();
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to fetch projects");
    });
  });

  describe("POST /api/projects", () => { });

  describe("GET /api/projects/:id", () => {
    beforeEach(async () => {
      await seedSkills();
      await seedProject();
    })

    it("should return 200 if projects fetched", async () => {
      const res = await getProject(1)

      expect(res.status).toBe(200)
      expect(res.body.message).toBe("Project fetched successfully")
      expect(res.body.project).toBeDefined()
      expect(res.body.project.id).toEqual(1)
      expect(res.body.project).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          subtitle: expect.any(String),
          client: expect.any(String),
          role: expect.any(String),
          year: expect.any(Number),
          description: expect.any(String),
          status: expect.any(String),
          repository_url: expect.any(String),
          live_demo_url: expect.anything(),
          thumbnail_url: expect.anything(),
          deleted: expect.any(Boolean),
          featured: expect.any(Boolean),
          skills: expect.arrayContaining([
            expect.objectContaining({
              project_id: expect.any(Number),
              skill_id: expect.any(Number),
            })
          ]),
          cases: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              project_id: expect.any(Number),
              heading: expect.any(String),
              subheading: expect.any(String),
              description: expect.any(String),
              stat: expect.any(String),
              stat_description: expect.any(String),
              image_url: expect.any(String)
            })
          ]),
        })
      );
    })

    it("should return 404 if no projects are found", async () => {
      await resetDatabase();

      const res = await getProject(999)

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Project not found")
    })

    it("should return 500 if database error while fetching projects", async () => {
      jest.spyOn(projectModel, "getProjectById").mockImplementation(() => {
        throw new Error("Simulated Server Error");
      });

      const res = await getProject(1);
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to fetch project");
    });

    it("should return 500 if database error while fetching skills", async () => {
      jest.spyOn(projectSkillModel, "getProjectSkillsByProjectId").mockImplementation(() => {
        throw new Error("Simulated Server Error");
      });

      const res = await getProject(1);
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to fetch project");
    });

    it("should return 500 if database error while fetching cases", async () => {
      jest.spyOn(caseModel, "getCasesByProjectId").mockImplementation(() => {
        throw new Error("Simulated Server Error");
      });

      const res = await getProject(1);
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to fetch project");
    });
  });

  describe("PATCH /api/projects/:id", () => { });

  describe("DELETE /api/projects/:id", () => {
    beforeEach(async () => {
      await seedSkills()
      await seedProject();
    });

    it.only("should return 200 if project soft deleted", async () => {
      await deleteProject(1);

      const res = await getProject(1);

      expect(res.status).toBe(200);
      expect(res.body.project.deleted).toBe(true)
    })

    it("should return 400 if invalid input", async () => {
      const res = await deleteProject("number", undefined)

      expect(res.status).toBe(400)
    })

    it("should return 401 if token is invalid", async () => {
      const token =  jwt.sign({}, "invalid_token");

      const res = await deleteProject(1, token)

      expect(res.status).toBe(401)
    } )

    it("should return 401 if token is expired", async () => {
      const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "-1h" });

      const res = await deleteProject(1, token)

      expect(res.status).toBe(401)
    })

    it("should return 404 if project not found", async () => {
      const res = await deleteProject(999)

      expect(res.status).toBe(404)
      expect(res.body.message).toBe("Project not found")
    })

    it("should return 500 if database error", async () => {
      jest.spyOn(projectModel, "deleteProjectById").mockImplementation(() => {
        throw new Error("Simulated Server Error");
      });

      const res = await deleteProject(1);
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to delete project");
    });
  });
})
