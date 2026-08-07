import { createClient } from "@/lib/supabase/client";
import type { Artist } from "@/types/artist";

export async function getArtistsClient(): Promise<Artist[]> {
  const supabase = createClient();

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