import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().trim().min(2).max(50),
  email: z.string().trim().email().max(254),
  password: z.string().min(6),
});

export const signInSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(1),
});

export const subscriptionSchema = z.object({
  name: z.string().trim().min(2).max(50),
  price: z.coerce.number().nonnegative(),
  currency: z.enum(["INR", "USD", "EUR", "GBP"]).default("INR"),
  frequency: z.enum(["daily", "weekly", "monthly", "yearly"]),
  category: z.enum([
    "sports", "news", "entertainment", "lifestyle", "technology", "finance", "other",
  ]),
  paymentMethod: z.string().trim().min(1),
  status: z.enum(["active", "cancelled", "expired", "paused"]).optional(),
  startDate: z.coerce.date().max(new Date(), "Start date must be in the past"),
  renewalDate: z.coerce.date().optional(),
});

export const subscriptionUpdateSchema = subscriptionSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "At least one field is required",
);

export const subscriptionStatusSchema = z.object({
  status: z.enum(["active", "cancelled", "expired", "paused"]),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type SubscriptionInput = z.infer<typeof subscriptionSchema>;
