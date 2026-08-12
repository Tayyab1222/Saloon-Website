import { RecognitionItem } from '../types';
import { PUBLIC_IMAGES } from './images';

export const RECOGNITION_HEADER = {
  title: "RECOGNITION",
  statement: "THE WORK SPEAKS.",
  subtitle: "Every transformation is crafted as a masterpiece of fashion, elegance, and personal radiance."
};

export const RECOGNITION_ITEMS: RecognitionItem[] = [
  {
    id: "rec1",
    title: "Editorial Bridal Transformations",
    type: "Editorial",
    year: "2026",
    image: PUBLIC_IMAGES.reviews[1],
    description: "Featured luxury bridal hair and makeup artistry across London's leading bridal portfolios.",
    isVerified: true
  },
  {
    id: "rec2",
    title: "Signature Balayage Excellence",
    type: "Certification",
    year: "2025",
    image: PUBLIC_IMAGES.reviews[2],
    description: "Certified master french balayage technique and bond-building hair health architecture.",
    isVerified: true
  },
  {
    id: "rec3",
    title: "24K Gold Facial Aesthetics",
    type: "Publication",
    year: "2025",
    image: PUBLIC_IMAGES.reviews[3],
    description: "Recognized for premium skin preparation and red-carpet radiance treatment.",
    isVerified: true
  }
];
