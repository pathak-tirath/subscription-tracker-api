import { FilterPeriod } from "@/enum/enum";
import Subscription from "@/models/subscription.model";

import { IAuthenticatedRequest, requireAuthenticatedUser } from "@/types/type";
import { NextFunction, Response } from "express";

export const getMonthlyExpenses = async (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const period = req.query?.period;
    let startDate = new Date();

    switch (period) {
      case FilterPeriod["1m"]:
        startDate.setMonth(startDate.getMonth() - 1);
        break;

      case FilterPeriod["6m"]:
        startDate.setMonth(startDate.getMonth() - 6);
        break;

      case FilterPeriod["1y"]:
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;

      default:
        startDate = new Date(0);
    }

    const result = await Subscription.aggregate([
      {
        $match: {
          user: requireAuthenticatedUser(req)._id,
          createdAt: {
            $gte: startDate,
          },
        },
      },
      {
        $project: {
          user: 0,
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalAmount: { $sum: "$price" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    return res.status(200).json({ message: result });
  } catch (error) {
    return next(error);
  }
};

export const getSpendByCategory = async (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const period = req.query?.period;
    let startDate = new Date();

    switch (period) {
      case FilterPeriod["1m"]:
        startDate.setMonth(startDate.getMonth() - 1);
        break;

      case FilterPeriod["6m"]:
        startDate.setMonth(startDate.getMonth() - 6);
        break;

      case FilterPeriod["1y"]:
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;

      default:
        startDate = new Date(0);
    }

    const result = await Subscription.aggregate([
      {
        $match: {
          user: requireAuthenticatedUser(req)._id,
          createdAt: {
            $gte: startDate,
          },
        },
      },
      {
        $project: {
          user: 0,
        },
      },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$price" },
        },
      },
  
    ]);

    return res.status(200).json({ message: result });
  } catch (error) {
    return next(error);
  }
};


