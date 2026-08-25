import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header/Header";
import { requireAdmin } from "@/services/auth/admin.server";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Admin Panel | SCAR Tattoo Studio",
};

const adminSections = [
  {
    number: "01",
    title: "Bookings",
    description:
      "Manage consultation requests and booking statuses.",
    href: "/admin/bookings",
    active: true,
  },
  {
    number: "02",
    title: "Reviews",
    description:
      "Moderate client reviews before publication.",
    href: "/admin/reviews",
    active: true,
  },
  {
    number: "03",
    title: "Gallery",
    description:
      "Manage gallery images and portfolio content.",
    href: "#",
    active: false,
  },
  {
    number: "04",
    title: "Artists",
    description:
      "Manage artist profiles and portfolio details.",
    href: "#",
    active: false,
  },
  {
    number: "05",
    title: "Users",
    description:
      "Manage administrator access and user roles.",
    href: "#",
    active: false,
  },
];

export default async function AdminPage() {
  await requireAdmin();

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.section}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>
            Administration
          </p>

          <h1 className={styles.title}>
            Admin
            <span>dashboard.</span>
          </h1>

          <p className={styles.description}>
            Manage bookings, reviews and studio
            content from one place.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.list}>
            {adminSections.map((section) =>
              section.active ? (
                <Link
                  className={styles.item}
                  href={section.href}
                  key={section.number}
                >
                  <span className={styles.number}>
                    {section.number}
                  </span>

                  <div className={styles.itemContent}>
                    <div>
                      <h2>{section.title}</h2>

                      <p>
                        {section.description}
                      </p>
                    </div>

                    <span
                      className={styles.arrow}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </Link>
              ) : (
                <div
                  className={`${styles.item} ${styles.disabledItem}`}
                  key={section.number}
                >
                  <span className={styles.number}>
                    {section.number}
                  </span>

                  <div className={styles.itemContent}>
                    <div>
                      <div
                        className={
                          styles.titleRow
                        }
                      >
                        <h2>{section.title}</h2>

                        <span
                          className={
                            styles.comingSoon
                          }
                        >
                          Coming soon
                        </span>
                      </div>

                      <p>
                        {section.description}
                      </p>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>
    </main>
  );
}