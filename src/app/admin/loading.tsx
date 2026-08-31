import Header from "@/components/Header/Header";

import styles from "./loading.module.css";

const skeletonItems = [1, 2, 3];

export default function AdminLoading() {
  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.section}>
        <div className={styles.heading}>
          <div className={styles.eyebrow} />
          <div className={styles.title} />
          <div className={styles.description} />
        </div>

        <div className={styles.content}>
          {skeletonItems.map((item) => (
            <article className={styles.card} key={item}>
              <div className={styles.cardTop}>
                <div className={styles.number} />
                <div className={styles.status} />
              </div>

              <div className={styles.block}>
                <div className={styles.label} />
                <div className={styles.name} />
                <div className={styles.subText} />
              </div>

              <div className={styles.details}>
                <div className={styles.row}>
                  <div className={styles.rowLabel} />
                  <div className={styles.rowValue} />
                </div>

                <div className={styles.row}>
                  <div className={styles.rowLabel} />
                  <div className={styles.rowValueSmall} />
                </div>

                <div className={styles.row}>
                  <div className={styles.rowLabel} />
                  <div className={styles.rowValue} />
                </div>
              </div>

              <div className={styles.actions}>
                <div className={styles.button} />
                <div className={styles.button} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
