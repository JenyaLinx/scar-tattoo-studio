import { createClient } from "@/lib/supabase/client";

type CreateReviewData = {
  artistId: number;
  rating: number;
  comment: string;
};

export async function createReview({
  artistId,
  rating,
  comment,
}: CreateReviewData) {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error(
      "You must be signed in to submit a review.",
    );
  }

  const { data, error } = await supabase
    .from("reviews")
    .insert({
      user_id: user.id,
      artist_id: artistId,
      rating,
      comment,
      is_approved: false,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}