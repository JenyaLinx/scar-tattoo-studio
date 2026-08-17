"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { signOut } from "@/services/auth/auth.client";

import styles from "./SignOutButton.module.css";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();

      toast.success("Signed out.");

      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to sign out.",
      );
    }
  };

  return (
    <button
      className={styles.button}
      type="button"
      onClick={handleSignOut}
    >
      Sign out
      <span aria-hidden="true">→</span>
    </button>
  );
}