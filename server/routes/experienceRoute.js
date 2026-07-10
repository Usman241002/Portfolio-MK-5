import Router from "koa-router";
import { jwtMiddleware } from "../middleware/auth.js";

import { getExperiences,
createExperience,
getExperience,
putExperience,
patchExperience,
deleteExperience } from "../controllers/experienceController.js"

const experienceRouter = new Router({
  prefix: "/experiences",
});

// GET /api/experiences/
experienceRouter.get("/", getExperiences)
// POST /api/experiences/
experienceRouter.post("/", createExperience)
// PATCH /api/experiences/:id
experienceRouter.patch("/:id", patchExperience)
// DELETE /api/experiences/:id
experienceRouter.delete("/:id", deleteExperience)

export default experienceRouter;
