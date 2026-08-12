import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  X,
  ArrowDown,
  Sparkles,
  Maximize2,
  LayoutGrid,
  Columns
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTACT_CONFIG } from '../config/contact';
import { BUSINESS_INFO } from '../config/business';
import { publicImages } from '../data/publicImages';
import { useSiteImages } from '../context/SiteImagesContext';

gsap.registerPlugin(ScrollTrigger);

interface AwardsPageProps {
  onNavigate?: (path: string) => void;
  onOpenBooking?: () => void;
}

export interface AwardPhotoItem {
  id: string;
  indexStr: string;
  title: string;
  category: string;
  year: string;
  src: string;
  aspect: string;
  gridSpan: string;
}

// Curated verified award photos from the project assets
const BASE_AWARD_PHOTOS: AwardPhotoItem[] = [
  {
    id: "award-photo-01",
    indexStr: "01",
    title: "Editorial Bridal Hair & Makeup Award",
    category: "BRIDAL ARTISTRY",
    year: "2026",
    src: publicImages.awards.award01 || "/uploads/awards/award-01.jpg",
    aspect: "aspect-[9/16]",
    gridSpan: "lg:col-span-4 md:col-span-6",
  },
  {
    id: "award-photo-02",
    indexStr: "02",
    title: "Master Hair Specialist & Balayage Aesthetics",
    category: "HAIR EXCELLENCE",
    year: "2025",
    src: publicImages.awards.award02 || "/uploads/awards/award-02.jpg",
    aspect: "aspect-[9/16]",
    gridSpan: "lg:col-span-4 md:col-span-6",
  },
  {
    id: "award-photo-03",
    indexStr: "03",
    title: "Gold Skin Aesthetics & Red Carpet Radiance",
    category: "AESTHETICS",
    year: "2025",
    src: publicImages.awards.award03 || "/uploads/awards/award-03.jpg",
    aspect: "aspect-[9/16]",
    gridSpan: "lg:col-span-4 md:col-span-6",
  },
  {
    id: "award-photo-04",
    indexStr: "04",
    title: "Couture Styling & Precision Artistry Honours",
    category: "HAIR & MAKEUP",
    year: "2025",
    src: publicImages.awards.award1 || "/uploads/awards/award1.jpg",
    aspect: "aspect-[9/16]",
    gridSpan: "lg:col-span-4 md:col-span-6",
  },
  {
    id: "award-photo-05",
    indexStr: "05",
    title: "International Salon Artistry Recognition",
    category: "EDITORIAL",
    year: "2024",
    src: publicImages.awards.award2 || "/uploads/awards/award2.jpg",
    aspect: "aspect-[9/16]",
    gridSpan: "lg:col-span-4 md:col-span-6",
  },
  {
    id: "award-photo-06",
    indexStr: "06",
    title: "Luxury Beauty Portfolio Showcase",
    category: "RECOGNITION",
    year: "2024",
    src: publicImages.awards.award3 || "/uploads/awards/award3.jpg",
    aspect: "aspect-[9/16]",
    gridSpan: "lg:col-span-4 md:col-span-6",
  },
];

