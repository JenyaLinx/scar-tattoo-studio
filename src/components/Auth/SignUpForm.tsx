"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { signUp } from "@/services/auth/auth.client";
import {
  signUpSchema,
  type SignUpFormValues,
} from "@/lib/validations/authSchema";

import styles from "./AuthForm.module.css";

export default function SignUpForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (
    values: SignUpFormValues,
  ) => {
    try {
      const data = await signUp({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      });

      if (!data.session) {
        toast.success(
          "Account created. Check your email to confirm your account.",
        );

        router.push("/sign-in");
        return;
      }

      toast.success("Account created successfully.");

      router.push("/profile");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to create account.",
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
          htmlFor="fullName"
        >
          Full name
        </label>

        <input
          className={`${styles.input} ${
            errors.fullName ? styles.inputError : ""
          }`}
          id="fullName"
          type="text"
          autoComplete="name"
          placeholder="Your name"
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
          htmlFor="email"
        >
          Email
        </label>

        <input
          className={`${styles.input} ${
            errors.email ? styles.inputError : ""
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
        <label
          className={styles.label}
          htmlFor="password"
        >
          Password
        </label>

        <input
          className={`${styles.input} ${
            errors.password ? styles.inputError : ""
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
          Confirm password
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
          placeholder="Repeat your password"
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
            ? "Creating account..."
            : "Create account"}
        </span>

        <span aria-hidden="true">→</span>
      </button>

      <p className={styles.switchText}>
        Already have an account?{" "}
        <Link href="/sign-in">Sign in</Link>
      </p>
    </form>
  );
}