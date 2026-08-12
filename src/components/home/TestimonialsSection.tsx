import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../../data/testimonials';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="bg-[#080808] py-24 md:py-36 px-6 md:px-12 text-[#F5F1E8] border-b border-[#D4AF37]/10 relative overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-mono">
            07 // CLIENT STORIES
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-wider font-light uppercase">
            CLIENT <span className="italic text-[#D4AF37]">LOVE</span>
          </h2>
        </div>

        {/* Carousel Card */}
        <div className="relative bg-[#111111] border border-[#D4AF37]/20 p-8 sm:p-14 text-center min-h-[300px] flex flex-col items-center justify-center">
          <Quote className="w-12 h-12 text-[#D4AF37]/20 mb-6" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 max-w-3xl"
            >
              {/* Rating Stars */}
              <div className="flex items-center justify-center space-x-1">
                {[...Array(current.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-serif text-xl sm:text-2xl md:text-3xl text-[#F5F1E8] italic font-light leading-relaxed">
                "{current.quote}"
              </p>

              {/* Client Name & Service */}
              <div>
                <h3 className="text-sm font-semibold tracking-wider text-[#D4AF37] uppercase">
                  {current.clientName}
                </h3>
                <p className="text-xs text-[#A9A39A] font-light mt-0.5">
                  {current.service}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between w-full max-w-md mt-10 pt-6 border-t border-[#111111]/80">
            <button
              onClick={prevTestimonial}
              className="p-2.5 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#080808] transition-colors"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="text-xs font-mono text-[#A9A39A]">
              <span className="text-[#D4AF37]">{String(currentIndex + 1).padStart(2, '0')}</span> / {String(TESTIMONIALS.length).padStart(2, '0')}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-2.5 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#080808] transition-colors"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
