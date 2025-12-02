import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import { PORT } from "@/config/env";
import authRouter from "@/routes/auth.routes";
import userRouter from "./routes/user.routes";
import subscriptionRouter from "./routes/subscription.routes";
import logger from "@/utils/logger";
import { connectToDB } from "@/database/db";
import { errorMessage } from "@/middlewares/error.middleware";
import { arcjetMiddleware } from "@/middlewares/arcjet.middleware";

const app = express();

// * Helmet security middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(arcjetMiddleware)

// Routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users",userRouter);
app.use("/api/v1/subscription", subscriptionRouter);

// middlewares
app.use(errorMessage);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Subscription Tracking API");
});

app.listen(PORT, async () => {
  try {
    await connectToDB();
    logger.info(`Server listening on port:- ${PORT}`);
  } catch (error) {
    logger.error(`Error starting the server:- ${error}`);
  }
});
