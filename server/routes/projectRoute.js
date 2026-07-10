import Router from "koa-router";
import { jwtMiddleware } from "../middleware/auth.js";

import { getProjects,
createProject,
getProject,
putProject,
patchProject,
deleteProject } from "../controllers/projectController.js"

const projectRouter = new Router({
  prefix: "/projects",
});

// GET /api/projects/
projectRouter.get("/", getProjects)
// POST /api/projects/
projectRouter.post("/", createProject)
// GET /api/projects/:id
projectRouter.get("/:id", getProject)
// PATCH /api/projects/:id
projectRouter.patch("/:id", patchProject)
// DELETE /api/projects/:id
projectRouter.delete("/:id", deleteProject)

export default projectRouter;
