import type { Metadata } from "next";

import Header from "@/components/Header/Header";
import SignInForm from "@/components/Auth/SignInForm";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Sign In | SCAR Tattoo Studio",
};

export default function SignInPage() {
  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.section}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>
            Welcome back
          </p>

          <h1 className={styles.title}>
            Sign
            <span>in.</span>
          </h1>

          <p className={styles.description}>
            Access your SCAR account and manage your
            tattoo appointments.
          </p>
        </div>

        <div className={styles.formWrapper}>
          <SignInForm />
        </div>
      </section>
    </main>
  );
}