import Router from "koa-router";
import { jwtMiddleware } from "../middleware/auth.js";

import { getExperiences, createExperience, patchExperience, deleteExperience } from "../controllers/experienceController.js"
import { getAllExperiencesValidation, createExperienceValidation, patchExperienceValidation, deleteExperienceValidation } from "../validation/experienceValidation.js"


const experienceRouter = new Router({
  prefix: "/experiences",
});

// GET /api/experiences/
experienceRouter.get("/", getAllExperiencesValidation, getExperiences)
// POST /api/experiences/
experienceRouter.post("/", createExperienceValidation, jwtMiddleware, createExperience)
// PATCH /api/experiences/:id
experienceRouter.patch("/:id", patchExperienceValidation, jwtMiddleware, patchExperience)
// DELETE /api/experiences/:id
experienceRouter.delete("/:id", deleteExperienceValidation, jwtMiddleware, deleteExperience)

export default experienceRouter;
