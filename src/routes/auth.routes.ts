import { Router } from "express";
const authRouter = Router();

authRouter.post("/sign-up", (req, res) => {
  res.json({ title: "Sign-up" });
});
authRouter.post("/sign-in", (req, res) => {
  res.json({ title: "Sign-in" });
});
authRouter.post("/logout", (req, res) => {
  res.json({ title: "logout" });
});

export default authRouter;
