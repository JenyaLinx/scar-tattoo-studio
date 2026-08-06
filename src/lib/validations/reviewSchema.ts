import { z } from "zod";

export const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Please choose a rating")
    .max(5, "Rating cannot be higher than 5"),

  comment: z
    .string()
    .trim()
    .min(20, "Review must contain at least 20 characters")
    .max(600, "Review cannot exceed 600 characters"),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;