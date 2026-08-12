import React from 'react';
import { motion } from 'motion/react';
import { MEDIA_ASSETS } from '../../data/media';
import { ArrowUpRight } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onExplore,
}) => {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#080808]">
      {/* Background Cinematic Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={MEDIA_ASSETS.heroVideo.poster}
          className="w-full h-full object-cover scale-105 filter brightness-[0.55] contrast-[1.15]"
        >
          <source src={MEDIA_ASSETS.heroVideo.src} type="video/mp4" />
        </video>

        {/* Dark Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-[#080808]/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/70 via-transparent to-[#080808]/70" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-[#F5F1E8] flex flex-col items-center space-y-4">


        {/* Eyebrow Label */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-xs sm:text-sm font-mono text-[#D4AF37] tracking-[0.35em] uppercase font-bold"
        >
          HAIR & BEAUTY SALON
        </motion.p>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#F5F1E8] font-light tracking-[0.12em] uppercase leading-none"
        >
          SHINY'S
        </motion.h1>

        {/* Main Statement */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#F5C542] italic font-light tracking-wide pt-1"
        >
          BEAUTY, REDEFINED.
        </motion.p>

        {/* Small Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xs sm:text-sm text-[#A9A39A] font-mono tracking-[0.2em] uppercase pt-2 pb-6"
        >
          Luxury Hair & Beauty in the Heart of Horsham
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto group inline-flex items-center justify-center px-8 py-4 text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#080808] bg-[#D4AF37] hover:bg-[#F5C542] transition-colors duration-300 shadow-[0_0_30px_rgba(212,175,55,0.35)] cursor-pointer"
          >
            <span>BOOK APPOINTMENT</span>
            <ArrowUpRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>

          <button
            onClick={onExplore}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#F5F1E8] border border-[#F5F1E8]/30 hover:border-[#D4AF37] hover:text-[#D4AF37] bg-black/40 backdrop-blur-md transition-all duration-300 cursor-pointer"
          >
            <span>EXPLORE OUR WORK</span>
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </button>
        </motion.div>
      </div>


    </section>
  );
};

