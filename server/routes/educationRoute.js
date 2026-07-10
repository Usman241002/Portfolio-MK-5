import Router from "koa-router";
import { jwtMiddleware } from "../middleware/auth.js";

import { getAllEducation, createEducation, patchEducation, deleteEducation } from "../controllers/educationController.js"
import { getAllEducationValidation, createEducationValidation, patchEducationValidation, deleteEducationValidation } from "../validation/educationValidation.js"

const educationRouter = new Router({
  prefix: "/education",
});

// GET /api/education/
educationRouter.get("/", getAllEducationValidation, getAllEducation)
// POST /api/education/
educationRouter.post("/", createEducationValidation, jwtMiddleware, createEducation)
// PATCH /api/education/:id
educationRouter.patch("/:id", patchEducationValidation, jwtMiddleware, patchEducation)
// DELETE /api/education/:id
educationRouter.delete("/:id", deleteEducationValidation, jwtMiddleware, deleteEducation)

export default educationRouter;
