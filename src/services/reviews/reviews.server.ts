import { createClient } from "@/lib/supabase/server";

type ReviewArtist = {
  id: number;
  name: string;
  slug: string;
  specialty: string;
};

type ReviewClient = {
  id: string;
  full_name: string | null;
  email: string | null;
};

type ReviewRow = {
  id: number;
  user_id: string;
  artist_id: number;
  rating: number;
  comment: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
  artist: ReviewArtist | ReviewArtist[] | null;
};

export type AdminReview = {
  id: number;
  user_id: string;
  artist_id: number;
  rating: number;
  comment: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
  artist: ReviewArtist | null;
  client: ReviewClient | null;
};

export async function getAllReviewsForAdmin(): Promise<
  AdminReview[]
> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select(`
      id,
      user_id,
      artist_id,
      rating,
      comment,
      is_approved,
      created_at,
      updated_at,
      artist:artists (
        id,
        name,
        slug,
        specialty
      )
    `)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(
      `Failed to fetch reviews: ${error.message}`,
    );
  }

  const reviews = (data ?? []) as ReviewRow[];

  const userIds = [
    ...new Set(
      reviews.map((review) => review.user_id),
    ),
  ];

  let profiles: ReviewClient[] = [];

  if (userIds.length > 0) {
    const {
      data: profileData,
      error: profilesError,
    } = await supabase
      .from("profiles")
      .select(`
        id,
        full_name,
        email
      `)
      .in("id", userIds);

    if (profilesError) {
      throw new Error(
        `Failed to fetch review clients: ${profilesError.message}`,
      );
    }

    profiles = profileData ?? [];
  }

  const profileMap = new Map(
    profiles.map((profile) => [
      profile.id,
      profile,
    ]),
  );

  return reviews.map((review) => {
    const artist = Array.isArray(review.artist)
      ? review.artist[0] ?? null
      : review.artist;

    return {
      id: review.id,
      user_id: review.user_id,
      artist_id: review.artist_id,
      rating: review.rating,
      comment: review.comment,
      is_approved: review.is_approved,
      created_at: review.created_at,
      updated_at: review.updated_at,
      artist,
      client:
        profileMap.get(review.user_id) ?? null,
    };
  });
}

export type ArtistReview = {
  id: number;
  rating: number;
  comment: string;
  created_at: string;
  author: string;
};

export async function getApprovedReviewsByArtistId(
  artistId: number,
): Promise<ArtistReview[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select(`
      id,
      rating,
      comment,
      created_at
    `)
    .eq("artist_id", artistId)
    .eq("is_approved", true)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(
      `Failed to fetch artist reviews: ${error.message}`,
    );
  }

  return (data ?? []).map((review) => ({
    id: review.id,
    rating: review.rating,
    comment: review.comment,
    created_at: review.created_at,
    author: "SCAR Client",
  }));
}