import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header/Header";
import { requireAdmin } from "@/services/auth/admin.server";
import { getGalleryImages } from "@/services/gallery/gallery.server";

import { deleteGalleryImage } from "./actions";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Manage Gallery | SCAR Tattoo Studio",
};

export default async function AdminGalleryPage() {
  await requireAdmin();

  const images = await getGalleryImages();

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.section}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>Administration</p>

          <h1 className={styles.title}>
            Manage
            <span>gallery.</span>
          </h1>

          <p className={styles.description}>
            Review gallery images and manage portfolio content shown on the
            public website.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.topBar}>
            <div>
              <p className={styles.countLabel}>Gallery images</p>

              <p className={styles.count}>
                {String(images.length).padStart(2, "0")}
              </p>
            </div>

            <Link className={styles.publicLink} href="/gallery">
              View public gallery
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {images.length === 0 ? (
            <div className={styles.empty}>
              <span>00</span>

              <h2>No gallery images yet.</h2>

              <p>Images added to artist portfolios will appear here.</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {images.map((image, index) => (
                <article className={styles.card} key={image.id}>
                  <div className={styles.imageWrapper}>
                    <Image
                      className={styles.image}
                      src={image.image_url}
                      alt={
                        image.artist
                          ? `Tattoo work by ${image.artist.name}`
                          : "Tattoo work at SCAR Tattoo Studio"
                      }
                      fill
                      sizes="(max-width: 767px) 100vw, 33vw"
                    />

                    <span className={styles.imageNumber}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className={styles.cardInfo}>
                    <div>
                      <p className={styles.label}>Artist</p>

                      <h2 className={styles.artistName}>
                        {image.artist?.name ?? "SCAR Artist"}
                      </h2>

                      {image.artist && (
                        <p className={styles.specialty}>
                          {image.artist.specialty}
                        </p>
                      )}
                    </div>

                    <div className={styles.meta}>
                      <span>Position</span>

                      <strong>{image.position}</strong>
                    </div>
                  </div>

                  <div className={styles.actions}>
                    {image.artist && (
                      <Link
                        className={styles.artistLink}
                        href={`/admin/artists/${image.artist.id}`}
                      >
                        Manage artist
                        <span aria-hidden="true">→</span>
                      </Link>
                    )}

                    <form action={deleteGalleryImage.bind(null, image.id)}>
                      <button className={styles.deleteButton} type="submit">
                        Delete image
                      </button>
                    </form>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
