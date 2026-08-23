import { createClient } from "@/lib/supabase/server";

type GalleryArtist = {
  id: number;
  name: string;
  slug: string;
  specialty: string;
};

type GalleryRow = {
  id: number;
  image_url: string;
  position: number;
  artist: GalleryArtist | GalleryArtist[] | null;
};

export type GalleryImage = {
  id: number;
  image_url: string;
  position: number;
  artist: GalleryArtist | null;
};

export async function getGalleryImages(): Promise<
  GalleryImage[]
> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("artist_images")
    .select(`
      id,
      image_url,
      position,
      artist:artists (
        id,
        name,
        slug,
        specialty
      )
    `)
    .order("artist_id", {
      ascending: true,
    })
    .order("position", {
      ascending: true,
    });

  if (error) {
    throw new Error(
      `Failed to fetch gallery images: ${error.message}`,
    );
  }

  const images = (data ?? []) as GalleryRow[];

  return images.map((image) => {
    const artist = Array.isArray(image.artist)
      ? image.artist[0] ?? null
      : image.artist;

    return {
      id: image.id,
      image_url: image.image_url,
      position: image.position,
      artist,
    };
  });
}