import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>Cheltenham tattoo studio</p>

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
          className={styles.image}
          src="/images/hero-tattoo.jpg"
          alt="Professional tattoo artwork created at SCAR Tattoo Studio"
          fill
          priority
          sizes="(max-width: 767px) 100vw, 50vw"
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