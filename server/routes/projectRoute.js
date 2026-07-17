import Router from "koa-router";
import { jwtMiddleware } from "../middleware/auth.js";

import { getProjects, getFeaturedProjects, createProject, getProject, putProject, deleteProject, uploadThumbnail } from "../controllers/projectController.js"
import {
  getProjectsValidation,
  createProjectValidation,
  getProjectValidation,
  putProjectValidation,
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
projectRouter.post("/", jwtMiddleware, createProjectValidation, createProject)
// GET /api/projects/:id
projectRouter.get("/:id", getProjectValidation, getProject)
// PUT /api/projects/:id
projectRouter.put("/:id", jwtMiddleware, putProjectValidation, putProject)
// DELETE /api/projects/:id
projectRouter.delete("/:id", jwtMiddleware, deleteProjectValidation, deleteProject)
// POST /api/projects/:id/thumbnail
projectRouter.post('/:id/thumbnail', jwtMiddleware, uploadThumbnail);

export default projectRouter;
