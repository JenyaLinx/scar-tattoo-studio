import Link from "next/link";
import ArtistCard from "@/components/ArtistCard/ArtistCard";
import { getArtists } from "@/services/artists/artists.server";
import styles from "./ArtistsPreview.module.css";

export default async function ArtistsPreview() {
  const artists = await getArtists();

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>Meet the artists</p>

          <h2 className={styles.title}>
            Three artists.
            <span>Three perspectives.</span>
          </h2>
        </div>

        <p className={styles.intro}>
          Every artist brings a distinct style, experience and approach to
          creating meaningful custom tattoos.
        </p>
      </div>

      <div className={styles.list}>
        {artists.map((artist) => (
          <ArtistCard artist={artist} key={artist.id} />
        ))}
      </div>

      <Link className={styles.allArtistsLink} href="/artists">
        View all artists
        <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}