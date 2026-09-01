"use client";

import Link from "next/link";

import Header from "@/components/Header/Header";

import styles from "./error.module.css";

type MyBookingsErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function MyBookingsError({
  error,
  reset,
}: MyBookingsErrorProps) {
  console.error("My bookings error:", error);

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.section}>
        <p className={styles.eyebrow}>Client account</p>

        <h1 className={styles.title}>
          Unable to load
          <span>your bookings.</span>
        </h1>

        <p className={styles.description}>
          Something went wrong while loading your booking requests. Please try
          again.
        </p>

        <div className={styles.actions}>
          <button
            className={styles.primaryButton}
            type="button"
            onClick={reset}
          >
            Try again
            <span aria-hidden="true">→</span>
          </button>

          <Link className={styles.secondaryButton} href="/">
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
