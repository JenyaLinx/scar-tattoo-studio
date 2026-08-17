import type { Metadata } from "next";

import Header from "@/components/Header/Header";
import ForgotPasswordForm from "@/components/Auth/ForgotPasswordForm";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title:
    "Forgot Password | SCAR Tattoo Studio",
};

export default function ForgotPasswordPage() {
  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.section}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>
            Account recovery
          </p>

          <h1 className={styles.title}>
            Reset
            <span>password.</span>
          </h1>

          <p className={styles.description}>
            Enter the email associated with
            your SCAR account and we will send
            you a password reset link.
          </p>
        </div>

        <div className={styles.formWrapper}>
          <ForgotPasswordForm />
        </div>
      </section>
    </main>
  );
}