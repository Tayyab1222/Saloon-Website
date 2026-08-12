import React, { useRef, useState } from 'react';
import { INSTAGRAM_SLIDER_IMAGES } from '../../data/instagramImages';
import { CONTACT_CONFIG } from '../../config/contact';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useSiteImages } from '../../context/SiteImagesContext';

export const InstagramSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { instagramGallery } = useSiteImages();

  const rawList = (instagramGallery && instagramGallery.length > 0)
    ? instagramGallery.map((item, idx) => ({
        id: item.id || `ig-${idx}`,
        url: item.url,
        alt: `Shiny's Hair & Beauty Instagram`,
      }))
    : [];

  // Guarantee enough elements for horizontal width even if image count is small
  let baseList = rawList;
  while (baseList.length > 0 && baseList.length < 12) {
    baseList = [...baseList, ...rawList];
  }

  // Triple the array to guarantee seamless infinite loop without jumps or gaps
  const marqueeImages = [
    ...baseList,
    ...baseList,
    ...baseList
  ];

  return (
    <section className="bg-[#080808] py-20 md:py-32 text-[#F5F1E8] border-b border-[#D4AF37]/10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#111111] pb-8">
          <div>
            <a
              href={CONTACT_CONFIG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-mono font-semibold inline-block mb-2 hover:underline transition-all"
            >
              @SHINYS_BEAUTY
            </a>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-wider font-light uppercase">
              FOLLOW THE <span className="italic text-[#D4AF37]">JOURNEY.</span>
            </h2>
          </div>
        </div>
      </div>

      {/* CONTINUOUS SMOOTH INFINITE MARQUEE SLIDER */}
      {marqueeImages.length === 0 ? (
        <div className="mt-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="p-10 rounded-2xl bg-[#0D0D0D] border border-[#D4AF37]/20 text-center space-y-3">
            <p className="text-[#D4AF37] font-serif text-xl tracking-wide uppercase">Follow @SHINYS_BEAUTY on Instagram</p>
            <p className="text-xs text-[#888] font-mono max-w-md mx-auto">
              Explore our latest hair transformations, beauty artistry, and client gallery updates.
            </p>
          </div>
        </div>
      ) : (
        <div
          className="mt-10 relative w-full overflow-x-auto no-scrollbar scroll-smooth"
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div
            className="flex gap-4 sm:gap-6 w-max animate-marquee"
            style={{
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            {marqueeImages.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="relative shrink-0 w-[240px] sm:w-[300px] md:w-[340px] lg:w-[360px] aspect-[4/5] overflow-hidden border border-[#D4AF37]/20 bg-[#111111] group rounded-sm transition-all duration-500 hover:border-[#D4AF37]/60"
              >
                <ImageWithFallback
                  src={item.url}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04] filter brightness-[0.92] contrast-[1.05]"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CSS Styling for Continuous Infinite Loop */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333333%);
          }
        }
        .animate-marquee {
          animation: marquee 45s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

