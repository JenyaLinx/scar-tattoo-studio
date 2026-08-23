import type { Metadata } from "next";

import Header from "@/components/Header/Header";
import { requireAdmin } from "@/services/auth/admin.server";
import { getAllReviewsForAdmin } from "@/services/reviews/reviews.server";
import {
  approveReview,
  deleteReview,
} from "./actions";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Manage Reviews | SCAR Tattoo Studio",
};

export default async function AdminReviewsPage() {
  await requireAdmin();

  const reviews = await getAllReviewsForAdmin();

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
            <span>reviews.</span>
          </h1>

          <p className={styles.description}>
            Review client feedback and choose which
            reviews should be published.
          </p>
        </div>

        <div className={styles.content}>
          {reviews.length === 0 ? (
            <div className={styles.empty}>
              <span>00</span>

              <h2>No reviews yet.</h2>

              <p>
                New client reviews will appear here
                for moderation.
              </p>
            </div>
          ) : (
            <div className={styles.list}>
              {reviews.map((review, index) => (
                <article
                  className={styles.card}
                  key={review.id}
                >
                  <div className={styles.cardTop}>
                    <span className={styles.number}>
                      {String(index + 1).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <span
                      className={`${styles.status} ${
                        review.is_approved
                          ? styles.approved
                          : styles.pending
                      }`}
                    >
                      {review.is_approved
                        ? "Approved"
                        : "Pending"}
                    </span>
                  </div>

                  <div className={styles.client}>
                    <p className={styles.label}>
                      Client
                    </p>

                    <h2 className={styles.clientName}>
                      {review.client?.full_name ??
                        "SCAR Client"}
                    </h2>

                    <p className={styles.clientEmail}>
                      {review.client?.email ??
                        "Email unavailable"}
                    </p>
                  </div>

                  <div className={styles.artist}>
                    <p className={styles.label}>
                      Tattoo artist
                    </p>

                    <h3>
                      {review.artist?.name ??
                        "SCAR Artist"}
                    </h3>

                    {review.artist && (
                      <p className={styles.specialty}>
                        {review.artist.specialty}
                      </p>
                    )}
                  </div>

                  <div className={styles.ratingBlock}>
                    <p className={styles.label}>
                      Rating
                    </p>

                    <div
                      className={styles.stars}
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      {[1, 2, 3, 4, 5].map(
                        (star) => (
                          <span
                            className={
                              star <= review.rating
                                ? styles.starActive
                                : styles.starInactive
                            }
                            key={star}
                            aria-hidden="true"
                          >
                            ★
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  <div className={styles.message}>
                    <p className={styles.label}>
                      Review
                    </p>

                    <p>{review.comment}</p>
                  </div>

                  <div className={styles.meta}>
                    <div className={styles.metaRow}>
                      <span>Created</span>

                      <strong>
                        {new Date(
                          review.created_at,
                        ).toLocaleDateString(
                          "en-GB",
                        )}
                      </strong>
                    </div>
                  </div>

                  <div className={styles.actions}>
                    {!review.is_approved && (
                      <form
                        action={approveReview.bind(
                          null,
                          review.id,
                        )}
                      >
                        <button
                          className={
                            styles.approveButton
                          }
                          type="submit"
                        >
                          Approve
                          <span aria-hidden="true">
                            →
                          </span>
                        </button>
                      </form>
                    )}

                    <form
                      action={deleteReview.bind(
                        null,
                        review.id,
                      )}
                    >
                      <button
                        className={
                          styles.deleteButton
                        }
                        type="submit"
                      >
                        Delete
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