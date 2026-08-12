import React from 'react';
import { CONTACT_CONFIG } from '../config/contact';
import { BUSINESS_INFO } from '../config/business';
import { MapPin, Instagram, ExternalLink } from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';

interface ContactPageProps {
  onOpenBooking: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="bg-[#080808] text-[#F5F1E8] pb-24">
      {/* Header */}
      <section className="pt-32 pb-12 px-6 text-center max-w-4xl mx-auto space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-mono">
          PRIVATE SALON APPOINTMENTS
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-wider font-light uppercase">
          CONTACT <span className="italic text-[#D4AF37]">SHINY'S</span>
        </h1>
        <p className="text-sm text-[#A9A39A] font-light max-w-xl mx-auto">
          We welcome private salon appointments, bridal inquiries, and bespoke consultations in London.
        </p>
      </section>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Salon Details */}
        <div className="bg-[#111111] border border-[#D4AF37]/20 p-8 sm:p-12 space-y-8">
          <div>
            <h2 className="font-serif text-3xl text-[#F5F1E8] border-b border-[#080808] pb-3">
              {BUSINESS_INFO.name}
            </h2>
            <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-mono mt-2">
              CONTACT INFORMATION
            </p>
          </div>

          <div className="space-y-6 text-sm font-light">
            {/* Address */}
            <div>
              <p className="font-semibold uppercase tracking-wider text-xs text-[#D4AF37]">ADDRESS</p>
              <p className="text-[#F5F1E8] font-medium mt-1">52 Carfax</p>
              <p className="text-[#A9A39A]">Horsham</p>
              <p className="text-[#A9A39A]">West Sussex RH12 1EQ</p>
            </div>

            {/* Telephone */}
            <div>
              <p className="font-semibold uppercase tracking-wider text-xs text-[#D4AF37]">TELEPHONE</p>
              <a href={`tel:${CONTACT_CONFIG.phone}`} className="text-[#F5F1E8] hover:text-[#D4AF37] transition-colors mt-1 block font-mono">
                {CONTACT_CONFIG.displayPhone}
              </a>
            </div>

            {/* WhatsApp */}
            <div>
              <p className="font-semibold uppercase tracking-wider text-xs text-[#25D366]">WHATSAPP</p>
              <p className="text-[#F5F1E8] mt-1 font-mono">{CONTACT_CONFIG.whatsappDisplay}</p>
              <a
                href={CONTACT_CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#25D366] underline hover:text-[#4ade80] transition-colors mt-1 font-mono"
              >
                https://wa.me/{CONTACT_CONFIG.whatsappNumber}
              </a>
            </div>

            {/* Email */}
            <div>
              <p className="font-semibold uppercase tracking-wider text-xs text-[#D4AF37]">EMAIL</p>
              <a href={`mailto:${CONTACT_CONFIG.email}`} className="text-[#F5F1E8] hover:text-[#D4AF37] transition-colors mt-1 block">
                {CONTACT_CONFIG.email}
              </a>
            </div>

            {/* Instagram */}
            <div>
              <p className="font-semibold uppercase tracking-wider text-xs text-[#D4AF37]">INSTAGRAM</p>
              <a
                href={CONTACT_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5F1E8] hover:text-[#D4AF37] transition-colors mt-1 block"
              >
                {CONTACT_CONFIG.instagram}
              </a>
            </div>

            {/* Opening Hours */}
            <div className="pt-4 border-t border-[#1a1a1a]">
              <p className="font-semibold uppercase tracking-wider text-xs text-[#D4AF37]">OPENING HOURS</p>
              {CONTACT_CONFIG.openingHours.map((h, i) => (
                <p key={i} className="text-[#A9A39A] mt-1">
                  {h.days}: <span className="text-[#F5F1E8]">{h.hours}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-[#080808] flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold text-[#080808] bg-[#D4AF37] hover:bg-[#F5C542] transition-colors cursor-pointer"
            >
              BOOK APPOINTMENT
            </button>
            <a
              href={CONTACT_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold text-[#25D366] border border-[#25D366]/40 hover:bg-[#25D366]/10 flex items-center justify-center gap-2.5 transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>CHAT ON WHATSAPP</span>
            </a>
          </div>
        </div>

        {/* Live Google Map Section */}
        <div className="space-y-6">
          <div className="relative aspect-[4/3] bg-[#111111] border border-[#D4AF37]/20 overflow-hidden shadow-2xl group">
            {/* Embedded Google Map */}
            <iframe
              title="Shiny's Hair & Beauty Salon Map"
              src="https://maps.google.com/maps?q=Shiny's%20Hair%20%26%20Beauty%2052%20Carfax%20Horsham%20RH12%201EQ&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.8) invert(0.9) contrast(1.2) brightness(0.85)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            />

            {/* Floating Overlay Badge */}
            <div className="absolute top-4 left-4 bg-[#080808]/90 border border-[#D4AF37]/30 px-4 py-2 backdrop-blur-md flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#F5F1E8]">
                52 CARFAX, HORSHAM RH12 1EQ • SALON
              </span>
            </div>

            {/* Open in Google Maps Action */}
            <a
              href={BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-[#D4AF37] hover:bg-[#F5C542] text-[#080808] px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-xl transition-all"
            >
              <span>OPEN IN GOOGLE MAPS</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-6 bg-[#111111] border border-[#D4AF37]/20 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Instagram className="w-5 h-5 text-[#D4AF37]" />
              <div>
                <p className="text-xs uppercase tracking-wider text-[#F5F1E8]">INSTAGRAM</p>
                <p className="text-xs text-[#A9A39A]">{CONTACT_CONFIG.instagramHandle}</p>
              </div>
            </div>
            <a
              href={CONTACT_CONFIG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold hover:underline"
            >
              VISIT PROFILE →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
