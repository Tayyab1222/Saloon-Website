import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Eye } from 'lucide-react';
import { Lightbox } from '../common/Lightbox';
import { GalleryImage } from '../../types';
import { MEDIA_ASSETS } from '../../data/media';

interface HomeGallerySectionProps {
  onNavigate: (path: string) => void;
}

export const HomeGallerySection: React.FC<HomeGallerySectionProps> = ({ onNavigate }) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Fallback items from MEDIA_ASSETS if API hasn't loaded or is empty
  const fallbackGallery: GalleryImage[] = MEDIA_ASSETS.gallery.map((item) => ({
    id: item.id,
    url: item.image,
    title: item.title,
    category: item.category,
    uploadedAt: new Date().toISOString(),
    filename: item.id,
  }));

  useEffect(() => {
    let isMounted = true;
    async function loadGallery() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/gallery');
        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.images) && data.images.length > 0) {
          setImages(data.images);
        } else if (isMounted) {
          setImages(fallbackGallery);
        }
      } catch (err) {
        if (isMounted) {
          setImages(fallbackGallery);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadGallery();
    return () => {
      isMounted = false;
    };
  }, []);

  const activeImages = images.length > 0 ? images : fallbackGallery;

  // Duplicate items to guarantee a seamless continuous infinite scroll without gaps or jumps
  const displayList = [...activeImages, ...activeImages, ...activeImages];

  const openLightboxAt = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="bg-[#080808] text-[#F5F1E8] py-20 md:py-32 px-6 md:px-12 border-b border-[#D4AF37]/10 relative overflow-hidden selection:bg-[#D4AF37] selection:text-[#080808]">
      {/* Custom Styles for Continuous Infinite Marquee */}
      <style>{`
        @keyframes homeVerticalMarquee {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(-33.3333%);
          }
        }

        @keyframes homeHorizontalMarquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }

        .animate-home-vertical-marquee {
          animation: homeVerticalMarquee 38s linear infinite;
        }

        .animate-home-horizontal-marquee {
          animation: homeHorizontalMarquee 28s linear infinite;
        }

        .marquee-paused {
          animation-play-state: paused !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-home-vertical-marquee,
          .animate-home-horizontal-marquee {
            animation: none !important;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* LEFT CONTENT AREA (55 - 60% Width) */}
        <div className="w-full lg:w-[56%] space-y-6 sm:space-y-8 z-10">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-mono font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] inline-block animate-pulse" />
              THE SHINY'S EDIT
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-wider font-light uppercase leading-[1.08]">
              A GLIMPSE <br />
              <span className="italic text-[#D4AF37]">INTO OUR WORK.</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm md:text-base text-[#A9A39A] font-light max-w-xl leading-relaxed">
            Discover a selection of our latest hair, beauty, makeup and bridal transformations.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/gallery')}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#080808] border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#080808] text-xs font-mono font-bold uppercase tracking-[0.25em] transition-all duration-300 shadow-xl cursor-pointer"
            >
              <span>VIEW ALL WORK →</span>
            </button>
          </div>
        </div>

        {/* RIGHT SIDEBAR / VERTICAL GALLERY RAIL (35 - 40% Width) */}
        {/* DESKTOP VIEW: Tall Vertical Auto-Scroll Rail */}
        <div
          className="hidden lg:block w-[42%] xl:w-[38%] h-[640px] xl:h-[720px] relative overflow-hidden rounded-sm border border-[#D4AF37]/25 bg-[#111111]/60 shadow-[0_0_50px_rgba(212,175,55,0.06)] group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Subtle Top & Bottom Gradient Edge Fade Overlays */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#080808] via-[#080808]/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-transparent z-20 pointer-events-none" />

          {/* Continuous Moving Track */}
          <div
            className={`p-4 space-y-5 animate-home-vertical-marquee ${
              isHovered ? 'marquee-paused' : ''
            }`}
          >
            {displayList.map((img, idx) => (
              <div
                key={`${img.id}_v_${idx}`}
                onClick={() => openLightboxAt(idx % activeImages.length)}
                className="group/item relative overflow-hidden bg-[#080808] border border-[#D4AF37]/25 hover:border-[#D4AF37] rounded-sm cursor-pointer shadow-xl transition-all duration-500"
              >
                {/* Natural Aspect Ratio Image */}
                <img
                  src={img.url}
                  alt={img.title || `${img.category || 'Gallery'} transformation`}
                  loading="lazy"
                  className="w-full h-auto object-cover filter brightness-95 contrast-105 transition-transform duration-700 ease-out group-hover/item:scale-[1.02] block"
                />

                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end pointer-events-none">
                  <div className="transform translate-y-2 group-hover/item:translate-y-0 transition-transform duration-300 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37] bg-[#080808]/90 border border-[#D4AF37]/40 px-2.5 py-1 font-semibold shadow-md">
                      {img.category || 'WORK'}
                    </span>
                    <span className="text-[10px] font-mono text-[#F5F1E8] flex items-center gap-1.5 bg-[#080808]/80 px-2 py-0.5 border border-[#D4AF37]/20">
                      <Eye className="w-3 h-3 text-[#D4AF37]" />
                      <span>VIEW</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE VIEW: Horizontal Continuous Marquee Slider */}
        <div
          className="block lg:hidden w-full h-[260px] sm:h-[320px] relative overflow-hidden rounded-sm border border-[#D4AF37]/20 bg-[#111111]/40 group"
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Subtle Left & Right Edge Overlays */}
          <div className="absolute top-0 bottom-0 left-0 w-10 bg-gradient-to-r from-[#080808] to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-10 bg-gradient-to-l from-[#080808] to-transparent z-20 pointer-events-none" />

          <div
            className={`flex items-center gap-4 py-3 h-full animate-home-horizontal-marquee ${
              isHovered ? 'marquee-paused' : ''
            }`}
          >
            {displayList.map((img, idx) => (
              <div
                key={`${img.id}_h_${idx}`}
                onClick={() => openLightboxAt(idx % activeImages.length)}
                className="shrink-0 h-full aspect-[3/4] relative overflow-hidden bg-[#080808] border border-[#D4AF37]/25 hover:border-[#D4AF37] rounded-sm cursor-pointer shadow-lg transition-all"
              >
                <img
                  src={img.url}
                  alt={img.title || "Gallery photo"}
                  loading="lazy"
                  className="w-full h-full object-cover filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 p-3 flex flex-col justify-end pointer-events-none">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#D4AF37] font-semibold">
                    {img.category || 'WORK'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        images={activeImages}
        currentIndex={selectedImageIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setSelectedImageIndex(idx)}
      />
    </section>
  );
};
