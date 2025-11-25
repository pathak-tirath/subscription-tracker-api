import { signIn, signOut, signUp } from "@/controllers/auth.controller";
import { Router } from "express";
const authRouter = Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/logout", signOut);

export default authRouter;
