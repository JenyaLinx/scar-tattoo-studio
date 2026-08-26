import type { Metadata } from "next";

import Header from "@/components/Header/Header";
import { requireAdmin } from "@/services/auth/admin.server";
import { getAllUsersForAdmin } from "@/services/users/users.server";
import { updateUserRole } from "./actions";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Manage Users | SCAR Tattoo Studio",
};

export default async function AdminUsersPage() {
  const { user: currentUser } = await requireAdmin();

  const users = await getAllUsersForAdmin();

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.section}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>Administration</p>

          <h1 className={styles.title}>
            Manage
            <span>users.</span>
          </h1>

          <p className={styles.description}>
            Manage client accounts and administrator access.
          </p>
        </div>

        <div className={styles.content}>
          {users.length === 0 ? (
            <div className={styles.empty}>
              <span>00</span>

              <h2>No users yet.</h2>
            </div>
          ) : (
            <div className={styles.list}>
              {users.map((profile, index) => {
                const isCurrentUser = profile.id === currentUser.id;

                return (
                  <article className={styles.userCard} key={profile.id}>
                    <div className={styles.cardTop}>
                      <span className={styles.number}>
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span
                        className={`${styles.role} ${
                          profile.role === "admin"
                            ? styles.admin
                            : styles.client
                        }`}
                      >
                        {profile.role}
                      </span>
                    </div>

                    <div className={styles.userInfo}>
                      <p className={styles.label}>User</p>

                      <h2>{profile.full_name ?? "SCAR Client"}</h2>

                      <p className={styles.email}>
                        {profile.email ?? "Email unavailable"}
                      </p>

                      {isCurrentUser && (
                        <p className={styles.currentUser}>Your account</p>
                      )}
                    </div>

                    <div className={styles.actions}>
                      {profile.role === "client" ? (
                        <form
                          action={updateUserRole.bind(
                            null,
                            profile.id,
                            "admin",
                          )}
                        >
                          <button
                            className={styles.makeAdminButton}
                            type="submit"
                          >
                            Make admin
                            <span aria-hidden="true">→</span>
                          </button>
                        </form>
                      ) : (
                        !isCurrentUser && (
                          <form
                            action={updateUserRole.bind(
                              null,
                              profile.id,
                              "client",
                            )}
                          >
                            <button
                              className={styles.removeAdminButton}
                              type="submit"
                            >
                              Remove admin
                            </button>
                          </form>
                        )
                      )}
                    </div>
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
