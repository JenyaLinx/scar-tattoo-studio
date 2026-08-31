import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/Header/Header";
import ReviewForm from "@/components/ReviewForm/ReviewForm";
import { getArtistBySlug } from "@/services/artists/artists.server";
import {
  getApprovedReviewsByArtistId,
  type ArtistReview,
} from "@/services/reviews/reviews.server";

import styles from "./page.module.css";

type ArtistPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: ArtistPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);

  if (!artist) {
    return {
      title: "Artist not found | SCAR Tattoo Studio",
    };
  }

  return {
    title: `${artist.name} | SCAR Tattoo Studio`,
    description: artist.description ?? `${artist.name} at SCAR Tattoo Studio`,
  };
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { slug } = await params;

  const artist = await getArtistBySlug(slug);

  if (!artist) {
    notFound();
  }

  let artistReviews: ArtistReview[] = [];
  let reviewsUnavailable = false;

  try {
    artistReviews = await getApprovedReviewsByArtistId(artist.id);
  } catch (error) {
    console.error("Unable to load artist reviews:", error);

    reviewsUnavailable = true;
  }

  const averageRating =
    artistReviews.length > 0
      ? artistReviews.reduce((total, review) => total + review.rating, 0) /
        artistReviews.length
      : 0;

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.profile}>
        <div className={styles.imageWrapper}>
          {artist.image_url && (
            <Image
              className={styles.image}
              src={artist.image_url}
              alt={`${artist.name}, ${artist.specialty} tattoo artist`}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 50vw"
            />
          )}

          <div className={styles.overlay} />

          <span className={styles.artistNumber}>
            {String(artist.id).padStart(2, "0")}
          </span>
        </div>

        <div className={styles.content}>
          <p className={styles.specialty}>{artist.specialty} artist</p>

          <h1 className={styles.name}>{artist.name}</h1>

          {artist.experience && (
            <p className={styles.experience}>{artist.experience}</p>
          )}

          {artist.biography && (
            <p className={styles.biography}>{artist.biography}</p>
          )}

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
            {artist.instagram_url && (
              <a href={artist.instagram_url} target="_blank" rel="noreferrer">
                Instagram
                <span aria-hidden="true">↗</span>
              </a>
            )}

            {artist.tiktok_url && (
              <a href={artist.tiktok_url} target="_blank" rel="noreferrer">
                TikTok
                <span aria-hidden="true">↗</span>
              </a>
            )}

            {artist.facebook_url && (
              <a href={artist.facebook_url} target="_blank" rel="noreferrer">
                Facebook
                <span aria-hidden="true">↗</span>
              </a>
            )}
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
          {artist.artist_images.map((portfolioImage, index) => (
            <div className={styles.galleryItem} key={portfolioImage.id}>
              <Image
                className={styles.galleryImage}
                src={portfolioImage.image_url}
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

      <section className={styles.reviews}>
        <div className={styles.reviewsHeading}>
          <div>
            <p className={styles.portfolioEyebrow}>Client reviews</p>

            <h2 className={styles.portfolioTitle}>What clients say</h2>
          </div>

          {!reviewsUnavailable && (
            <div className={styles.ratingSummary}>
              <span className={styles.averageRating}>
                {averageRating.toFixed(1)}
              </span>

              <div>
                <p className={styles.summaryStars} aria-label="Average rating">
                  {"★".repeat(Math.round(averageRating))}

                  {"☆".repeat(5 - Math.round(averageRating))}
                </p>

                <p className={styles.reviewCount}>
                  {artistReviews.length}{" "}
                  {artistReviews.length === 1 ? "review" : "reviews"}
                </p>
              </div>
            </div>
          )}
        </div>

        {reviewsUnavailable ? (
          <div className={styles.reviewsUnavailable}>
            <span>Reviews</span>

            <p>Reviews are temporarily unavailable. Please try again later.</p>
          </div>
        ) : artistReviews.length === 0 ? (
          <div className={styles.reviewsEmpty}>
            <p>
              No reviews yet. Be the first to share your experience with{" "}
              {artist.name}.
            </p>
          </div>
        ) : (
          <div className={styles.reviewList}>
            {artistReviews.map((review) => (
              <article className={styles.reviewCard} key={review.id}>
                <div className={styles.reviewTop}>
                  <div>
                    <h3 className={styles.reviewAuthor}>{review.author}</h3>

                    <p
                      className={styles.reviewStars}
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      {"★".repeat(review.rating)}

                      {"☆".repeat(5 - review.rating)}
                    </p>
                  </div>

                  <time
                    className={styles.reviewDate}
                    dateTime={review.created_at}
                  >
                    {new Date(review.created_at).toLocaleDateString("en-GB")}
                  </time>
                </div>

                <p className={styles.reviewComment}>{review.comment}</p>

                <p className={styles.verified}>Verified client</p>
              </article>
            ))}
          </div>
        )}

        <div className={styles.reviewFormWrapper}>
          <div className={styles.reviewFormHeading}>
            <span className={styles.formNumber}>01</span>

            <div>
              <h3 className={styles.formTitle}>Leave a review</h3>

              <p className={styles.formDescription}>
                Share your experience with {artist.name}.
              </p>
            </div>
          </div>

          <ReviewForm artistId={artist.id} artistName={artist.name} />
        </div>
      </section>
    </main>
  );
}
