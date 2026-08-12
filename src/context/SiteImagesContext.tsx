import React, { createContext, useContext, useState, useEffect } from 'react';
import { images as defaultImages } from '../data/images';

type ImagesType = typeof defaultImages;

export interface InstagramGalleryItem {
  id: string;
  url: string;
  filename?: string;
  uploadedAt?: string;
}

interface SiteImagesContextType {
  siteImages: ImagesType;
  instagramGallery: InstagramGalleryItem[];
  refreshSiteImages: () => Promise<void>;
  refreshInstagramGallery: () => Promise<void>;
  updateImageSlot: (section: string, slot: string, newUrl: string) => void;
  isLoading: boolean;
}

const SiteImagesContext = createContext<SiteImagesContextType>({
  siteImages: defaultImages,
  instagramGallery: [],
  refreshSiteImages: async () => {},
  refreshInstagramGallery: async () => {},
  updateImageSlot: () => {},
  isLoading: false,
});

export const SiteImagesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteImages, setSiteImages] = useState<ImagesType>(defaultImages);
  const [instagramGallery, setInstagramGallery] = useState<InstagramGalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchInstagramGallery = async () => {
    try {
      const res = await fetch('/api/instagram');
      if (!res.ok) return;
      const data = await res.json();
      if (data.success && Array.isArray(data.images)) {
        setInstagramGallery(data.images);
      }
    } catch (err) {
      console.error('Failed to fetch instagram gallery:', err);
    }
  };

  const fetchSiteImages = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/images');
      if (!res.ok) return;
      const data = await res.json();
      if (data.success && data.images) {
        mergeConfigToState(data.images);
      }
    } catch (err) {
      console.error('Failed to fetch dynamic site images:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const mergeConfigToState = (config: Record<string, Record<string, { url: string; uploadedAt?: string }>>) => {
    setSiteImages((prev) => {
      const copy = JSON.parse(JSON.stringify(prev)) as ImagesType;

      // Helper function to safely update nested properties
      Object.entries(config).forEach(([sec, slots]) => {
        if (!slots) return;
        Object.entries(slots).forEach(([slt, info]) => {
          if (!info || !info.url) return;
          const url = info.url;

          if (sec === 'home' && (copy.home as any)?.[slt] !== undefined) {
            (copy.home as any)[slt] = url;
          } else if (sec === 'hero' && (copy.hero as any)?.[slt] !== undefined) {
            (copy.hero as any)[slt] = url;
          } else if (sec === 'artist' && (copy.artist as any)?.[slt] !== undefined) {
            (copy.artist as any)[slt] = url;
          } else if (sec === 'about') {
            if (slt === 'team1' && copy.about.team) copy.about.team[0] = url;
            else if (slt === 'team2' && copy.about.team) copy.about.team[1] = url;
            else if (slt === 'team3' && copy.about.team) copy.about.team[2] = url;
            else if ((copy.about as any)?.[slt] !== undefined) (copy.about as any)[slt] = url;
          } else if (sec === 'services') {
            if ((copy.services as any)?.[slt] !== undefined) {
              (copy.services as any)[slt] = url;
            }
          } else if (sec === 'awards' && (copy.awards as any)?.[slt] !== undefined) {
            (copy.awards as any)[slt] = url;
          } else if (sec === 'gallery') {
            if ((copy as any).gallery === undefined) (copy as any).gallery = {};
            (copy as any).gallery[slt] = url;
          } else if (sec === 'reviews' && (copy.reviews as any)?.[slt] !== undefined) {
            (copy.reviews as any)[slt] = url;
          } else if (sec === 'contact' && (copy.contact as any)?.[slt] !== undefined) {
            (copy.contact as any)[slt] = url;
          } else if (sec === 'booking' && (copy.booking as any)?.[slt] !== undefined) {
            (copy.booking as any)[slt] = url;
          } else if (sec === 'instagram') {
            if ((copy.instagram as any)?.[slt] !== undefined) (copy.instagram as any)[slt] = url;
            const match = slt.match(/post(\d+)/);
            if (match && match[1]) {
              const idx = parseInt(match[1], 10) - 1;
              if (idx >= 0 && idx < 10 && copy.instagram.posts) {
                copy.instagram.posts[idx] = url;
              }
            }
          } else if (sec === 'journal') {
            const match = slt.match(/journal(\d+)/);
            if (match && match[1]) {
              const idx = parseInt(match[1], 10) - 1;
              if (idx >= 0 && idx < 3 && copy.journal) {
                copy.journal[idx] = url;
              }
            }
          } else if (sec === 'common') {
            if ((copy.common as any)?.[slt] !== undefined) {
              (copy.common as any)[slt] = url;
            }
            if (slt === 'logo') {
              copy.logo = url;
            }
          }
        });
      });

      // Safely synchronize service alias pairs so custom uploads are preserved
      const serviceAliasPairs: Array<[keyof typeof copy.services, keyof typeof copy.services]> = [
        ['ladiesHair', 'hair'],
        ['hairColour', 'colour'],
        ['bridalHairMakeup', 'bridal'],
        ['professionalMakeup', 'makeup'],
        ['hairTreatments', 'treatments'],
      ];

      serviceAliasPairs.forEach(([primary, alias]) => {
        const primConfig = config.services?.[primary as string];
        const aliasConfig = config.services?.[alias as string];

        if (primConfig?.uploadedAt || (primConfig?.url && primConfig.url !== defaultImages.services[primary])) {
          copy.services[alias] = copy.services[primary];
        } else if (aliasConfig?.uploadedAt || (aliasConfig?.url && aliasConfig.url !== defaultImages.services[alias])) {
          copy.services[primary] = copy.services[alias];
        }
      });

      return copy;
    });
  };

  const updateImageSlot = (section: string, slot: string, newUrl: string) => {
    mergeConfigToState({
      [section]: {
        [slot]: { url: newUrl }
      }
    });
  };

  const refreshAllSiteImages = async () => {
    await Promise.all([fetchSiteImages(), fetchInstagramGallery()]);
  };

  useEffect(() => {
    fetchSiteImages();
    fetchInstagramGallery();
  }, []);

  return (
    <SiteImagesContext.Provider
      value={{
        siteImages,
        instagramGallery,
        refreshSiteImages: refreshAllSiteImages,
        refreshInstagramGallery: fetchInstagramGallery,
        updateImageSlot,
        isLoading,
      }}
    >
      {children}
    </SiteImagesContext.Provider>
  );
};

export const useSiteImages = () => useContext(SiteImagesContext);
