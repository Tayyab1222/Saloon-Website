import React from 'react';
import { motion } from 'motion/react';
import { useSiteImages } from '../../context/SiteImagesContext';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface ArtistFounderSectionProps {
  onNavigate?: (path: string) => void;
}

export const ArtistFounderSection: React.FC<ArtistFounderSectionProps> = ({ onNavigate }) => {
  const { siteImages } = useSiteImages();
  const artistImage = siteImages.artist?.artist || '/uploads/artist/artist.jpg';

  return (
    <section className="bg-[#080808] py-24 md:py-36 px-6 md:px-12 text-[#F5F1E8] border-b border-[#D4AF37]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Large Editorial Portrait */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[4/5] max-h-[720px] overflow-hidden border border-[#D4AF37]/20 shadow-[0_0_60px_rgba(0,0,0,0.9)] group"
            >
              <ImageWithFallback
                src={artistImage}
                alt="Meet Shiny"
                className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-[0.92] contrast-[1.05]"
              />

              {/* Subtle Vignette Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-[#080808]/20 pointer-events-none" />

              {/* Gold Accent Corner Frame */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-[#D4AF37]/40 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-[#D4AF37]/40 pointer-events-none" />
            </motion.div>
          </div>

          {/* Right Column: Editorial Text & Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 order-1 lg:order-2 space-y-8"
          >
            {/* Section Eyebrow */}
            <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-mono font-medium">
              FOUNDER & LEAD ARTIST
            </p>

            {/* Main Headline */}
            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.98] font-light uppercase text-[#F5F1E8]">
              MEET SHINY
            </h2>

            {/* Short Editorial Text */}
            <div className="space-y-4 text-base sm:text-lg text-[#A9A39A] font-light leading-relaxed max-w-xl">
              <p>
                Shiny is an award-winning makeup artist and hairstylist with international experience across film, fashion, weddings and major events.
              </p>
              <p>
                Shiny specialises in bridal beauty, makeup and modern hair transformations, bringing world-class expertise to Horsham.
              </p>
            </div>

            {/* Call To Action Button */}
            <div className="pt-4">
              <button
                onClick={() => onNavigate && onNavigate('/about')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] text-[#080808] font-mono text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-300 hover:bg-[#F5C542] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] group"
              >
                <span>MEET SHINY</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
