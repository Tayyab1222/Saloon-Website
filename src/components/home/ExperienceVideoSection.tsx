import React from 'react';
import { motion } from 'motion/react';
import { MEDIA_ASSETS } from '../../data/media';
import { ArrowUpRight } from 'lucide-react';

interface ExperienceVideoSectionProps {
  onOpenBooking: () => void;
}

export const ExperienceVideoSection: React.FC<ExperienceVideoSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative w-full py-32 md:py-48 bg-[#080808] text-[#F5F1E8] flex items-center justify-center overflow-hidden border-b border-[#D4AF37]/20">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={MEDIA_ASSETS.experienceVideo.poster}
          className="w-full h-full object-cover filter brightness-[0.4] contrast-[1.2] scale-105"
        >
          <source src={MEDIA_ASSETS.experienceVideo.src} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-[#080808]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-mono"
        >
          09 // THE SIGNATURE ATMOSPHERE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider font-light uppercase"
        >
          THE SHINY'S <br />
          <span className="italic text-[#D4AF37]">EXPERIENCE</span>
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-24 h-[1px] bg-[#D4AF37] mx-auto my-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-serif text-2xl sm:text-4xl text-[#F5F1E8] italic font-light"
        >
          READY FOR YOUR MOMENT?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-4"
        >
          <button
            onClick={onOpenBooking}
            className="group inline-flex items-center px-10 py-4 text-xs uppercase tracking-[0.25em] font-semibold text-[#080808] bg-[#D4AF37] hover:bg-[#F5C542] transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.4)]"
          >
            <span>BOOK NOW</span>
            <ArrowUpRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
