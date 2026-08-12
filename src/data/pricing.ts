import { PricingCategory } from '../types';

export const PRICING_DATA: PricingCategory[] = [
  {
    category: "HAIR STYLING & CUTTING",
    description: "All haircuts include a bespoke consultation, scalp massage, and signature glass finish.",
    items: [
      { name: "Luxury Restyle Cut & Blow Dry", duration: "75 mins", price: "Price Available on Request" },
      { name: "Signature Glass Blow Dry", duration: "45 mins", price: "Price Available on Request" },
      { name: "Hollywood Waves / Event Styling", duration: "60 mins", price: "Price Available on Request" },
      { name: "Silk Keratin Smoothing Treatment", duration: "150 mins", price: "Price Available on Request" }
    ]
  },
  {
    category: "BESPOKE HAIR COLOURING",
    description: "Includes Smart Bond Repair protection and customized velvet toner.",
    items: [
      { name: "Dimensional French Balayage", duration: "180 mins", price: "Price Available on Request" },
      { name: "Full Head Highlights / Baby Lights", duration: "150 mins", price: "Price Available on Request" },
      { name: "Glossing & Tone Refresh", duration: "60 mins", price: "Price Available on Request" },
      { name: "Master Colour Correction", duration: "Consultation", price: "Consultation Required" }
    ]
  },
  {
    category: "BRIDAL ARTISTRY",
    description: "Couture wedding day beauty packages tailored to your ceremony schedule.",
    items: [
      { name: "Royal Bridal Hair & HD Makeup", duration: "240 mins", price: "Price Available on Request" },
      { name: "Bridal Hair Styling Only", duration: "120 mins", price: "Price Available on Request" },
      { name: "Bridal HD Makeup & Airbrushing", duration: "120 mins", price: "Price Available on Request" },
      { name: "Engagement / Reception / Mehndi Look", duration: "150 mins", price: "Price Available on Request" },
      { name: "Bridal Trial Session (In-Studio)", duration: "120 mins", price: "Price Available on Request" }
    ]
  },
  {
    category: "FACIALS & AESTHETICS",
    description: "Advanced skin revival and facial architecture.",
    items: [
      { name: "24K Gold & Collagen Revival Facial", duration: "60 mins", price: "Price Available on Request" },
      { name: "Hydra-Glow Ultrasonic Deep Cleanse", duration: "60 mins", price: "Price Available on Request" },
      { name: "Eyebrow Architecture & Threading", duration: "30 mins", price: "Price Available on Request" },
      { name: "Lash Lift & Deep Tint", duration: "45 mins", price: "Price Available on Request" }
    ]
  }
];
