import { CustomError, IError } from "@/types/type";
import logger from "@/utils/logger";
import { ErrorRequestHandler } from "express";

// Custom error interface


export const errorMessage: ErrorRequestHandler = (err: CustomError, req, res, next) => {
  try {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Server Error";

    logger.error(err);

    // Mongoose bad ObjectID
    if (err.name === "CastError") {
      statusCode = 404;
      message = "Resource not found";
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
      statusCode = 400;
      message = "Duplicate field value entered";
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
      statusCode = 400;
      const messages = Object.values(err.errors as IError[]).map(
        (val) => val?.message
      );
      message = messages.join(", ");
    }

    res.status(statusCode).json({
      success: false,
      error: message,
    });
  } catch (error) {
    // Fallback error response
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};