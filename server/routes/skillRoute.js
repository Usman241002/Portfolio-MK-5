import Router from "koa-router";
import { jwtMiddleware } from "../middleware/auth.js";

import { getSkills,
createSkill,
getSkill,
putSkill,
patchSkill,
deleteSkill } from "../controllers/skillController.js"

const skillRouter = new Router({
  prefix: "/skills",
});

// GET /api/skills/
skillRouter.get("/", getSkills)
// POST /api/skills/
skillRouter.post("/", createSkill)
// PATCH /api/skills/:id
skillRouter.patch("/:id", patchSkill)
// DELETE /api/skills/:id
skillRouter.delete("/:id", deleteSkill)

export default skillRouter;
