import Subscription from "@/models/subscription.model";
import { IRequest } from "@/types/type";
import logger from "@/utils/logger";
import { NextFunction, Response } from "express";

export const getAllSubscriptions = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const subscriptions = await Subscription.find({}).select("-user");
    if (subscriptions.length === 0) {
      return res.status(200).json({
        status: false,
        message: "No subscriptions found",
      });
    }
    return res.status(200).json(subscriptions);
  } catch (error) {
    next(error);
  }
};

export const getSubscription = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const subscription = await Subscription.findById(id).select("-user");
    if (!subscription) {
      return res.status(200).json({
        status: false,
        message: "No subscription found",
      });
    }
    return res.status(200).json(subscription);
  } catch (error) {
    next(error);
  }
};

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

    const subscriptionsData = await Subscription.create([subscription]);
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

export const updateSubscription = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const subscriptionId = req.params.id;
    const dataToUpdate = req.body;

    const subscriptionData = await Subscription.findByIdAndUpdate(
      subscriptionId,
      dataToUpdate,
      { returnDocument: "after" },
    );
    if (!subscriptionData) {
      return res.status(400).json({
        success: false,
        message: "No data to update",
      });
    }

    return res.status(200).json({
      status: true,
      data: subscriptionData,
    });
  } catch (error) {
    logger.error("Something went wrong");
    next(error);
  }
};

export const deleteSubscription = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const subscriptionId = req.params.id;
    if (!subscriptionId) {
      return res.status(400).json({
        status: false,
        messsage: "No ID found to be deleted",
      });
    }

    const subscriptionToBeDeleted =
      await Subscription.findByIdAndDelete(subscriptionId);
    if (!subscriptionToBeDeleted) {
      return res.status(500).json({
        status: false,
        message: "Error! Deleting the subscription",
      });
    }

    res.status(204).json({
      success: true,
      message: "Subscription is deleted successfully",
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
