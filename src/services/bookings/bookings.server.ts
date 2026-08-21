import { createClient } from "@/lib/supabase/server";

type BookingArtist = {
  id: number;
  name: string;
  slug: string;
  specialty: string;
};

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled";

type BookingRow = {
  id: number;
  user_id?: string;
  booking_date: string;
  booking_time: string;
  phone: string;
  message: string | null;
  status: BookingStatus;
  created_at: string | null;
  artist: BookingArtist | BookingArtist[] | null;
};

export type UserBooking = {
  id: number;
  booking_date: string;
  booking_time: string;
  phone: string;
  message: string | null;
  status: BookingStatus;
  created_at: string | null;
  artist: BookingArtist | null;
};

export type AdminBooking = UserBooking & {
  user_id: string;
};

export async function getCurrentUserBookings(): Promise<
  UserBooking[]
> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return [];
  }

  const { data, error } = await supabase
    .from("bookings")
    .select(`
      id,
      booking_date,
      booking_time,
      phone,
      message,
      status,
      created_at,
      artist:artists (
        id,
        name,
        slug,
        specialty
      )
    `)
    .eq("user_id", user.id)
    .order("booking_date", {
      ascending: true,
    })
    .order("booking_time", {
      ascending: true,
    });

  if (error) {
    throw new Error(
      `Failed to fetch bookings: ${error.message}`,
    );
  }

  const bookings = (data ?? []) as BookingRow[];

  return bookings.map((booking) => {
    const artist = Array.isArray(booking.artist)
      ? booking.artist[0] ?? null
      : booking.artist;

    return {
      id: booking.id,
      booking_date: booking.booking_date,
      booking_time: booking.booking_time,
      phone: booking.phone,
      message: booking.message,
      status: booking.status,
      created_at: booking.created_at,
      artist,
    };
  });
}

export async function getAllBookingsForAdmin(): Promise<
  AdminBooking[]
> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select(`
      id,
      user_id,
      booking_date,
      booking_time,
      phone,
      message,
      status,
      created_at,
      artist:artists (
        id,
        name,
        slug,
        specialty
      )
    `)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(
      `Failed to fetch admin bookings: ${error.message}`,
    );
  }

  const bookings = (data ?? []) as BookingRow[];

  return bookings.map((booking) => {
    const artist = Array.isArray(booking.artist)
      ? booking.artist[0] ?? null
      : booking.artist;

    return {
      id: booking.id,
      user_id: booking.user_id ?? "",
      booking_date: booking.booking_date,
      booking_time: booking.booking_time,
      phone: booking.phone,
      message: booking.message,
      status: booking.status,
      created_at: booking.created_at,
      artist,
    };
  });
}