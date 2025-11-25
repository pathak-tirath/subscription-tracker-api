import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const session = await mongoose.startSession();
  session.startTransaction(); //for atomic operations

  try {
    // Logic to create a new user

    const {email,password} = req.body;

 await session.commitTransaction();
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
  // Sign in logic here
};

export const signOut = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Sign out logic here
};
