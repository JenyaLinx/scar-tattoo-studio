import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header/Header";
import { requireAdmin } from "@/services/auth/admin.server";
import { getAllArtistsForAdmin } from "@/services/artists/artists.server";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Manage Artists | SCAR Tattoo Studio",
};

export default async function AdminArtistsPage() {
  await requireAdmin();

  const artists =
    await getAllArtistsForAdmin();

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
            <span>artists.</span>
          </h1>

          <p className={styles.description}>
            Edit artist information and control
            which profiles are visible on the
            website.
          </p>
        </div>

        <div className={styles.content}>
          {artists.map((artist, index) => (
            <Link
              className={styles.artist}
              href={`/admin/artists/${artist.id}`}
              key={artist.id}
            >
              <span className={styles.number}>
                {String(index + 1).padStart(
                  2,
                  "0",
                )}
              </span>

              <div className={styles.artistContent}>
                <div>
                  <div className={styles.nameRow}>
                    <h2>{artist.name}</h2>

                    <span
                      className={`${styles.status} ${
                        artist.is_active
                          ? styles.active
                          : styles.hidden
                      }`}
                    >
                      {artist.is_active
                        ? "Active"
                        : "Hidden"}
                    </span>
                  </div>

                  <p>{artist.specialty}</p>
                </div>

                <span aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}