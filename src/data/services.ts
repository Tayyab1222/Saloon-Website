import { ServiceItem, EditorialService } from '../types';
import { MEDIA_ASSETS } from './media';

export const EDITORIAL_SERVICES: EditorialService[] = [
  {
    id: "ladies-hairdressing",
    number: "01",
    slug: "hair",
    title: "LADIES’ HAIRDRESSING",
    category: "hair",
    shortDescription: "Professional hairdressing tailored to your individual style, from everyday cuts and styling to colour, treatments and extensions.",
    services: [
      "Haircuts",
      "Hair Styling",
      "Hair Colouring",
      "Balayage",
      "Highlights",
      "Hair Treatments",
      "Hair Extensions"
    ],
    image: MEDIA_ASSETS.serviceImages.ladiesHair,
    mobileImage: MEDIA_ASSETS.serviceImages.ladiesHair,
    cta: "EXPLORE LADIES’ HAIRDRESSING →",
    link: "/services/hair"
  },
  {
    id: "mens-hairdressing-grooming",
    number: "02",
    slug: "grooming",
    title: "MEN’S HAIRDRESSING & GROOMING",
    category: "grooming",
    shortDescription: "Modern and classic grooming with precision cuts, contemporary styling and professional beard care.",
    services: [
      "Modern Haircuts",
      "Classic Haircuts",
      "Skin Fades",
      "Hair Styling",
      "Beard Grooming"
    ],
    image: MEDIA_ASSETS.serviceImages.mensGrooming,
    mobileImage: MEDIA_ASSETS.serviceImages.mensGrooming,
    cta: "EXPLORE MEN’S GROOMING →",
    link: "/services/grooming"
  },
  {
    id: "childrens-haircuts",
    number: "03",
    slug: "children",
    title: "CHILDREN’S HAIRCUTS",
    category: "children",
    shortDescription: "Professional haircuts in a friendly and welcoming environment.",
    services: [
      "Children's Haircuts"
    ],
    image: MEDIA_ASSETS.serviceImages.childrenHaircuts,
    mobileImage: MEDIA_ASSETS.serviceImages.childrenHaircuts,
    cta: "EXPLORE CHILDREN’S HAIRCUTS →",
    link: "/services/children"
  },
  {
    id: "hair-colour-services",
    number: "04",
    slug: "colour",
    title: "HAIR COLOUR SERVICES",
    category: "colour",
    shortDescription: "From subtle refreshes to complete colour transformations, our colour services are designed around your desired look.",
    services: [
      "Full Colour",
      "Root Touch-Ups",
      "Highlights",
      "Balayage",
      "Colour Correction"
    ],
    image: MEDIA_ASSETS.serviceImages.hairColour,
    mobileImage: MEDIA_ASSETS.serviceImages.hairColour,
    cta: "EXPLORE HAIR COLOUR →",
    link: "/services/colour"
  },
  {
    id: "hair-styling-services",
    number: "05",
    slug: "styling",
    title: "HAIR STYLING",
    category: "styling",
    shortDescription: "Beautifully finished styles for everyday confidence, special occasions and unforgettable moments.",
    services: [
      "Blow Dries",
      "Curls",
      "Hollywood Waves",
      "Special Occasion Styling"
    ],
    image: MEDIA_ASSETS.serviceImages.hairStyling,
    mobileImage: MEDIA_ASSETS.serviceImages.hairStyling,
    cta: "EXPLORE HAIR STYLING →",
    link: "/services/styling"
  },
  {
    id: "bridal-hair-makeup",
    number: "06",
    slug: "bridal",
    title: "BRIDAL HAIR & MAKEUP",
    category: "bridal",
    shortDescription: "Bespoke bridal packages for weddings and special events.",
    services: [
      "Bridal Hair",
      "Bridal Makeup",
      "Wedding Packages",
      "Special Event Bridal Styling"
    ],
    image: MEDIA_ASSETS.serviceImages.bridalHairMakeup,
    mobileImage: MEDIA_ASSETS.serviceImages.bridalHairMakeup,
    cta: "DISCOVER BRIDAL →",
    link: "/services/bridal",
    isHighlight: true
  },
  {
    id: "professional-makeup",
    number: "07",
    slug: "makeup",
    title: "PROFESSIONAL MAKEUP",
    category: "makeup",
    shortDescription: "Flawless makeup looks designed for celebrations, photography, events and unforgettable occasions.",
    services: [
      "Party Makeup",
      "Engagement Makeup",
      "Reception Makeup",
      "Editorial Makeup",
      "Occasion Makeup"
    ],
    image: MEDIA_ASSETS.serviceImages.professionalMakeup,
    mobileImage: MEDIA_ASSETS.serviceImages.professionalMakeup,
    cta: "EXPLORE PROFESSIONAL MAKEUP →",
    link: "/services/makeup"
  },
  {
    id: "hair-treatments",
    number: "08",
    slug: "treatments",
    title: "HAIR TREATMENTS",
    category: "treatments",
    shortDescription: "Nourishing, repairing and smoothing treatments for healthy, beautiful hair.",
    services: [
      "Nourishing Treatments",
      "Repair Treatments",
      "Smoothing Treatments"
    ],
    image: MEDIA_ASSETS.serviceImages.hairTreatments,
    mobileImage: MEDIA_ASSETS.serviceImages.hairTreatments,
    cta: "EXPLORE HAIR TREATMENTS →",
    link: "/services/treatments"
  }
];

