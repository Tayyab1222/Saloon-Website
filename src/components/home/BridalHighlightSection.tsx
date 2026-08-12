import React from 'react';
import { motion } from 'motion/react';
import { useSiteImages } from '../../context/SiteImagesContext';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface BridalHighlightSectionProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const BridalHighlightSection: React.FC<BridalHighlightSectionProps> = ({
  onNavigate,
}) => {
  const { siteImages } = useSiteImages();
  const bgImageUrl = siteImages?.home?.bridal || '/uploads/home/bridal-experience.jpg';

  return (
    <section className="relative w-full py-28 md:py-40 bg-[#080808] text-[#F5F1E8] border-b border-[#D4AF37]/15 overflow-hidden flex items-center justify-center min-h-[500px] md:min-h-[620px]">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          className="w-full h-full"
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1.0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          <ImageWithFallback
            src={bgImageUrl}
            alt="Shiny's Hair & Beauty Bridal Experience"
            className="w-full h-full object-cover object-[center_35%] sm:object-[center_40%] md:object-center filter brightness-[0.65] contrast-[1.08]"
          />
        </motion.div>

        {/* Dark Luxury Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/50 to-[#080808]/80" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs font-mono text-[#D4AF37] tracking-[0.35em] uppercase font-bold"
        >
          BRIDAL EXPERIENCE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider font-light uppercase leading-tight drop-shadow-md"
        >
          YOUR DAY. <br />
          <span className="italic text-[#D4AF37]">YOUR BEAUTY.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-[#F5F1E8]/90 font-light max-w-xl mx-auto leading-relaxed drop-shadow"
        >
          Bridal hair and makeup crafted around you, from the first consultation to the final finishing touch.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pt-4"
        >
          <button
            onClick={() => onNavigate('/services')}
            className="group inline-flex items-center px-8 py-4 text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#080808] bg-[#D4AF37] hover:bg-[#F5C542] transition-colors duration-300 shadow-[0_0_25px_rgba(212,175,55,0.3)] cursor-pointer"
          >
            <span>DISCOVER BRIDAL →</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

