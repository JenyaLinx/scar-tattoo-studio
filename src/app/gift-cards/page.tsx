import type { Metadata } from "next";

import Header from "@/components/Header/Header";
import GiftCard from "@/components/GiftCard/GiftCard";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Gift Cards | SCAR Tattoo Studio",
  description:
    "Choose a SCAR Tattoo Studio gift card for yourself or someone special.",
};

const giftCards = [100, 200, 400, 500];

export default function GiftCardsPage() {
  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <p className={styles.eyebrow}>SCAR Gift Cards</p>

        <h1 className={styles.title}>
          Give something
          <span>that lasts.</span>
        </h1>

        <p className={styles.description}>
          Whatever the occasion, a SCAR Gift Card is the perfect way to make a
          dream tattoo a reality — whether it&apos;s for you or someone special.
        </p>
      </section>

      <section className={styles.cardsSection}>
        <div className={styles.cardsHeading}>
          <p>Choose your gift card</p>

          <span>04 options</span>
        </div>

        <div className={styles.grid}>
          {giftCards.map((value) => (
            <GiftCard key={value} value={value} />
          ))}
        </div>
      </section>
    </main>
  );
}
