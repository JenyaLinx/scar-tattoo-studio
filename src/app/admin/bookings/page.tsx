import type { Metadata } from "next";

import Header from "@/components/Header/Header";
import { requireAdmin } from "@/services/auth/admin.server";
import { getAllBookingsForAdmin } from "@/services/bookings/bookings.server";
import { updateBookingStatus } from "./actions";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Manage Bookings | SCAR Tattoo Studio",
};

export default async function AdminBookingsPage() {
  await requireAdmin();

  const bookings = await getAllBookingsForAdmin();

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.section}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>
            Administration
          </p>

          <h1 className={styles.title}>
            Manage
            <span>bookings.</span>
          </h1>

          <p className={styles.description}>
            Review consultation requests and manage
            their current status.
          </p>
        </div>

        <div className={styles.content}>
          {bookings.length === 0 ? (
            <div className={styles.empty}>
              <span>00</span>

              <h2>No booking requests.</h2>

              <p>
                New consultation requests will appear
                here.
              </p>
            </div>
          ) : (
            <div className={styles.list}>
              {bookings.map((booking, index) => (
                <article
                  className={styles.card}
                  key={booking.id}
                >
                  <div className={styles.cardTop}>
                    <span className={styles.number}>
                      {String(index + 1).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <span
                      className={`${styles.status} ${
                        booking.status === "pending"
                          ? styles.pending
                          : booking.status ===
                              "confirmed"
                            ? styles.confirmed
                            : styles.cancelled
                      }`}
                    >
                      {booking.status === "pending"
                        ? "Request sent"
                        : booking.status ===
                            "confirmed"
                          ? "Confirmed"
                          : "Cancelled"}
                    </span>
                  </div>

                  <div className={styles.client}>
                    <p className={styles.label}>
                      Client
                    </p>

                    <h2 className={styles.clientName}>
                      {booking.client?.full_name ??
                        "SCAR Client"}
                    </h2>

                    <p className={styles.clientEmail}>
                      {booking.client?.email ??
                        "Email unavailable"}
                    </p>
                  </div>

                  <div className={styles.artist}>
                    <p className={styles.label}>
                      Tattoo artist
                    </p>

                    <h2>
                      {booking.artist?.name ??
                        "SCAR Artist"}
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

                      <strong>
                        {booking.booking_date}
                      </strong>
                    </div>

                    <div className={styles.detailRow}>
                      <span>Time</span>

                      <strong>
                        {booking.booking_time.slice(
                          0,
                          5,
                        )}
                      </strong>
                    </div>

                    <div className={styles.detailRow}>
                      <span>Phone</span>

                      <strong>{booking.phone}</strong>
                    </div>
                  </div>

                  {booking.message && (
                    <div className={styles.message}>
                      <p className={styles.label}>
                        Message
                      </p>

                      <p>{booking.message}</p>
                    </div>
                  )}

                  <div className={styles.actions}>
                    {booking.status !==
                      "confirmed" && (
                      <form
                        action={updateBookingStatus.bind(
                          null,
                          booking.id,
                          "confirmed",
                        )}
                      >
                        <button
                          className={
                            styles.confirmButton
                          }
                          type="submit"
                        >
                          Confirm
                          <span aria-hidden="true">
                            →
                          </span>
                        </button>
                      </form>
                    )}

                    {booking.status !==
                      "cancelled" && (
                      <form
                        action={updateBookingStatus.bind(
                          null,
                          booking.id,
                          "cancelled",
                        )}
                      >
                        <button
                          className={
                            styles.cancelButton
                          }
                          type="submit"
                        >
                          Cancel
                        </button>
                      </form>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}