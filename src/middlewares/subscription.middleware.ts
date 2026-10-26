import Subscription from "@/models/subscription.model";
import { IRequest } from "@/types/type";
import logger from "@/utils/logger";
import { NextFunction, Response } from "express";

export const subscriptionMiddleware = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    logger.warn(`warn:- ${id} ${userId}`)
    const subscription = await Subscription.findById(id);
    if (!subscription) {
      return res.status(404).json({ success: false, message: "Subscription not found" });
    }
    if (subscription.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    req.subscription = subscription;
    return next();
  } catch (error) {
    logger.error("Errrrrrrr")
    return next(error);
  }
};
