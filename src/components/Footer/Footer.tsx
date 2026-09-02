import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.contact}>
          <p className={styles.location}>London, United Kingdom</p>

          <a className={styles.link} href="tel:+44000000000">
            +44 00 0000 000
          </a>

          <a className={styles.link} href="mailto:mail@scartattoo.co.uk">
            Mail @ ScarTattoo
          </a>
        </div>

        <div className={styles.hours}>
          <p className={styles.hoursTitle}>Opening hours</p>

          <div className={styles.hoursRow}>
            <span>Mon – Sat</span>
            <span>10:00 – 22:00</span>
          </div>

          <div className={styles.hoursRow}>
            <span>Sunday</span>
            <span>Closed</span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.copyright}>
          <p>© 2026 SCAR Tattoo Studio.</p>
          <p>All rights reserved.</p>
        </div>

        <p className={styles.credit}>
          Designed &amp; developed by{" "}
          <a href="https://oliinyk-portfolio-web.netlify.app/">Yevhenii O.</a>
        </p>
      </div>
    </footer>
  );
}
