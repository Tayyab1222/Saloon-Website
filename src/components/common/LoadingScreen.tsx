import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteImages } from '../../context/SiteImagesContext';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const { siteImages } = useSiteImages();
  const logoSrc = siteImages.common?.logo || '/uploads/common/logo.jpg';

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }, 300);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080808] text-[#F5F1E8]"
        >
          <div className="text-center px-6 flex flex-col items-center">
            {/* Logo Emblem */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-20 h-20 sm:w-24 sm:h-24 mb-4 p-1 border border-[#D4AF37]/30 rounded-sm bg-black/80 backdrop-blur-md shadow-[0_0_25px_rgba(212,175,55,0.2)] overflow-hidden"
            >
              <img
                src={logoSrc}
                alt="Shiny's Hair & Beauty Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain filter contrast-110 brightness-105"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="tracking-[0.4em] text-xs uppercase text-[#D4AF37] mb-3 font-medium"
            >
              London
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-wider font-light text-[#F5F1E8]"
            >
              SHINY'S
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xs sm:text-sm tracking-[0.35em] text-[#A9A39A] uppercase mt-2 font-light"
            >
              HAIR & BEAUTY
            </motion.p>

            {/* Gold Progress Bar */}
            <div className="w-48 sm:w-64 h-[1px] bg-[#111111] relative mx-auto mt-8 overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 bottom-0 bg-[#D4AF37]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            <p className="text-[10px] tracking-[0.25em] text-[#D4AF37] mt-3 font-mono">
              {progress}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
