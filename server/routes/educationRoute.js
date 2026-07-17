import Router from "koa-router";
import { jwtMiddleware } from "../middleware/auth.js";

import { getAllEducation, createEducation, putEducation, deleteEducation } from "../controllers/educationController.js"
import { getAllEducationValidation, createEducationValidation, putEducationValidation, deleteEducationValidation } from "../validation/educationValidation.js"

const educationRouter = new Router({
  prefix: "/education",
});

// GET /api/education/
educationRouter.get("/", getAllEducationValidation, getAllEducation)
// POST /api/education/
educationRouter.post("/", createEducationValidation, jwtMiddleware, createEducation)
// PUT /api/education/:id
educationRouter.put("/:id", putEducationValidation, jwtMiddleware, putEducation)
// DELETE /api/education/:id
educationRouter.delete("/:id", deleteEducationValidation, jwtMiddleware, deleteEducation)

export default educationRouter;
