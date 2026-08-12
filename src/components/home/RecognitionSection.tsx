import React from 'react';
import { RECOGNITION_HEADER, RECOGNITION_ITEMS } from '../../data/recognition';

interface RecognitionSectionProps {
  onNavigate: (path: string) => void;
}

export const RecognitionSection: React.FC<RecognitionSectionProps> = ({ onNavigate }) => {
  return (
    <section className="bg-[#111111] py-24 md:py-36 px-6 md:px-12 text-[#F5F1E8] border-b border-[#D4AF37]/10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-[#080808] pb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-mono mb-2">
              08 // EDITORIAL ACCOLADES
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-wider font-light uppercase">
              {RECOGNITION_HEADER.title} — <span className="italic text-[#D4AF37]">{RECOGNITION_HEADER.statement}</span>
            </h2>
          </div>

          <button
            onClick={() => onNavigate('/recognition')}
            className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] hover:underline font-semibold shrink-0"
          >
            VIEW ALL RECOGNITION →
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RECOGNITION_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-[#080808] border border-[#D4AF37]/20 group overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="p-6 space-y-2">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-mono">
                  <span>{item.type}</span>
                  <span>{item.year}</span>
                </div>

                <h3 className="font-serif text-xl text-[#F5F1E8]">
                  {item.title}
                </h3>

                <p className="text-xs text-[#A9A39A] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
