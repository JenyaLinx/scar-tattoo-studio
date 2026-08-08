"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import styles from "./Hero.module.css";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "scar-theme";
const THEME_CHANGE_EVENT = "scar-theme-change";

const getBrowserTheme = (): Theme => {
  const theme = document.documentElement.dataset.theme;

  if (theme === "light" || theme === "dark") {
    return theme;
  }

  const saved = localStorage.getItem(THEME_STORAGE_KEY);

  if (saved === "light" || saved === "dark") {
    return saved;
  }

  return "light";
};

const getServerTheme = (): Theme => "light";

const subscribe = (callback: () => void) => {
  window.addEventListener(THEME_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
  };
};

export default function Hero() {
  const theme = useSyncExternalStore(
    subscribe,
    getBrowserTheme,
    getServerTheme
  );

  const heroImage =
  theme === "dark"
    ? "/images/hero-dark.jpg"
    : "/images/hero-light.jpg";

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>London tattoo studio</p>

        <h1 className={styles.title}>
          Art that stays
          <span>with you.</span>
        </h1>

        <p className={styles.description}>
          Custom tattoos created by experienced artists with precision,
          character and care.
        </p>

        <div className={styles.actions}>
          <Link className={styles.primaryButton} href="/booking">
            Book consultation
          </Link>

          <Link className={styles.secondaryButton} href="/artists">
            Meet our artists
          </Link>
        </div>
      </div>

      <div className={styles.imageWrapper}>
        <Image
          key={heroImage}
          src={heroImage}
          alt="Tattoo artwork"
          fill
          priority
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        <div className={styles.imageOverlay} />

        <div className={styles.imageLabel}>
          <span className={styles.imageNumber}>01</span>

          <div>
            <p className={styles.imageLabelTitle}>Individual designs</p>
            <p className={styles.imageLabelText}>
              Created specifically for you
            </p>
          </div>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span className={styles.detailNumber}>3</span>
          <span className={styles.detailText}>Professional artists</span>
        </div>

        <div className={styles.detailItem}>
          <span className={styles.detailNumber}>100%</span>
          <span className={styles.detailText}>Custom artwork</span>
        </div>

        <div className={styles.detailItem}>
          <span className={styles.detailNumber}>5★</span>
          <span className={styles.detailText}>Client experience</span>
        </div>
      </div>
    </section>
  );
}