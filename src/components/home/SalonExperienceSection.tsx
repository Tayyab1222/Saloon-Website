import React from 'react';
import { useSiteImages } from '../../context/SiteImagesContext';
import { MoreThanSalonSection } from '../common/MoreThanSalonSection';

interface SalonExperienceSectionProps {
  onOpenBooking?: () => void;
}

export const SalonExperienceSection: React.FC<SalonExperienceSectionProps> = ({ onOpenBooking }) => {
  const { siteImages } = useSiteImages();
  const homeMoreThanSalonImage =
    siteImages.home?.moreThanSalon || siteImages.home?.salon || '/uploads/home/more-than-salon.jpg';

  return (
    <MoreThanSalonSection
      sectionId="home-more-than-salon-section"
      imageSrc={homeMoreThanSalonImage}
      tagline="A refined beauty experience in the heart of Horsham."
      description="At Shiny's Hair & Beauty Salon, every visit is designed around personalised care, refined artistry and a feeling of confidence that lasts beyond the salon."
      onOpenBooking={onOpenBooking}
    />
  );
};

