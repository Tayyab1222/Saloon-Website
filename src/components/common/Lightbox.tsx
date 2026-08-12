import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { GalleryImage } from '../../types';

interface LightboxProps {
  isOpen: boolean;
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;

    // Minimum swipe distance 50px
    if (diffX > 50) {
      // Swipe left -> Next
      onNavigate((currentIndex + 1) % images.length);
    } else if (diffX < -50) {
      // Swipe right -> Previous
      onNavigate((currentIndex - 1 + images.length) % images.length);
    }
    setTouchStartX(null);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 md:p-12 select-none overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Bar with Close Button */}
        <div className="flex items-center justify-end z-30 pb-2">
          <button
            onClick={onClose}
            className="p-2.5 text-[#F5F1E8] hover:text-[#D4AF37] transition-colors bg-[#111111] border border-[#D4AF37]/30 hover:border-[#D4AF37] rounded-full focus:outline-none shadow-lg"
            aria-label="Close Lightbox (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Center Main Stage */}
        <div className="relative flex-1 flex items-center justify-center my-2 overflow-hidden">
          {/* Previous Button */}
          <button
            onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
            className="absolute left-2 sm:left-6 z-30 p-3 sm:p-4 rounded-full bg-[#080808]/80 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#080808] transition-all duration-300 shadow-xl"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Active Image */}
          <motion.div
            key={currentImage?.id || currentIndex}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[85vh] max-w-[90vw] flex items-center justify-center border border-[#D4AF37]/20 shadow-2xl bg-[#111111]"
          >
            <img
              src={currentImage?.url}
              alt="Gallery Preview"
              className="max-h-[85vh] max-w-[90vw] object-contain block"
            />
          </motion.div>

          {/* Next Button */}
          <button
            onClick={() => onNavigate((currentIndex + 1) % images.length)}
            className="absolute right-2 sm:right-6 z-30 p-3 sm:p-4 rounded-full bg-[#080808]/80 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#080808] transition-all duration-300 shadow-xl"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
