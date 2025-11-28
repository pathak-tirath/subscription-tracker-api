import { aj } from "@/config/arcjet";
import { NODE_ENV } from "@/config/env";
import logger from "@/utils/logger";
import { ArcjetNodeRequest } from "@arcjet/node";
import { NextFunction, Response } from "express";

export const arcjetMiddleware = async (
  req: ArcjetNodeRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const decision = await aj.protect(req, { requested: 5 });

    logger.warn(decision)
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ message: "Rate Limit exceeded" });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Bots not allowed" });
      } else {
        return res.status(403).json({ message: "Forbidden" });
      }
    }

    next();
  } catch (error) {
    logger.error(`Arcjet Error : ${error}`);
    next(error);
  }
};
