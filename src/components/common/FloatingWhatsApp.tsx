import React, { useState } from 'react';
import { CONTACT_CONFIG } from '../../config/contact';
import { WhatsAppIcon } from './WhatsAppIcon';
import { X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Quick Chat Popover Banner */}
      {isOpen && (
        <div className="mb-4 w-72 sm:w-80 bg-[#111111] border border-[#D4AF37]/30 shadow-2xl p-5 relative animate-in fade-in slide-in-from-bottom-5 duration-300">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-[#A9A39A] hover:text-[#D4AF37] transition-colors p-1"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 border-b border-[#D4AF37]/15 pb-3">
            <div className="relative w-10 h-10 rounded-full bg-[#080808] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
              <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#25D366] rounded-full border border-[#111111]" />
            </div>
            <div>
              <p className="font-serif text-sm text-[#F5F1E8] font-medium">Shiny's Concierge</p>
              <p className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">ONLINE NOW</p>
            </div>
          </div>

          <div className="my-3 text-xs text-[#A9A39A] leading-relaxed font-light">
            Hello! Looking for appointments, bridal inquiries, or price lists? Chat with us directly on WhatsApp.
          </div>

          <a
            href={CONTACT_CONFIG.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-[#080808] font-mono text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#080808]" />
            <span>START CHAT</span>
          </a>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="relative group">
        <a
          href={CONTACT_CONFIG.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-14 h-14 bg-[#080808] border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-[#080808] rounded-full shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-all duration-300 group-hover:scale-110"
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon className="w-7 h-7" />
          
          {/* Notification Badge */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4AF37] text-[#080808] text-[9px] font-mono font-bold rounded-full flex items-center justify-center border border-[#080808]">
            1
          </span>
        </a>

        {/* Floating Tooltip Label */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-2 px-3 py-1.5 bg-[#111111] border border-[#D4AF37]/30 text-[#F5F1E8] text-xs font-mono tracking-wider whitespace-nowrap shadow-xl pointer-events-none">
          <span>CHAT ON WHATSAPP</span>
          <span className="text-[#25D366]">●</span>
        </div>
      </div>
    </div>
  );
};
