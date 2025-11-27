import User from "@/models/user.model";
import logger from "@/utils/logger";
import { NextFunction, Request, Response } from "express";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      logger.info("No users found");
      return res.status(200).json({
        status: true,
        message: "No Users Found",
      });
    }
    return res.status(200).json({
      status: true,
      data: users.map((user) => ({
        userId: user._id,
        name: user.name,
        email: user.email,
      })),
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log(req.params)
    const { id } = req.params;

    const userById = await User.findById(id).select("-password");
    if (!userById) {
      logger.warn("No such user found");
      return res.status(400).json({
        success: false,
        message: "No such user found",
      });
    }

    return res.status(200).json({
      success: true,
      data: userById,
    });
  } catch (error) {
    next(error);
  }
};
