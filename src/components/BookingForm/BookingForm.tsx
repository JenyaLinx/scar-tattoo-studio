"use client";

import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { artists } from "@/data/artists";
import {
  bookingSchema,
  type BookingFormValues,
} from "@/lib/validations/bookingSchema";
import styles from "./BookingForm.module.css";

type BookingFormProps = {
  initialArtist?: string;
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
}: BookingFormProps) {
  const minimumDate = useMemo(() => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }, []);

  const validInitialArtist = artists.some(
    (artist) => artist.slug === initialArtist,
  )
    ? initialArtist
    : "";

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      artist: validInitialArtist,
      date: "",
      time: "",
      phone: "",
      message: "",
    },
  });

  const message =
    useWatch({
      control,
      name: "message",
    }) ?? "";

  const onSubmit = async (values: BookingFormValues) => {
    try {
      console.log("Booking request:", values);

      await new Promise((resolve) => {
        window.setTimeout(resolve, 700);
      });

      toast.success("Your consultation request has been sent.");

      reset({
        artist: values.artist,
        date: "",
        time: "",
        phone: "",
        message: "",
      });
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
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
            aria-invalid={Boolean(errors.artist)}
            aria-describedby={errors.artist ? "artist-error" : undefined}
            {...register("artist")}
          >
            <option value="">Select an artist</option>

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
          aria-describedby={
            errors.message ? "message-error" : "message-help"
          }
          {...register("message")}
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
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending request..." : "Request consultation"}

        <span aria-hidden="true">→</span>
      </button>

      <p className={styles.disclaimer}>
        This is a consultation request. Your appointment will be confirmed
        after the studio contacts you.
      </p>
    </form>
  );
}