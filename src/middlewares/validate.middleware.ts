import type { RequestHandler } from "express";
import type { ZodType } from "zod";

export const validateBody = <T>(schema: ZodType<T>): RequestHandler =>
  (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid request body",
        errors: result.error.flatten().fieldErrors,
      });
    }
    req.body = result.data;
    return next();
  };
