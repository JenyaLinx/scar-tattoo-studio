import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .refine(
    (value) => {
      if (!value) {
        return true;
      }

      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    {
      message: "Please enter a valid URL",
    },
  );

export const artistAdminSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(80, "Name cannot exceed 80 characters"),

  specialty: z
    .string()
    .trim()
    .min(
      2,
      "Specialty must contain at least 2 characters",
    )
    .max(
      80,
      "Specialty cannot exceed 80 characters",
    ),

  experience: z
    .string()
    .trim()
    .max(
      150,
      "Experience cannot exceed 150 characters",
    ),

  description: z
    .string()
    .trim()
    .max(
      500,
      "Description cannot exceed 500 characters",
    ),

  biography: z
    .string()
    .trim()
    .max(
      2000,
      "Biography cannot exceed 2000 characters",
    ),

  instagramUrl: optionalUrl,
  tiktokUrl: optionalUrl,
  facebookUrl: optionalUrl,

  isActive: z.boolean(),
});

export type ArtistAdminFormValues = z.infer<
  typeof artistAdminSchema
>;