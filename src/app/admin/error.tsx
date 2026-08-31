"use client";

import Header from "@/components/Header/Header";

import styles from "./error.module.css";

type AdminErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function AdminError({ error, reset }: AdminErrorProps) {
  console.error("Admin page error:", error);

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.section}>
        <p className={styles.eyebrow}>Administration</p>

        <h1 className={styles.title}>
          Something
          <span>went wrong.</span>
        </h1>

        <p className={styles.description}>
          We were unable to load this admin page. Please try again.
        </p>

        <button className={styles.button} type="button" onClick={reset}>
          Try again
          <span aria-hidden="true">→</span>
        </button>
      </section>
    </main>
  );
}
