import { getCurrentUser, signIn, signUp } from "@/controllers/auth.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { validateBody } from "@/middlewares/validate.middleware";
import { signInSchema, signUpSchema } from "@/validation/schemas";
import { Router } from "express";
const authRouter = Router();

authRouter.post(
  "/sign-up" /* #swagger.tags = ['Auth'] */,
  /*  #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123'
          }
    } */
  validateBody(signUpSchema),
  signUp,
);
authRouter.post(
  "/sign-in" /* #swagger.tags = ['Auth'] */,
  /*  #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          schema: {
            email: 'john@example.com',
            password: 'password123'
          }
    } */
  validateBody(signInSchema),
  signIn,
);
authRouter.get("/me", authMiddleware,getCurrentUser)

export default authRouter;
