import Router from "koa-router";
import { jwtMiddleware } from "../middleware/auth.js";

import { getProfile, patchProfile } from "../controllers/profileController.js"
import { getProfileValidation, patchProfileValidation } from "../validation/profileValidation.js"

const profileRouter = new Router({
  prefix: "/profile",
});

// GET /api/profile/
profileRouter.get("/", getProfileValidation, getProfile)
// PATCH /api/profile/
profileRouter.patch("/", patchProfileValidation, jwtMiddleware, patchProfile)

export default profileRouter;
