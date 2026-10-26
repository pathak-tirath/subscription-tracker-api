import { JWT_SECRET } from "@/config/env";
import User from "@/models/user.model";
import { IRequest } from "@/types/type";
import logger from "@/utils/logger";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    
    // TODO: Implement access and refresh token. Also token whitelisting and blacklisting.
    const token: unknown = req.cookies?.token;
    if (typeof token !== "string") {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string" || typeof decoded.id !== "string") {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      logger.warn("Unauthorized");
      return res.status(401).json({
        status: false,
        message: "Unauthorized",  
      });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized!",
    });
  }
};
