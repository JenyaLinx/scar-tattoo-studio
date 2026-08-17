import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/profile";

export async function getProfile(
  userId: string,
): Promise<Profile | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to fetch profile: ${error.message}`,
    );
  }

  return data;
}