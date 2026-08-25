"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/services/auth/auth.client";

import styles from "./Header.module.css";

type UserRole = "client" | "admin";

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
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] =
    useState<UserRole | null>(null);
  const [isAuthLoading, setIsAuthLoading] =
    useState(true);

  useEffect(() => {
    const supabase = createClient();

    const loadRole = async (
      currentUser: User | null,
    ) => {
      if (!currentUser) {
        setUserRole(null);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", currentUser.id)
        .maybeSingle();

      if (error) {
        console.error(
          "Unable to load user role:",
          error,
        );

        setUserRole(null);
        return;
      }

      setUserRole(
        data?.role === "admin"
          ? "admin"
          : "client",
      );
    };

    const loadUser = async () => {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      setUser(currentUser);

      await loadRole(currentUser);

      setIsAuthLoading(false);
    };

    void loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const currentUser =
          session?.user ?? null;

        setUser(currentUser);

        void loadRole(currentUser).finally(() => {
          setIsAuthLoading(false);
        });
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen
      ? "hidden"
      : "";

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

  const handleSignOut = async () => {
    try {
      await signOut();

      setUser(null);
      setUserRole(null);

      closeMenu();

      window.location.href = "/";
    } catch (error) {
      console.error(
        "Unable to sign out:",
        error,
      );
    }
  };

  const accountLinks = user
  ? userRole === "admin"
    ? [
        {
          label: "Admin bookings",
          href: "/admin/bookings",
        },
        {
          label: "Admin reviews",
          href: "/admin/reviews",
        },
        {
          label: "Profile",
          href: "/profile",
        },
      ]
    : [
        {
          label: "My bookings",
          href: "/my-bookings",
        },
        {
          label: "Profile",
          href: "/profile",
        },
      ]
  : [
      {
        label: "Sign in",
        href: "/sign-in",
      },
      {
        label: "Create account",
        href: "/sign-up",
      },
    ];
  
  const allNavigationLinks = [
    ...navigationLinks,
    ...accountLinks,
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link
          className={styles.logo}
          href="/"
          onClick={closeMenu}
          aria-label="SCAR Tattoo Studio home page"
        >
          <span className={styles.logoMain}>
            SCAR
          </span>

          <span className={styles.logoSmall}>
            Tattoo Studio
          </span>
        </Link>

        <div className={styles.controls}>
          <ThemeToggle />

          <button
            className={`${styles.menuButton} ${
              isMenuOpen
                ? styles.menuButtonOpen
                : ""
            }`}
            type="button"
            onClick={toggleMenu}
            aria-label={
              isMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
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
          isMenuOpen
            ? styles.menuOverlayOpen
            : ""
        }`}
        aria-hidden={!isMenuOpen}
      >
        <nav
          className={styles.navigation}
          id="mobile-navigation"
          aria-label="Main navigation"
        >
          {!isAuthLoading && (
            <ul className={styles.navigationList}>
              {allNavigationLinks.map(
                (link, index) => (
                  <li
                    className={
                      styles.navigationItem
                    }
                    key={link.href}
                    style={
                      {
                        "--navigation-delay": `${index * 45}ms`,
                      } as React.CSSProperties
                    }
                  >
                    <Link
                      className={
                        styles.navigationLink
                      }
                      href={link.href}
                      onClick={closeMenu}
                      tabIndex={
                        isMenuOpen ? 0 : -1
                      }
                    >
                      <span
                        className={
                          styles.navigationNumber
                        }
                      >
                        {String(
                          index + 1,
                        ).padStart(2, "0")}
                      </span>

                      <span>
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ),
              )}
            </ul>
          )}

          <div className={styles.menuActions}>
            <Link
              className={styles.bookingLink}
              href="/booking"
              onClick={closeMenu}
              tabIndex={isMenuOpen ? 0 : -1}
            >
              Book a consultation
            </Link>

            {user && (
              <button
                className={
                  styles.signOutButton
                }
                type="button"
                onClick={handleSignOut}
                tabIndex={
                  isMenuOpen ? 0 : -1
                }
              >
                Sign out
              </button>
            )}
          </div>

          <div className={styles.menuFooter}>
            <p
              className={
                styles.menuFooterText
              }
            >
              Custom tattoos created with
              precision, character and care.
            </p>

            <div
              className={styles.socialLinks}
            >
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                tabIndex={
                  isMenuOpen ? 0 : -1
                }
              >
                Instagram
              </a>

              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noreferrer"
                tabIndex={
                  isMenuOpen ? 0 : -1
                }
              >
                TikTok
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                tabIndex={
                  isMenuOpen ? 0 : -1
                }
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