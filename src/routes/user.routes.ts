import { getUserById, getUsers } from "@/controllers/user.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";
const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id",authMiddleware,getUserById);
userRouter.post("/", (req, res) => {
  res.json({ title: " POST a User" });
});
userRouter.patch("/:id", (req, res) => {
  res.json({ title: " Update a User" });
});
userRouter.delete("/", (req, res) => {
  res.json({ title: " DELETE a user" });
});

export default userRouter;
