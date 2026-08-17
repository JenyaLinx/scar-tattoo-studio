"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/lib/validations/authSchema";
import { requestPasswordReset } from "@/services/auth/auth.client";

import styles from "./AuthForm.module.css";

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(
      forgotPasswordSchema,
    ),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (
    values: ForgotPasswordFormValues,
  ) => {
    try {
      await requestPasswordReset(
        values.email,
      );

      toast.success(
        "Password reset link sent. Check your email.",
      );

      reset();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to send reset email.",
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
          htmlFor="email"
        >
          Email
        </label>

        <input
          className={`${styles.input} ${
            errors.email
              ? styles.inputError
              : ""
          }`}
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          {...register("email")}
        />

        {errors.email && (
          <p className={styles.error}>
            {errors.email.message}
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
            ? "Sending..."
            : "Send reset link"}
        </span>

        <span aria-hidden="true">→</span>
      </button>

      <p className={styles.switchText}>
        Remember your password?{" "}
        <Link href="/sign-in">
          Sign in
        </Link>
      </p>
    </form>
  );
}