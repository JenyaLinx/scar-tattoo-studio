"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import type { Artist } from "@/types/artist";
import {
  artistAdminSchema,
  type ArtistAdminFormValues,
} from "@/lib/validations/artistSchema";
import { updateArtist } from "@/app/admin/artists/[id]/actions";

import styles from "./ArtistEditForm.module.css";

type ArtistEditFormProps = {
  artist: Artist;
};

export default function ArtistEditForm({
  artist,
}: ArtistEditFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
      isDirty,
    },
  } = useForm<ArtistAdminFormValues>({
    resolver: zodResolver(artistAdminSchema),
    defaultValues: {
      name: artist.name,
      specialty: artist.specialty,
      experience: artist.experience ?? "",
      description: artist.description ?? "",
      biography: artist.biography ?? "",
      instagramUrl:
        artist.instagram_url ?? "",
      tiktokUrl: artist.tiktok_url ?? "",
      facebookUrl:
        artist.facebook_url ?? "",
      isActive: artist.is_active,
    },
  });

  const onSubmit = async (
    values: ArtistAdminFormValues,
  ) => {
    try {
      await updateArtist(artist.id, values);

      toast.success("Artist updated.");

      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to update artist.",
      );
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className={styles.field}>
        <label
          className={styles.label}
          htmlFor="name"
        >
          Name
        </label>

        <input
          className={`${styles.input} ${
            errors.name
              ? styles.inputError
              : ""
          }`}
          id="name"
          {...register("name")}
        />

        {errors.name && (
          <p className={styles.error}>
            {errors.name.message}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label
          className={styles.label}
          htmlFor="specialty"
        >
          Specialty
        </label>

        <input
          className={`${styles.input} ${
            errors.specialty
              ? styles.inputError
              : ""
          }`}
          id="specialty"
          {...register("specialty")}
        />

        {errors.specialty && (
          <p className={styles.error}>
            {errors.specialty.message}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label
          className={styles.label}
          htmlFor="experience"
        >
          Experience
        </label>

        <input
          className={`${styles.input} ${
            errors.experience
              ? styles.inputError
              : ""
          }`}
          id="experience"
          {...register("experience")}
        />

        {errors.experience && (
          <p className={styles.error}>
            {errors.experience.message}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label
          className={styles.label}
          htmlFor="description"
        >
          Description
        </label>

        <textarea
          className={`${styles.input} ${styles.textareaSmall}`}
          id="description"
          rows={4}
          {...register("description")}
        />

        {errors.description && (
          <p className={styles.error}>
            {errors.description.message}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label
          className={styles.label}
          htmlFor="biography"
        >
          Biography
        </label>

        <textarea
          className={`${styles.input} ${styles.textarea}`}
          id="biography"
          rows={8}
          {...register("biography")}
        />

        {errors.biography && (
          <p className={styles.error}>
            {errors.biography.message}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label
          className={styles.label}
          htmlFor="instagramUrl"
        >
          Instagram URL
        </label>

        <input
          className={styles.input}
          id="instagramUrl"
          type="url"
          {...register("instagramUrl")}
        />

        {errors.instagramUrl && (
          <p className={styles.error}>
            {errors.instagramUrl.message}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label
          className={styles.label}
          htmlFor="tiktokUrl"
        >
          TikTok URL
        </label>

        <input
          className={styles.input}
          id="tiktokUrl"
          type="url"
          {...register("tiktokUrl")}
        />

        {errors.tiktokUrl && (
          <p className={styles.error}>
            {errors.tiktokUrl.message}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label
          className={styles.label}
          htmlFor="facebookUrl"
        >
          Facebook URL
        </label>

        <input
          className={styles.input}
          id="facebookUrl"
          type="url"
          {...register("facebookUrl")}
        />

        {errors.facebookUrl && (
          <p className={styles.error}>
            {errors.facebookUrl.message}
          </p>
        )}
      </div>

      <label className={styles.statusField}>
        <input
          className={styles.checkbox}
          type="checkbox"
          {...register("isActive")}
        />

        <div>
          <span className={styles.statusTitle}>
            Artist visible
          </span>

          <p className={styles.statusHelp}>
            Turn this off to hide the artist
            from the public website without
            deleting their profile.
          </p>
        </div>
      </label>

      <button
        className={styles.submit}
        type="submit"
        disabled={isSubmitting || !isDirty}
      >
        <span>
          {isSubmitting
            ? "Saving..."
            : "Save changes"}
        </span>

        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}