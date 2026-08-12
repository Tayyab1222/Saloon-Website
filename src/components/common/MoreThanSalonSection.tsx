import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './ImageWithFallback';

interface MoreThanSalonSectionProps {
  imageSrc: string;
  tagline?: string;
  description?: string;
  sectionId?: string;
  onOpenBooking?: () => void;
}

export const MoreThanSalonSection: React.FC<MoreThanSalonSectionProps> = ({
  imageSrc,
  tagline = "A refined beauty experience in the heart of Horsham.",
  description = "At Shiny's Hair & Beauty Salon, every visit is designed around personalised care, refined artistry and a feeling of confidence that lasts beyond the salon.",
  sectionId = "more-than-salon-section",
  onOpenBooking,
}) => {
  return (
    <section id={sectionId} className="bg-[#080808] py-24 md:py-36 px-6 md:px-12 text-[#F5F1E8] border-b border-[#D4AF37]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* LEFT: Large Cinematic Salon/Interior Image (6 Columns) */}
        <div className="lg:col-span-6 flex justify-center lg:justify-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden border border-[#D4AF37]/30 shadow-2xl rounded-sm bg-[#111111] group"
          >
            <ImageWithFallback
              src={imageSrc}
              alt="Shiny's Salon Interior — More Than A Salon"
              className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.08] group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#D4AF37]/40 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#D4AF37]/40 pointer-events-none" />
          </motion.div>
        </div>

        {/* RIGHT: Heading, Paragraph & Luxury Details (6 Columns) */}
        <div className="lg:col-span-6 space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono text-[#D4AF37] tracking-[0.35em] uppercase font-bold"
          >
            THE SALON EXPERIENCE
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F5F1E8] font-light tracking-wide uppercase leading-tight"
          >
            MORE THAN <br />
            <span className="italic text-[#D4AF37]">A SALON</span>
          </motion.h2>

          {/* Gold Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-20 h-[1px] bg-[#D4AF37] origin-left"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-base sm:text-lg text-[#F5F1E8] font-light leading-relaxed tracking-wide"
          >
            {tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm sm:text-base text-[#A9A39A] font-light leading-relaxed tracking-wide"
          >
            {description}
          </motion.p>

          {/* Supporting Luxury Bullet Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="pt-4 border-t border-[#D4AF37]/15"
          >
            <ul className="space-y-3 text-xs sm:text-sm text-[#F5F1E8] font-light tracking-wide">
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37] font-mono font-semibold">01 —</span>
                <span><strong>Personalised Care:</strong> Bespoke consultations tailored specifically to your hair, skin, and personal aesthetic.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37] font-mono font-semibold">02 —</span>
                <span><strong>Refined Artistry:</strong> Master techniques delivered by internationally trained artist Shiny and team.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37] font-mono font-semibold">03 —</span>
                <span><strong>Tranquil Sanctuary:</strong> A peaceful, opulent private suite setting designed for pure relaxation.</span>
              </li>
            </ul>
          </motion.div>

          {onOpenBooking && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-2"
            >
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#D4AF37] hover:bg-[#E5C158] text-[#080808] text-xs font-mono font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-lg cursor-pointer rounded-sm"
              >
                <span>Reserve Appointment</span>
                <span>&rarr;</span>
              </button>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
};
