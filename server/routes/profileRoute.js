import Router from "koa-router";
import { jwtMiddleware } from "../middleware/auth.js";

import { getProfiles,
createProfile,
getProfile,
putProfile,
patchProfile,
deleteProfile } from "../controllers/profileController.js"

const profileRouter = new Router({
  prefix: "/profile",
});

// GET /api/profile/
profileRouter.get("/", getProfile)
// PATCH /api/profile/
profileRouter.patch("/", patchProfile)

export default profileRouter;
