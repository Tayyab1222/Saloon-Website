import React from 'react';
import { motion } from 'motion/react';
import { CONTACT_CONFIG } from '../../config/contact';
import { ArrowUpRight, MapPin, Phone } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';

interface FinalCTASectionProps {
  onOpenBooking: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="bg-[#080808] py-28 md:py-40 px-6 md:px-12 text-[#F5F1E8] text-center relative overflow-hidden">
      {/* Subtle Gold Line Animation */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-mono text-[#D4AF37] tracking-[0.35em] uppercase font-bold"
        >
          YOUR NEXT LOOK AWAITS
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider font-light uppercase leading-none"
        >
          READY FOR <br />
          <span className="italic text-[#D4AF37]">YOUR NEXT LOOK?</span>
        </motion.h2>

        {/* Location Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center justify-center space-y-2 text-xs sm:text-sm text-[#A9A39A] font-light pt-2"
        >
          <div className="flex items-center gap-2 text-[#D4AF37] uppercase tracking-wider font-mono">
            <MapPin className="w-4 h-4" />
            <span>{CONTACT_CONFIG.address}</span>
          </div>
          <p className="text-[#A9A39A]">By Appointment Only</p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4"
        >
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto group inline-flex items-center justify-center px-10 py-4 text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#080808] bg-[#D4AF37] hover:bg-[#F5C542] transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.35)] cursor-pointer"
          >
            <span>BOOK YOUR APPOINTMENT →</span>
          </button>

          <a
            href={CONTACT_CONFIG.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#25D366] border border-[#25D366]/40 hover:border-[#25D366] hover:bg-[#25D366]/10 transition-all duration-300 gap-2.5"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
            <span>WHATSAPP →</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

