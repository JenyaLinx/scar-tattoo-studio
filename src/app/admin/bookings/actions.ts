"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/services/profile/profile.server";
import type { BookingStatus } from "@/services/bookings/bookings.server";

const allowedStatuses: BookingStatus[] = [
  "confirmed",
  "cancelled",
];

export async function updateBookingStatus(
  bookingId: number,
  status: BookingStatus,
) {
  if (!allowedStatuses.includes(status)) {
    throw new Error("Invalid booking status.");
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be signed in.");
  }

  const profile = await getProfile(user.id);

  if (profile?.role !== "admin") {
    throw new Error("You are not authorized.");
  }

  const { error } = await supabase
    .from("bookings")
    .update({
      status,
    })
    .eq("id", bookingId);

  if (error) {
    throw new Error(
      `Failed to update booking: ${error.message}`,
    );
  }

  revalidatePath("/admin/bookings");
  revalidatePath("/my-bookings");
}