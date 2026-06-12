import { getMonthlyExpenses } from "@/controllers/analytics.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";

const analyticsRouter = Router();

analyticsRouter.get("/monthlyExpenses", authMiddleware, getMonthlyExpenses)

export default analyticsRouter