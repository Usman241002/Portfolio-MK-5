import Router from "koa-router";

const contactRouter = new Router({
  prefix: "/contact",
});

//POST /api/contact
contactRouter.post("/", handleContact);

export default contactRouter;
