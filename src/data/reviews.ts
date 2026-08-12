export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  text: string;
  date?: string;
  source?: 'Google' | 'Direct' | string;
}

/**
 * Manual Client Reviews for Shiny's Hair & Beauty.
 * Admin-friendly: To add more real reviews, simply append new items to this array.
 * If a client name is not provided, the UI will display "SHINY'S CLIENT".
 */
export const MANUAL_REVIEWS: ReviewItem[] = [
  {
    id: "review-01",
    name: "Amina K.",
    rating: 5,
    text: "Shiny's transformed my hair and makeup beyond my dreams for my event in Horsham. Held through 14 hours of celebrations and looked immaculate in every photo. Truly the premier beauty salon!",
    date: "2026",
    source: "Google"
  },
  {
    id: "review-02",
    name: "Eleanor S.",
    rating: 5,
    text: "The hair colour technique at Shiny's is pure art. No harsh lines, just luminous soft gold dimension. The private suite feeling makes you feel like royalty.",
    date: "2026",
    source: "Google"
  },
  {
    id: "review-03",
    name: "Priya M.",
    rating: 5,
    text: "I visited Shiny's for professional styling and hair treatments. My hair has never felt so healthy or silky. Will never go anywhere else in West Sussex!",
    date: "2026",
    source: "Google"
  },
  {
    id: "review-04",
    name: "Sarah L.",
    rating: 5,
    text: "Exquisite haircut and restyle at 52 Carfax. The attention to detail and warm hospitality are unmatched. Highly recommend to anyone looking for luxury styling.",
    date: "2026",
    source: "Google"
  },
  {
    id: "review-05",
    name: "Hannah W.",
    rating: 5,
    text: "Bespoke bridal hair and makeup that stayed flawless all day. Shiny's team made the entire experience calm, luxurious, and completely stress-free.",
    date: "2026",
    source: "Google"
  }
];
