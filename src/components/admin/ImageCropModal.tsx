import React, { useState, useEffect, useRef } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  Crop,
  Check,
  X,
  RefreshCw,
  Maximize2
} from 'lucide-react';

interface ImageCropModalProps {
  isOpen: boolean;
  imageSrc: string;
  slotLabel?: string;
  originalFileName?: string;
  originalFileType?: string;
  onCancel: () => void;
  onCropComplete: (croppedFile: File, croppedPreviewUrl: string) => void;
}

export const ImageCropModal: React.FC<ImageCropModalProps> = ({
  isOpen,
  imageSrc,
  slotLabel = 'Edit & Crop Image',
  originalFileName = 'service-image.jpg',
  originalFileType = 'image/jpeg',
  onCancel,
  onCropComplete,
}) => {
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [aspectRatio, setAspectRatio] = useState<number | 'free'>(16 / 10);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
      setImageLoaded(false);
    }
  }, [isOpen, imageSrc]);

  if (!isOpen) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPosition({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleReset = () => {
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const handleApplyCrop = () => {
    const img = imageRef.current;
    if (!img) return;

    const naturalWidth = img.naturalWidth || 1200;
    const naturalHeight = img.naturalHeight || 800;

    // Determine target canvas dimensions
    let targetWidth = naturalWidth;
    let targetHeight = naturalHeight;

    if (typeof aspectRatio === 'number') {
      targetWidth = Math.min(naturalWidth, 1920);
      targetHeight = Math.round(targetWidth / aspectRatio);
    }

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Fill background black for transparent PNGs if exporting as JPEG
    ctx.fillStyle = '#080808';
    ctx.fillRect(0, 0, targetWidth, targetHeight);

    ctx.save();
    // Center transformation
    ctx.translate(targetWidth / 2, targetHeight / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale, scale);

    // Apply offset normalized to canvas resolution
    const containerWidth = containerRef.current?.clientWidth || 500;
    const scaleFactor = targetWidth / containerWidth;
    ctx.translate(position.x * scaleFactor, position.y * scaleFactor);

    // Draw original image centered
    ctx.drawImage(
      img,
      -naturalWidth / 2,
      -naturalHeight / 2,
      naturalWidth,
      naturalHeight
    );
    ctx.restore();

    const outputType = originalFileType.includes('png') ? 'image/png' : 'image/jpeg';
    const outputQuality = 0.93;

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const croppedFile = new File([blob], originalFileName, {
          type: outputType,
          lastModified: Date.now(),
        });
        const croppedPreviewUrl = URL.createObjectURL(croppedFile);
        onCropComplete(croppedFile, croppedPreviewUrl);
      },
      outputType,
      outputQuality
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6">
      <div className="relative w-full max-w-3xl bg-[#0F0F0F] border border-[#D4AF37]/30 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#D4AF37]/20 flex items-center justify-between bg-[#080808]">
          <div className="flex items-center space-x-2 text-[#D4AF37]">
            <Crop className="w-5 h-5" />
            <h3 className="font-serif text-lg tracking-wide uppercase text-[#F5F1E8]">
              {slotLabel}
            </h3>
          </div>
          <button
            onClick={onCancel}
            className="text-neutral-400 hover:text-[#D4AF37] transition-colors p-1"
            title="Close Editor"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Interactive Crop Area */}
        <div className="relative flex-1 bg-[#050505] p-6 flex flex-col items-center justify-center overflow-hidden min-h-[320px] select-none">
          <div
            ref={containerRef}
            className="relative w-full max-w-xl aspect-[16/10] border-2 border-dashed border-[#D4AF37]/60 rounded overflow-hidden cursor-move bg-black shadow-inner flex items-center justify-center"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            <img
              ref={imageRef}
              src={imageSrc}
              alt="Crop target"
              onLoad={() => setImageLoaded(true)}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.15s ease-out',
              }}
              className="max-w-none max-h-none pointer-events-none object-contain"
            />

            {/* Grid Overlay lines for Rule of Thirds framing */}
            <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 border border-[#D4AF37]/20">
              <div className="border-r border-b border-[#D4AF37]/20" />
              <div className="border-r border-b border-[#D4AF37]/20" />
              <div className="border-b border-[#D4AF37]/20" />
              <div className="border-r border-b border-[#D4AF37]/20" />
              <div className="border-r border-b border-[#D4AF37]/20" />
              <div className="border-b border-[#D4AF37]/20" />
              <div className="border-r border-[#D4AF37]/20" />
              <div className="border-r border-[#D4AF37]/20" />
              <div />
            </div>

            {/* Instruction Badge */}
            <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm px-2.5 py-1 rounded border border-[#D4AF37]/30 text-[11px] text-[#D4AF37] pointer-events-none">
              Drag to move image inside crop frame
            </div>
          </div>
        </div>

        {/* Toolbar & Controls */}
        <div className="p-6 bg-[#0B0B0B] border-t border-[#D4AF37]/20 space-y-4">
          {/* Zoom & Rotate Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Zoom Controls */}
            <div className="flex items-center space-x-3 bg-[#141414] px-4 py-2 rounded border border-[#D4AF37]/20">
              <span className="text-xs text-neutral-400 font-mono uppercase tracking-wider">Zoom:</span>
              <button
                onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
                className="p-1 text-neutral-300 hover:text-[#D4AF37] transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.05"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-28 accent-[#D4AF37] cursor-pointer"
              />
              <button
                onClick={() => setScale((s) => Math.min(3, s + 0.1))}
                className="p-1 text-neutral-300 hover:text-[#D4AF37] transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-[#D4AF37] w-10 text-right">
                {Math.round(scale * 100)}%
              </span>
            </div>

            {/* Rotation & Reset */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setRotation((r) => (r - 90) % 360)}
                className="flex items-center space-x-1 px-3 py-2 text-xs bg-[#141414] border border-[#D4AF37]/20 rounded text-neutral-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all"
                title="Rotate Left"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>-90°</span>
              </button>
              <button
                onClick={() => setRotation((r) => (r + 90) % 360)}
                className="flex items-center space-x-1 px-3 py-2 text-xs bg-[#141414] border border-[#D4AF37]/20 rounded text-neutral-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all"
                title="Rotate Right"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>+90°</span>
              </button>
              <button
                onClick={handleReset}
                className="flex items-center space-x-1 px-3 py-2 text-xs bg-[#141414] border border-[#D4AF37]/20 rounded text-neutral-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all"
                title="Reset Position & Zoom"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Aspect Ratio Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-neutral-400 font-mono uppercase">Aspect Ratio:</span>
              <div className="flex items-center space-x-1">
                {[
                  { label: '16:10 Banner', value: 16 / 10 },
                  { label: '4:3 Standard', value: 4 / 3 },
                  { label: '1:1 Square', value: 1 },
                  { label: 'Free Aspect', value: 'free' },
                ].map((ratio) => (
                  <button
                    key={ratio.label}
                    onClick={() => setAspectRatio(ratio.value as any)}
                    className={`px-2.5 py-1 text-xs rounded border transition-all ${
                      aspectRatio === ratio.value
                        ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37] font-medium'
                        : 'bg-[#141414] border-white/10 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {ratio.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 ml-auto">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyCrop}
                className="flex items-center space-x-2 px-5 py-2 text-xs font-mono uppercase tracking-widest bg-[#D4AF37] text-black font-semibold rounded hover:bg-[#F5C542] transition-colors shadow-lg"
              >
                <Check className="w-4 h-4" />
                <span>Crop & Apply</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
