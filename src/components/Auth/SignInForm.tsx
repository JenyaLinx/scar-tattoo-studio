"use client";

import Link from "next/link";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { signIn } from "@/services/auth/auth.client";
import {
  signInSchema,
  type SignInFormValues,
} from "@/lib/validations/authSchema";

import styles from "./AuthForm.module.css";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (
    values: SignInFormValues,
  ) => {
    try {
      await signIn(values);

      toast.success("Welcome back.");

      const next = searchParams.get("next");

      const destination =
        next && next.startsWith("/")
          ? next
          : "/profile";

      router.push(destination);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to sign in.",
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

      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label
            className={styles.label}
            htmlFor="password"
          >
            Password
          </label>

          <Link
            className={styles.forgot}
            href="/forgot-password"
          >
            Forgot password?
          </Link>
        </div>

        <input
          className={`${styles.input} ${
            errors.password
              ? styles.inputError
              : ""
          }`}
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="Your password"
          {...register("password")}
        />

        {errors.password && (
          <p className={styles.error}>
            {errors.password.message}
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
            ? "Signing in..."
            : "Sign in"}
        </span>

        <span aria-hidden="true">→</span>
      </button>

      <p className={styles.switchText}>
        New to SCAR?{" "}
        <Link href="/sign-up">
          Create an account
        </Link>
      </p>
    </form>
  );
}