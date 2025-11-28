import Subscription from "@/models/subscription.model";
import { IRequest } from "@/types/type";
import logger from "@/utils/logger";
import { NextFunction, Response } from "express";

export const postSubscription = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const subscription = { ...req.body, user: req.user!._id.toString() };
    if (!subscription) {
      logger.error("Error");
      return res.status(400).json({
        status: false,
        message: "No subscriptions found to be added",
      });
    }

    const subscriptionsData = await Subscription.create([ subscription ]);
    if (!subscriptionsData) {
      logger.error("Unable to add subscription");
      return res.status(500).json({
        status: false,
        message: "Unable to add the subscription data",
      });
    }
    return res.status(201).json({
      status: true,
      data: subscriptionsData,
    });
  } catch (error) {
    next(error);
  }
};
