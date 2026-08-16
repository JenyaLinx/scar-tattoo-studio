import type { Metadata } from "next";

import Header from "@/components/Header/Header";
import SignUpForm from "@/components/Auth/SignUpForm";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Create Account | SCAR Tattoo Studio",
};

export default function SignUpPage() {
  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.section}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>
            Client account
          </p>

          <h1 className={styles.title}>
            Join
            <span>SCAR.</span>
          </h1>

          <p className={styles.description}>
            Create an account to manage consultations,
            bookings and reviews.
          </p>
        </div>

        <div className={styles.formWrapper}>
          <SignUpForm />
        </div>
      </section>
    </main>
  );
}