import Subscription from "@/models/subscription.model";
import { IRequest } from "@/types/type";
import logger from "@/utils/logger";
import { NextFunction, Response } from "express";
import mongoose from "mongoose";

export const subscriptionMiddleware = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const userId = req.user!._id;

    logger.warn(`warn:- ${id} ${userId}`)
    const subscription = await Subscription.findById(id);
    if (subscription!.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    req.subscription = subscription as mongoose.Document;
    next();
  } catch (error) {
    logger.error("Errrrrrrr")
    next(error);
  }
};
