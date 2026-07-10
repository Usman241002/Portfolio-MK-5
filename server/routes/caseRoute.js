import Router from "koa-router";
import { jwtMiddleware } from "../middleware/auth.js";

import { getCases,
createCase,
getCase,
putCase,
patchCase,
deleteCase } from "../controllers/caseController.js"

const caseRouter = new Router({
  prefix: "/cases",
});

// GET /api/cases/:id
caseRouter.get("/", getCases)
// POST /api/cases/:id
caseRouter.post("/", createCase)
// GET /api/cases/:id
caseRouter.get("/:id", getCase)
// PATCH /api/cases/:id
caseRouter.patch("/:id", patchCase)
// DELETE /api/cases/:id
caseRouter.delete("/:id", deleteCase)

export default caseRouter;
