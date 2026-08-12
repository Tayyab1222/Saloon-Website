import React from 'react';
import { RECOGNITION_HEADER, RECOGNITION_ITEMS } from '../data/recognition';

export const RecognitionPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-[#080808] text-[#F5F1E8]">
      {/* Header */}
      <section className="py-16 px-6 text-center max-w-4xl mx-auto space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-mono">
          ACCOLADES & EDITORIAL WORK
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-wider font-light uppercase">
          {RECOGNITION_HEADER.title} — <span className="italic text-[#D4AF37]">{RECOGNITION_HEADER.statement}</span>
        </h1>
        <p className="text-sm text-[#A9A39A] font-light max-w-xl mx-auto">
          {RECOGNITION_HEADER.subtitle}
        </p>
      </section>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {RECOGNITION_ITEMS.map((item) => (
          <div key={item.id} className="bg-[#111111] border border-[#D4AF37]/20 p-6 space-y-4">
            <div className="aspect-[4/3] overflow-hidden border border-[#D4AF37]/20">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-mono">
              <span>{item.type}</span>
              <span>{item.year}</span>
            </div>

            <h3 className="font-serif text-2xl text-[#F5F1E8] font-light">{item.title}</h3>

            <p className="text-xs text-[#A9A39A] font-light leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
