import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header/Header";
import { getGalleryImages } from "@/services/gallery/gallery.server";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Gallery | SCAR Tattoo Studio",
  description:
    "Explore selected tattoo work created by the artists at SCAR Tattoo Studio.",
};

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <p className={styles.eyebrow}>
          Selected work
        </p>

        <h1 className={styles.title}>
          Marks made
          <span>to last.</span>
        </h1>

        <p className={styles.description}>
          Explore selected work from the artists at
          SCAR Tattoo Studio.
        </p>
      </section>

      <section className={styles.gallerySection}>
        <div className={styles.sectionHeading}>
          <span className={styles.sectionNumber}>
            01
          </span>

          <div>
            <p className={styles.sectionEyebrow}>
              Artist portfolio
            </p>

            <h2 className={styles.sectionTitle}>
              Selected tattoos
            </h2>
          </div>
        </div>

        {images.length === 0 ? (
          <div className={styles.empty}>
            <p>No gallery images yet.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {images.map((image, index) => (
              <article
                className={styles.item}
                key={image.id}
              >
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
                    sizes="
                      (max-width: 767px) 100vw,
                      (max-width: 1199px) 50vw,
                      33vw
                    "
                  />

                  <span className={styles.imageNumber}>
                    {String(index + 1).padStart(
                      2,
                      "0",
                    )}
                  </span>
                </div>

                <div className={styles.itemInfo}>
                  <div>
                    <p className={styles.artistLabel}>
                      Artist
                    </p>

                    <h3 className={styles.artistName}>
                      {image.artist?.name ??
                        "SCAR Artist"}
                    </h3>

                    {image.artist && (
                      <p className={styles.specialty}>
                        {image.artist.specialty}
                      </p>
                    )}
                  </div>

                  {image.artist && (
                    <Link
                      className={styles.artistLink}
                      href={`/artists/${image.artist.slug}`}
                    >
                      View artist
                      <span aria-hidden="true">
                        →
                      </span>
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className={styles.cta}>
        <p className={styles.eyebrow}>
          Your idea
        </p>

        <h2>
          Create something
          <span>personal.</span>
        </h2>

        <p>
          Find the artist whose style matches your
          idea and start with a consultation.
        </p>

        <Link
          className={styles.bookingLink}
          href="/booking"
        >
          Book a consultation
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}