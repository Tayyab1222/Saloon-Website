import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EDITORIAL_SERVICES } from '../data/services';
import { CONTACT_CONFIG } from '../config/contact';
import { MEDIA_ASSETS } from '../data/media';
import { publicImages, PUBLIC_IMAGES } from '../data/publicImages';
import { ArrowUpRight, ArrowRight, ChevronDown, Sparkles, Crown, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { useSiteImages } from '../context/SiteImagesContext';

interface ServicesPageProps {
  initialCategory?: string;
  onNavigate?: (path: string) => void;
  onOpenBooking?: () => void;
  onOpenBookingWithService?: (serviceId: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  initialCategory = 'all',
  onNavigate,
  onOpenBooking,
  onOpenBookingWithService,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);
  const { siteImages } = useSiteImages();

  const getServiceImage = (srv: { id: string; image: string }) => {
    const s = siteImages.services as any;
    if (!s) return srv.image;
    switch (srv.id) {
      case 'ladies-hairdressing':
        return s.ladiesHair || s.hair || s.ladieshair || srv.image;
      case 'mens-hairdressing-grooming':
        return s.mensGrooming || s.mensgrooming || srv.image;
      case 'childrens-haircuts':
        return s.childrenHaircuts || s.childrenhaircuts || srv.image;
      case 'hair-colour-services':
        return s.hairColour || s.colour || s.haircolour || srv.image;
      case 'hair-styling-services':
        return s.hairStyling || s.hairstyling || srv.image;
      case 'bridal-hair-makeup':
        return s.bridalHairMakeup || s.bridal || s.bridalhairmakeup || srv.image;
      case 'professional-makeup':
        return s.professionalMakeup || s.makeup || s.professionalmakeup || srv.image;
      case 'hair-treatments':
        return s.hairTreatments || s.treatments || s.hairtreatments || srv.image;
      default:
        return srv.image;
    }
  };

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory.toLowerCase());
    }
  }, [initialCategory]);

  const categories = [
    { key: 'all', label: 'ALL' },
    { key: 'hair', label: 'HAIR' },
    { key: 'grooming', label: 'GROOMING' },
    { key: 'children', label: 'CHILDREN' },
    { key: 'colour', label: 'COLOUR' },
    { key: 'styling', label: 'STYLING' },
    { key: 'bridal', label: 'BRIDAL' },
    { key: 'makeup', label: 'MAKEUP' },
    { key: 'treatments', label: 'TREATMENTS' },
  ];

  const filteredServices = selectedCategory === 'all'
    ? EDITORIAL_SERVICES
    : EDITORIAL_SERVICES.filter((s) => s.category === selectedCategory || s.slug === selectedCategory);

  const scrollToEdit = () => {
    const element = document.getElementById('services-edit');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingClick = (serviceId?: string) => {
    if (serviceId && onOpenBookingWithService) {
      onOpenBookingWithService(serviceId);
    } else if (onOpenBooking) {
      onOpenBooking();
    }
  };

  return (
    <div className="bg-[#080808] text-[#F5F1E8] font-sans selection:bg-[#D4AF37] selection:text-[#080808]">
      {/* SEO Schema / Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BeautySalon",
          "name": "Shiny's Hair & Beauty",
          "url": "https://shinyshairandbeauty.co.uk/services",
          "description": "Professional hair, beauty, men's grooming and couture bridal styling services in London.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "London",
            "addressCountry": "UK"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Salon Services Edit",
            "itemListElement": EDITORIAL_SERVICES.map((srv) => ({
              "@type": "OfferCatalog",
              "name": srv.title,
              "description": srv.shortDescription
            }))
          }
        })}
      </script>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 overflow-hidden bg-[#080808]">
        {/* Background Visual with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={siteImages.services.hero || publicImages.services.hero}
            alt="Shiny's Salon Atmosphere"
            className="w-full h-full object-cover filter brightness-[0.22] contrast-125 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808]/80" />
        </div>

        {/* Ambient Gold Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto my-auto text-center space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-[0.45em] text-[#D4AF37] font-mono"
          >
            SHINY'S HAIR & BEAUTY
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wider font-light uppercase leading-none"
          >
            OUR SERVICES
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-serif text-2xl sm:text-4xl md:text-5xl italic text-[#D4AF37] font-light tracking-wide"
          >
            BEAUTY, REFINED TO YOU.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-sm sm:text-base md:text-lg text-[#A9A39A] font-light max-w-3xl mx-auto leading-relaxed pt-2"
          >
            At Shiny’s Hair & Beauty Salon, we offer a comprehensive range of professional hair and beauty services for ladies, gentlemen, and children. From fresh cuts and colour transformations to expert grooming, flawless makeup and luxury bridal styling, every service is tailored to your individual style.
          </motion.p>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6"
          >
            <button
              onClick={() => handleBookingClick()}
              className="w-full sm:w-auto group inline-flex items-center justify-center px-10 py-4 text-xs uppercase tracking-[0.25em] font-semibold text-[#080808] bg-[#D4AF37] hover:bg-[#F5C542] transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.25)]"
            >
              <span>BOOK AN APPOINTMENT</span>
              <ArrowUpRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>

            <button
              onClick={scrollToEdit}
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-xs uppercase tracking-[0.25em] font-semibold text-[#F5F1E8] border border-[#D4AF37]/40 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300"
            >
              <span>EXPLORE SERVICES</span>
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-10 text-center pt-8">
          <button
            onClick={scrollToEdit}
            className="group inline-flex flex-col items-center text-[10px] uppercase tracking-[0.3em] text-[#A9A39A] hover:text-[#D4AF37] transition-colors"
          >
            <span className="mb-2">SCROLL TO EXPLORE</span>
            <ChevronDown className="w-4 h-4 text-[#D4AF37] animate-bounce" />
          </button>
        </div>
      </section>

      {/* 3. CATEGORY FILTER NAVIGATION & MAIN EDITORIAL SERVICES SECTION */}
      <section id="services-edit" className="bg-[#080808] py-24 px-6 md:px-12 border-b border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Category Filter Bar */}
          <div className="sticky top-20 z-30 bg-[#080808]/90 backdrop-blur-md py-4 border-b border-[#111111] overflow-x-auto scrollbar-none">
            <div className="flex items-center justify-start md:justify-center gap-2 min-w-max px-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => {
                      setSelectedCategory(cat.key);
                      if (onNavigate && cat.key !== 'all') {
                        onNavigate(`/services/${cat.key}`);
                      } else if (onNavigate && cat.key === 'all') {
                        onNavigate('/services');
                      }
                    }}
                    className={`relative px-5 py-2.5 text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-[#D4AF37] font-semibold'
                        : 'text-[#A9A39A] hover:text-[#F5F1E8]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeFilterUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* EDITORIAL SERVICES LIST */}
          <div className="space-y-24 md:space-y-36">
            <AnimatePresence mode="wait">
              {filteredServices.map((srv, index) => {
                const isEven = index % 2 === 0;
                const isHighlight = srv.isHighlight;

                return (
                  <motion.article
                    key={srv.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    onMouseEnter={() => setHoveredServiceId(srv.id)}
                    onMouseLeave={() => setHoveredServiceId(null)}
                    className={`relative group bg-[#111111]/60 border transition-all duration-500 p-8 md:p-14 ${
                      isHighlight
                        ? 'border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.15)] bg-[#111111]'
                        : 'border-[#D4AF37]/20 hover:border-[#D4AF37]/60 hover:bg-[#111111]'
                    }`}
                  >
                    {/* Top Ambient Gold Bar */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent transition-opacity duration-300 group-hover:via-[#D4AF37]" />

                    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center ${
                      isEven ? '' : 'lg:flex-row-reverse'
                    }`}>
                      {/* Visual Canvas Column (5/12) */}
                      <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                        <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden border border-[#D4AF37]/30 shadow-2xl">
                          <img
                            src={getServiceImage(srv)}
                            alt={srv.title}
                            className="w-full h-full object-cover filter brightness-90 contrast-105 transition-transform duration-1000 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                          {isHighlight && (
                            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-[#D4AF37] text-[#080808] text-[10px] font-semibold uppercase tracking-[0.2em]">
                              <Crown className="w-3 h-3" />
                              <span>COUTURE HIGHLIGHT</span>
                            </div>
                          )}

                          {/* Hover Overlay Arrow */}
                          <div className="absolute bottom-4 right-4 p-3 bg-[#080808]/80 border border-[#D4AF37]/40 text-[#D4AF37] transition-transform duration-300 group-hover:scale-110">
                            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </div>
                        </div>
                      </div>

                      {/* Content Column (7/12) */}
                      <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                        {/* Number & Category Header */}
                        <div className="flex items-center justify-between border-b border-[#080808] pb-4">
                          <span className="font-serif text-5xl sm:text-6xl text-[#D4AF37] font-light opacity-80 group-hover:opacity-100 transition-opacity">
                            {srv.number}
                          </span>

                          <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#D4AF37] bg-[#080808] px-3 py-1 border border-[#D4AF37]/20">
                            {srv.category.toUpperCase()}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-3xl sm:text-5xl text-[#F5F1E8] font-light uppercase tracking-wider group-hover:text-[#F5C542] transition-colors">
                          {srv.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-[#A9A39A] font-light leading-relaxed">
                          {srv.shortDescription}
                        </p>

                        {/* Sub-services List */}
                        {srv.services && srv.services.length > 0 && (
                          <div className="pt-2">
                            <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-mono mb-3">
                              INCLUDES:
                            </p>
                            <div className="flex flex-wrap gap-2.5">
                              {srv.services.map((subItem, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#080808] border border-[#D4AF37]/20 text-xs text-[#F5F1E8] font-light group-hover:border-[#D4AF37]/40 transition-colors"
                                >
                                  <span className="w-1 h-1 bg-[#D4AF37] rounded-full" />
                                  {subItem}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                          <button
                            onClick={() => handleBookingClick(srv.id)}
                            className="group/btn inline-flex items-center justify-center px-8 py-3.5 text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#080808] bg-[#D4AF37] hover:bg-[#F5C542] transition-colors shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                          >
                            <span>BOOK THIS SERVICE →</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 5. FINAL BOOKING CTA SECTION */}
      <section className="bg-[#080808] py-28 md:py-40 px-6 md:px-12 text-[#F5F1E8] text-center relative overflow-hidden">
        {/* Animated Gold Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.45em] text-[#D4AF37] font-mono"
          >
            READY FOR YOUR NEXT TRANSFORMATION?
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider font-light uppercase leading-none"
          >
            YOUR MOMENT <br />
            <span className="italic text-[#D4AF37]">STARTS HERE.</span>
          </motion.h2>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4"
          >
            <button
              onClick={() => handleBookingClick()}
              className="w-full sm:w-auto group inline-flex items-center justify-center px-10 py-4 text-xs uppercase tracking-[0.25em] font-semibold text-[#080808] bg-[#D4AF37] hover:bg-[#F5C542] transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              <span>BOOK APPOINTMENT</span>
              <ArrowUpRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>

            <a
              href={CONTACT_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-xs uppercase tracking-[0.25em] font-semibold text-[#25D366] border border-[#25D366]/40 hover:border-[#25D366] hover:bg-[#25D366]/10 transition-all duration-300 gap-2.5"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>WHATSAPP INQUIRY</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* 6. FOOTER CTA */}
      <section className="bg-[#111111] py-16 px-6 text-center border-t border-[#D4AF37]/20">
        <div className="max-w-2xl mx-auto space-y-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-mono">
            SHINY'S HAIR & BEAUTY
          </p>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#F5F1E8] font-light uppercase">
            BEAUTY, <span className="italic text-[#D4AF37]">REDEFINED.</span>
          </h3>
          <div className="pt-2">
            <button
              onClick={() => handleBookingClick()}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-xs uppercase tracking-[0.25em] font-semibold text-[#080808] bg-[#D4AF37] hover:bg-[#F5C542] transition-colors"
            >
              <span>BOOK YOUR MOMENT →</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
