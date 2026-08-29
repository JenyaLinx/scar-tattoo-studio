"use client";

import { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";

import { getArtistsClient } from "@/services/artists/artists.client";
import { artistKeys } from "@/services/artists/artists.keys";
import { createBooking } from "@/services/bookings/bookings.client";
import {
  bookingSchema,
  type BookingFormValues,
} from "@/lib/validations/bookingSchema";

import styles from "./BookingForm.module.css";

type BookingFormProps = {
  initialArtist?: string;
  giftCard?: number;
};

const availableTimes = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

export default function BookingForm({
  initialArtist = "",
  giftCard,
}: BookingFormProps) {
  const {
    data: artists = [],
    isLoading: isArtistsLoading,
    isError: isArtistsError,
  } = useQuery({
    queryKey: artistKeys.all,
    queryFn: getArtistsClient,
  });

  const minimumDate = useMemo(() => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }, []);

  const giftCardPrefix = giftCard ? `Gift Card: £${giftCard}. ` : "";

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      artist: "",
      date: "",
      time: "",
      phone: "",
      message: giftCardPrefix,
    },
  });

  const message =
    useWatch({
      control,
      name: "message",
    }) ?? "";

  useEffect(() => {
    if (
      initialArtist &&
      artists.some((artist) => artist.slug === initialArtist)
    ) {
      setValue("artist", initialArtist);
    }
  }, [artists, initialArtist, setValue]);

  useEffect(() => {
    if (!giftCard) {
      return;
    }

    const currentMessage = message ?? "";

    if (!currentMessage.startsWith(giftCardPrefix)) {
      const cleanedMessage = currentMessage.replace(
        /^Gift Card:\s*£?\d*\.?\s*/,
        "",
      );

      setValue("message", `${giftCardPrefix}${cleanedMessage}`, {
        shouldValidate: true,
      });
    }
  }, [giftCard, giftCardPrefix, message, setValue]);

  const onSubmit = async (values: BookingFormValues) => {
    try {
      const selectedArtist = artists.find(
        (artist) => artist.slug === values.artist,
      );

      if (!selectedArtist) {
        toast.error("Please select a valid artist.");
        return;
      }

      await createBooking({
        artistId: selectedArtist.id,
        bookingDate: values.date,
        bookingTime: values.time,
        phone: values.phone,
        message: values.message,
      });

      toast.success("Your consultation request has been sent.");

      reset({
        artist: values.artist,
        date: "",
        time: "",
        phone: "",
        message: giftCardPrefix,
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to create booking.",
      );
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="artist">
          Choose artist
          <span className={styles.required}>*</span>
        </label>

        <div className={styles.selectWrapper}>
          <select
            className={`${styles.control} ${
              errors.artist ? styles.controlError : ""
            }`}
            id="artist"
            disabled={isArtistsLoading || isArtistsError}
            aria-invalid={Boolean(errors.artist)}
            aria-describedby={errors.artist ? "artist-error" : undefined}
            {...register("artist")}
          >
            <option value="">
              {isArtistsLoading
                ? "Loading artists..."
                : isArtistsError
                  ? "Unable to load artists"
                  : "Select an artist"}
            </option>

            {artists.map((artist) => (
              <option value={artist.slug} key={artist.id}>
                {artist.name} — {artist.specialty}
              </option>
            ))}
          </select>

          <span className={styles.selectIcon} aria-hidden="true">
            ↓
          </span>
        </div>

        {errors.artist && (
          <p className={styles.error} id="artist-error">
            {errors.artist.message}
          </p>
        )}

        {isArtistsError && (
          <p className={styles.error}>
            Unable to load artists. Please refresh the page.
          </p>
        )}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="date">
            Preferred date
            <span className={styles.required}>*</span>
          </label>

          <input
            className={`${styles.control} ${
              errors.date ? styles.controlError : ""
            }`}
            id="date"
            type="date"
            min={minimumDate}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? "date-error" : undefined}
            {...register("date")}
          />

          {errors.date && (
            <p className={styles.error} id="date-error">
              {errors.date.message}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="time">
            Preferred time
            <span className={styles.required}>*</span>
          </label>

          <div className={styles.selectWrapper}>
            <select
              className={`${styles.control} ${
                errors.time ? styles.controlError : ""
              }`}
              id="time"
              aria-invalid={Boolean(errors.time)}
              aria-describedby={errors.time ? "time-error" : undefined}
              {...register("time")}
            >
              <option value="">Select time</option>

              {availableTimes.map((time) => (
                <option value={time} key={time}>
                  {time}
                </option>
              ))}
            </select>

            <span className={styles.selectIcon} aria-hidden="true">
              ↓
            </span>
          </div>

          {errors.time && (
            <p className={styles.error} id="time-error">
              {errors.time.message}
            </p>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="phone">
          Phone number
          <span className={styles.required}>*</span>
        </label>

        <input
          className={`${styles.control} ${
            errors.phone ? styles.controlError : ""
          }`}
          id="phone"
          type="tel"
          placeholder="+44 7000 000000"
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          {...register("phone")}
        />

        {errors.phone && (
          <p className={styles.error} id="phone-error">
            {errors.phone.message}
          </p>
        )}
      </div>

      {giftCard && (
        <div className={styles.giftCardNotice}>
          <div>
            <span className={styles.giftCardLabel}>Gift card selected</span>

            <strong className={styles.giftCardValue}>£{giftCard}</strong>
          </div>

          <span className={styles.giftCardMark} aria-hidden="true">
            ✓
          </span>
        </div>
      )}

      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label className={styles.label} htmlFor="message">
            Message
            <span className={styles.optional}>Optional</span>
          </label>

          <span
            className={`${styles.counter} ${
              message.length > 500 ? styles.counterError : ""
            }`}
          >
            {message.length}/500
          </span>
        </div>

        <textarea
          className={`${styles.control} ${styles.textarea} ${
            errors.message ? styles.controlError : ""
          }`}
          id="message"
          rows={6}
          placeholder="Tell us about your tattoo idea, placement or preferred style..."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : "message-help"}
          {...register("message")}
          onChange={(event) => {
            let value = event.target.value;

            if (giftCard && !value.startsWith(giftCardPrefix)) {
              const userText = value.replace(/^Gift Card:\s*£?\d*\.?\s*/, "");

              value = `${giftCardPrefix}${userText}`;
            }

            setValue("message", value, {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
          onKeyDown={(event) => {
            if (!giftCard) {
              return;
            }

            const textarea = event.currentTarget;

            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            if (event.key === "Backspace" && start <= giftCardPrefix.length) {
              event.preventDefault();
              return;
            }

            if (event.key === "Delete" && start < giftCardPrefix.length) {
              event.preventDefault();
              return;
            }

            if (start < giftCardPrefix.length && start !== end) {
              event.preventDefault();
            }
          }}
          onClick={(event) => {
            if (!giftCard) {
              return;
            }

            const textarea = event.currentTarget;

            if (textarea.selectionStart < giftCardPrefix.length) {
              textarea.setSelectionRange(
                giftCardPrefix.length,
                giftCardPrefix.length,
              );
            }
          }}
          onFocus={(event) => {
            if (!giftCard) {
              return;
            }

            const textarea = event.currentTarget;

            if (textarea.selectionStart < giftCardPrefix.length) {
              textarea.setSelectionRange(
                giftCardPrefix.length,
                giftCardPrefix.length,
              );
            }
          }}
        />

        {errors.message ? (
          <p className={styles.error} id="message-error">
            {errors.message.message}
          </p>
        ) : (
          <p className={styles.help} id="message-help">
            You can provide more details during your consultation.
          </p>
        )}
      </div>

      <button
        className={styles.submitButton}
        type="submit"
        disabled={isSubmitting || isArtistsLoading || isArtistsError}
      >
        {isSubmitting ? "Sending request..." : "Request consultation"}

        <span aria-hidden="true">→</span>
      </button>

      <p className={styles.disclaimer}>
        This is a consultation request. Your appointment will be confirmed after
        the studio contacts you.
      </p>
    </form>
  );
}
