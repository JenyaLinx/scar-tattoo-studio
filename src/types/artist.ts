export type ArtistImage = {
  id: number;
  artist_id: number;
  image_url: string;
  position: number;
  created_at: string;
};

export type Artist = {
  id: number;
  slug: string;
  name: string;
  specialty: string;
  experience: string | null;
  description: string | null;
  biography: string | null;
  image_url: string | null;
  instagram_url: string | null;
  tiktok_url: string | null;
  facebook_url: string | null;
  is_active: boolean;
  created_at: string;
};

export type ArtistWithImages = Artist & {
  artist_images: ArtistImage[];
};