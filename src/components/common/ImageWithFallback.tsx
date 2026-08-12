import React, { useState, useEffect } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

/**
 * Image component with automatic graceful fallback handling.
 * If the image file fails to load or is missing, shows a clean luxury dark placeholder or fallback image
 * without breaking the layout or showing a broken image icon.
 */
export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc = "/uploads/common/background.jpg",
  alt = "",
  className = "",
  onError,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError) {
      setHasError(true);
      if (fallbackSrc && imgSrc !== fallbackSrc) {
        setImgSrc(fallbackSrc);
      }
    }
    if (onError) {
      onError(e);
    }
  };

  if (hasError && !fallbackSrc) {
    return (
      <div className={`bg-[#111111] border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]/40 font-mono text-xs uppercase tracking-widest ${className}`}>
        <span>SHINY'S BEAUTY</span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc || fallbackSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
};
