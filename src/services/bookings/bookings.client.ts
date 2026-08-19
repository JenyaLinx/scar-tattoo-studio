import { createClient } from "@/lib/supabase/client";

type CreateBookingData = {
  artistId: number;
  bookingDate: string;
  bookingTime: string;
  phone: string;
  message?: string;
};

export async function createBooking({
  artistId,
  bookingDate,
  bookingTime,
  phone,
  message,
}: CreateBookingData) {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be signed in to book a consultation.");
  }

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      user_id: user.id,
      artist_id: artistId,
      booking_date: bookingDate,
      booking_time: bookingTime,
      phone: phone.trim(),
      message: message?.trim() || null,
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}