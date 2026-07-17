import Koa from "koa";
import Router from "koa-router";
import koaBody from "koa-body";
import cors from "@koa/cors";
import dotenv from "dotenv";
import serve from "koa-static";
import fs from "fs";

import profileRouter from "./routes/profileRoute.js"
import projectRouter from "./routes/projectRoute.js"
import skillRouter from "./routes/skillRoute.js"
import educationRouter from "./routes/educationRoute.js"
import experienceRouter from "./routes/experienceRoute.js"
import authRouter from "./routes/authRoute.js"
import contactRouter from "./routes/contactRoute.js"

dotenv.config();

const uploadDir =
  process.env.NODE_ENV === "test"
    ? process.env.UPLOAD_TEST_DIR
    : process.env.UPLOAD_DIR;
// ensure folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const app = new Koa();

app.use(
  cors({
    origin: (ctx) => {
      // List of allowed domains
      const validOrigins = [
        "http://localhost:5173",
        "https://ukhalid.dev",
        "https://www.ukhalid.dev"
      ];

      const requestOrigin = ctx.request.header.origin;

      // If the request origin is in our allowed list, permit it
      if (validOrigins.includes(requestOrigin)) {
        return requestOrigin;
      }

      return validOrigins[0];
    },
    allowMethods: ["GET", "POST", "PUT", "DELETE", "PUT", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(
  koaBody({
    multipart: true,
    parsedMethods: ["POST", "PUT", "PUT", "DELETE"],
    formidable: {
      uploadDir: uploadDir, // folder where files will be saved
      keepExtensions: true, // keeps extensions
      multiples: true, // allows multiple images
    },
  }),
);

app.use(serve("uploads"));

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = { error: "Invalid or expired token" };
    } else {
      throw err;
    }
  }
});

const router = new Router({
  prefix: "/api",
});

router.use(profileRouter.routes())
router.use(projectRouter.routes())
router.use(skillRouter.routes())
router.use(educationRouter.routes())
router.use(experienceRouter.routes())
router.use(authRouter.routes())
router.use(contactRouter.routes())

app.use(router.routes());

export default app;
