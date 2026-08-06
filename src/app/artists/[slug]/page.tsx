import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header/Header";
import ReviewForm from "@/components/ReviewForm/ReviewForm";
import { artists, getArtistBySlug } from "@/data/artists";
import { getReviewsByArtistId } from "@/data/reviews";
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

  const artistReviews = getReviewsByArtistId(artist.id);

  const averageRating =
    artistReviews.length > 0
      ? artistReviews.reduce(
          (total, review) => total + review.rating,
          0,
        ) / artistReviews.length
      : 0;

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

            <a
              href={artist.tiktok}
              target="_blank"
              rel="noreferrer"
            >
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

      <section className={styles.reviews}>
        <div className={styles.reviewsHeading}>
          <div>
            <p className={styles.portfolioEyebrow}>Client reviews</p>

            <h2 className={styles.portfolioTitle}>
              What clients say
            </h2>
          </div>

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
                {artistReviews.length} reviews
              </p>
            </div>
          </div>
        </div>

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

                <time className={styles.reviewDate}>
                  {review.date}
                </time>
              </div>

              <p className={styles.reviewComment}>{review.comment}</p>

              <p className={styles.verified}>Verified client</p>
            </article>
          ))}
        </div>

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

          <ReviewForm
            artistId={artist.id}
            artistName={artist.name}
          />
        </div>
      </section>
    </main>
  );
}