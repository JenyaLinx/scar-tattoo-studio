"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/services/auth/admin.server";

export async function approveReview(
  reviewId: number,
) {
  await requireAdmin();

  const supabase = await createClient();

  const { error } = await supabase
    .from("reviews")
    .update({
      is_approved: true,
    })
    .eq("id", reviewId);

  if (error) {
    throw new Error(
      `Failed to approve review: ${error.message}`,
    );
  }

  revalidatePath("/admin/reviews");
  revalidatePath("/artists");
}

export async function deleteReview(
  reviewId: number,
) {
  await requireAdmin();

  const supabase = await createClient();

  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", reviewId);

  if (error) {
    throw new Error(
      `Failed to delete review: ${error.message}`,
    );
  }

  revalidatePath("/admin/reviews");
  revalidatePath("/artists");
}