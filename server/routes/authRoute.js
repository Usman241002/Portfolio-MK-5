import Router from "koa-router";
import { jwtMiddleware } from "../middleware/auth.js";

const authRouter = new Router({
  prefix: "/auth",
});

//POST /api/auth/verify
authRouter.post("/verify", jwtMiddleware, (ctx) => {
  ctx.status = 200;
  ctx.body = {};
});

//POST /api/auth/login
authRouter.post("/login", loginUser);

export default authRouter;
