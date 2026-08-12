import React from 'react';
import { PRICING_DATA } from '../data/pricing';
import { Clock, ArrowUpRight } from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { CONTACT_CONFIG } from '../config/contact';

interface PricingPageProps {
  onOpenBooking: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="pt-28 pb-24 bg-[#080808] text-[#F5F1E8]">
      {/* Header */}
      <section className="py-16 px-6 text-center max-w-4xl mx-auto space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-mono">
          BESPOKE INVESTMENT
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-wider font-light uppercase">
          SERVICE <span className="italic text-[#D4AF37]">PRICING</span>
        </h1>
        <p className="text-sm text-[#A9A39A] font-light max-w-xl mx-auto">
          All treatments are individually crafted following a detailed consultation. Prices are available upon request or private quote.
        </p>
      </section>

      {/* Pricing Categories */}
      <div className="max-w-6xl mx-auto px-6 space-y-16">
        {PRICING_DATA.map((cat, idx) => (
          <div key={idx} className="bg-[#111111] border border-[#D4AF37]/20 p-8 sm:p-12 space-y-8">
            <div className="border-b border-[#080808] pb-6">
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-mono">
                CATEGORY {String(idx + 1).padStart(2, '0')}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#F5F1E8] font-light mt-1">
                {cat.category}
              </h2>
              {cat.description && (
                <p className="text-xs text-[#A9A39A] font-light mt-1">{cat.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cat.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="flex flex-col justify-between p-5 bg-[#080808] border border-[#111111] hover:border-[#D4AF37]/40 transition-colors"
                >
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg text-[#F5F1E8] font-light">
                      {item.name}
                    </h3>
                    {item.duration && (
                      <p className="text-[11px] text-[#A9A39A] font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#D4AF37]" />
                        {item.duration}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#111111] flex items-center justify-between text-xs">
                    <span className="text-[#D4AF37] font-semibold">{item.price}</span>
                    <button
                      onClick={onOpenBooking}
                      className="text-[10px] uppercase tracking-[0.2em] text-[#A9A39A] hover:text-[#D4AF37] font-semibold"
                    >
                      REQUEST QUOTE →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Footer Note & WhatsApp */}
        <div className="text-center p-8 bg-[#111111] border border-[#D4AF37]/20 space-y-4">
          <p className="text-xs text-[#A9A39A] font-light max-w-md mx-auto">
            Bridal packages, custom hair extension work, and group bookings require bespoke consultation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold text-[#080808] bg-[#D4AF37] hover:bg-[#F5C542]"
            >
              BOOK CONSULTATION
            </button>
            <a
              href={CONTACT_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold text-[#25D366] border border-[#25D366]/30 hover:border-[#25D366] flex items-center gap-2.5 transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>WHATSAPP PRICING INQUIRY</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
