import { signIn, signOut, signUp } from "@/controllers/auth.controller";
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
  signIn,
);
authRouter.post("/logout", /* #swagger.tags = ['Auth'] */ signOut);

export default authRouter;
