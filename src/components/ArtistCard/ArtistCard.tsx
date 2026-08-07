import Image from "next/image";
import Link from "next/link";
import type { Artist } from "@/types/artist";
import styles from "./ArtistCard.module.css";

type ArtistCardProps = {
  artist: Artist;
};

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <article className={styles.card}>
      <Link
        className={styles.imageLink}
        href={`/artists/${artist.slug}`}
        aria-label={`View ${artist.name}'s profile`}
      >
        {artist.image_url && (
          <Image
            className={styles.image}
            src={artist.image_url}
            alt={`${artist.name}, ${artist.specialty} tattoo artist`}
            fill
            sizes="(max-width: 767px) 100vw, 33vw"
          />
        )}

        <div className={styles.overlay} />

        <div className={styles.imageContent}>
          <span className={styles.specialty}>
            {artist.specialty}
          </span>

          <span className={styles.viewText}>
            View artist
            <span aria-hidden="true">↗</span>
          </span>
        </div>
      </Link>

      <div className={styles.content}>
        <div className={styles.heading}>
          <div>
            <h3 className={styles.name}>{artist.name}</h3>

            <p className={styles.role}>
              {artist.specialty} artist
            </p>
          </div>

          <span className={styles.number}>
            {String(artist.id).padStart(2, "0")}
          </span>
        </div>

        {artist.description && (
          <p className={styles.description}>
            {artist.description}
          </p>
        )}

        <div className={styles.footer}>
          <Link
            className={styles.profileLink}
            href={`/artists/${artist.slug}`}
          >
            Explore work
            <span aria-hidden="true">→</span>
          </Link>

          <div className={styles.socials}>
            {artist.instagram_url && (
              <a
                href={artist.instagram_url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${artist.name} on Instagram`}
              >
                IG
              </a>
            )}

            {artist.tiktok_url && (
              <a
                href={artist.tiktok_url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${artist.name} on TikTok`}
              >
                TT
              </a>
            )}

            {artist.facebook_url && (
              <a
                href={artist.facebook_url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${artist.name} on Facebook`}
              >
                FB
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}