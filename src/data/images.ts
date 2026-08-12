/**
 * Centralized Image Management System for Shiny's Hair & Beauty Salon
 * 
 * All non-Gallery website images are centralized in /public/uploads/
 * divided into section subfolders:
 * - /public/uploads/about/
 * - /public/uploads/artist/
 * - /public/uploads/booking/
 * - /public/uploads/contact/
 * - /public/uploads/hero/
 * - /public/uploads/home/
 * - /public/uploads/instagram/
 * - /public/uploads/journal/
 * - /public/uploads/reviews/
 * - /public/uploads/services/
 * - /public/uploads/awards/
 * - /public/uploads/common/
 * 
 * Replacing any file inside /public/uploads/ with the same filename will
 * automatically update the corresponding website image without code changes.
 * 
 * NOTE: The Gallery system remains completely separate and unchanged.
 */

export const images = {
  home: {
    hero: "/uploads/home/hero.jpg",
    intro: "/uploads/home/intro.jpg",
    bridal: "/uploads/home/bridal-experience.jpg",
    salon: "/uploads/home/salon.jpg",
    moreThanSalon: "/uploads/home/more-than-salon.jpg",
  },

  artist: {
    artist: "/uploads/artist/artist.jpg",
  },

  about: {
    hero: "/uploads/about/hero.jpg",
    story: "/uploads/about/story.jpg",
    celebrity: "/uploads/about/celebrity.jpg",
    moreThanSalon: "/uploads/about/more-than-salon.jpg",
    experience: "/uploads/about/experience.jpg",
    salon: "/uploads/about/about-01.jpg",
    team: [
      "/uploads/about/about-team-01.jpg",
      "/uploads/about/about-team-02.jpg",
      "/uploads/about/about-team-03.jpg",
    ],
  },

  services: {
    hero: "/uploads/services/hero.jpg",
    ladiesHair: "/uploads/services/ladies-hair.jpg",
    mensGrooming: "/uploads/services/mens-grooming.jpg",
    childrenHaircuts: "/uploads/services/children-haircuts.jpg",
    hairColour: "/uploads/services/hair-colour.jpg",
    hairStyling: "/uploads/services/hair-styling.jpg",
    bridalHairMakeup: "/uploads/services/bridal-hair-makeup.jpg",
    professionalMakeup: "/uploads/services/professional-makeup.jpg",
    hairTreatments: "/uploads/services/hair-treatments.jpg",
    hair: "/uploads/services/hair.jpg",
    colour: "/uploads/services/colour.jpg",
    beauty: "/uploads/services/beauty.jpg",
    bridal: "/uploads/services/bridal.jpg",
    makeup: "/uploads/services/makeup.jpg",
    treatments: "/uploads/services/treatments.jpg",
    transformations: "/uploads/services/service-transformations.jpg",
    before: "/uploads/services/service-before.jpg",
    after: "/uploads/services/service-after.jpg",
  },

  awards: {
    hero: "/uploads/awards/hero.jpg",
    award1: "/uploads/awards/award1.jpg",
    award2: "/uploads/awards/award2.jpg",
    award3: "/uploads/awards/award3.jpg",
    award01: "/uploads/awards/award-01.jpg",
    award02: "/uploads/awards/award-02.jpg",
    award03: "/uploads/awards/award-03.jpg",
  },

  gallery: {
    hero: "/uploads/gallery/hero.jpg",
  },

  reviews: {
    hero: "/uploads/reviews/hero.jpg",
    review1: "/uploads/reviews/review-01.jpg",
    review2: "/uploads/reviews/review-02.jpg",
    review3: "/uploads/reviews/review-03.jpg",
    review4: "/uploads/reviews/review-04.jpg",
  },

  contact: {
    hero: "/uploads/contact/hero.jpg",
    contact1: "/uploads/contact/contact-01.jpg",
  },

  booking: {
    hero: "/uploads/booking/hero.jpg",
    booking1: "/uploads/booking/booking-01.jpg",
  },

  hero: {
    poster: "/uploads/hero/hero-01.jpg",
    transformationPoster: "/uploads/hero/hero-transformation.jpg",
    bridalPoster: "/uploads/hero/hero-bridal.jpg",
    experiencePoster: "/uploads/hero/hero-experience.jpg",
  },

  instagram: {
    post1: "/uploads/instagram/instagram-01.jpg",
    post2: "/uploads/instagram/instagram-02.jpg",
    post3: "/uploads/instagram/instagram-03.jpg",
    post4: "/uploads/instagram/instagram-04.jpg",
    post5: "/uploads/instagram/instagram-05.jpg",
    post6: "/uploads/instagram/instagram-06.jpg",
    post7: "/uploads/instagram/instagram-07.jpg",
    post8: "/uploads/instagram/instagram-08.jpg",
    post9: "/uploads/instagram/instagram-09.jpg",
    post10: "/uploads/instagram/instagram-10.jpg",
    posts: [
      "/uploads/instagram/instagram-01.jpg",
      "/uploads/instagram/instagram-02.jpg",
      "/uploads/instagram/instagram-03.jpg",
      "/uploads/instagram/instagram-04.jpg",
      "/uploads/instagram/instagram-05.jpg",
      "/uploads/instagram/instagram-06.jpg",
      "/uploads/instagram/instagram-07.jpg",
      "/uploads/instagram/instagram-08.jpg",
      "/uploads/instagram/instagram-09.jpg",
      "/uploads/instagram/instagram-10.jpg",
    ],
  },

  journal: [
    "/uploads/journal/journal-01.jpg",
    "/uploads/journal/journal-02.jpg",
    "/uploads/journal/journal-03.jpg",
  ],

  common: {
    background: "/uploads/common/background.jpg",
    logo: "/uploads/common/logo.jpg",
  },
  logo: "/uploads/common/logo.jpg"
};

export const publicImages = images;
export const PUBLIC_IMAGES = images;


