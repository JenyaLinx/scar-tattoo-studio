import type { Metadata } from "next";
import ArtistCard from "@/components/ArtistCard/ArtistCard";
import Header from "@/components/Header/Header";
import { getArtists } from "@/services/artists/artists.server";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Tattoo Artists | SCAR Tattoo Studio",
  description:
    "Meet the professional tattoo artists at SCAR Tattoo Studio and explore their individual styles.",
};

export default async function ArtistsPage() {
  const artists = await getArtists();

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <p className={styles.eyebrow}>Our artists</p>

        <h1 className={styles.title}>
          Different styles.
          <span>One studio.</span>
        </h1>

        <p className={styles.description}>
          Meet three experienced artists, each with a distinct approach to
          custom tattoo design.
        </p>
      </section>

      <section className={styles.artists}>
        {artists.map((artist) => (
          <ArtistCard artist={artist} key={artist.id} />
        ))}
      </section>
    </main>
  );
}
