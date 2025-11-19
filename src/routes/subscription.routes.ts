import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.json({ title: "GET all subscriptions" });
});
subscriptionRouter.get("/:id", (req, res) => {
  res.json({ title: "GET subscription details" });
});
subscriptionRouter.post("/", (req, res) => {
  res.json({ title: "POST subscription" });
});
subscriptionRouter.patch("/:id", (req, res) => {
  res.json({ title: "UPDATE subscription" });
});
subscriptionRouter.delete("/:id", (req, res) => {
  res.json({ title: "DELETE subscription" });
});

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
