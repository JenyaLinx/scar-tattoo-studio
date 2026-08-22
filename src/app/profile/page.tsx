import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import Header from "@/components/Header/Header";
import ProfileForm from "@/components/Profile/ProfileForm";
import SignOutButton from "@/components/Profile/SignOutButton";

import { getCurrentUser } from "@/services/auth/auth.server";
import { getProfile } from "@/services/profile/profile.server";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "My Profile | SCAR Tattoo Studio",
};

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const profile = await getProfile(user.id);

  const isAdmin = profile?.role === "admin";

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.section}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>
            {isAdmin
              ? "Administrator account"
              : "Client account"}
          </p>

          <h1 className={styles.title}>
            My
            <span>profile.</span>
          </h1>

          <p className={styles.description}>
            Manage your personal information and
            account details.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.account}>
            <div>
              <p className={styles.accountLabel}>
                Signed in as
              </p>

              <p className={styles.accountName}>
                {profile?.full_name ??
                  user.user_metadata.full_name ??
                  "SCAR Client"}
              </p>

              <p className={styles.accountEmail}>
                {user.email}
              </p>

              {isAdmin && (
                <span className={styles.adminBadge}>
                  Administrator
                </span>
              )}
            </div>

            <div className={styles.accountActions}>
              {isAdmin ? (
                <Link
                  className={styles.adminLink}
                  href="/admin/bookings"
                >
                  <span>Manage bookings</span>
                  <span aria-hidden="true">→</span>
                </Link>
              ) : (
                <Link
                  className={styles.bookingsLink}
                  href="/my-bookings"
                >
                  <span>My bookings</span>
                  <span aria-hidden="true">→</span>
                </Link>
              )}

              <SignOutButton />
            </div>
          </div>

          <div className={styles.formWrapper}>
            <p className={styles.formEyebrow}>
              Personal information
            </p>

            <h2 className={styles.formTitle}>
              Account details
            </h2>

            <ProfileForm
              email={user.email ?? ""}
              initialFullName={
                profile?.full_name ??
                user.user_metadata.full_name ??
                ""
              }
              initialPhone={profile?.phone ?? ""}
            />
          </div>
        </div>
      </section>
    </main>
  );
}