import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/Header/Header";

import styles from "./page.module.css";

type GiftCardPageProps = {
  params: Promise<{
    value: string;
  }>;
};

const allowedValues = [100, 200, 400, 500];

export async function generateMetadata({
  params,
}: GiftCardPageProps): Promise<Metadata> {
  const { value } = await params;

  const numericValue = Number(value);

  if (!allowedValues.includes(numericValue)) {
    return {
      title: "Gift Card Not Found | SCAR Tattoo Studio",
    };
  }

  return {
    title: `£${numericValue} Gift Card | SCAR Tattoo Studio`,
    description: `Discover the £${numericValue} SCAR Tattoo Studio Gift Card.`,
  };
}

export default async function GiftCardPage({ params }: GiftCardPageProps) {
  const { value } = await params;

  const numericValue = Number(value);

  if (!allowedValues.includes(numericValue)) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.section}>
        <div className={styles.imageSide}>
          <div className={styles.imageWrapper}>
            <Image
              className={`${styles.image} ${styles.lightImage}`}
              src={`/gift-cards/gift-card-${numericValue}-light.jpg`}
              alt={`SCAR Tattoo Studio £${numericValue} gift card`}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 50vw"
            />

            <Image
              className={`${styles.image} ${styles.darkImage}`}
              src={`/gift-cards/gift-card-${numericValue}-dark.jpg`}
              alt=""
              aria-hidden="true"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>SCAR Gift Card</p>

          <h1 className={styles.title}>
            £{numericValue}
            <span>gift card.</span>
          </h1>

          <p className={styles.description}>
            Whatever the occasion, a SCAR Gift Card is the perfect way to make a
            dream tattoo a reality — whether it&apos;s for you or someone
            special.
          </p>

          <div className={styles.info}>
            <div className={styles.infoBlock}>
              <span>How to use it</span>

              <p>
                Mention your £{numericValue} gift card when making a booking, or
                contact the studio directly by phone to discuss the details.
              </p>
            </div>

            <div className={styles.infoBlock}>
              <span>Perfect for</span>

              <p>
                Birthdays, anniversaries, celebrations or simply treating
                someone to something personal.
              </p>
            </div>
          </div>

          <div className={styles.actions}>
            <Link
              className={styles.primaryButton}
              href={`/booking?giftCard=${numericValue}`}
            >
              Book consultation
              <span aria-hidden="true">→</span>
            </Link>

            <Link className={styles.secondaryButton} href="/contact">
              Contact studio
            </Link>
          </div>

          <Link className={styles.backLink} href="/gift-cards">
            ← All gift cards
          </Link>
        </div>
      </section>
    </main>
  );
}
