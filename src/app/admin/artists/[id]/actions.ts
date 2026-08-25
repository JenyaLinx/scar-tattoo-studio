"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/services/auth/admin.server";
import {
  artistAdminSchema,
  type ArtistAdminFormValues,
} from "@/lib/validations/artistSchema";

export async function updateArtist(
  artistId: number,
  values: ArtistAdminFormValues,
) {
  await requireAdmin();

  const validated =
    artistAdminSchema.parse(values);

  const supabase = await createClient();

  const { error } = await supabase
    .from("artists")
    .update({
      name: validated.name,
      specialty: validated.specialty,
      experience:
        validated.experience || null,
      description:
        validated.description || null,
      biography:
        validated.biography || null,
      instagram_url:
        validated.instagramUrl || null,
      tiktok_url:
        validated.tiktokUrl || null,
      facebook_url:
        validated.facebookUrl || null,
      is_active: validated.isActive,
    })
    .eq("id", artistId);

  if (error) {
    throw new Error(
      `Failed to update artist: ${error.message}`,
    );
  }

  revalidatePath("/artists");
  revalidatePath("/gallery");
  revalidatePath("/admin/artists");
  revalidatePath(`/artists`);
}