import type { Metadata } from "next";
import { redirect } from "next/navigation";

import BookingForm from "@/components/BookingForm/BookingForm";
import Header from "@/components/Header/Header";
import { getCurrentUser } from "@/services/auth/auth.server";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Book a Consultation | SCAR Tattoo Studio",
  description:
    "Choose your tattoo artist, preferred date and time, and request a consultation at SCAR Tattoo Studio.",
};

type BookingPageProps = {
  searchParams: Promise<{
    artist?: string | string[];
    giftCard?: string | string[];
  }>;
};

const allowedGiftCards = [100, 200, 400, 500];

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const user = await getCurrentUser();

  const resolvedSearchParams = await searchParams;

  const initialArtist =
    typeof resolvedSearchParams.artist === "string"
      ? resolvedSearchParams.artist
      : "";

  const giftCardParam =
    typeof resolvedSearchParams.giftCard === "string"
      ? resolvedSearchParams.giftCard
      : "";

  const parsedGiftCard = Number(giftCardParam);

  const giftCard = allowedGiftCards.includes(parsedGiftCard)
    ? parsedGiftCard
    : undefined;

  if (!user) {
    const params = new URLSearchParams();

    if (initialArtist) {
      params.set("artist", initialArtist);
    }

    if (giftCard) {
      params.set("giftCard", String(giftCard));
    }

    const queryString = params.toString();

    const bookingUrl = queryString ? `/booking?${queryString}` : "/booking";

    redirect(`/sign-in?next=${encodeURIComponent(bookingUrl)}`);
  }

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <p className={styles.eyebrow}>Book a consultation</p>

        <h1 className={styles.title}>
          Begin your
          <span>tattoo story.</span>
        </h1>

        <p className={styles.description}>
          Choose an artist and tell us when you would like to visit. The studio
          will contact you to confirm the consultation.
        </p>
      </section>

      <section className={styles.bookingSection}>
        <div className={styles.sectionHeading}>
          <span className={styles.stepNumber}>01</span>

          <div>
            <h2 className={styles.sectionTitle}>Your request</h2>

            <p className={styles.sectionDescription}>
              Complete the form below. Fields marked with an asterisk are
              required.
            </p>
          </div>
        </div>

        <BookingForm initialArtist={initialArtist} giftCard={giftCard} />
      </section>

      <section className={styles.process}>
        <p className={styles.processEyebrow}>What happens next</p>

        <div className={styles.processList}>
          <article className={styles.processItem}>
            <span>01</span>

            <div>
              <h3>Send your request</h3>

              <p>Select your artist, date and preferred consultation time.</p>
            </div>
          </article>

          <article className={styles.processItem}>
            <span>02</span>

            <div>
              <h3>We contact you</h3>

              <p>The studio confirms availability and discusses your idea.</p>
            </div>
          </article>

          <article className={styles.processItem}>
            <span>03</span>

            <div>
              <h3>Meet your artist</h3>

              <p>Visit the studio for your confirmed consultation.</p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
