import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header/Header";
import { artists, getArtistBySlug } from "@/data/artists";
import styles from "./page.module.css";

type ArtistPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return artists.map((artist) => ({
    slug: artist.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArtistPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);

  if (!artist) {
    return {
      title: "Artist not found | SCAR Tattoo Studio",
    };
  }

  return {
    title: `${artist.name} | SCAR Tattoo Studio`,
    description: artist.description,
  };
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);

  if (!artist) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.profile}>
        <div className={styles.imageWrapper}>
          <Image
            className={styles.image}
            src={artist.image}
            alt={`${artist.name}, ${artist.specialty} tattoo artist`}
            fill
            priority
            sizes="(max-width: 767px) 100vw, 50vw"
          />

          <div className={styles.overlay} />

          <span className={styles.artistNumber}>
            {String(artist.id).padStart(2, "0")}
          </span>
        </div>

        <div className={styles.content}>
          <p className={styles.specialty}>{artist.specialty} artist</p>

          <h1 className={styles.name}>{artist.name}</h1>

          <p className={styles.experience}>{artist.experience}</p>

          <p className={styles.biography}>{artist.biography}</p>

          <div className={styles.actions}>
            <Link
              className={styles.primaryButton}
              href={`/booking?artist=${artist.slug}`}
            >
              Book consultation
            </Link>

            <Link className={styles.secondaryButton} href="/artists">
              All artists
            </Link>
          </div>

          <div className={styles.socials}>
            <a
              href={artist.instagram}
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>

            <a href={artist.tiktok} target="_blank" rel="noreferrer">
              TikTok
            </a>

            <a
              href={artist.facebook}
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </div>
        </div>
      </section>

      <section className={styles.portfolio}>
        <div className={styles.portfolioHeading}>
          <div>
            <p className={styles.portfolioEyebrow}>Selected work</p>
            <h2 className={styles.portfolioTitle}>Artist portfolio</h2>
          </div>

          <p className={styles.portfolioDescription}>
            A selection of custom work created by {artist.name}.
          </p>
        </div>

        <div className={styles.gallery}>
          {artist.portfolio.map((image, index) => (
            <div className={styles.galleryItem} key={image}>
              <Image
                className={styles.galleryImage}
                src={image}
                alt={`${artist.name} tattoo work ${index + 1}`}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>

        <Link
          className={styles.bookingCta}
          href={`/booking?artist=${artist.slug}`}
        >
          Book with {artist.name}
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}