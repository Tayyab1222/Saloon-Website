import { BUSINESS_INFO } from './business';
import { PUBLIC_IMAGES } from '../data/images';

export const DEFAULT_SEO = {
  title: "Shiny's Hair & Beauty — Luxury Hair, Beauty & Bridal Salon London",
  titleTemplate: "%s | Shiny's Hair & Beauty",
  description: "Experience cinematic luxury beauty at Shiny's Hair & Beauty, London. Specialising in bespoke bridal makeup, balayage, hair transformations, and premium aesthetic treatments.",
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: BUSINESS_INFO.websiteUrl,
    siteName: "Shiny's Hair & Beauty",
    images: [
      {
        url: PUBLIC_IMAGES.hero.poster,
        width: 1200,
        height: 630,
        alt: "Shiny's Hair & Beauty Salon Interior London",
      },
    ],
  },
};
