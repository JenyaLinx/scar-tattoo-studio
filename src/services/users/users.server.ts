import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/profile";

export async function getAllUsersForAdmin(): Promise<
  Profile[]
> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    throw new Error(
      `Failed to fetch users: ${error.message}`,
    );
  }

  return data ?? [];
}