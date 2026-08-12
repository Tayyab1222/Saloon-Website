import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { publicImages } from '../../data/publicImages';
import { useSiteImages } from '../../context/SiteImagesContext';

interface CategoryItem {
  id: string;
  name: string;
  key: string;
  image: string;
}

interface SignatureServicesSectionProps {
  onNavigate: (path: string) => void;
  onOpenBooking?: () => void;
}

export const SignatureServicesSection: React.FC<SignatureServicesSectionProps> = ({
  onNavigate,
}) => {
  const { siteImages } = useSiteImages();
  const s = siteImages.services as any;

  const categories: CategoryItem[] = [
    {
      id: "01",
      name: "HAIR",
      key: "hair",
      image: s?.hair || s?.ladiesHair || publicImages.services.hair || publicImages.services.ladiesHair,
    },
    {
      id: "02",
      name: "COLOUR",
      key: "colour",
      image: s?.colour || s?.hairColour || publicImages.services.colour || publicImages.services.hairColour,
    },
    {
      id: "03",
      name: "BRIDAL",
      key: "bridal",
      image: s?.bridal || s?.bridalHairMakeup || publicImages.services.bridal || publicImages.services.bridalHairMakeup,
    },
    {
      id: "04",
      name: "MAKEUP",
      key: "makeup",
      image: s?.makeup || s?.professionalMakeup || publicImages.services.makeup || publicImages.services.professionalMakeup,
    },
  ];

  return (
    <section className="bg-[#080808] py-24 md:py-36 px-6 md:px-12 text-[#F5F1E8] border-b border-[#D4AF37]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#111111] pb-8 gap-4">
          <div>
            <p className="text-xs font-mono text-[#D4AF37] tracking-[0.35em] uppercase font-bold mb-2">
              BESPOKE BEAUTY EXPERTISE
            </p>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#F5F1E8] font-light uppercase tracking-wider">
              SIGNATURE SERVICES
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/services')}
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#D4AF37] hover:text-[#F5C542] transition-colors cursor-pointer self-start sm:self-end"
          >
            <span>EXPLORE ALL SERVICES</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* 4 Large Visual Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onNavigate(`/services/${cat.key}`)}
              className="group relative cursor-pointer overflow-hidden border border-[#D4AF37]/20 bg-[#111111] hover:border-[#D4AF37]/60 transition-all duration-500 shadow-2xl rounded-sm"
            >
              {/* Large Service Image */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] w-full overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.08] transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />

                {/* Number Badge */}
                <span className="absolute top-6 left-6 font-mono text-xs text-[#D4AF37] tracking-widest bg-[#080808]/80 border border-[#D4AF37]/30 px-3 py-1 uppercase backdrop-blur-sm">
                  {cat.id}
                </span>

                {/* Service Info Bar at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex items-end justify-between z-10">
                  <div>
                    <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase font-light text-[#F5F1E8] group-hover:text-[#F5C542] transition-colors duration-300">
                      {cat.name}
                    </h3>
                  </div>

                  <div className="w-10 h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#080808] transition-all duration-300 shrink-0">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


