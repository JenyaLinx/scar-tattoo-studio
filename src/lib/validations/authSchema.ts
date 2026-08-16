import { z } from "zod";

export const signUpSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Name must contain at least 2 characters")
      .max(60, "Name cannot exceed 60 characters"),

    email: z
      .string()
      .trim()
      .email("Please enter a valid email address"),

    password: z
      .string()
      .min(8, "Password must contain at least 8 characters"),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine(
    (values) => values.password === values.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),

  password: z.string().min(1, "Password is required"),
});

export type SignUpFormValues = z.infer<
  typeof signUpSchema
>;

export type SignInFormValues = z.infer<
  typeof signInSchema
>;