import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import type { UserDocument } from "@/models/user.model";
import type { SubscriptionDocument } from "@/models/subscription.model";

export interface IFrequency {
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
}

export interface IError {
  message: string;
  statusCode?: number;
}

export interface IEnv {
  PORT?: string;
  NODE_ENV?: string;
  MONGO_URI?: string;
  LOGGER_LEVEL?: string;
  SALT?: string;
  JWT_SECRET?: string;
  JWT_EXPIRE?: string;
  ARCJET_KEY?: string;
}

// Custom error interface
export interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  errors?: unknown;
}

export interface IJwt extends JwtPayload {
  id?: string;
}

export interface IRequest extends Request {
  user?: UserDocument;
  subscription?: SubscriptionDocument;
}

export interface IAuthenticatedRequest extends Request {
  user?: UserDocument;
  subscription?: SubscriptionDocument;
}

export interface IUserRequest extends IAuthenticatedRequest {}

export const requireAuthenticatedUser = (req: IAuthenticatedRequest): UserDocument => {
  if (!req.user) throw new Error("Authenticated user missing after auth middleware");
  return req.user;
};

