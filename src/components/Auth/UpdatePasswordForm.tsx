"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  updatePasswordSchema,
  type UpdatePasswordFormValues,
} from "@/lib/validations/authSchema";
import { updatePassword } from "@/services/auth/auth.client";

import styles from "./AuthForm.module.css";

export default function UpdatePasswordForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(
      updatePasswordSchema,
    ),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (
    values: UpdatePasswordFormValues,
  ) => {
    try {
      await updatePassword(
        values.password,
      );

      toast.success(
        "Password updated successfully.",
      );

      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to update password.",
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
          htmlFor="password"
        >
          New password
        </label>

        <input
          className={`${styles.input} ${
            errors.password
              ? styles.inputError
              : ""
          }`}
          id="password"
          type="password"
          autoComplete="new-password"
          placeholder="Minimum 8 characters"
          {...register("password")}
        />

        {errors.password && (
          <p className={styles.error}>
            {errors.password.message}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label
          className={styles.label}
          htmlFor="confirmPassword"
        >
          Confirm new password
        </label>

        <input
          className={`${styles.input} ${
            errors.confirmPassword
              ? styles.inputError
              : ""
          }`}
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Repeat new password"
          {...register("confirmPassword")}
        />

        {errors.confirmPassword && (
          <p className={styles.error}>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        className={styles.submit}
        type="submit"
        disabled={isSubmitting}
      >
        <span>
          {isSubmitting
            ? "Updating..."
            : "Update password"}
        </span>

        <span aria-hidden="true">
          →
        </span>
      </button>
    </form>
  );
}