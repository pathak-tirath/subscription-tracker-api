import { FilterPeriod } from "@/enum/enum";
import Subscription from "@/models/subscription.model";

import { IRequest } from "@/types/type";
import { NextFunction, Response } from "express";

export const getMonthlyExpenses = async (
  req: IRequest,
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
          user: req.user!._id,
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

    console.log(result);

    return res.status(200).json({ message: period });
  } catch (error) {
    next(error);
  }
};
