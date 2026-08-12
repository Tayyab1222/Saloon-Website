import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MAIN_NAV_LINKS } from '../../config/navigation';
import { CONTACT_CONFIG } from '../../config/contact';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { BrandLogo } from './BrandLogo';

interface GlobalNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const GlobalNav: React.FC<GlobalNavProps> = ({
  currentPath,
  onNavigate,
  onOpenBooking,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (path: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080808]/95 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-2xl'
            : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex items-center justify-between h-full">
          {/* Logo */}
          <BrandLogo
            size="sm"
            onClick={() => handleLinkClick('/')}
          />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8" aria-label="Main Navigation">
            {MAIN_NAV_LINKS.map((link) => {
              const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`text-[11px] xl:text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 relative py-1 cursor-pointer ${
                    isActive ? 'text-[#D4AF37]' : 'text-[#F5F1E8]/80 hover:text-[#D4AF37]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#D4AF37]"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions: WhatsApp & Book Button */}
          <div className="hidden lg:flex items-center space-x-4 shrink-0">
            <a
              href={CONTACT_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366] transition-all duration-300 flex items-center justify-center"
              title="Chat on WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenBooking}
              className="group relative inline-flex items-center px-5 xl:px-6 py-2.5 overflow-hidden text-xs uppercase tracking-[0.2em] font-semibold text-[#080808] bg-[#D4AF37] hover:bg-[#F5C542] transition-colors duration-300 rounded-none shadow-[0_0_15px_rgba(212,175,55,0.25)] cursor-pointer"
            >
              <span>BOOK NOW</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#F5F1E8] hover:text-[#D4AF37] transition-colors focus:outline-none flex items-center justify-center cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 bg-[#080808] text-[#F5F1E8] flex flex-col justify-between px-8 py-10 lg:hidden overflow-y-auto"
          >
            {/* Header in Overlay */}
            <div className="flex items-center justify-between">
              <BrandLogo
                size="md"
                onClick={() => handleLinkClick('/')}
              />

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[#F5F1E8] hover:text-[#D4AF37] transition-colors"
                aria-label="Close Navigation Menu"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="my-auto py-8 space-y-6">
              {MAIN_NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                >
                  <button
                    onClick={() => handleLinkClick(link.path)}
                    className={`block font-serif text-3xl sm:text-4xl tracking-wider text-left transition-colors duration-300 ${
                      currentPath === link.path ? 'text-[#D4AF37]' : 'text-[#F5F1E8] hover:text-[#D4AF37]'
                    }`}
                  >
                    {link.label}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Mobile Footer CTAs */}
            <div className="pt-6 border-t border-[#111111] space-y-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-4 text-center text-xs uppercase tracking-[0.25em] font-semibold text-[#080808] bg-[#D4AF37] hover:bg-[#F5C542] transition-colors"
              >
                BOOK YOUR MOMENT
              </button>

              <div className="flex items-center justify-between text-xs text-[#A9A39A]">
                <span>LONDON, UK</span>
                <a
                  href={CONTACT_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] flex items-center gap-1.5 font-medium hover:underline"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>WHATSAPP</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
