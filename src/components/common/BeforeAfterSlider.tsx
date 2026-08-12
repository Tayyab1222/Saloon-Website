import React, { useState, useRef, useCallback } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
  className = "",
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none cursor-ew-resize rounded-none border border-[#D4AF37]/20 ${className}`}
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      {/* After Image (Full background) */}
      <img
        src={afterImage}
        alt="After Transformation"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Before Image (Clipped overlay) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Before Transformation"
          className="absolute top-0 left-0 max-w-none h-full object-cover"
          style={{ width: containerRef.current?.clientWidth || '100%' }}
        />
      </div>

      {/* Labels */}
      <div className="absolute top-6 left-6 z-10 px-3 py-1 bg-black/70 backdrop-blur-md text-[10px] uppercase tracking-[0.25em] text-[#F5F1E8] border border-[#D4AF37]/30">
        {beforeLabel}
      </div>
      <div className="absolute top-6 right-6 z-10 px-3 py-1 bg-black/70 backdrop-blur-md text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] border border-[#D4AF37]/30">
        {afterLabel}
      </div>

      {/* Slider Divider Line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-[#D4AF37] z-20 pointer-events-none shadow-[0_0_15px_rgba(212,175,55,0.8)]"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle Knob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#080808] border-2 border-[#D4AF37] flex items-center justify-center shadow-2xl">
          <div className="flex items-center space-x-1">
            <span className="w-1 h-3 bg-[#D4AF37] rounded-full" />
            <span className="w-1 h-3 bg-[#D4AF37] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
