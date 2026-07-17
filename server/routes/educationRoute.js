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
educationRouter.post("/", jwtMiddleware, createEducationValidation, createEducation)
// PUT /api/education/:id
educationRouter.put("/:id", jwtMiddleware, putEducationValidation, putEducation)
// DELETE /api/education/:id
educationRouter.delete("/:id", jwtMiddleware, deleteEducationValidation, deleteEducation)

export default educationRouter;
