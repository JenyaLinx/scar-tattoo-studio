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
  const response = await fetch("/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      artistId,
      bookingDate,
      bookingTime,
      phone,
      message,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to create booking.",
    );
  }

  return data.booking;
}