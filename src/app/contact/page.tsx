import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header/Header";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact | SCAR Tattoo Studio",
  description:
    "Contact SCAR Tattoo Studio in London and book your tattoo consultation.",
};

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <p className={styles.eyebrow}>
          Contact
        </p>

        <h1 className={styles.title}>
          Start the
          <span>conversation.</span>
        </h1>

        <p className={styles.description}>
          Have a tattoo idea or a question before
          booking? Get in touch with the studio.
        </p>
      </section>

      <section className={styles.contact}>
        <div className={styles.contactItem}>
          <span>01</span>

          <div>
            <p className={styles.label}>
              Studio
            </p>

            <h2>London, United Kingdom</h2>
          </div>
        </div>

        <div className={styles.contactItem}>
          <span>02</span>

          <div>
            <p className={styles.label}>
              Phone
            </p>

            <p className={styles.contactValue}>
              +44 00 0000 000
            </p>
          </div>
        </div>

        <div className={styles.contactItem}>
          <span>03</span>

          <div>
            <p className={styles.label}>
              Email
            </p>

            <p className={styles.contactValue}>
              Mail @ ScarTattoo
            </p>
          </div>
        </div>

        <div className={styles.contactItem}>
          <span>04</span>

          <div>
            <p className={styles.label}>
              Opening hours
            </p>

            <div className={styles.hours}>
              <p>
                <span>Mon – Sat</span>
                <strong>10:00 – 22:00</strong>
              </p>

              <p>
                <span>Sunday</span>
                <strong>Closed</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.booking}>
        <p className={styles.eyebrow}>
          Consultation
        </p>

        <h2>
          Have something
          <span>in mind?</span>
        </h2>

        <p>
          Choose an artist, preferred date and time
          and send your consultation request online.
        </p>

        <Link
          className={styles.bookingLink}
          href="/booking"
        >
          Book a consultation
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}