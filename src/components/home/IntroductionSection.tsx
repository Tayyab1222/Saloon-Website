import React from 'react';
import { motion } from 'motion/react';
import { MEDIA_ASSETS } from '../../data/media';
import { useSiteImages } from '../../context/SiteImagesContext';

interface IntroductionSectionProps {
  onNavigate?: (path: string) => void;
}

export const IntroductionSection: React.FC<IntroductionSectionProps> = ({ onNavigate }) => {
  const { siteImages } = useSiteImages();
  const introImg = siteImages.home?.intro || siteImages.about?.hero || MEDIA_ASSETS.aboutImages.hero;
  return (
    <section className="bg-[#080808] py-24 md:py-36 px-6 md:px-12 text-[#F5F1E8] border-b border-[#D4AF37]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* TEXT LEFT (6 Columns) */}
        <div className="lg:col-span-6 space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono text-[#D4AF37] tracking-[0.35em] uppercase font-bold"
          >
            SHINY'S HAIR & BEAUTY
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#F5F1E8] font-light tracking-wide uppercase leading-tight"
          >
            AWARD-WINNING <br />
            <span className="italic text-[#D4AF37]">BEAUTY</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-sm sm:text-base font-mono text-[#D4AF37] tracking-[0.15em] uppercase font-medium"
          >
            RECOGNISED FOR ARTISTRY. CELEBRATED FOR EXCELLENCE.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-[#A9A39A] font-light leading-relaxed max-w-xl"
          >
            Shiny's Hair & Beauty Salon brings award-winning makeup and hairstyling expertise to Horsham, with experience across bridal beauty, fashion, film and major events.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="pt-2"
          >
            <button
              onClick={() => onNavigate && onNavigate('/awards')}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] text-[#080808] font-mono text-xs tracking-[0.25em] uppercase font-bold transition-all duration-300 hover:bg-[#F5C542] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] cursor-pointer"
            >
              <span>DISCOVER OUR AWARDS →</span>
            </button>
          </motion.div>
        </div>

        {/* IMAGE RIGHT (6 Columns) */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative aspect-[4/5] w-full max-w-md overflow-hidden border border-[#D4AF37]/30 shadow-2xl rounded-sm bg-[#111111]"
          >
            <img
              src={introImg}
              alt="Award-Winning Beauty Artistry"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-95 contrast-105 hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};



