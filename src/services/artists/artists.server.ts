import { createClient } from "@/lib/supabase/server";
import type { Artist, ArtistWithImages } from "@/types/artist";

function isNextDynamicServerError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    error.digest === "DYNAMIC_SERVER_USAGE"
  );
}

export async function getArtists(): Promise<Artist[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("artists")
      .select("*")
      .eq("is_active", true)
      .order("id", {
        ascending: true,
      });

    if (error) {
      console.error("Failed to fetch artists:", error.message);
      return [];
    }

    return data ?? [];
  } catch (error) {
    if (isNextDynamicServerError(error)) {
      throw error;
    }

    console.error("Unable to connect to Supabase for artists:", error);
    return [];
  }
}

export async function getArtistBySlug(
  slug: string,
): Promise<ArtistWithImages | null> {
  try {
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
      console.error("Failed to fetch artist:", error.message);
      return null;
    }

    return data as ArtistWithImages | null;
  } catch (error) {
    if (isNextDynamicServerError(error)) {
      throw error;
    }

    console.error("Unable to connect to Supabase for artist:", error);
    return null;
  }
}

export async function getAllArtistsForAdmin(): Promise<Artist[]> {
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