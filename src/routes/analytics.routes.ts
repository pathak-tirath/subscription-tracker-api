import {
  getMonthlyExpenses,
  getSpendByCategory,
} from "@/controllers/analytics.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";

const analyticsRouter = Router();

analyticsRouter.get("/monthlyExpenses", authMiddleware, getMonthlyExpenses);
analyticsRouter.get("/spendByCategory", authMiddleware, getSpendByCategory);

export default analyticsRouter;
