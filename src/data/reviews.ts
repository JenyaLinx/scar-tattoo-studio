export type Review = {
  id: number;
  artistId: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
};

export const reviews: Review[] = [
  {
    id: 1,
    artistId: 1,
    author: "Emily R.",
    rating: 5,
    comment:
      "Liam made the entire experience comfortable and explained every part of the process. The final tattoo looks even better than I imagined.",
    date: "18 July 2026",
  },
  {
    id: 2,
    artistId: 1,
    author: "Daniel M.",
    rating: 5,
    comment:
      "The level of detail is incredible. Liam listened carefully to my ideas and created a design that feels completely personal.",
    date: "03 July 2026",
  },
  {
    id: 3,
    artistId: 2,
    author: "Sophie K.",
    rating: 5,
    comment:
      "Maya was patient, professional and incredibly precise. My fine-line tattoo healed beautifully and still looks very clean.",
    date: "21 July 2026",
  },
  {
    id: 4,
    artistId: 2,
    author: "Olivia B.",
    rating: 4,
    comment:
      "A calm and welcoming appointment. Maya created a delicate botanical design that fits the placement perfectly.",
    date: "09 July 2026",
  },
  {
    id: 5,
    artistId: 3,
    author: "James T.",
    rating: 5,
    comment:
      "Noah transformed a rough idea into a strong custom composition. The shading and placement are both excellent.",
    date: "26 July 2026",
  },
  {
    id: 6,
    artistId: 3,
    author: "Alex P.",
    rating: 5,
    comment:
      "A very professional experience from consultation to final result. I would definitely book another tattoo with Noah.",
    date: "12 July 2026",
  },
];

export const getReviewsByArtistId = (artistId: number) => {
  return reviews.filter((review) => review.artistId === artistId);
};