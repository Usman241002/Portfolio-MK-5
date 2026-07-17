import Router from "koa-router";
import { jwtMiddleware } from "../middleware/auth.js";

import { getExperiences, createExperience, putExperience, deleteExperience } from "../controllers/experienceController.js"
import { getAllExperiencesValidation, createExperienceValidation, putExperienceValidation, deleteExperienceValidation } from "../validation/experienceValidation.js"


const experienceRouter = new Router({
  prefix: "/experiences",
});

// GET /api/experiences/
experienceRouter.get("/", getAllExperiencesValidation, getExperiences)
// POST /api/experiences/
experienceRouter.post("/", createExperienceValidation, jwtMiddleware, createExperience)
// PUT /api/experiences/:id
experienceRouter.put("/:id", putExperienceValidation, jwtMiddleware, putExperience)
// DELETE /api/experiences/:id
experienceRouter.delete("/:id", deleteExperienceValidation, jwtMiddleware, deleteExperience)

export default experienceRouter;
