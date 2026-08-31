import Header from "@/components/Header/Header";

import styles from "./loading.module.css";

const bookingSkeletons = [1, 2];

export default function MyBookingsLoading() {
  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <div className={styles.eyebrow} />
        <div className={styles.title} />
        <div className={styles.description} />
      </section>

      <section className={styles.bookings}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel} />
          <div className={styles.count} />
        </div>

        <div className={styles.list}>
          {bookingSkeletons.map((booking) => (
            <article className={styles.booking} key={booking}>
              <div className={styles.bookingTop}>
                <div className={styles.number} />

                <div className={styles.status} />
              </div>

              <div className={styles.artist}>
                <div className={styles.smallLabel} />
                <div className={styles.artistName} />
                <div className={styles.specialty} />
              </div>

              <div className={styles.details}>
                <div className={styles.detailRow}>
                  <div className={styles.detailLabel} />
                  <div className={styles.detailValue} />
                </div>

                <div className={styles.detailRow}>
                  <div className={styles.detailLabel} />
                  <div className={styles.detailValueSmall} />
                </div>

                <div className={styles.detailRow}>
                  <div className={styles.detailLabel} />
                  <div className={styles.detailValue} />
                </div>
              </div>

              <div className={styles.message}>
                <div className={styles.smallLabel} />

                <div className={styles.messageLine} />
                <div className={styles.messageLineShort} />
              </div>

              <div className={styles.artistLink} />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