export const AwardsPage: React.FC<AwardsPageProps> = ({ onOpenBooking }) => {
  const { siteImages } = useSiteImages();
  const [photoList, setPhotoList] = useState<AwardPhotoItem[]>(BASE_AWARD_PHOTOS);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [galleryLayout, setGalleryLayout] = useState<'side-scroll' | 'grid'>('grid');

  const containerRef = useRef<HTMLDivElement | null>(null);
  const sideScrollRef = useRef<HTMLDivElement | null>(null);

  // Touch swipe refs for mobile lightbox navigation
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleSideScroll = (direction: 'left' | 'right') => {
    if (sideScrollRef.current) {
      const distance = direction === 'left' ? -520 : 520;
      sideScrollRef.current.scrollBy({ left: distance, behavior: 'smooth' });
    }
  };

  // Sync with context or dynamic API awards
  useEffect(() => {
    const fetchAwardsApi = async () => {
      try {
        const res = await fetch('/api/awards');
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.awards) && data.awards.length > 0) {
          // Filter image items only
          const imageItems = data.awards.filter(
            (a: any) => a.type === 'image' || !a.url?.match(/\.(mp4|webm|mov|m4v)(\?.*)?$/i)
          );
          if (imageItems.length > 0) {
            const mapped: AwardPhotoItem[] = imageItems.map((item: any, idx: number) => ({
              id: item.id || `api-award-${idx}`,
              indexStr: String(idx + 1).padStart(2, '0'),
              title: item.title || 'Award & Recognition',
              category: item.organisation || 'RECOGNITION',
              year: item.year || '2026',
              src: item.url,
              aspect: 'h-auto',
              gridSpan: '',
            }));
            setPhotoList(mapped);
          }
        }
      } catch (err) {
        console.error('Error fetching awards list:', err);
      }
    };

    fetchAwardsApi();
  }, []);

  // GSAP entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-anim',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.15 }
      );

      gsap.utils.toArray<HTMLElement>('.reveal-block').forEach((sec) => {
        gsap.fromTo(
          sec,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 85%',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Lightbox keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
      if (e.key === 'ArrowRight') navigateLightbox('next');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, photoList]);

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (lightboxIndex === null || photoList.length === 0) return;
    if (direction === 'prev') {
      setLightboxIndex((prev) => (prev === 0 ? photoList.length - 1 : (prev as number) - 1));
    } else {
      setLightboxIndex((prev) => (prev === photoList.length - 1 ? 0 : (prev as number) + 1));
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) navigateLightbox('next');
    if (distance < -50) navigateLightbox('prev');

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const heroImageSrc =
    siteImages.awards?.hero || publicImages.awards.hero || '/uploads/awards/hero.jpg';

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#080808] text-[#F5F1E8] overflow-x-hidden selection:bg-[#D4AF37] selection:text-[#080808]"
    >
      {/* ==================================================
          1. CINEMATIC AWARDS HERO
          ================================================== */}
      <section className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden border-b border-[#D4AF37]/20 pt-20">
        {/* Background Image with Ambient Overlay */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <img
            src={heroImageSrc}
            alt="Awards & Honours Background"
            className="w-full h-full object-cover object-center filter brightness-[0.28] contrast-125 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/90 via-[#080808]/50 to-[#080808]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[150px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-5xl px-6 py-20 flex flex-col items-center">
          {/* Badge */}
          <div className="hero-anim inline-flex items-center gap-3 bg-[#080808]/80 border border-[#D4AF37]/30 px-5 py-2 backdrop-blur-md mb-8">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-mono tracking-[0.35em] text-[#D4AF37] uppercase font-bold">
              {BUSINESS_INFO.name} • HONOURS
            </span>
          </div>

          <h1 className="hero-anim font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#F5F1E8] font-light uppercase leading-[0.9] mb-8">
            RECOGNISED.<br />
            CELEBRATED.<br />
            <span className="italic text-[#D4AF37]">AWARD-WINNING.</span>
          </h1>

          <div className="hero-anim h-px w-24 bg-[#D4AF37]/60 mb-8" />

          <p className="hero-anim text-sm sm:text-base md:text-lg text-[#A9A39A] font-light max-w-2xl mx-auto leading-relaxed mb-10">
            A showcase of international recognition, editorial accolades, and verified awards honoring master beauty, bridal styling, and hair artistry.
          </p>

          <a
            href="#award-gallery"
            className="hero-anim group inline-flex items-center gap-3 bg-[#D4AF37] hover:bg-[#F5C542] text-[#080808] px-8 py-4 text-xs font-mono uppercase tracking-[0.25em] font-bold transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] cursor-pointer active:scale-95"
          >
            <span>EXPLORE AWARD GALLERY →</span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[#D4AF37]/80 animate-bounce pointer-events-none">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em]">SCROLL</span>
          <ArrowDown className="w-4 h-4" />
        </div>
      </section>

      {/* ==================================================
          2. AWARD INTRO
          ================================================== */}
      <section className="reveal-block bg-[#080808] py-20 sm:py-28 px-6 md:px-12 border-b border-[#D4AF37]/10 relative">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-xs font-mono text-[#D4AF37] tracking-[0.35em] uppercase font-bold">
            ARTISTRY & DEDICATION
          </p>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F5F1E8] font-light uppercase tracking-wider leading-tight">
            A MOMENT WORTH <span className="italic text-[#D4AF37]">CELEBRATING</span>
          </h2>

          <p className="text-base sm:text-lg text-[#A9A39A] font-light leading-relaxed max-w-3xl mx-auto">
            Shiny's Hair & Beauty Salon brings award-winning makeup and hairstyling expertise to Horsham, with experience across bridal beauty, fashion, film and major events. Every recognition represents our relentless commitment to bespoke artistry, precision techniques, and unforgettable transformations.
          </p>
        </div>
      </section>

      {/* ==================================================
          3. PREMIUM AWARD PHOTO GALLERY (WITH SIDE SCROLL)
          ================================================== */}
      <section
        id="award-gallery"
        className="reveal-block py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-b border-[#D4AF37]/10"
      >
        {/* Section Header with Layout Toggle & Navigation Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-[#111111] pb-8 mb-12 gap-6">
          <div>
            <p className="text-xs font-mono text-[#D4AF37] tracking-[0.35em] uppercase font-bold mb-2">
              PORTFOLIO OF EXCELLENCE
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F5F1E8] font-light uppercase tracking-wider">
              AWARD GALLERY
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4 self-start lg:self-end">
            {/* View Mode Toggle */}
            <div className="inline-flex items-center bg-[#111111] border border-[#D4AF37]/30 p-1 rounded-sm">
              <button
                onClick={() => setGalleryLayout('side-scroll')}
                className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  galleryLayout === 'side-scroll'
                    ? 'bg-[#D4AF37] text-[#080808] font-bold shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                    : 'text-[#A9A39A] hover:text-[#F5F1E8]'
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span>SIDE SCROLL</span>
              </button>

              <button
                onClick={() => setGalleryLayout('grid')}
                className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  galleryLayout === 'grid'
                    ? 'bg-[#D4AF37] text-[#080808] font-bold shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                    : 'text-[#A9A39A] hover:text-[#F5F1E8]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>MASONRY GRID</span>
              </button>
            </div>

            {/* Side Scroll Arrows */}
            {galleryLayout === 'side-scroll' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSideScroll('left')}
                  className="w-10 h-10 bg-[#111111] border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#080808] text-[#D4AF37] transition-all flex items-center justify-center cursor-pointer active:scale-95 shadow-md"
                  title="Scroll Left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleSideScroll('right')}
                  className="w-10 h-10 bg-[#111111] border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#080808] text-[#D4AF37] transition-all flex items-center justify-center cursor-pointer active:scale-95 shadow-md"
                  title="Scroll Right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            <span className="text-xs font-mono text-[#A9A39A] uppercase tracking-widest">
              RECOGNITIONS
            </span>
          </div>
        </div>

        {/* LAYOUT 1: HORIZONTAL SIDE SCROLL CAROUSEL */}
        {galleryLayout === 'side-scroll' ? (
          <div className="space-y-6">
            <div
              ref={sideScrollRef}
              className="flex gap-6 sm:gap-8 overflow-x-auto overflow-y-hidden pb-8 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth touch-pan-x cursor-grab active:cursor-grabbing"
            >
              {photoList.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  onClick={() => setLightboxIndex(idx)}
                  className="min-w-[260px] sm:min-w-[320px] max-w-[380px] snap-start shrink-0 group relative cursor-pointer overflow-hidden border border-[#D4AF37]/25 bg-[#111111] hover:border-[#D4AF37] transition-all duration-300 shadow-2xl rounded-sm p-3 hover:scale-[1.02]"
                >
                  {/* Image Frame */}
                  <div className="relative w-full overflow-hidden bg-[#080808] flex items-center justify-center min-h-[280px] max-h-[550px] p-1">
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-auto max-h-[520px] object-contain filter brightness-[0.95] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />

                    {/* Corner Frame Accents */}
                    <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors pointer-events-none" />
                    <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors pointer-events-none" />
                    <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors pointer-events-none" />
                    <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors pointer-events-none" />

                    {/* Expand Icon */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#080808]/85 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 backdrop-blur-md shadow-md">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Caption Below Image */}
                  <div className="pt-3 pb-1 px-1 flex flex-col space-y-1">
                    <p className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-[0.25em]">
                      {item.category}
                    </p>
                    <h3 className="font-serif text-lg sm:text-xl text-[#F5F1E8] group-hover:text-[#F5C542] transition-colors duration-300 font-light leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Side Scroll Footer Indicator Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-[#111111]">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
                <span>← DRAG OR USE ARROWS TO SIDE SCROLL →</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleSideScroll('left')}
                  className="px-4 py-2 bg-[#111111] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-xs font-mono text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>PREV</span>
                </button>
                <button
                  onClick={() => handleSideScroll('right')}
                  className="px-4 py-2 bg-[#111111] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-xs font-mono text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                >
                  <span>NEXT</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* LAYOUT 2: EDITORIAL MASONRY GRID (3 Col Desktop, 2 Col Tablet, 1 Col Mobile) */
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-8 space-y-6 sm:space-y-8">
            {photoList.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setLightboxIndex(idx)}
                className="break-inside-avoid mb-6 sm:mb-8 group relative cursor-pointer overflow-hidden border border-[#D4AF37]/25 hover:border-[#D4AF37] bg-[#111111] transition-all duration-300 shadow-2xl rounded-sm p-2 sm:p-3 hover:scale-[1.02]"
              >
                {/* Inner Border Frame */}
                <div className="relative w-full overflow-hidden bg-[#080808] rounded-xs flex items-center justify-center">
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-auto block object-contain filter brightness-[0.95] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />

                  {/* Corner Frame Accents */}
                  <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors pointer-events-none" />
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 right-3 pointer-events-none z-10">
                    <div className="w-8 h-8 rounded-full bg-[#080808]/85 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 backdrop-blur-md shadow-md">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Card Info Footer */}
                <div className="pt-3 pb-1 px-1 flex flex-col space-y-1">
                  <p className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-[0.25em]">
                    {item.category}
                  </p>
                  <h3 className="font-serif text-lg sm:text-xl text-[#F5F1E8] group-hover:text-[#F5C542] transition-colors duration-300 font-light leading-snug">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ==================================================
          4. FINAL BOOKING CTA
          ================================================== */}
      <section className="reveal-block py-28 md:py-36 px-6 text-center border-b border-[#D4AF37]/10 bg-[#080808] relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <p className="text-xs font-mono uppercase tracking-[0.35em] text-[#D4AF37] font-bold">
            {BUSINESS_INFO.name}
          </p>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F5F1E8] font-light tracking-wider uppercase leading-none">
            YOUR BEAUTY.<br />
            <span className="italic text-[#D4AF37]">YOUR MOMENT.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#A9A39A] font-light leading-relaxed max-w-xl mx-auto">
            Experience hair styling, facial aesthetics, and couture makeup artistry at our Horsham salon suite.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-10 py-4 bg-[#D4AF37] hover:bg-[#F5C542] text-[#080808] font-mono text-xs uppercase tracking-[0.25em] font-bold transition-all shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] cursor-pointer active:scale-95"
            >
              BOOK YOUR APPOINTMENT →
            </button>

            <a
              href={CONTACT_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-4 bg-transparent border border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#080808] font-mono text-xs uppercase tracking-[0.25em] font-bold transition-all cursor-pointer active:scale-95 inline-block"
            >
              CHAT ON WHATSAPP
            </a>
          </div>
        </div>
      </section>

      {/* ==================================================
          5. PHOTO LIGHTBOX MODAL
          ================================================== */}
      <AnimatePresence>
        {lightboxIndex !== null && photoList[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#080808]/98 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 selection:bg-[#D4AF37] selection:text-[#080808]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between z-20">
              <div className="flex items-center gap-3 bg-[#111111] border border-[#D4AF37]/30 px-4 py-2">
                <span className="text-xs font-mono text-[#D4AF37] tracking-[0.3em] font-bold uppercase">
                  {photoList[lightboxIndex].category || 'RECOGNITION'}
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-3 bg-[#111111] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#F5F1E8] hover:text-[#D4AF37] transition-all cursor-pointer"
                title="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Image Container */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              {/* Previous Button */}
              <button
                onClick={() => navigateLightbox('prev')}
                className="absolute left-2 sm:left-6 z-30 p-3.5 bg-[#080808]/80 border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#080808] transition-all duration-300 shadow-2xl backdrop-blur-md cursor-pointer"
                title="Previous Photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="relative max-w-5xl w-full max-h-[85vh] flex items-center justify-center p-2">
                <img
                  src={photoList[lightboxIndex].src}
                  alt={photoList[lightboxIndex].title}
                  className="max-w-full max-h-[85vh] w-auto h-auto object-contain border border-[#D4AF37]/40 shadow-2xl bg-[#000000]"
                />
              </div>

              {/* Next Button */}
              <button
                onClick={() => navigateLightbox('next')}
                className="absolute right-2 sm:right-6 z-30 p-3.5 bg-[#080808]/80 border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#080808] transition-all duration-300 shadow-2xl backdrop-blur-md cursor-pointer"
                title="Next Photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Bar Info */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 z-20 border-t border-[#D4AF37]/20 pt-4">
              <div className="text-center sm:text-left">
                <h3 className="font-serif text-lg sm:text-xl text-[#F5F1E8]">
                  {photoList[lightboxIndex].title}
                </h3>
                <p className="text-[10px] font-mono text-[#A9A39A] uppercase tracking-widest">
                  {BUSINESS_INFO.name}
                </p>
              </div>

              {/* Navigation Dots */}
              <div className="flex items-center gap-2">
                {photoList.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setLightboxIndex(idx)}
                    className={`h-2 transition-all duration-300 cursor-pointer ${
                      idx === lightboxIndex
                        ? 'w-8 bg-[#D4AF37]'
                        : 'w-2 bg-[#D4AF37]/30 hover:bg-[#D4AF37]/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
