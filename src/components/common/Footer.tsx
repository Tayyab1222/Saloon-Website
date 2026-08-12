import React from 'react';
import { FOOTER_QUICK_LINKS, FOOTER_LEGAL_LINKS } from '../../config/navigation';
import { CONTACT_CONFIG } from '../../config/contact';
import { BUSINESS_INFO } from '../../config/business';
import { Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <footer className="bg-[#080808] border-t border-[#D4AF37]/20 pt-20 pb-10 text-[#F5F1E8] relative overflow-hidden">
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-[#111111]">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-6">
            <BrandLogo size="md" onClick={() => onNavigate('/')} />

            <p className="text-[#A9A39A] text-sm leading-relaxed max-w-sm font-light">
              Horsham's premier luxury salon destination for bespoke hair transformations, 
              high-definition makeup, and couture bridal artistry.
            </p>

            <div className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              BEAUTY, REDEFINED.
            </div>

            {/* Social & Direct Contact Buttons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={CONTACT_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#080808] transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={CONTACT_CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-[#D4AF37]/30 text-[#25D366] hover:bg-[#25D366] hover:text-[#080808] transition-all duration-300"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              EXPLORE
            </h3>
            <ul className="space-y-2.5 text-sm font-light">
              {FOOTER_QUICK_LINKS.slice(0, 5).map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => onNavigate(link.path)}
                    className="text-left text-[#A9A39A] hover:text-[#D4AF37] transition-colors duration-300 block w-full"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              SERVICES
            </h3>
            <ul className="space-y-2.5 text-sm font-light text-[#A9A39A]">
              <li><button onClick={() => onNavigate('/services/hair')} className="text-left hover:text-[#D4AF37] transition-colors block w-full">Ladies’ Hairdressing</button></li>
              <li><button onClick={() => onNavigate('/services/grooming')} className="text-left hover:text-[#D4AF37] transition-colors block w-full">Men’s Hairdressing & Grooming</button></li>
              <li><button onClick={() => onNavigate('/services/colour')} className="text-left hover:text-[#D4AF37] transition-colors block w-full">Hair Colour Services</button></li>
              <li><button onClick={() => onNavigate('/services/styling')} className="text-left hover:text-[#D4AF37] transition-colors block w-full">Hair Styling</button></li>
              <li><button onClick={() => onNavigate('/services/bridal')} className="text-left hover:text-[#D4AF37] transition-colors block w-full">Bridal Hair & Makeup</button></li>
              <li><button onClick={() => onNavigate('/services/makeup')} className="text-left hover:text-[#D4AF37] transition-colors block w-full">Professional Makeup</button></li>
              <li><button onClick={() => onNavigate('/services/treatments')} className="text-left hover:text-[#D4AF37] transition-colors block w-full">Hair Treatments</button></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              SALON INFORMATION
            </h3>
            <ul className="space-y-3 text-sm font-light text-[#A9A39A]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{CONTACT_CONFIG.displayPhone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{CONTACT_CONFIG.email}</span>
              </li>
            </ul>

            <button
              onClick={onOpenBooking}
              className="mt-2 text-xs uppercase tracking-[0.2em] text-[#080808] bg-[#D4AF37] hover:bg-[#F5C542] px-5 py-2.5 font-semibold transition-colors duration-300 w-full text-center"
            >
              BOOK APPOINTMENT
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#A9A39A] gap-4 font-light">
          <p>© {new Date().getFullYear()} Shiny's Hair & Beauty. All rights reserved.</p>

          <div className="flex items-center space-x-6">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <button
                key={link.path}
                onClick={() => onNavigate(link.path)}
                className="hover:text-[#D4AF37] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
