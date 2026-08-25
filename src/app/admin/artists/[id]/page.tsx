import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/Header/Header";
import ArtistEditForm from "@/components/Admin/ArtistEditForm/ArtistEditForm";
import { requireAdmin } from "@/services/auth/admin.server";
import { getArtistByIdForAdmin } from "@/services/artists/artists.server";

import styles from "./page.module.css";

type AdminArtistPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata: Metadata = {
  title: "Edit Artist | SCAR Tattoo Studio",
};

export default async function AdminArtistPage({
  params,
}: AdminArtistPageProps) {
  await requireAdmin();

  const { id } = await params;

  const artistId = Number(id);

  if (!Number.isInteger(artistId)) {
    notFound();
  }

  const artist =
    await getArtistByIdForAdmin(artistId);

  if (!artist) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.section}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>
            Artist management
          </p>

          <h1 className={styles.title}>
            Edit
            <span>{artist.name}.</span>
          </h1>

          <p className={styles.description}>
            Update artist information or hide
            this profile from the public website.
          </p>

          <Link
            className={styles.backLink}
            href="/admin/artists"
          >
            ← All artists
          </Link>
        </div>

        <div className={styles.formWrapper}>
          <ArtistEditForm artist={artist} />
        </div>
      </section>
    </main>
  );
}