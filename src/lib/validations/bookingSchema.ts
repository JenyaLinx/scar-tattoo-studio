import { z } from "zod";

const phoneRegex = /^[+\d][\d\s()-]{7,19}$/;

export const bookingSchema = z.object({
  artist: z.string().min(1, "Please choose an artist"),

  date: z.string().min(1, "Please choose a date"),

  time: z.string().min(1, "Please choose a time"),

  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(phoneRegex, "Please enter a valid phone number"),

  message: z
    .string()
    .trim()
    .max(500, "Message cannot exceed 500 characters"),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;