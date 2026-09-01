"use client";

import Link from "next/link";

import Header from "@/components/Header/Header";

import styles from "./error.module.css";

type ArtistsErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ArtistsError({ error, reset }: ArtistsErrorProps) {
  console.error("Artists page error:", error);

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.section}>
        <p className={styles.eyebrow}>Our artists</p>

        <h1 className={styles.title}>
          Unable to load
          <span>our artists.</span>
        </h1>

        <p className={styles.description}>
          Something went wrong while loading our artists. Please try again in a
          moment.
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
