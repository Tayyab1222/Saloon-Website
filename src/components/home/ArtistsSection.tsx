import React from 'react';
import { TEAM_MEMBERS } from '../../data/team';

export const ArtistsSection: React.FC = () => {
  return (
    <section className="bg-[#111111] py-24 md:py-36 px-6 md:px-12 text-[#F5F1E8] border-b border-[#D4AF37]/10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-mono">
            06 // CREATIVE DIRECTORS
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-wider font-light uppercase">
            THE <span className="italic text-[#D4AF37]">ARTISTS</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#A9A39A] font-light leading-relaxed">
            Master hair sculptors, colourists, and bridal makeup artists dedicated to bespoke excellence.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((artist) => (
            <div
              key={artist.id}
              className="bg-[#080808] border border-[#D4AF37]/20 group p-6 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="relative aspect-[3/4] overflow-hidden border border-[#D4AF37]/20">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                  />
                  {artist.isPlaceholder && (
                    <span className="absolute top-3 right-3 text-[9px] uppercase tracking-[0.2em] text-[#D4AF37] bg-black/80 backdrop-blur-md px-2.5 py-1 border border-[#D4AF37]/30 font-mono">
                      [TEAM EDITABLE]
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-mono">
                    {artist.role}
                  </p>
                  <h3 className="font-serif text-2xl text-[#F5F1E8] font-light mt-1">
                    {artist.name}
                  </h3>
                  <p className="text-xs text-[#E8C766] font-medium mt-1">
                    {artist.specialty}
                  </p>
                </div>

                <p className="text-xs text-[#A9A39A] font-light leading-relaxed">
                  {artist.bio}
                </p>
              </div>

              <div className="pt-4 border-t border-[#111111] text-[10px] uppercase tracking-[0.2em] text-[#A9A39A] font-mono">
                BY PRIVATE APPOINTMENT
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
