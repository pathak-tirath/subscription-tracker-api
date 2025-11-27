import ms from "ms";
import User from "@/models/user.model";
import logger from "@/utils/logger";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { JWT_EXPIRE, JWT_SECRET } from "@/config/env";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      await session.abortTransaction();
      session.endSession();
      logger.error("Email already in use");
      return res.status(409).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create(
      [
        {
          name,
          email,
          password: hashedPassword,
        },
      ],
      { session },
    );

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    // Generate token
    const token = jwt.sign({ id: newUser[0]!._id }, JWT_SECRET!, {
      expiresIn: JWT_EXPIRE as ms.StringValue,
    });

    // Send response
    return res.status(201).json({
      status: true,
      message: "User created successfully",
      data: {
        token,
        user: {
          id: newUser[0]!._id,
          name: newUser[0]!.name,
          email: newUser[0]!.email,
        },
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    // Check if values are being passed from client
    if (!email || !password) {
      logger.error("Please fill all the required fields");
      return res.status(400).json({
        status: false,
        message: "Required values are not present",
      });
    }

    // Check DB present
    const user = await User.findOne({ email });
    if (!user) {
      logger.error("Requested email is not found");
      return res.status(400).json({
        status: false,
        message: "Requested email is not found",
      });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      logger.error("Credentials invalid!");
      return res.status(400).json({
        status: false,
        message: "Credentials invalid! Please check",
      });
    }

    const token = jwt.sign(
      {
        id: user._id!,
      },
      JWT_SECRET!,
      { expiresIn: JWT_EXPIRE as ms.StringValue },
    );

    // Sign-in
    return res.status(200).json({
      status: true,
      message: "User logged in successfully",
      data: {
        user: user.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Sign out logic here

};
