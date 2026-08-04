export type Artist = {
  id: number;
  slug: string;
  name: string;
  specialty: string;
  description: string;
  image: string;
  instagram: string;
  tiktok: string;
  facebook: string;
};

export const artists: Artist[] = [
  {
    id: 1,
    slug: "liam-carter",
    name: "Liam Carter",
    specialty: "Realism",
    description:
      "Specialising in detailed black and grey realism, portrait work and large-scale custom tattoos.",
    image: "/images/artists/artist-liam.jpg",
    instagram: "https://www.instagram.com/",
    tiktok: "https://www.tiktok.com/",
    facebook: "https://www.facebook.com/",
  },
  {
    id: 2,
    slug: "maya-bennett",
    name: "Maya Bennett",
    specialty: "Fine Line",
    description:
      "Creating delicate fine-line tattoos, botanical compositions and elegant minimalist designs.",
    image: "/images/artists/artist-maya.jpg",
    instagram: "https://www.instagram.com/",
    tiktok: "https://www.tiktok.com/",
    facebook: "https://www.facebook.com/",
  },
  {
    id: 3,
    slug: "noah-walker",
    name: "Noah Walker",
    specialty: "Black & Grey",
    description:
      "Known for bold black and grey artwork, ornamental designs and expressive custom compositions.",
    image: "/images/artists/artist-noah.jpg",
    instagram: "https://www.instagram.com/",
    tiktok: "https://www.tiktok.com/",
    facebook: "https://www.facebook.com/",
  },
];