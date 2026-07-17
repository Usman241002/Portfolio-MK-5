import Router from "koa-router";
import { jwtMiddleware } from "../middleware/auth.js";

import { getProfile, putProfile } from "../controllers/profileController.js"
import { getProfileValidation, putProfileValidation } from "../validation/profileValidation.js"

const profileRouter = new Router({
  prefix: "/profile",
});

// GET /api/profile/
profileRouter.get("/", getProfileValidation, getProfile)
// PUT /api/profile/
profileRouter.put("/", jwtMiddleware, putProfileValidation, putProfile)

export default profileRouter;
