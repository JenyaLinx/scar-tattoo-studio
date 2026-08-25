import { createClient } from "@/lib/supabase/server";
import type { Artist, ArtistWithImages } from "@/types/artist";

export async function getArtists(): Promise<Artist[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("artists")
    .select("*")
    .eq("is_active", true)
    .order("id", {
      ascending: true,
    });

  if (error) {
    throw new Error(`Failed to fetch artists: ${error.message}`);
  }

  return data ?? [];
}

export async function getArtistBySlug(
  slug: string,
): Promise<ArtistWithImages | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("artists")
    .select(`
      *,
      artist_images (
        id,
        artist_id,
        image_url,
        position,
        created_at
      )
    `)
    .eq("slug", slug)
    .eq("is_active", true)
    .order("position", {
      referencedTable: "artist_images",
      ascending: true,
    })
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch artist: ${error.message}`);
  }

  return data as ArtistWithImages | null;
}

export async function getAllArtistsForAdmin(): Promise<
  Artist[]
> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("artists")
    .select("*")
    .order("id", {
      ascending: true,
    });

  if (error) {
    throw new Error(
      `Failed to fetch admin artists: ${error.message}`,
    );
  }

  return data ?? [];
}

export async function getArtistByIdForAdmin(
  id: number,
): Promise<Artist | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("artists")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to fetch admin artist: ${error.message}`,
    );
  }

  return data;
}