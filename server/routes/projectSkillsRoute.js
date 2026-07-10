import Router from "koa-router";
import { jwtMiddleware } from "../middleware/auth.js";

import { getProjectSkills,
createProjectSkill,
getProjectSkill,
putProjectSkill,
patchProjectSkill,
deleteProjectSkill } from "../controllers/projectSkillController.js"

const projectSkillRouter = new Router({
  prefix: "/projectSkills",
});

// GET /api/projectSkills/:id
projectSkillRouter.get("/", getProjectSkills)
// POST /api/projectSkills/:id
projectSkillRouter.post("/", createProjectSkill)
// GET /api/projectSkills/:id
projectSkillRouter.get("/:id", getProjectSkill)
// PATCH /api/projectSkills/:id
projectSkillRouter.patch("/:id", patchProjectSkill)
// DELETE /api/projectSkills/:id
projectSkillRouter.delete("/:id", deleteProjectSkill)

export default projectSkillRouter;
