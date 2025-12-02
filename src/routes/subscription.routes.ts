import {
  deleteSubscription,
  getAllSubscriptions,
  getSubscription,
  postSubscription,
  updateSubscription,
} from "@/controllers/subscription.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/all", authMiddleware, getAllSubscriptions);
subscriptionRouter.get("/:id", authMiddleware, getSubscription);
subscriptionRouter.post("/", authMiddleware, postSubscription);
subscriptionRouter.patch("/:id", authMiddleware, updateSubscription);
subscriptionRouter.delete("/:id",authMiddleware, deleteSubscription);

subscriptionRouter.get("/user/:id", (req, res) => {
  res.json({ title: "GET all users subscription" });
});

subscriptionRouter.patch("/:id/cancel", (req, res) => {
  res.json({ title: "Cancel a subscription" });
});
subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.json({ title: "GET upcoming renewals " });
});

export default subscriptionRouter;
