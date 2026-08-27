import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header/Header";
import { requireAdmin } from "@/services/auth/admin.server";
import {
  getAllBookingsForAdmin,
  type BookingStatus,
} from "@/services/bookings/bookings.server";
import { isBookingPast } from "@/lib/bookings/bookingTime";
import { updateBookingStatus } from "./actions";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Manage Bookings | SCAR Tattoo Studio",
};

type AdminBookingsPageProps = {
  searchParams: Promise<{
    filter?: string | string[];
  }>;
};

type BookingFilter = "all" | "pending" | "confirmed" | "past" | "cancelled";

const filters: {
  label: string;
  value: BookingFilter;
}[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Request sent",
    value: "pending",
  },
  {
    label: "Confirmed",
    value: "confirmed",
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

export default async function AdminBookingsPage({
  searchParams,
}: AdminBookingsPageProps) {
  await requireAdmin();

  const resolvedSearchParams = await searchParams;

  const requestedFilter =
    typeof resolvedSearchParams.filter === "string"
      ? resolvedSearchParams.filter
      : "all";

  const activeFilter: BookingFilter = filters.some(
    (filter) => filter.value === requestedFilter,
  )
    ? (requestedFilter as BookingFilter)
    : "all";

  const bookings = await getAllBookingsForAdmin();

  const filteredBookings = bookings.filter((booking) => {
    const isPast = isBookingPast(booking.booking_date, booking.booking_time);

    if (activeFilter === "all") {
      return true;
    }

    if (activeFilter === "cancelled") {
      return booking.status === "cancelled";
    }

    if (activeFilter === "past") {
      return isPast && booking.status !== "cancelled";
    }

    if (activeFilter === "pending") {
      return booking.status === "pending" && !isPast;
    }

    if (activeFilter === "confirmed") {
      return booking.status === "confirmed" && !isPast;
    }

    return true;
  });

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.section}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>Administration</p>

          <h1 className={styles.title}>
            Manage
            <span>bookings.</span>
          </h1>

          <p className={styles.description}>
            Review consultation requests and manage their current status.
          </p>
        </div>

        <div className={styles.content}>
          <nav className={styles.filters} aria-label="Booking filters">
            {filters.map((filter) => (
              <Link
                className={`${styles.filterLink} ${
                  activeFilter === filter.value ? styles.filterActive : ""
                }`}
                href={
                  filter.value === "all"
                    ? "/admin/bookings"
                    : `/admin/bookings?filter=${filter.value}`
                }
                key={filter.value}
              >
                {filter.label}
              </Link>
            ))}
          </nav>

          {filteredBookings.length === 0 ? (
            <div className={styles.empty}>
              <span>00</span>

              <h2>No booking requests.</h2>

              <p>There are no bookings in this category.</p>
            </div>
          ) : (
            <div className={styles.list}>
              {filteredBookings.map((booking, index) => {
                const isPast = isBookingPast(
                  booking.booking_date,
                  booking.booking_time,
                );

                const displayPast = isPast && booking.status !== "cancelled";

                return (
                  <article className={styles.card} key={booking.id}>
                    <div className={styles.cardTop}>
                      <span className={styles.number}>
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span
                        className={`${styles.status} ${
                          displayPast
                            ? styles.past
                            : booking.status === "pending"
                              ? styles.pending
                              : booking.status === "confirmed"
                                ? styles.confirmed
                                : styles.cancelled
                        }`}
                      >
                        {displayPast ? "Past" : statusLabels[booking.status]}
                      </span>
                    </div>

                    <div className={styles.client}>
                      <p className={styles.label}>Client</p>

                      <h2 className={styles.clientName}>
                        {booking.client?.full_name ?? "SCAR Client"}
                      </h2>

                      <p className={styles.clientEmail}>
                        {booking.client?.email ?? "Email unavailable"}
                      </p>
                    </div>

                    <div className={styles.artist}>
                      <p className={styles.label}>Tattoo artist</p>

                      <h2>{booking.artist?.name ?? "SCAR Artist"}</h2>

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

                        <strong>{booking.booking_time.slice(0, 5)}</strong>
                      </div>

                      <div className={styles.detailRow}>
                        <span>Phone</span>

                        <strong>{booking.phone}</strong>
                      </div>
                    </div>

                    {booking.message && (
                      <div className={styles.message}>
                        <p className={styles.label}>Message</p>

                        <p>{booking.message}</p>
                      </div>
                    )}

                    {!displayPast && (
                      <div className={styles.actions}>
                        {booking.status !== "confirmed" && (
                          <form
                            action={updateBookingStatus.bind(
                              null,
                              booking.id,
                              "confirmed",
                            )}
                          >
                            <button
                              className={styles.confirmButton}
                              type="submit"
                            >
                              Confirm
                              <span aria-hidden="true">→</span>
                            </button>
                          </form>
                        )}

                        {booking.status !== "cancelled" && (
                          <form
                            action={updateBookingStatus.bind(
                              null,
                              booking.id,
                              "cancelled",
                            )}
                          >
                            <button
                              className={styles.cancelButton}
                              type="submit"
                            >
                              Cancel
                            </button>
                          </form>
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
