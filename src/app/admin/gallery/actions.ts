"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/services/auth/admin.server";

type CreateGalleryImageInput = {
  artistId: number;
  imageUrl: string;
  storagePath: string;
};

export async function createGalleryImage({
  artistId,
  imageUrl,
  storagePath,
}: CreateGalleryImageInput) {
  await requireAdmin();

  const supabase = await createClient();

  const { data: latestImage, error: positionError } =
    await supabase
      .from("artist_images")
      .select("position")
      .eq("artist_id", artistId)
      .order("position", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle();

  if (positionError) {
    throw new Error(
      `Failed to calculate image position: ${positionError.message}`,
    );
  }

  const nextPosition =
    (latestImage?.position ?? 0) + 1;

  const { error } = await supabase
    .from("artist_images")
    .insert({
      artist_id: artistId,
      image_url: imageUrl,
      storage_path: storagePath,
      position: nextPosition,
    });

  if (error) {
    throw new Error(
      `Failed to create gallery image: ${error.message}`,
    );
  }

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/artists");
}

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
        storage_path,
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

  const { error: deleteError } =
    await supabase
      .from("artist_images")
      .delete()
      .eq("id", imageId);

  if (deleteError) {
    throw new Error(
      `Failed to delete gallery image: ${deleteError.message}`,
    );
  }

  if (image.storage_path) {
    const { error: storageError } =
      await supabase.storage
        .from("artist-images")
        .remove([image.storage_path]);

    if (storageError) {
      console.error(
        "Unable to delete image from storage:",
        storageError,
      );
    }
  }

  const artistRelation = image.artist;

  const artist = Array.isArray(artistRelation)
    ? artistRelation[0]
    : artistRelation;

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/artists");

  if (artist?.slug) {
    revalidatePath(
      `/artists/${artist.slug}`,
    );
  }
}