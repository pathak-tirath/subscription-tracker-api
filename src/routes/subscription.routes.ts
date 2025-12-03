import {
  cancelSubscription,
  deleteSubscription,
  getAllSubscriptions,
  getSubscription,
  postSubscription,
  upcomingSubscriptions,
  updateSubscription,
} from "@/controllers/subscription.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { subscriptionMiddleware } from "@/middlewares/subscription.middleware";
import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/all", authMiddleware, getAllSubscriptions);
subscriptionRouter.get(
  "/:id",
  authMiddleware,
  subscriptionMiddleware,
  getSubscription,
);
subscriptionRouter.post("/", authMiddleware, postSubscription);
subscriptionRouter.patch(
  "/:id",
  authMiddleware,
  subscriptionMiddleware,
  updateSubscription,
);
subscriptionRouter.delete(
  "/:id",
  authMiddleware,
  subscriptionMiddleware,
  deleteSubscription,
);

// ? For future admin requirements
// subscriptionRouter.get("/user/:id", (req, res) => {
//   res.json({ title: "GET all users subscription" });
// });

subscriptionRouter.patch(
  "/:id/cancel",
  authMiddleware,
  subscriptionMiddleware,
  cancelSubscription,
);
subscriptionRouter.get("/upcoming-renewals/:id",authMiddleware, upcomingSubscriptions);

export default subscriptionRouter;