export const SIGNATURE_CATEGORIES = [
  { id: "01", name: "HAIR", key: "hair", image: MEDIA_ASSETS.serviceImages.ladiesHair },
  { id: "02", name: "COLOUR", key: "colour", image: MEDIA_ASSETS.serviceImages.hairColour },
  { id: "03", name: "BEAUTY", key: "beauty", image: MEDIA_ASSETS.serviceImages.beauty },
  { id: "04", name: "BRIDAL", key: "bridal", image: MEDIA_ASSETS.serviceImages.bridalHairMakeup },
  { id: "05", name: "MAKEUP", key: "makeup", image: MEDIA_ASSETS.serviceImages.professionalMakeup },
  { id: "06", name: "TRANSFORMATIONS", key: "transformations", image: MEDIA_ASSETS.serviceImages.transformations },
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: "ladies-hairdressing",
    name: "Ladies’ Hairdressing",
    category: "hair",
    shortDescription: "Haircuts, Hair Styling, Hair Colouring, Balayage, Highlights, Hair Treatments, Hair Extensions",
    fullDescription: "Professional hairdressing tailored to your individual style, from everyday cuts and styling to colour, treatments and extensions.",
    image: MEDIA_ASSETS.serviceImages.ladiesHair
  },
  {
    id: "mens-hairdressing-grooming",
    name: "Men’s Hairdressing & Grooming",
    category: "grooming",
    shortDescription: "Modern Haircuts, Classic Haircuts, Skin Fades, Hair Styling, Beard Grooming",
    fullDescription: "Modern and classic grooming with precision cuts, contemporary styling and professional beard care.",
    image: MEDIA_ASSETS.serviceImages.mensGrooming
  },
  {
    id: "childrens-haircuts",
    name: "Children’s Haircuts",
    category: "children",
    shortDescription: "Professional haircuts in a friendly and welcoming environment.",
    fullDescription: "Professional haircuts in a friendly and welcoming environment.",
    image: MEDIA_ASSETS.serviceImages.childrenHaircuts
  },
  {
    id: "hair-colour-services",
    name: "Hair Colour Services",
    category: "colour",
    shortDescription: "Full Colour, Root Touch-Ups, Highlights, Balayage, Colour Correction",
    fullDescription: "From subtle refreshes to complete colour transformations, our colour services are designed around your desired look.",
    image: MEDIA_ASSETS.serviceImages.hairColour
  },
  {
    id: "hair-styling-services",
    name: "Hair Styling",
    category: "styling",
    shortDescription: "Blow Dries, Curls, Hollywood Waves, Special Occasion Styling",
    fullDescription: "Beautifully finished styles for everyday confidence, special occasions and unforgettable moments.",
    image: MEDIA_ASSETS.serviceImages.hairStyling
  },
  {
    id: "bridal-hair-makeup",
    name: "Bridal Hair & Makeup",
    category: "bridal",
    shortDescription: "Bespoke bridal packages for weddings and special events.",
    fullDescription: "Bespoke bridal packages for weddings and special events.",
    image: MEDIA_ASSETS.serviceImages.bridalHairMakeup
  },
  {
    id: "professional-makeup",
    name: "Professional Makeup",
    category: "makeup",
    shortDescription: "Party Makeup, Engagement Makeup, Reception Makeup, Editorial Makeup, Occasion Makeup",
    fullDescription: "Flawless makeup looks designed for celebrations, photography, events and unforgettable occasions.",
    image: MEDIA_ASSETS.serviceImages.professionalMakeup
  },
  {
    id: "hair-treatments",
    name: "Hair Treatments",
    category: "treatments",
    shortDescription: "Nourishing, repairing and smoothing treatments for healthy, beautiful hair.",
    fullDescription: "Nourishing, repairing and smoothing treatments for healthy, beautiful hair.",
    image: MEDIA_ASSETS.serviceImages.hairTreatments
  }
];
