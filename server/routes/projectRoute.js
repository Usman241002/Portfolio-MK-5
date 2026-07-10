import Router from "koa-router";
import { jwtMiddleware } from "../middleware/auth.js";

import { getProjects, createProject, getProject, patchProject, deleteProject } from "../controllers/projectController.js"

const projectRouter = new Router({
  prefix: "/projects",
});

// GET /api/projects/
projectRouter.get("/", getProjects)
// POST /api/projects/
projectRouter.post("/", jwtMiddleware, createProject)
// GET /api/projects/:id
projectRouter.get("/:id", getProject)
// PATCH /api/projects/:id
projectRouter.patch("/:id", jwtMiddleware, patchProject)
// DELETE /api/projects/:id
projectRouter.delete("/:id", jwtMiddleware, deleteProject)

export default projectRouter;
