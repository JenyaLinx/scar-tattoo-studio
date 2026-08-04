export type Artist = {
  id: number;
  slug: string;
  name: string;
  specialty: string;
  experience: string;
  description: string;
  biography: string;
  image: string;
  portfolio: string[];
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
    experience: "8 years of experience",
    description:
      "Specialising in detailed black and grey realism, portrait work and large-scale custom tattoos.",
    biography:
      "Liam specialises in realistic black and grey tattoos, expressive portraits and large custom compositions. His approach combines detailed planning, soft shading and strong contrast to create tattoos that remain visually powerful over time.",
    image: "/images/artists/artist-liam.jpg",
    portfolio: [
      "/images/artists/liam/photo1.jpg",
      "/images/artists/liam/photo2.jpg",
      "/images/artists/liam/photo3.jpg",
      "/images/artists/liam/photo4.jpg",
    ],
    instagram: "https://www.instagram.com/",
    tiktok: "https://www.tiktok.com/",
    facebook: "https://www.facebook.com/",
  },
  {
    id: 2,
    slug: "maya-bennett",
    name: "Maya Bennett",
    specialty: "Fine Line",
    experience: "6 years of experience",
    description:
      "Creating delicate fine-line tattoos, botanical compositions and elegant minimalist designs.",
    biography:
      "Maya creates delicate fine-line tattoos inspired by nature, movement and personal symbolism. Her work focuses on clean composition, precise linework and designs that feel individual without becoming visually overwhelming.",
    image: "/images/artists/artist-maya.jpg",
    portfolio: [
      "/images/artists/maya/photo1.jpg",
      "/images/artists/maya/photo2.jpg",
      "/images/artists/maya/photo3.jpg",
      "/images/artists/maya/photo4.jpg",
    ],
    instagram: "https://www.instagram.com/",
    tiktok: "https://www.tiktok.com/",
    facebook: "https://www.facebook.com/",
  },
  {
    id: 3,
    slug: "noah-walker",
    name: "Noah Walker",
    specialty: "Black & Grey",
    experience: "7 years of experience",
    description:
      "Known for bold black and grey artwork, ornamental designs and expressive custom compositions.",
    biography:
      "Noah works with bold black and grey imagery, ornamental details and strong custom compositions. He develops every concept around the placement of the tattoo, allowing the final artwork to follow the natural shape and movement of the body.",
    image: "/images/artists/artist-noah.jpg",
    portfolio: [
      "/images/artists/noah/photo1.jpg",
      "/images/artists/noah/photo2.jpg",
      "/images/artists/noah/photo3.jpg",
      "/images/artists/noah/photo4.jpg",
    ],
    instagram: "https://www.instagram.com/",
    tiktok: "https://www.tiktok.com/",
    facebook: "https://www.facebook.com/",
  },
];

export const getArtistBySlug = (slug: string) => {
  return artists.find((artist) => artist.slug === slug);
};