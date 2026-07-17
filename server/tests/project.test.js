import { beforeEach, afterEach, after, describe, it, mock } from "node:test"
import { expect } from 'expect';

import { resetDatabase, seedProject, seedProjects, seedFeaturedProjects, seedSkills } from "./helpers/dbHelpers.js";
import { projectModel } from "../models/projectModel.js";
import { caseModel } from "../models/caseModel.js";
import { projectSkillModel } from "../models/projectSkillModel.js";
import { getProjects, getFeaturedProjects, createProject, getProject, putProject, deleteProject, validProjectPayload } from "./helpers/projectHelpers.js";
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
    mock.restoreAll();
  });

  after(() => {
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
      mock.method(projectModel, "getAllProjects", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await getProjects();
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to fetch projects");
    });

    it("should return 500 if database error while fetching skills", async () => {
      mock.method(projectSkillModel, "getProjectSkillsByProjectId", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await getProjects();
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to fetch projects");
    });

    it("should return 500 if database error while fetching cases", async () => {
      mock.method(caseModel, "getCasesByProjectId", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await getProjects();
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to fetch projects");
    });
  });

  describe("GET /api/projects/featured", () => {
    beforeEach(async () => {
      await seedSkills();
      await seedFeaturedProjects();
    })

    it("should return 200 if projects fetched", async () => {
      const res = await getFeaturedProjects()

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

    it("should only fetch featured projects", async () => {
      const res = await getFeaturedProjects()

      expect(res.status).toBe(200)
      expect(res.body.projects).toBeDefined()
      expect(res.body.projects.length).toEqual(3)
      expect(res.body.projects).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            featured: true
          })
        ])
      );
    })

    it("should return 404 if no projects are found", async () => {
      await resetDatabase();

      const res = await getFeaturedProjects()

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("No projects found")
    })

    it("should return 500 if database error while fetching projects", async () => {
      mock.method(projectModel, "getFeaturedProjects", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await getFeaturedProjects();
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to fetch projects");
    });

    it("should return 500 if database error while fetching skills", async () => {
      mock.method(projectSkillModel, "getProjectSkillsByProjectId", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await getFeaturedProjects();
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to fetch projects");
    });

    it("should return 500 if database error while fetching cases", async () => {
      mock.method(caseModel, "getCasesByProjectId", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await getFeaturedProjects();
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to fetch projects");
    });
  });

  describe("POST /api/projects", () => {
    beforeEach(async () => {
      await resetDatabase()
      await seedSkills()
    })

    it("should return 201 if project created", async () => {
      const res = await createProject()

      expect(res.status).toBe(201)
      expect(res.body.message).toBe("Project created successfully")
      expect(res.body.projectId).toEqual(expect.any(Number))
    })

    it("should return 400 if invalid input", async () => {
      const res = await createProject({...validProjectPayload, title: 123}, undefined)
      expect(res.status).toBe(400)
    })

    it("should return 401 if token is invalid", async () => {
      const token =  jwt.sign({}, "invalid_token");

      const res = await createProject(undefined, token)

      expect(res.status).toBe(401)
    })

    it("should return 401 if token is expired", async () => {
      const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "-1h" });

      const res = await createProject(undefined, token)

      expect(res.status).toBe(401)
    })

    it("should return 500 if database error while creating projects", async () => {
      mock.method(projectModel, "createProject", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await createProject();
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to create project");
    });

    it("should return 500 if database error while creating skills", async () => {
      mock.method(projectSkillModel, "createProjectSkill", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await createProject();
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to create project");
    });

    it("should return 500 if database error while creating cases", async () => {
      mock.method(caseModel, "createCaseByProjectId", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await createProject();
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to create project");
    });
  });

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
      mock.method(projectModel, "getProjectById", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await getProject(1);
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to fetch project");
    });

    it("should return 500 if database error while fetching skills", async () => {
      mock.method(projectSkillModel, "getProjectSkillsByProjectId", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await getProject(1);
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to fetch project");
    });

    it("should return 500 if database error while fetching cases", async () => {
      mock.method(caseModel, "getCasesByProjectId", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await getProject(1);
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to fetch project");
    });
  });

  describe("PUT /api/projects/:id", () => {
    beforeEach(async () => {
      await seedSkills()
      await seedProject()
    })

    it("should return 200 if project updated", async () => {
      const res = await putProject(1)
      expect(res.status).toBe(200)
      expect(res.body.message).toBe("Project updated successfully")
    })

    it("should return 400 if invalid input", async () => {
      const payload = {
        name: "React",
        year: "string"
      }

      const res = await putProject("number", payload, undefined)

      expect(res.status).toBe(400)
    })

    it("should return 401 if token is invalid", async () => {
      const token =  jwt.sign({}, "invalid_token");

      const res = await putProject(1, undefined, token)

      expect(res.status).toBe(401)
    } )

    it("should return 401 if token is expired", async () => {
      const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "-1h" });

      const res = await putProject(1, undefined, token)

      expect(res.status).toBe(401)
    } )

    it("should return 404 if project not found", async () => {
      const res = await putProject(999)

      expect(res.status).toBe(404)
      expect(res.body.message).toBe("Project not found")
    })

    it("should return 500 if database error while updating projects", async () => {
      mock.method(projectModel, "putProjectById", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await putProject(1);
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to update project");
    });

    it("should return 500 if database error while updating skills", async () => {
      mock.method(projectSkillModel, "createProjectSkill", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await putProject(1);
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to update project");
    });

    it("should return 500 if database error while updating cases", async () => {
      mock.method(caseModel, "createCaseByProjectId", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await putProject(1);
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to update project");
    });
  });

  describe("DELETE /api/projects/:id", () => {
    beforeEach(async () => {
      await seedSkills()
      await seedProject();
    });

    it("should return 200 if project soft deleted", async () => {
      await deleteProject(1);

      const res = await getProject(1);

      expect(res.status).toBe(200);
      expect(res.body.project.deleted).toBe(true)
    })

    it.only("should return 400 if invalid input", async () => {
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
      mock.method(projectModel, "deleteProjectById", () => {
        throw new Error("Simulated Server Error");
      });

      const res = await deleteProject(1);
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Failed to delete project");
    });
  });
})
