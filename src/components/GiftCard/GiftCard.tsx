import Image from "next/image";
import Link from "next/link";

import styles from "./GiftCard.module.css";

type GiftCardProps = {
  value: number;
};

export default function GiftCard({ value }: GiftCardProps) {
  return (
    <article className={styles.card}>
      <Link
        className={styles.imageLink}
        href={`/gift-cards/${value}`}
        aria-label={`View £${value} SCAR gift card`}
      >
        <div className={styles.imageWrapper}>
          <Image
            className={`${styles.image} ${styles.lightImage}`}
            src={`/gift-cards/gift-card-${value}-light.jpg`}
            alt={`SCAR Tattoo Studio £${value} gift card`}
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
          />

          <Image
            className={`${styles.image} ${styles.darkImage}`}
            src={`/gift-cards/gift-card-${value}-dark.jpg`}
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
          />
        </div>
      </Link>

      <div className={styles.content}>
        <div>
          <p className={styles.label}>SCAR Gift Card</p>

          <h2 className={styles.value}>£{value}</h2>
        </div>

        <Link className={styles.viewLink} href={`/gift-cards/${value}`}>
          View card
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
