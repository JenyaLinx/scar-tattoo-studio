"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/services/auth/admin.server";

export async function deleteGalleryImage(
  imageId: number,
) {
  await requireAdmin();

  const supabase = await createClient();

  const { data: image, error: imageError } =
    await supabase
      .from("artist_images")
      .select(`
        id,
        artist_id,
        artist:artists (
          slug
        )
      `)
      .eq("id", imageId)
      .maybeSingle();

  if (imageError) {
    throw new Error(
      `Failed to load gallery image: ${imageError.message}`,
    );
  }

  if (!image) {
    throw new Error("Gallery image not found.");
  }

  const { error } = await supabase
    .from("artist_images")
    .delete()
    .eq("id", imageId);

  if (error) {
    throw new Error(
      `Failed to delete gallery image: ${error.message}`,
    );
  }

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/artists");

  const artistRelation = image.artist;

  const artist = Array.isArray(artistRelation)
    ? artistRelation[0]
    : artistRelation;

  if (artist?.slug) {
    revalidatePath(`/artists/${artist.slug}`);
  }
}