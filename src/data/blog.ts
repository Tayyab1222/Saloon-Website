import { BlogPost } from '../types';
import { PUBLIC_IMAGES } from './images';

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "the-art-of-the-bridal-glow-skin-prep",
    title: "The Art of the Bridal Glow: 6 Months to Wedding Day Skin Perfection",
    excerpt: "How to prepare your skin texture, hydration levels, and facial structure for flawless, long-lasting wedding day makeup.",
    category: "BRIDAL BEAUTY",
    date: "12 August 2026",
    author: "Shiny's Editorial Team",
    image: PUBLIC_IMAGES.journal[0],
    readTime: "5 min read",
    content: [
      "Every bride deserves to step into her wedding day feeling effortlessly radiant. While high-definition makeup creates the final canvas, true luminosity begins months before the ceremony.",
      "1. Prioritise Deep Hydration & Gold Facials: Commencing a series of monthly 24K Gold & Collagen Revival facials boosts cellular turnover and strengthens the skin barrier.",
      "2. Tailor Your Exfoliation: Ultrasonic exfoliation smooths texture without causing micro-tears, ensuring airbrush makeup lays like velvet.",
      "3. The Final 72-Hour Count Down: Avoid aggressive treatments right before the wedding. Focus purely on moisture locks and soothing botanical serums.",
      "At Shiny's Hair & Beauty, our bespoke bridal consultation plans every stage of your hair and beauty journey with precision."
    ]
  },
  {
    slug: "demystifying-balayage-vs-highlights",
    title: "Balayage vs. Traditional Highlights: Finding Your Signature Shade",
    excerpt: "Discover the nuance between hand-painted dimensional balayage and foil highlights for a low-maintenance luxury finish.",
    category: "HAIR COLOUR",
    date: "04 July 2026",
    author: "Shiny's Master Colourist",
    image: PUBLIC_IMAGES.journal[1],
    readTime: "4 min read",
    content: [
      "Choosing the right colouring technique transforms not only your hair tone, but your overall complexion.",
      "What is French Balayage? Balayage is a freehand technique that creates soft, natural sweeps of light through the lengths of your hair. As it grows, there are no harsh regrowth lines.",
      "When to Choose Highlights: Foil highlights deliver uniform lightness from root to tip, ideal if you want maximum brightness across your hairline.",
      "At Shiny's, we frequently combine both techniques in our Bespoke Dimensional Balayage for multidimensional depth and effortless elegance."
    ]
  },
  {
    slug: "how-to-maintain-glass-hair-between-salon-visits",
    title: "How to Maintain Glass Hair Mirror Shine Between Salon Visits",
    excerpt: "Essential home care rituals, heat protection habits, and silk pillowcases to preserve your salon finish.",
    category: "HAIR CARE",
    date: "18 June 2026",
    author: "Shiny's Styling Team",
    image: PUBLIC_IMAGES.journal[2],
    readTime: "3 min read",
    content: [
      "Achieving that liquid glass shine requires a balance of bond protection, humidity barriers, and delicate drying techniques.",
      "Always apply a heat-activated serum before blow drying. Switch to Mulberry silk pillowcases to prevent overnight friction and split ends.",
      "Visit Shiny's for a Glossing & Tone Refresh every 6 weeks to keep your colour vibrant and cuticle sealed."
    ]
  }
];
