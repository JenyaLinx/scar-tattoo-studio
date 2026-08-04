import Image from "next/image";
import Link from "next/link";
import type { Artist } from "@/data/artists";
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
        <Image
          className={styles.image}
          src={artist.image}
          alt={`${artist.name}, ${artist.specialty} tattoo artist`}
          fill
          sizes="(max-width: 767px) 100vw, 33vw"
        />

        <div className={styles.overlay} />

        <div className={styles.imageContent}>
          <span className={styles.specialty}>{artist.specialty}</span>

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
            <p className={styles.role}>{artist.specialty} artist</p>
          </div>

          <span className={styles.number}>
            {String(artist.id).padStart(2, "0")}
          </span>
        </div>

        <p className={styles.description}>{artist.description}</p>

        <div className={styles.footer}>
          <Link
            className={styles.profileLink}
            href={`/artists/${artist.slug}`}
          >
            Explore work
            <span aria-hidden="true">→</span>
          </Link>

          <div className={styles.socials}>
            <a
              href={artist.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label={`${artist.name} on Instagram`}
            >
              IG
            </a>

            <a
              href={artist.tiktok}
              target="_blank"
              rel="noreferrer"
              aria-label={`${artist.name} on TikTok`}
            >
              TT
            </a>

            <a
              href={artist.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label={`${artist.name} on Facebook`}
            >
              FB
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}