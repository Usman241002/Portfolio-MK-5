import Router from "koa-router";
import { jwtMiddleware } from "../middleware/auth.js";

import { getAllEducation,
createEducation,
getEducation,
putEducation,
patchEducation,
deleteEducation } from "../controllers/educationController.js"

const educationRouter = new Router({
  prefix: "/education",
});

// GET /api/education/
educationRouter.get("/", getAllEducation)
// POST /api/education/
educationRouter.post("/", createEducation)
// PATCH /api/education/:id
educationRouter.patch("/:id", patchEducation)
// DELETE /api/education/:id
educationRouter.delete("/:id", deleteEducation)

export default educationRouter;
