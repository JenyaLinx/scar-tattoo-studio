"use client";

import { useState } from "react";
import styles from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "scar-theme";

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";

    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      className={styles.toggle}
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      <span className={styles.icon} aria-hidden="true">
        {theme === "light" ? "☾" : "☀"}
      </span>
    </button>
  );
}