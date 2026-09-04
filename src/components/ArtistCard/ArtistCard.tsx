import Image from "next/image";
import Link from "next/link";

import type { Artist } from "@/types/artist";
import { getArtistRatingSummary } from "@/services/reviews/reviews.server";

import styles from "./ArtistCard.module.css";

type ArtistCardProps = {
  artist: Artist;
};

export default async function ArtistCard({ artist }: ArtistCardProps) {
  const rating = await getArtistRatingSummary(artist.id);

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

          <Link
            className={styles.rating}
            href={`/artists/${artist.slug}#reviews`}
            aria-label={
              rating.count > 0
                ? `${artist.name} has a rating of ${rating.average.toFixed(
                    1,
                  )} from ${rating.count} reviews`
                : `View reviews for ${artist.name}`
            }
          >
            {rating.count > 0 ? (
              <>
                <span>{rating.average.toFixed(1)}</span>

                <span className={styles.ratingStar} aria-hidden="true">
                  ★
                </span>
              </>
            ) : (
              <>
                <span>New</span>

                <span className={styles.ratingStar} aria-hidden="true">
                  ★
                </span>
              </>
            )}
          </Link>
        </div>

        {artist.description && (
          <p className={styles.description}>{artist.description}</p>
        )}

        <div className={styles.footer}>
          <Link className={styles.profileLink} href={`/artists/${artist.slug}`}>
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
                Instagram
                <span aria-hidden="true">↗</span>
              </a>
            )}

            {artist.tiktok_url && (
              <a
                href={artist.tiktok_url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${artist.name} on TikTok`}
              >
                TikTok
                <span aria-hidden="true">↗</span>
              </a>
            )}

            {artist.facebook_url && (
              <a
                href={artist.facebook_url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${artist.name} on Facebook`}
              >
                Facebook
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
