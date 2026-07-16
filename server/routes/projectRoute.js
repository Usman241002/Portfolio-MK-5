import Router from "koa-router";
import { jwtMiddleware } from "../middleware/auth.js";

import { getProjects, getFeaturedProjects, createProject, getProject, patchProject, deleteProject } from "../controllers/projectController.js"
import {
  getProjectsValidation,
  createProjectValidation,
  getProjectValidation,
  patchProjectValidation,
  deleteProjectValidation
} from "../validation/projectValidation.js";
const projectRouter = new Router({
  prefix: "/projects",
});

// GET /api/projects/
projectRouter.get("/", getProjectsValidation, getProjects)
// GET /api/projects/featured
projectRouter.get("/featured", getProjectsValidation, getFeaturedProjects)
// POST /api/projects/
projectRouter.post("/", createProjectValidation, jwtMiddleware, createProject)
// GET /api/projects/:id
projectRouter.get("/:id", getProjectValidation, getProject)
// PATCH /api/projects/:id
projectRouter.patch("/:id", patchProjectValidation, jwtMiddleware, patchProject)
// DELETE /api/projects/:id
projectRouter.delete("/:id", deleteProjectValidation, jwtMiddleware, deleteProject)

export default projectRouter;
