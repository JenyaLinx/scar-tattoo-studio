import type { Metadata } from "next";

import Header from "@/components/Header/Header";
import UpdatePasswordForm from "@/components/Auth/UpdatePasswordForm";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title:
    "Update Password | SCAR Tattoo Studio",
};

export default function UpdatePasswordPage() {
  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.section}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>
            Security
          </p>

          <h1 className={styles.title}>
            New
            <span>password.</span>
          </h1>

          <p className={styles.description}>
            Choose a new password for your
            SCAR account.
          </p>
        </div>

        <div className={styles.formWrapper}>
          <UpdatePasswordForm />
        </div>
      </section>
    </main>
  );
}