import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { InstagramSection } from '../components/home/InstagramSection';
import { FinalCTASection } from '../components/home/FinalCTASection';
import { MoreThanSalonSection } from '../components/common/MoreThanSalonSection';
import { useSiteImages } from '../context/SiteImagesContext';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

interface AboutPageProps {
  onOpenBooking: () => void;
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking, onNavigate: _onNavigate }) => {
  const { siteImages } = useSiteImages();

  // Hero section parallax
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const heroImage = siteImages.about?.hero || '/uploads/about/hero.jpg';
  const celebrityImage = siteImages.about?.celebrity || '/uploads/about/celebrity.jpg';
  const artistImage = siteImages.artist?.artist || '/uploads/artist/artist.jpg';
  const moreThanSalonImage = siteImages.about?.moreThanSalon || siteImages.about?.salon || '/uploads/about/more-than-salon.jpg';

  return (
    <div className="bg-[#080808] text-[#F5F1E8] overflow-hidden selection:bg-[#D4AF37] selection:text-[#080808]">

      {/* ==================================================
          SECTION 1 — THE SALON (Cinematic Hero)
          ================================================== */}
      <section
        ref={heroRef}
        className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden border-b border-[#D4AF37]/15"
      >
        {/* Parallax Salon Image */}
        <motion.div
          style={{ y: heroImageY, scale: heroImageScale }}
          className="absolute inset-0 z-0 w-full h-full"
        >
          <ImageWithFallback
            src={heroImage}
            alt="The Salon"
            className="w-full h-full object-cover filter brightness-[0.35] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/70 via-transparent to-[#080808]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />
        </motion.div>

        {/* Minimal Overlay Text */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-mono font-medium"
          >
            THE SALON
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider font-light uppercase text-[#F5F1E8] leading-tight"
          >
            LUXURY HAIR & BEAUTY IN THE HEART OF HORSHAM
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeInOut' }}
            className="w-24 h-[1px] bg-[#D4AF37]/60 mx-auto pt-2"
          />
        </div>
      </section>

      {/* ==================================================
          SECTION 2 — CELEBRITY WORK
          ================================================== */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-b border-[#D4AF37]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Large Celebrity Image Side */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative group"
          >
            <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] overflow-hidden border border-[#D4AF37]/25 shadow-2xl">
              <ImageWithFallback
                src={celebrityImage}
                alt="Celebrity & Editorial"
                className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.08] transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/50 via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>

          {/* Minimal Editorial Text Side */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-mono font-medium">
              EDITORIAL ARTISTRY
            </p>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-wider font-light uppercase text-[#F5F1E8] leading-tight">
              CELEBRITY & EDITORIAL
            </h2>

            <p className="text-sm sm:text-base text-[#A9A39A] font-light leading-relaxed tracking-wide">
              A beauty experience trusted by clients and recognised beyond the salon.
            </p>

            <div className="w-16 h-[1px] bg-[#D4AF37]/40 pt-2" />
          </motion.div>

        </div>
      </section>

      {/* ==================================================
          SECTION 3 — MEET SHINY
          ================================================== */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-b border-[#D4AF37]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Large Portrait Image of Shiny (~50% width on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative group"
          >
            <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] overflow-hidden border border-[#D4AF37]/25 shadow-2xl">
              <ImageWithFallback
                src={artistImage}
                alt="Meet Shiny"
                className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.08] transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/50 via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>

          {/* Editorial Text & Highlights (~50% width on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-mono font-medium">
              FOUNDER & LEAD ARTIST
            </p>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-wider font-light uppercase text-[#F5F1E8] leading-tight">
              MEET SHINY
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#A9A39A] font-light leading-relaxed tracking-wide">
              <p>
                Shiny is an award-winning celebrity makeup artist and hairstylist with international experience in film, fashion, weddings, and major events. She has worked with celebrities from Bollywood, Lollywood, Tamil, and Bengali cinema, including backstage at the HUM Awards in London and Houston.
              </p>
              <p>
                Specialising in bridal beauty, makeup, and modern hair transformations, Shiny brings world-class expertise to Horsham.
              </p>
            </div>

            <div className="pt-4 border-t border-[#D4AF37]/15">
              <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-mono font-medium mb-4">
                HIGHLIGHTS
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#F5F1E8] font-light tracking-wide">
                <li className="flex items-start gap-3">
                  <span className="text-[#D4AF37] font-bold">•</span>
                  <span>Award-winning makeup artist and hairstylist</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4AF37] font-bold">•</span>
                  <span>HUM Awards, London and Houston</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4AF37] font-bold">•</span>
                  <span>Bollywood, Lollywood, Tamil, and Bengali cinema experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4AF37] font-bold">•</span>
                  <span>Specialist in bridal hair and makeup</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4AF37] font-bold">•</span>
                  <span>Based in Horsham, West Sussex</span>
                </li>
              </ul>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ==================================================
          SECTION 4 — MORE THAN A SALON
          ================================================== */}
      <MoreThanSalonSection
        sectionId="about-more-than-salon-section"
        imageSrc={moreThanSalonImage}
        tagline="More than beauty, it is an experience."
        description="At Shiny's Hair & Beauty Salon, every visit is designed around personalised care, refined artistry and a feeling of confidence that lasts beyond the salon."
        onOpenBooking={onOpenBooking}
      />

      {/* ==================================================
          SECTION 5 — INSTAGRAM
          ================================================== */}
      <InstagramSection />

      {/* ==================================================
          SECTION 6 — FINAL CTA
          ================================================== */}
      <FinalCTASection onOpenBooking={onOpenBooking} />

    </div>
  );
};
