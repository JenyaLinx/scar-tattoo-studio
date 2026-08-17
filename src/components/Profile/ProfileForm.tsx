"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { updateProfile } from "@/services/profile/profile.client";
import {
  profileSchema,
  type ProfileFormValues,
} from "@/lib/validations/profileSchema";

import styles from "./ProfileForm.module.css";

type ProfileFormProps = {
  initialFullName: string;
  initialPhone: string;
  email: string;
};

export default function ProfileForm({
  initialFullName,
  initialPhone,
  email,
}: ProfileFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
      isDirty,
    },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: initialFullName,
      phone: initialPhone,
    },
  });

  const onSubmit = async (
    values: ProfileFormValues,
  ) => {
    try {
      await updateProfile(values);

      toast.success("Profile updated.");

      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to update profile.",
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
        <label className={styles.label}>
          Email
        </label>

        <input
          className={`${styles.input} ${styles.readOnly}`}
          value={email}
          type="email"
          disabled
        />

        <p className={styles.help}>
          Email changes will be available separately.
        </p>
      </div>

      <div className={styles.field}>
        <label
          className={styles.label}
          htmlFor="fullName"
        >
          Full name
        </label>

        <input
          className={`${styles.input} ${
            errors.fullName
              ? styles.inputError
              : ""
          }`}
          id="fullName"
          type="text"
          autoComplete="name"
          {...register("fullName")}
        />

        {errors.fullName && (
          <p className={styles.error}>
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label
          className={styles.label}
          htmlFor="phone"
        >
          Phone number
        </label>

        <input
          className={`${styles.input} ${
            errors.phone ? styles.inputError : ""
          }`}
          id="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+44 7000 000000"
          {...register("phone")}
        />

        {errors.phone && (
          <p className={styles.error}>
            {errors.phone.message}
          </p>
        )}
      </div>

      <button
        className={styles.submit}
        type="submit"
        disabled={
          isSubmitting || !isDirty
        }
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