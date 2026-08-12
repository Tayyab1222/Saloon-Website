export interface ServiceItem {
  id: string;
  name: string;
  category: 'hair' | 'beauty' | 'makeup' | 'bridal' | 'transformations' | 'colour' | 'grooming' | 'children' | 'styling' | 'treatments';
  shortDescription: string;
  fullDescription: string;
  duration?: string;
  price?: string; // Optional price or "From £..." or "On Request"
  features?: string[];
  image: string;
  isSignature?: boolean;
}

export interface EditorialService {
  id: string;
  number: string;
  slug: string;
  title: string;
  category: 'hair' | 'grooming' | 'children' | 'colour' | 'styling' | 'bridal' | 'makeup' | 'treatments' | 'beauty';
  shortDescription: string;
  services: string[];
  image: string;
  mobileImage: string;
  cta: string;
  link: string;
  isHighlight?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'HAIR' | 'MAKEUP' | 'BRIDAL' | 'BEAUTY' | 'TRANSFORMATIONS' | 'SALON';
  image: string;
  aspectRatio?: 'portrait' | 'square' | 'landscape';
  tag?: string;
}

export interface GalleryImage {
  id: string;
  filename: string;
  url: string;
  category?: 'HAIR' | 'BEAUTY' | 'MAKEUP' | 'BRIDAL' | 'TRANSFORMATION' | 'SALON' | string;
  title?: string;
  uploadedAt: string;
  size?: number;
  widthRatio?: 'large' | 'portrait' | 'landscape' | 'medium' | 'tall';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
  bio: string;
  isPlaceholder?: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  quote: string;
  service?: string;
  rating?: number;
  date?: string;
  isVerified?: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  date: string;
  author: string;
  image: string;
  readTime: string;
}

export interface PricingCategory {
  category: string;
  description?: string;
  items: {
    name: string;
    description?: string;
    price: string;
    duration?: string;
  }[];
}

export interface RecognitionItem {
  id: string;
  title: string;
  type: 'Award' | 'Publication' | 'Editorial' | 'Certification';
  year: string;
  image: string;
  description: string;
  isVerified: boolean;
}

export interface AwardItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  poster?: string;
  title?: string;
  year?: string;
  organisation?: string;
  description?: string;
  featured?: boolean;
  uploadedAt: string;
  filename?: string;
  duration?: string;
  size?: number;
}

export interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description?: string;
  profile_photo_url?: string;
  author_url?: string;
  source?: string;
}

export interface GoogleReviewsResponse {
  success: boolean;
  configured: boolean;
  rating: number | null;
  user_ratings_total: number;
  googleMapsUrl: string;
  reviews: GoogleReview[];
  message?: string;
}

