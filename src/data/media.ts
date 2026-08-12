import { publicImages, PUBLIC_IMAGES } from './publicImages';

/**
 * Centralized Media Management System
 * All images, video assets, and posters are configured here for instant replaceability.
 */

export const MEDIA_ASSETS = {
  // Video Sources (High performance CDN video loops with posters)
  heroVideo: {
    src: "https://assets.mixkit.co/videos/preview/mixkit-woman-smiling-while-having-her-hair-styled-41584-large.mp4",
    poster: publicImages.hero.poster,
    label: "[HERO VIDEO]"
  },
  transformationVideo: {
    src: "https://assets.mixkit.co/videos/preview/mixkit-hairdresser-combing-a-clients-hair-41580-large.mp4",
    poster: publicImages.hero.transformationPoster,
    label: "[TRANSFORMATION VIDEO]"
  },
  bridalVideo: {
    src: "https://assets.mixkit.co/videos/preview/mixkit-bride-putting-on-her-earrings-for-her-wedding-41315-large.mp4",
    poster: publicImages.hero.bridalPoster,
    label: "[BRIDAL VIDEO]"
  },
  experienceVideo: {
    src: "https://assets.mixkit.co/videos/preview/mixkit-makeup-artist-applying-eyeshadow-on-a-model-41585-large.mp4",
    poster: publicImages.hero.experiencePoster,
    label: "[EXPERIENCE VIDEO]"
  },

  // Service Category Hero Images
  aboutImages: {
    hero: publicImages.about.hero,
    interior: publicImages.about.salon,
  },
  serviceImages: {
    ladiesHair: publicImages.services.ladiesHair,
    mensGrooming: publicImages.services.mensGrooming,
    childrenHaircuts: publicImages.services.childrenHaircuts,
    hairColour: publicImages.services.hairColour,
    hairStyling: publicImages.services.hairStyling,
    bridalHairMakeup: publicImages.services.bridalHairMakeup,
    professionalMakeup: publicImages.services.professionalMakeup,
    hairTreatments: publicImages.services.hairTreatments,
    hero: publicImages.services.hero,
    hair: publicImages.services.hair,
    colour: publicImages.services.colour,
    beauty: publicImages.services.beauty,
    bridal: publicImages.services.bridal,
    makeup: publicImages.services.makeup,
    transformations: publicImages.services.treatments
  },

  // Before & After Comparisons
  beforeAfter: {
    before: publicImages.services.before,
    after: publicImages.services.after,
    label: "[BEFORE AFTER TRANSFORMATION]"
  },

  // Editorial Gallery Images (Static fallback items)
  gallery: [
    {
      id: "g1",
      title: "Dimensional Soft Balayage",
      category: "HAIR" as const,
      image: publicImages.services.hair,
      aspectRatio: "portrait" as const,
      tag: "Signature Balayage"
    },
    {
      id: "g2",
      title: "Royal Silk Bridal Makeup",
      category: "BRIDAL" as const,
      image: publicImages.services.bridal,
      aspectRatio: "portrait" as const,
      tag: "Bridal Glam"
    },
    {
      id: "g3",
      title: "Editorial Glow & Contour",
      category: "MAKEUP" as const,
      image: publicImages.services.makeup,
      aspectRatio: "square" as const,
      tag: "Editorial Makeup"
    },
    {
      id: "g4",
      title: "Gold Radiance Hydra Facial",
      category: "BEAUTY" as const,
      image: publicImages.services.beauty,
      aspectRatio: "portrait" as const,
      tag: "Skin Revival"
    },
    {
      id: "g5",
      title: "Platinum Blonde Color Correction",
      category: "TRANSFORMATIONS" as const,
      image: publicImages.services.treatments,
      aspectRatio: "portrait" as const,
      tag: "Full Hair Makeover"
    },
    {
      id: "g6",
      title: "The Private Luxury Suite",
      category: "SALON" as const,
      image: publicImages.about.salon,
      aspectRatio: "landscape" as const,
      tag: "London Salon Interior"
    },
    {
      id: "g7",
      title: "Ornate Indian Bridal Hair Styling",
      category: "BRIDAL" as const,
      image: publicImages.home.bridal,
      aspectRatio: "portrait" as const,
      tag: "Traditional & Modern Bridal"
    },
    {
      id: "g8",
      title: "Glossy Glass Hair Blow Dry",
      category: "HAIR" as const,
      image: publicImages.services.colour,
      aspectRatio: "portrait" as const,
      tag: "Signature Bouncy Blowout"
    }
  ],

  // Instagram Feed Mock
  instagramPosts: [
    {
      id: "ig1",
      image: publicImages.instagram.post1,
      likes: "1,240",
      comments: "84",
      caption: "Bespoke bridal perfection for our gorgeous weekend bride. Hair & Makeup by Shiny's team. ✨ #LondonBridal #ShinysBeauty"
    },
    {
      id: "ig2",
      image: publicImages.instagram.post2,
      likes: "892",
      comments: "41",
      caption: "Rich vanilla melt balayage with high shine gloss finish. 👑 #LondonHairdresser #BalayagePerfection"
    },
    {
      id: "ig3",
      image: publicImages.instagram.post3,
      likes: "1,410",
      comments: "98",
      caption: "Behind the scenes at our London studio. Soft glam lighting & effortless radiance. 🔥 #MakeupArtistLondon"
    },
    {
      id: "ig4",
      image: publicImages.instagram.post4,
      likes: "740",
      comments: "32",
      caption: "Skin prep is everything. Pure luxury gold facial treatments available now. 💆‍♀️ #SkinGlow"
    }
  ],

  // Team Artists (Marked as placeholder)
  teamPlaceholders: [
    {
      id: "t1",
      name: "Senior Hair Master",
      role: "Creative Director & Hair Specialist",
      specialty: "Precision Cuts, Balayage & Extensions",
      image: publicImages.about.team[0],
      bio: "Master craftsman with over 12 years of luxury editorial and salon experience in London.",
      isPlaceholder: true
    },
    {
      id: "t2",
      name: "Lead Bridal Artist",
      role: "Head of Bridal & Makeup",
      specialty: "High-Definition Bridal Glam & Airbrushing",
      image: publicImages.about.team[1],
      bio: "Renowned bridal artist creating unforgettable luxury wedding looks for brides across the UK.",
      isPlaceholder: true
    },
    {
      id: "t3",
      name: "Colour Master Specialist",
      role: "Senior Colourist",
      specialty: "Blonde Transformations & Colour Correction",
      image: publicImages.about.team[2],
      bio: "Pioneer in gentle balayage techniques and custom colour formulations.",
      isPlaceholder: true
    }
  ]
};
