import { z } from "zod";

const phoneRegex =
  /^$|^[+\d][\d\s()-]{7,19}$/;

export const profileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(60, "Name cannot exceed 60 characters"),

  phone: z
    .string()
    .trim()
    .regex(
      phoneRegex,
      "Please enter a valid phone number",
    ),
});

export type ProfileFormValues = z.infer<
  typeof profileSchema
>;