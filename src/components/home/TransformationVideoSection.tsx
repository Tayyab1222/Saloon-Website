import React from 'react';
import { motion } from 'motion/react';
import { publicImages } from '../../data/publicImages';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useSiteImages } from '../../context/SiteImagesContext';

export const TransformationVideoSection: React.FC = () => {
  const { siteImages } = useSiteImages();
  const salonImg = siteImages.home?.moreThanSalon || siteImages.home?.salon || siteImages.about?.salon || publicImages.home.salon;
  const highlights = [
    {
      number: '01',
      title: 'PERSONAL ATTENTION',
      description: 'Tailored to your individual style',
    },
    {
      number: '02',
      title: 'EXPERT ARTISTRY',
      description: 'Professional hair & beauty specialists',
    },
    {
      number: '03',
      title: 'LUXURY EXPERIENCE',
      description: 'A refined experience from arrival to finish',
    },
  ];

  return (
    <section className="bg-[#080808] py-24 md:py-36 px-6 md:px-12 text-[#F5F1E8] border-b border-[#D4AF37]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Editorial Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-10"
          >
            {/* Section Eyebrow */}
            <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-mono">
              02 // THE SHINY'S EXPERIENCE
            </p>

            {/* Main Headline */}
            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.98] font-light uppercase">
              MORE THAN <br />
              <span className="italic text-[#D4AF37] font-normal">A SALON</span>
            </h2>

            {/* Description Text */}
            <p className="text-base sm:text-lg text-[#A9A39A] font-light leading-relaxed max-w-xl">
              Step into an atmosphere where beauty, artistry and personal attention come together. Every visit is designed to feel effortless, luxurious and completely yours.
            </p>

            {/* Minimal Highlights List */}
            <div className="pt-4 space-y-8 border-t border-[#D4AF37]/15">
              {highlights.map((item) => (
                <div key={item.number} className="flex items-start gap-5">
                  <span className="text-xs font-mono text-[#D4AF37] pt-1 tracking-widest shrink-0">
                    {item.number} —
                  </span>
                  <div>
                    <h3 className="font-serif text-lg tracking-wider uppercase text-[#F5F1E8] font-medium">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#A9A39A] font-light mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Image Canvas with Subtle Reveal & Scale Animation */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[4/5] max-h-[700px] overflow-hidden border border-[#D4AF37]/20 shadow-[0_0_60px_rgba(0,0,0,0.9)] group"
            >
              <ImageWithFallback
                src={salonImg}
                fallbackSrc={publicImages.about.experience}
                alt="Shiny's Salon Interior Experience"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-[0.88] contrast-[1.05]"
              />

              {/* Subtle Gradient Vignette Frame */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/70 via-transparent to-[#080808]/30 pointer-events-none" />

              {/* Subtle Gold Accent Corner Border */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#D4AF37]/40 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#D4AF37]/40 pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

