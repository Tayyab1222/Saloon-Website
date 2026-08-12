import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { IntroductionSection } from '../components/home/IntroductionSection';
import { ArtistFounderSection } from '../components/home/ArtistFounderSection';
import { SalonExperienceSection } from '../components/home/SalonExperienceSection';
import { SignatureServicesSection } from '../components/home/SignatureServicesSection';
import { HomeGallerySection } from '../components/home/HomeGallerySection';
import { BridalHighlightSection } from '../components/home/BridalHighlightSection';
import { GoogleReviewsSection } from '../components/home/GoogleReviewsSection';
import { InstagramSection } from '../components/home/InstagramSection';
import { FinalCTASection } from '../components/home/FinalCTASection';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <div className="w-full bg-[#080808] text-[#F5F1E8]">
      {/* 01 — FULLSCREEN HERO */}
      <HeroSection
        onOpenBooking={onOpenBooking}
        onExplore={() => onNavigate('/gallery')}
      />

      {/* 02 — AWARD-WINNING INTRO */}
      <IntroductionSection onNavigate={onNavigate} />

      {/* 03 — MEET SHINY */}
      <ArtistFounderSection onNavigate={onNavigate} />

      {/* 04 — MORE THAN A SALON */}
      <SalonExperienceSection onOpenBooking={onOpenBooking} />

      {/* 05 — SIGNATURE SERVICES */}
      <SignatureServicesSection onNavigate={onNavigate} onOpenBooking={onOpenBooking} />

      {/* 05 — THE SHINY'S EDIT */}
      <HomeGallerySection onNavigate={onNavigate} />

      {/* 06 — BRIDAL EXPERIENCE */}
      <BridalHighlightSection onNavigate={onNavigate} onOpenBooking={onOpenBooking} />

      {/* 07 — GOOGLE REVIEWS */}
      <GoogleReviewsSection />

      {/* 09 — INSTAGRAM */}
      <InstagramSection />

      {/* 10 — FINAL BOOKING CTA */}
      <FinalCTASection onOpenBooking={onOpenBooking} />
    </div>
  );
};

