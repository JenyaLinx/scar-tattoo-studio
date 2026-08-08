import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.info}>
          <p>London, United Kingdom</p>

          <a href="tel:+440000000000">+44 00 0000 000</a>

          <a href="mailto:mail@scartattoo.co.uk">
            Mail @ ScarTattoo
          </a>
        </div>

        <div className={styles.hours}>
          <p className={styles.title}>Opening Hours</p>

          <p>Mon – Sat</p>
          <p>10:00 – 22:00</p>

          <div className={styles.space}></div>

          <p>Sunday</p>
          <p>Closed</p>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2026 SCAR Tattoo Studio.</p>
        <p>All rights reserved.</p>
      </div>
    </footer>
  );
}