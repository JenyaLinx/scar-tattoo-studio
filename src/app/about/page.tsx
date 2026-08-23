import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header/Header";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About | SCAR Tattoo Studio",
  description:
    "Discover SCAR Tattoo Studio, our approach to tattooing and the artists behind the work.",
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <p className={styles.eyebrow}>
          About SCAR
        </p>

        <h1 className={styles.title}>
          Tattooing with
          <span>character.</span>
        </h1>

        <p className={styles.description}>
          SCAR is a London tattoo studio focused on
          individual work, thoughtful design and
          long-lasting results.
        </p>
      </section>

      <section className={styles.story}>
        <div className={styles.sectionHeading}>
          <span className={styles.number}>01</span>

          <p className={styles.sectionEyebrow}>
            Our philosophy
          </p>
        </div>

        <div className={styles.storyContent}>
          <h2>
            Every tattoo starts with
            <span>your story.</span>
          </h2>

          <div className={styles.copy}>
            <p>
              We believe a tattoo should feel personal,
              considered and completely yours.
            </p>

            <p>
              From the first consultation to the final
              detail, our artists work closely with
              every client to create a piece that fits
              their idea, body and individual style.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.values}>
        <article className={styles.value}>
          <span>01</span>
          <h3>Individual approach</h3>
          <p>
            Every project is developed around the
            client rather than copied from a template.
          </p>
        </article>

        <article className={styles.value}>
          <span>02</span>
          <h3>Experienced artists</h3>
          <p>
            Different styles, techniques and creative
            approaches within one studio.
          </p>
        </article>

        <article className={styles.value}>
          <span>03</span>
          <h3>Quality & care</h3>
          <p>
            Professional standards, attention to detail
            and guidance throughout the process.
          </p>
        </article>
      </section>

      <section className={styles.cta}>
        <p className={styles.sectionEyebrow}>
          Find your artist
        </p>

        <h2>
          Ready to leave
          <span>your mark?</span>
        </h2>

        <div className={styles.ctaActions}>
          <Link
            className={styles.primaryLink}
            href="/artists"
          >
            Meet our artists
            <span aria-hidden="true">→</span>
          </Link>

          <Link
            className={styles.secondaryLink}
            href="/booking"
          >
            Book consultation
          </Link>
        </div>
      </section>
    </main>
  );
}