import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  onGoHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onGoHome }) => {
  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F1E8] flex flex-col items-center justify-center p-6 text-center">
      <p className="font-serif text-8xl sm:text-9xl text-[#D4AF37] font-light tracking-widest opacity-80">
        404
      </p>

      <h1 className="font-serif text-3xl sm:text-5xl text-[#F5F1E8] font-light uppercase tracking-wider mt-4">
        THE MOMENT <br />
        <span className="italic text-[#D4AF37]">SEEMS TO HAVE MOVED.</span>
      </h1>

      <p className="text-xs text-[#A9A39A] font-light max-w-sm mt-4">
        The page you are looking for is unavailable or has been relocated within our studio.
      </p>

      <button
        onClick={onGoHome}
        className="mt-8 group inline-flex items-center px-8 py-4 text-xs uppercase tracking-[0.25em] font-semibold text-[#080808] bg-[#D4AF37] hover:bg-[#F5C542] transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
        <span>BACK HOME</span>
      </button>
    </div>
  );
};
