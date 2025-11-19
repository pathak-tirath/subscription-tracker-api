import { Router } from "express";
const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.json({ title: " GET All Users" });
});
userRouter.get("/:id", (req, res) => {
  res.json({ title: " GET Single User" });
});
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
