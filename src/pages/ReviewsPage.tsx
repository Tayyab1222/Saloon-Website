import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGoogleReviews } from '../hooks/useGoogleReviews';
import { Star, ExternalLink, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSiteImages } from '../context/SiteImagesContext';

interface ReviewsPageProps {
  onOpenBooking: () => void;
}

const GoogleGIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ onOpenBooking }) => {
  const { siteImages } = useSiteImages();
  const heroImage = (siteImages as any)?.reviews?.hero || '/uploads/reviews/hero.jpg';

  const { data, loading } = useGoogleReviews();
  const reviews = data.reviews || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (reviews.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    if (reviews.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const getVisibleReviewsDesktop = () => {
    if (reviews.length === 0) return [];
    if (reviews.length <= 3) return reviews.map((r, i) => ({ review: r, idx: i }));
    const items = [];
    for (let i = 0; i < 3; i++) {
      const idx = (currentIndex + i) % reviews.length;
      items.push({ review: reviews[idx], idx });
    }
    return items;
  };

  const currentMobileReview = reviews.length > 0 ? reviews[currentIndex % reviews.length] : null;

  return (
    <div className="bg-[#080808] text-[#F5F1E8] pb-24">
      {/* CINEMATIC HERO SECTION */}
      <section className="relative w-full min-h-[520px] lg:min-h-[600px] flex items-center justify-center overflow-hidden border-b border-[#D4AF37]/20 pt-28 pb-16 mb-12">
        {/* Cinematic Background Image with Zoom & Dark Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img
            initial={{ scale: 1.12, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            src={heroImage}
            alt="Client Love & Reviews"
            className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-105"
          />
          {/* Layered Luxury Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-[#080808]/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-transparent to-[#080808]/80" />
        </div>

        {/* Champagne Gold Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent z-10" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-6">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#080808]/80 border border-[#D4AF37]/30 backdrop-blur-md rounded-full shadow-xl"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.45em] text-[#D4AF37] font-mono font-semibold">
              CLIENT LOVE
            </p>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="font-serif text-4xl sm:text-6xl md:text-8xl tracking-wider font-light uppercase leading-[1.05] text-[#F5F1E8] drop-shadow-lg"
          >
            WHAT OUR <span className="italic text-[#D4AF37]">CLIENTS SAY.</span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-xs sm:text-sm md:text-base tracking-[0.2em] text-[#E0D8C8] font-light uppercase max-w-2xl mx-auto leading-relaxed"
          >
            Explore reviews, ratings, and genuine feedback from clients who have experienced the artistry at Shiny's Hair & Beauty Salon.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent mx-auto pt-2"
          />
        </div>
      </section>

      {/* LOADING STATE */}
      {loading && (
        <div className="py-24 text-center text-[#A9A39A] font-mono text-xs tracking-widest animate-pulse">
          LOADING CLIENT REVIEWS...
        </div>
      )}

      {/* REVIEWS CONTENT */}
      {!loading && reviews.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          {/* DESKTOP CAROUSEL (3 at a time) */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6">
            {getVisibleReviewsDesktop().map(({ review: rev, idx }) => {
              const clientName = rev.author_name && rev.author_name.trim() !== '' ? rev.author_name : "SHINY'S CLIENT";
              return (
                <motion.div
                  key={`${rev.author_name}-${idx}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#111111] border border-[#D4AF37]/20 p-8 flex flex-col justify-between hover:border-[#D4AF37]/40 transition-all duration-300 relative group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between min-h-[24px]">
                      <div className="flex items-center space-x-1">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                        ))}
                      </div>
                      {rev.source === 'Google' && (
                        <div className="flex items-center gap-1.5 text-[10px] text-[#A9A39A] font-mono uppercase tracking-wider">
                          <GoogleGIcon className="w-3.5 h-3.5" />
                          <span>Google</span>
                        </div>
                      )}
                    </div>

                    <Quote className="w-7 h-7 text-[#D4AF37]/20" />
                    <p className="font-serif text-lg text-[#F5F1E8] italic font-light leading-relaxed">
                      "{rev.text}"
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#080808] flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                      — {clientName}
                    </p>
                    {rev.relative_time_description && (
                      <span className="text-[10px] font-mono text-[#A9A39A] font-light">
                        {rev.relative_time_description}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* MOBILE & TABLET CAROUSEL (1 at a time) */}
          <div className="lg:hidden">
            <AnimatePresence mode="wait">
              {currentMobileReview && (
                <motion.div
                  key={`${currentMobileReview.author_name}-${currentIndex}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#111111] border border-[#D4AF37]/20 p-8 flex flex-col justify-between hover:border-[#D4AF37]/40 transition-all duration-300 relative group max-w-xl mx-auto"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between min-h-[24px]">
                      <div className="flex items-center space-x-1">
                        {[...Array(currentMobileReview.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                        ))}
                      </div>
                      {currentMobileReview.source === 'Google' && (
                        <div className="flex items-center gap-1.5 text-[10px] text-[#A9A39A] font-mono uppercase tracking-wider">
                          <GoogleGIcon className="w-3.5 h-3.5" />
                          <span>Google</span>
                        </div>
                      )}
                    </div>

                    <Quote className="w-7 h-7 text-[#D4AF37]/20" />
                    <p className="font-serif text-lg text-[#F5F1E8] italic font-light leading-relaxed">
                      "{currentMobileReview.text}"
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#080808] flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                      — {currentMobileReview.author_name || "SHINY'S CLIENT"}
                    </p>
                    {currentMobileReview.relative_time_description && (
                      <span className="text-[10px] font-mono text-[#A9A39A] font-light">
                        {currentMobileReview.relative_time_description}
                      </span>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Carousel Controls */}
          {reviews.length > 1 && (
            <div className="flex items-center justify-between max-w-xs mx-auto pt-4">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#080808] transition-all duration-300 active:scale-95 cursor-pointer"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="text-xs font-mono text-[#A9A39A]">
                <span className="text-[#D4AF37]">{String(currentIndex + 1).padStart(2, '0')}</span> / {String(reviews.length).padStart(2, '0')}
              </div>

              <button
                onClick={nextSlide}
                className="p-3 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#080808] transition-all duration-300 active:scale-95 cursor-pointer"
                aria-label="Next Review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* BOTTOM ACTIONS */}
      <div className="max-w-4xl mx-auto px-6 mt-16 pt-12 border-t border-[#D4AF37]/10 text-center flex flex-col sm:flex-row items-center justify-center gap-6">
        <a
          href={data.googleMapsUrl || "https://www.google.com/maps/place/?q=place_id:ChIJExw-Ti3rdUgRjs5g8_7oe0U"}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-10 py-4 text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#D4AF37] border border-[#D4AF37]/40 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300"
        >
          <GoogleGIcon className="w-4 h-4" />
          <span>READ REVIEWS ON GOOGLE →</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        <button
          onClick={onOpenBooking}
          className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#080808] bg-[#D4AF37] hover:bg-[#F5C542] transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.25)] cursor-pointer"
        >
          <span>BOOK APPOINTMENT →</span>
        </button>
      </div>
    </div>
  );
};

