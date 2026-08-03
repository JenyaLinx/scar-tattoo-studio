"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import styles from "./Header.module.css";

const navigationLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Artists",
    href: "/artists",
  },
  {
    label: "Gallery",
    href: "/gallery",
  },
  {
    label: "Booking",
    href: "/booking",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((currentState) => !currentState);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link
          className={styles.logo}
          href="/"
          onClick={closeMenu}
          aria-label="SCAR Tattoo Studio home page"
        >
          <span className={styles.logoMain}>SCAR</span>
          <span className={styles.logoSmall}>Tattoo Studio</span>
        </Link>

        <div className={styles.controls}>
          <ThemeToggle />

          <button
            className={`${styles.menuButton} ${
              isMenuOpen ? styles.menuButtonOpen : ""
            }`}
            type="button"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span className={styles.menuLine} />
            <span className={styles.menuLine} />
          </button>
        </div>
      </div>

      <div
        className={`${styles.menuOverlay} ${
          isMenuOpen ? styles.menuOverlayOpen : ""
        }`}
        aria-hidden={!isMenuOpen}
      >
        <nav
          className={styles.navigation}
          id="mobile-navigation"
          aria-label="Main navigation"
        >
          <ul className={styles.navigationList}>
            {navigationLinks.map((link, index) => (
              <li
                className={styles.navigationItem}
                key={link.href}
                style={{
                  "--navigation-delay": `${index * 45}ms`,
                } as React.CSSProperties}
              >
                <Link
                  className={styles.navigationLink}
                  href={link.href}
                  onClick={closeMenu}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  <span className={styles.navigationNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            className={styles.bookingLink}
            href="/booking"
            onClick={closeMenu}
            tabIndex={isMenuOpen ? 0 : -1}
          >
            Book a consultation
          </Link>

          <div className={styles.menuFooter}>
            <p className={styles.menuFooterText}>
              Custom tattoos created with precision, character and care.
            </p>

            <div className={styles.socialLinks}>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                tabIndex={isMenuOpen ? 0 : -1}
              >
                Instagram
              </a>

              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noreferrer"
                tabIndex={isMenuOpen ? 0 : -1}
              >
                TikTok
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                tabIndex={isMenuOpen ? 0 : -1}
              >
                Facebook
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}