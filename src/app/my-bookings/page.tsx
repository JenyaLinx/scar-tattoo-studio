import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import Header from "@/components/Header/Header";
import { getCurrentUser } from "@/services/auth/auth.server";
import {
  getCurrentUserBookings,
  type BookingStatus,
} from "@/services/bookings/bookings.server";
import { isBookingPast } from "@/lib/bookings/bookingTime";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "My Bookings | SCAR Tattoo Studio",
};

type MyBookingsPageProps = {
  searchParams: Promise<{
    filter?: string | string[];
  }>;
};

type ClientBookingFilter = "upcoming" | "past" | "cancelled";

const filters: {
  label: string;
  value: ClientBookingFilter;
}[] = [
  {
    label: "Upcoming",
    value: "upcoming",
  },
  {
    label: "Past",
    value: "past",
  },
  {
    label: "Cancelled",
    value: "cancelled",
  },
];

const statusLabels: Record<BookingStatus, string> = {
  pending: "Request sent",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
};

export default async function MyBookingsPage({
  searchParams,
}: MyBookingsPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const resolvedSearchParams = await searchParams;

  const requestedFilter =
    typeof resolvedSearchParams.filter === "string"
      ? resolvedSearchParams.filter
      : "upcoming";

  const activeFilter: ClientBookingFilter = filters.some(
    (filter) => filter.value === requestedFilter,
  )
    ? (requestedFilter as ClientBookingFilter)
    : "upcoming";

  const bookings = await getCurrentUserBookings();

  const filteredBookings = bookings.filter((booking) => {
    const isPast = isBookingPast(booking.booking_date, booking.booking_time);

    if (activeFilter === "cancelled") {
      return booking.status === "cancelled";
    }

    if (activeFilter === "past") {
      return isPast && booking.status !== "cancelled";
    }

    return !isPast && booking.status !== "cancelled";
  });

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.section}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>Client account</p>

          <h1 className={styles.title}>
            My
            <span>bookings.</span>
          </h1>

          <p className={styles.description}>
            View your consultation requests and upcoming tattoo appointments.
          </p>
        </div>

        <div className={styles.content}>
          {bookings.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyNumber}>00</span>

              <h2>No bookings yet.</h2>

              <p>When you request a consultation, it will appear here.</p>

              <Link className={styles.bookButton} href="/booking">
                Book consultation
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          ) : (
            <>
              <nav className={styles.filters} aria-label="Booking filters">
                {filters.map((filter) => (
                  <Link
                    className={`${styles.filterLink} ${
                      activeFilter === filter.value ? styles.filterActive : ""
                    }`}
                    href={
                      filter.value === "upcoming"
                        ? "/my-bookings"
                        : `/my-bookings?filter=${filter.value}`
                    }
                    key={filter.value}
                  >
                    {filter.label}
                  </Link>
                ))}
              </nav>

              {filteredBookings.length === 0 ? (
                <div className={styles.filterEmpty}>
                  <span>00</span>

                  <h2>No {activeFilter} bookings.</h2>

                  <p>Your bookings in this category will appear here.</p>
                </div>
              ) : (
                <div className={styles.list}>
                  {filteredBookings.map((booking, index) => {
                    const isPast = isBookingPast(
                      booking.booking_date,
                      booking.booking_time,
                    );

                    const displayPast =
                      isPast && booking.status !== "cancelled";

                    return (
                      <article className={styles.card} key={booking.id}>
                        <div className={styles.cardTop}>
                          <span className={styles.number}>
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <div className={styles.cardMeta}>
                            <span
                              className={`${styles.status} ${
                                displayPast
                                  ? styles.statusPast
                                  : styles[
                                      `status${booking.status
                                        .charAt(0)
                                        .toUpperCase()}${booking.status.slice(
                                        1,
                                      )}`
                                    ]
                              }`}
                            >
                              {displayPast
                                ? "Past"
                                : statusLabels[booking.status]}
                            </span>

                            <span className={styles.date}>
                              {booking.booking_date}
                            </span>
                          </div>
                        </div>

                        <div className={styles.cardContent}>
                          <div>
                            <p className={styles.artistLabel}>Tattoo artist</p>

                            <h2 className={styles.artistName}>
                              {booking.artist?.name ?? "SCAR Artist"}
                            </h2>

                            {booking.artist && (
                              <p className={styles.specialty}>
                                {booking.artist.specialty}
                              </p>
                            )}
                          </div>

                          <div className={styles.details}>
                            <div className={styles.detailRow}>
                              <span>Date</span>

                              <strong>{booking.booking_date}</strong>
                            </div>

                            <div className={styles.detailRow}>
                              <span>Time</span>

                              <strong>
                                {booking.booking_time.slice(0, 5)}
                              </strong>
                            </div>

                            <div className={styles.detailRow}>
                              <span>Phone</span>

                              <strong>{booking.phone}</strong>
                            </div>
                          </div>

                          {booking.message && (
                            <div className={styles.message}>
                              <p className={styles.messageLabel}>Message</p>

                              <p>{booking.message}</p>
                            </div>
                          )}

                          {booking.artist && (
                            <Link
                              className={styles.artistLink}
                              href={`/artists/${booking.artist.slug}`}
                            >
                              View artist
                              <span aria-hidden="true">→</span>
                            </Link>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
