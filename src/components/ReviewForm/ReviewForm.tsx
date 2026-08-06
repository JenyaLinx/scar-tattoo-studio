"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import {
  reviewSchema,
  type ReviewFormValues,
} from "@/lib/validations/reviewSchema";
import styles from "./ReviewForm.module.css";

type ReviewFormProps = {
  artistId: number;
  artistName: string;
};

const ratings = [1, 2, 3, 4, 5];

export default function ReviewForm({
  artistId,
  artistName,
}: ReviewFormProps) {
  const [hoveredRating, setHoveredRating] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const selectedRating =
    useWatch({
      control,
      name: "rating",
    }) ?? 0;

  const comment =
    useWatch({
      control,
      name: "comment",
    }) ?? "";

  const visibleRating = hoveredRating || selectedRating;

  const selectRating = (rating: number) => {
    setValue("rating", rating, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit = async (values: ReviewFormValues) => {
    try {
      console.log("Review:", {
        artistId,
        ...values,
      });

      await new Promise((resolve) => {
        window.setTimeout(resolve, 700);
      });

      toast.success(`Your review for ${artistName} has been submitted.`);

      reset({
        rating: 0,
        comment: "",
      });

      setHoveredRating(0);
    } catch {
      toast.error("Unable to submit your review. Please try again.");
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className={styles.field}>
        <p className={styles.label}>
          Your rating
          <span className={styles.required}>*</span>
        </p>

        <input
          type="hidden"
          {...register("rating", {
            valueAsNumber: true,
          })}
        />

        <div
          className={`${styles.rating} ${
            errors.rating ? styles.ratingError : ""
          }`}
          role="radiogroup"
          aria-label={`Rate ${artistName}`}
          aria-describedby={errors.rating ? "rating-error" : undefined}
          onMouseLeave={() => setHoveredRating(0)}
        >
          {ratings.map((rating) => {
            const isActive = rating <= visibleRating;

            return (
              <button
                className={`${styles.starButton} ${
                  isActive ? styles.starActive : ""
                }`}
                type="button"
                role="radio"
                aria-checked={selectedRating === rating}
                aria-label={`${rating} ${
                  rating === 1 ? "star" : "stars"
                }`}
                key={rating}
                onClick={() => selectRating(rating)}
                onMouseEnter={() => setHoveredRating(rating)}
                onFocus={() => setHoveredRating(rating)}
                onBlur={() => setHoveredRating(0)}
              >
                <span aria-hidden="true">★</span>
              </button>
            );
          })}
        </div>

        {errors.rating && (
          <p className={styles.error} id="rating-error">
            {errors.rating.message}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label className={styles.label} htmlFor="review-comment">
            Your review
            <span className={styles.required}>*</span>
          </label>

          <span
            className={`${styles.counter} ${
              comment.length > 600 ? styles.counterError : ""
            }`}
          >
            {comment.length}/600
          </span>
        </div>

        <textarea
          className={`${styles.textarea} ${
            errors.comment ? styles.controlError : ""
          }`}
          id="review-comment"
          rows={7}
          placeholder={`Tell others about your experience with ${artistName}...`}
          aria-invalid={Boolean(errors.comment)}
          aria-describedby={
            errors.comment ? "comment-error" : "comment-help"
          }
          {...register("comment")}
        />

        {errors.comment ? (
          <p className={styles.error} id="comment-error">
            {errors.comment.message}
          </p>
        ) : (
          <p className={styles.help} id="comment-help">
            Minimum 20 characters.
          </p>
        )}
      </div>

      <button
        className={styles.submitButton}
        type="submit"
        disabled={isSubmitting}
      >
        <span>
          {isSubmitting ? "Submitting review..." : "Submit review"}
        </span>

        <span aria-hidden="true">→</span>
      </button>

      <p className={styles.notice}>
        After authentication is connected, only registered clients will be
        able to publish reviews.
      </p>
    </form>
  );
}