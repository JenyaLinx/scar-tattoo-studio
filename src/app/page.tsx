import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.page}>
      <div className={styles.topBar}>
        <div className={styles.logo}>
          <span className={styles.logoMain}>SCAR</span>
          <span className={styles.logoSmall}>Tattoo Studio</span>
        </div>

        <ThemeToggle />
      </div>

      <section className={styles.hero}>
        <p className={styles.eyebrow}>Professional tattoo studio</p>

        <h1 className={styles.title}>
          Art that stays
          <br />
          with you
        </h1>

        <p className={styles.description}>
          Custom tattoos created by experienced artists with precision,
          character and care.
        </p>

        <div className={styles.actions}>
          <button className={styles.primaryButton} type="button">
            Book a consultation
          </button>

          <button className={styles.secondaryButton} type="button">
            View artists
          </button>
        </div>
      </section>
    </main>
  );
}