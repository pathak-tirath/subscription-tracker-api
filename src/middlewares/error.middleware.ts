import { IError } from "@/types/type";
import logger from "@/utils/logger";
import { ErrorRequestHandler } from "express";
import { Error } from "mongoose";

export const errorMessage: ErrorRequestHandler = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;
    logger.error(err);

    // Mongoose bad ObjectID
    if (err.name === "CastError") {
      const message = "Resource not found";
      error = new Error(message);
      error.statusCode = 404;
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
      const message = "Duplicate field value entered";
      error = new Error(message);
      error.statusCode = 400;
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors as IError[]).map(
        (val) => val && val?.message,
      );
      error = new Error(message.join(", "));
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server Error",
    });
  } catch (error) {
    next(error);
  }
};
