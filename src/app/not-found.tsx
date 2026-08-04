import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFoundPage() {
  return (
    <main className={styles.page}>
      <p className={styles.code}>404</p>

      <h1 className={styles.title}>
        This page left
        <span>no permanent mark.</span>
      </h1>

      <p className={styles.description}>
        The page you are looking for does not exist or may have been moved.
      </p>

      <Link className={styles.link} href="/">
        Return home
      </Link>
    </main>
  );
}