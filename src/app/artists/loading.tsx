import Header from "@/components/Header/Header";

import styles from "./loading.module.css";

const skeletonCards = [1, 2, 3];

export default function ArtistsLoading() {
  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <div className={styles.eyebrow} />

        <div className={styles.title}>
          <span />
          <span />
        </div>

        <div className={styles.description}>
          <span />
          <span />
        </div>
      </section>

      <section className={styles.grid}>
        {skeletonCards.map((card) => (
          <article className={styles.card} key={card}>
            <div className={styles.image} />

            <div className={styles.content}>
              <div className={styles.name} />

              <div className={styles.role} />

              <div className={styles.text}>
                <span />
                <span />
              </div>

              <div className={styles.link} />
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
