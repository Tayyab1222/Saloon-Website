import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { publicImages } from '../../data/publicImages';
import { useSiteImages } from '../../context/SiteImagesContext';

interface HomeAwardsSectionProps {
  onNavigate: (path: string) => void;
}

export const HomeAwardsSection: React.FC<HomeAwardsSectionProps> = ({ onNavigate }) => {
  const { siteImages } = useSiteImages();
  const heroBg = siteImages.awards?.hero || publicImages.awards.hero;
  const awardVisual = siteImages.awards?.award2 || siteImages.awards?.award1 || publicImages.awards.award2;
  const containerRef = useRef<HTMLElement>(null);

  // Parallax & scale effects on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.05, 1]);

  return (
    <section
      ref={containerRef}
      id="awards-teaser-section"
      className="relative w-full bg-[#080808] text-[#F5F1E8] py-24 sm:py-32 lg:py-40 px-6 sm:px-12 lg:px-20 overflow-hidden border-b border-[#D4AF37]/15"
    >
      {/* Background Image with Parallax & Dark Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <motion.img
          src={heroBg}
          alt="Award background"
          style={{ y: bgY }}
          className="w-full h-[120%] object-cover object-center filter brightness-[0.22] contrast-125 opacity-40 scale-105"
        />
        {/* Luxury Gold Ambient Glows */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-[#080808]" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Two-Column Cinematic Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE: Large Award Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 order-1"
          >
            <div className="relative group overflow-hidden border border-[#D4AF37]/30 bg-[#111111] shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-2 sm:p-3">
              {/* Gold Inner Frame Border */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden bg-[#080808]">
                <motion.img
                  style={{ scale: imageScale }}
                  src={awardVisual}
                  alt="Award Winning Beauty Visual"
                  className="w-full h-full object-cover filter brightness-95 contrast-105 transition-transform duration-1000 ease-out"
                />

                {/* Subtle Image Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent opacity-80" />

                {/* Corner Accents */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#D4AF37]/60" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#D4AF37]/60" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#D4AF37]/60" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#D4AF37]/60" />
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Text & CTA */}
          <div className="lg:col-span-5 order-2 space-y-6 sm:space-y-8 flex flex-col justify-center">
            
            {/* SMALL LABEL */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-mono font-bold">
                RECOGNISED FOR EXCELLENCE
              </p>
            </motion.div>

            {/* MAIN HEADING */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.95] text-[#F5F1E8] uppercase font-light"
            >
              RECOGNISED.<br />
              CELEBRATED.<br />
              <span className="italic text-[#D4AF37]">AWARD-WINNING.</span>
            </motion.h2>

            {/* SHORT ELEGANT TEXT */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-sm sm:text-base text-[#A9A39A] font-light italic leading-relaxed tracking-wide"
            >
              "Celebrating creativity, dedication and a passion for beauty."
            </motion.p>

            {/* GOLD DIVIDER */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37] to-transparent origin-left"
            />

            {/* SUBTEXT / BADGE */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex items-center gap-2 text-xs sm:text-sm font-mono text-[#D4AF37] tracking-[0.15em] uppercase font-medium"
            >
              <span>🏆</span>
              <span>AWARD WINNING MAKEUP ARTIST</span>
            </motion.div>

            {/* CTA BUTTON */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-2"
            >
              <button
                onClick={() => onNavigate('/awards')}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#D4AF37] hover:bg-[#F5C542] text-[#080808] font-mono text-xs uppercase tracking-[0.25em] font-bold transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_35px_rgba(212,175,55,0.45)] cursor-pointer active:scale-98"
              >
                <span>VIEW ALL AWARDS →</span>
              </button>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};

