import Router from "koa-router";
import { jwtMiddleware } from "../middleware/auth.js";

import { getSkills, createSkill, patchSkill, deleteSkill } from "../controllers/skillController.js"
import { getSkillsValidation, createSkillValidation, patchSkillValidation, deleteSkillValidation } from "../validation/skillValidation.js"

const skillRouter = new Router({
  prefix: "/skills",
});

// GET /api/skills/
skillRouter.get("/", getSkillsValidation, getSkills)
// POST /api/skills/
skillRouter.post("/", createSkillValidation, jwtMiddleware, createSkill)
// PATCH /api/skills/:id
skillRouter.patch("/:id", patchSkillValidation, jwtMiddleware, patchSkill)
// DELETE /api/skills/:id
skillRouter.delete("/:id", deleteSkillValidation, jwtMiddleware, deleteSkill)

export default skillRouter;
