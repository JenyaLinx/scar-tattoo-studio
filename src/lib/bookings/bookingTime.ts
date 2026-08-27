export function isBookingPast(
  bookingDate: string,
  bookingTime: string,
) {
  const formatter = new Intl.DateTimeFormat(
    "en-GB",
    {
      timeZone: "Europe/London",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    },
  );

  const parts = formatter.formatToParts(
    new Date(),
  );

  const getPart = (type: string) =>
    parts.find((part) => part.type === type)
      ?.value ?? "";

  const currentDate = `${getPart(
    "year",
  )}-${getPart("month")}-${getPart("day")}`;

  const currentTime = `${getPart(
    "hour",
  )}:${getPart("minute")}`;

  const currentDateTime =
    `${currentDate}T${currentTime}`;

  const bookingDateTime =
    `${bookingDate}T${bookingTime.slice(0, 5)}`;

  return bookingDateTime < currentDateTime;
}