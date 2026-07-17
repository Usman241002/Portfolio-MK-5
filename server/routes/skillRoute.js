import Router from "koa-router";
import { jwtMiddleware } from "../middleware/auth.js";

import {
  getSkills,
  createSkill,
  putSkill,
  deleteSkill
} from "../controllers/skillController.js"
import { getSkillsValidation, createSkillValidation, putSkillValidation, deleteSkillValidation } from "../validation/skillValidation.js"

const skillRouter = new Router({
  prefix: "/skills",
});

// GET /api/skills/
skillRouter.get("/", getSkillsValidation, getSkills)
// POST /api/skills/
skillRouter.post("/", jwtMiddleware, createSkillValidation, createSkill)
// // PUT /api/skills/:id
skillRouter.put("/:id", jwtMiddleware, putSkillValidation, putSkill)
// // DELETE /api/skills/:id
skillRouter.delete("/:id", jwtMiddleware, deleteSkillValidation, deleteSkill)

export default skillRouter;
