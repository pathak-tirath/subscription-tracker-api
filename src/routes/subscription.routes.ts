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

subscriptionRouter.get("/all", authMiddleware, /* #swagger.tags = ['Subscriptions'] */ getAllSubscriptions);
subscriptionRouter.get(
  "/:id",
  authMiddleware,
  subscriptionMiddleware,
  /* #swagger.tags = ['Subscriptions'] */
  getSubscription,
);
subscriptionRouter.post("/", authMiddleware, /* #swagger.tags = ['Subscriptions'] */
  /*  #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          name: 'Netflix',
          price: 199,
          currency: 'INR',
          frequency: 'monthly',
          category: 'entertainment',
          paymentMethod: 'Credit Card',
          startDate: '2025-01-01'
        }
  } */
  postSubscription);
subscriptionRouter.patch(
  "/:id",
  authMiddleware,
  subscriptionMiddleware,
  /* #swagger.tags = ['Subscriptions'] */
  /*  #swagger.parameters['body'] = {
        in: 'body',
        required: false,
        schema: {
          name: 'Netflix Premium',
          price: 249
        }
  } */
  updateSubscription,
);
subscriptionRouter.delete(
  "/:id",
  authMiddleware,
  subscriptionMiddleware,
  /* #swagger.tags = ['Subscriptions'] */
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
  /* #swagger.tags = ['Subscriptions'] */
  cancelSubscription,
);
subscriptionRouter.get("/upcoming-renewals/:id", authMiddleware, /* #swagger.tags = ['Subscriptions'] */ upcomingSubscriptions);

export default subscriptionRouter;
