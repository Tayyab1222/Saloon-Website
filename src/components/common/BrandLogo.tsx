import React from 'react';
import { publicImages } from '../../data/publicImages';
import { useSiteImages } from '../../context/SiteImagesContext';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'mark';
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  onClick,
}) => {
  const { siteImages } = useSiteImages();
  const logoSrc = siteImages.common?.logo || publicImages.common?.logo || '/uploads/common/logo.jpg';

  const sizeClasses = {
    sm: 'h-9 md:h-10',
    md: 'h-11 md:h-14',
    lg: 'h-16 md:h-20',
    xl: 'h-24 md:h-32',
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 cursor-pointer group select-none ${className}`}
      aria-label="Shiny's Hair & Beauty Home"
    >
      <div className={`relative ${sizeClasses[size]} aspect-square overflow-hidden rounded-sm bg-black shrink-0 flex items-center justify-center p-0.5 border border-[#D4AF37]/20 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-md`}>
        <img
          src={logoSrc}
          alt="Shiny's Hair & Beauty Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain filter contrast-110 brightness-105 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col justify-center">
        <span className="font-serif text-xl sm:text-2xl md:text-3xl tracking-widest text-[#F5F1E8] group-hover:text-[#D4AF37] transition-colors duration-300 leading-tight">
          SHINY'S
        </span>
        <span className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.35em] text-[#A9A39A] uppercase font-light group-hover:text-[#E8C766] transition-colors leading-none">
          HAIR & BEAUTY
        </span>
      </div>
    </div>
  );
};
