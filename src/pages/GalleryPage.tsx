import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lightbox } from '../components/common/Lightbox';
import { GalleryImage } from '../types';
import { Loader2, Sparkles, Upload } from 'lucide-react';
import { useSiteImages } from '../context/SiteImagesContext';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

interface GalleryPageProps {
  onNavigate?: (path: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const { siteImages } = useSiteImages();
  const heroImage = (siteImages as any)?.gallery?.hero || '/uploads/gallery/hero.jpg';

  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchGalleryImages = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (data.success && Array.isArray(data.images)) {
        setImages(data.images);
      }
    } catch (err) {
      console.error('Failed to load gallery images:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const openLightboxAt = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-[#080808] text-[#F5F1E8] min-h-screen selection:bg-[#D4AF37] selection:text-[#080808]">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative w-full min-h-[520px] lg:min-h-[600px] flex items-center justify-center overflow-hidden border-b border-[#D4AF37]/20 pt-28 pb-16">
        {/* Cinematic Background Image with Dark Luxury Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            className="w-full h-full"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          >
            <ImageWithFallback
              src={heroImage}
              alt="The Shiny's Collection"
              className="w-full h-full object-cover object-[center_35%] sm:object-[center_40%] md:object-center filter brightness-[0.65] contrast-[1.08]"
            />
          </motion.div>

          {/* Dark Luxury Overlay (Subtle gradient so image is clearly visible behind text) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/50 to-[#080808]/80" />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        {/* Champagne Gold Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent z-10" />

        {/* Content Box */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-6">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#080808]/80 border border-[#D4AF37]/30 backdrop-blur-md rounded-full shadow-xl"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.45em] text-[#D4AF37] font-mono font-semibold">
              THE SHINY'S COLLECTION
            </p>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="font-serif text-5xl sm:text-7xl md:text-8xl tracking-wider font-light uppercase leading-[1.05] text-[#F5F1E8] drop-shadow-lg"
          >
            BEAUTY, <span className="italic text-[#D4AF37]">CAPTURED.</span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-xs sm:text-sm md:text-base tracking-[0.2em] text-[#E0D8C8] font-light uppercase max-w-2xl mx-auto leading-relaxed"
          >
            Explore a collection of hair, beauty, bridal and salon moments created at Shiny's Hair & Beauty Salon.
          </motion.p>

          {/* Upload Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-2 flex flex-col items-center gap-6"
          >
            <button
              type="button"
              onClick={() => (onNavigate ? onNavigate('/admin/gallery') : (window.location.href = '/admin/gallery'))}
              className="inline-flex items-center gap-2.5 px-7 py-3 bg-[#D4AF37] hover:bg-[#F5C542] text-[#080808] text-xs font-mono uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] active:scale-95 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>UPLOAD IMAGE</span>
            </button>

            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* 2. GALLERY MASONRY CONTENT */}
      <section className="py-10 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
        {isLoading ? (
          <div className="py-28 text-center space-y-4">
            <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin mx-auto" />
            <p className="text-xs uppercase tracking-[0.3em] text-[#A9A39A] font-mono">
              CURATING GALLERY COLLECTION...
            </p>
          </div>
        ) : images.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-28 text-center max-w-md mx-auto space-y-4 border border-[#D4AF37]/20 bg-[#111111]/40 p-12"
          >
            <Sparkles className="w-8 h-8 text-[#D4AF37] mx-auto opacity-80" />
            <h2 className="font-serif text-2xl text-[#F5F1E8] font-light uppercase tracking-wider">
              THE GALLERY IS BEING CURATED.
            </h2>
            <p className="text-xs text-[#A9A39A] uppercase tracking-[0.2em] font-mono">
              Beautiful moments are coming soon.
            </p>
          </motion.div>
        ) : (
          /* TRUE MASONRY WITH TIGHT SPACING AND NATURAL ASPECT RATIO */
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-6">
            {images.map((img, idx) => {
              return (
                <motion.div
                  key={img.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.5, delay: (idx % 4) * 0.05 }}
                  onClick={() => openLightboxAt(idx)}
                  className="break-inside-avoid group relative overflow-hidden bg-[#111111] border border-[#D4AF37]/20 cursor-pointer shadow-xl transition-all duration-500 hover:border-[#D4AF37]/80 mb-4 sm:mb-6 rounded-sm"
                >
                  {/* Natural Aspect Ratio Image */}
                  <img
                    src={img.url}
                    alt="Gallery Image"
                    loading="lazy"
                    className="w-full h-auto object-cover filter brightness-95 contrast-105 transition-transform duration-700 ease-out group-hover:scale-[1.03] block"
                  />
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* LIGHTBOX MODAL */}
      <Lightbox
        isOpen={lightboxOpen}
        images={images}
        currentIndex={currentIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setCurrentIndex(idx)}
      />
    </div>
  );
};
