import Router from "koa-router";
import { jwtMiddleware } from "../middleware/auth.js";

const contactRouter = new Router({
  prefix: "/contact",
});

//POST /api/contact
contactRouter.post("/", handleContact);

export default contactRouter;
