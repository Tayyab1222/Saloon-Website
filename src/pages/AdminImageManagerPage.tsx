import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Image as ImageIcon,
  Loader2,
  Sparkles,
  Eye,
  Trash2,
  Search,
  Check,
  X,
  FileImage,
  Award,
  Plus,
  Calendar,
  Building2,
  RotateCcw,
  LayoutGrid,
  Crop
} from 'lucide-react';
import { GalleryImage } from '../types';
import { useSiteImages } from '../context/SiteImagesContext';
import { ImageCropModal } from '../components/admin/ImageCropModal';

export interface ImageSlot {
  id: string;
  label: string;
  targetPath: string;
  section: string;
  slot: string;
  category:
    | 'Home'
    | 'Hero'
    | 'About'
    | 'Meet Shiny'
    | 'Services'
    | 'Awards'
    | 'Gallery'
    | 'Reviews'
    | 'Instagram'
    | 'Journal'
    | 'Booking'
    | 'Contact'
    | 'Common';
  description: string;
}

export interface AwardItem {
  id: string;
  type?: 'image' | 'video';
  url: string;
  filename?: string;
  title?: string;
  year?: string;
  organisation?: string;
  description?: string;
  uploadedAt: string;
  size?: number;
}

export const ALL_IMAGE_SLOTS: ImageSlot[] = [
  // 1. HOME
  {
    id: 'home-hero',
    label: 'HOME HERO BANNER',
    targetPath: '/uploads/home/hero.jpg',
    section: 'home',
    slot: 'hero',
    category: 'Home',
    description: 'Primary hero image displayed at the top of the homepage.',
  },
  {
    id: 'home-intro',
    label: 'HOME INTRO VISUAL',
    targetPath: '/uploads/home/intro.jpg',
    section: 'home',
    slot: 'intro',
    category: 'Home',
    description: 'Main intro section portrait showcasing salon luxury.',
  },
  {
    id: 'home-bridal',
    label: 'BRIDAL EXPERIENCE PREVIEW',
    targetPath: '/uploads/home/bridal-experience.jpg',
    section: 'home',
    slot: 'bridal',
    category: 'Home',
    description: 'Homepage feature card for bridal couture services.',
  },
  {
    id: 'home-salon',
    label: 'HORSHAM SALON INTERIOR',
    targetPath: '/uploads/home/salon.jpg',
    section: 'home',
    slot: 'salon',
    category: 'Home',
    description: 'Private suite ambiance preview on homepage.',
  },
  {
    id: 'home-more-than-salon',
    label: 'MORE THAN A SALON IMAGE (HOME)',
    targetPath: '/uploads/home/more-than-salon.jpg',
    section: 'home',
    slot: 'moreThanSalon',
    category: 'Home',
    description: 'Cinematic feature image for More Than A Salon section on Homepage.',
  },

  // 2. HERO
  {
    id: 'hero-poster',
    label: 'MAIN HERO VIDEO POSTER',
    targetPath: '/uploads/hero/hero-01.jpg',
    section: 'hero',
    slot: 'poster',
    category: 'Hero',
    description: 'Fallback poster image for the main hero video player.',
  },

  // 3. ABOUT
  {
    id: 'about-hero',
    label: 'ABOUT HERO BANNER',
    targetPath: '/uploads/about/hero.jpg',
    section: 'about',
    slot: 'hero',
    category: 'About',
    description: 'Header hero background for the About Shiny page.',
  },
  {
    id: 'about-celebrity',
    label: 'CELEBRITY PORTFOLIO IMAGE',
    targetPath: '/uploads/about/celebrity.jpg',
    section: 'about',
    slot: 'celebrity',
    category: 'About',
    description: 'High-profile red carpet client feature portrait on About page.',
  },
  {
    id: 'about-more-than-salon',
    label: 'MORE THAN A SALON IMAGE',
    targetPath: '/uploads/about/more-than-salon.jpg',
    section: 'about',
    slot: 'moreThanSalon',
    category: 'About',
    description: 'Cinematic interior photo for the More Than A Salon section on About page.',
  },

  // 4. MEET SHINY
  {
    id: 'artist-main',
    label: 'MEET SHINY / ARTIST IMAGE',
    targetPath: '/uploads/artist/artist.jpg',
    section: 'artist',
    slot: 'artist',
    category: 'Meet Shiny',
    description: 'Main official portrait of Shiny (Founder & Lead Artist).',
  },

  // 5. SERVICES
  {
    id: 'services-hero',
    label: 'SERVICES HERO BANNER',
    targetPath: '/uploads/services/hero.jpg',
    section: 'services',
    slot: 'hero',
    category: 'Services',
    description: 'Top header image on the Services page.',
  },
  {
    id: 'services-ladies-hair',
    label: 'SERVICES — LADIES\' HAIRDRESSING',
    targetPath: '/uploads/services/ladies-hair.jpg',
    section: 'services',
    slot: 'ladiesHair',
    category: 'Services',
    description: 'Service 01: Ladies\' Hairdressing image.',
  },
  {
    id: 'services-mens-grooming',
    label: 'SERVICES — MEN\'S GROOMING',
    targetPath: '/uploads/services/mens-grooming.jpg',
    section: 'services',
    slot: 'mensGrooming',
    category: 'Services',
    description: 'Service 02: Men\'s Hairdressing & Grooming image.',
  },
  {
    id: 'services-children-haircuts',
    label: 'SERVICES — CHILDREN\'S HAIRCUTS',
    targetPath: '/uploads/services/children-haircuts.jpg',
    section: 'services',
    slot: 'childrenHaircuts',
    category: 'Services',
    description: 'Service 03: Children\'s Haircuts image.',
  },
  {
    id: 'services-hair-colour',
    label: 'SERVICES — HAIR COLOUR',
    targetPath: '/uploads/services/hair-colour.jpg',
    section: 'services',
    slot: 'hairColour',
    category: 'Services',
    description: 'Service 04: Hair Colour Services image.',
  },
  {
    id: 'services-hair-styling',
    label: 'SERVICES — HAIR STYLING',
    targetPath: '/uploads/services/hair-styling.jpg',
    section: 'services',
    slot: 'hairStyling',
    category: 'Services',
    description: 'Service 05: Hair Styling & Blowdry image.',
  },
  {
    id: 'services-bridal',
    label: 'SERVICES — BRIDAL HAIR & MAKEUP',
    targetPath: '/uploads/services/bridal-hair-makeup.jpg',
    section: 'services',
    slot: 'bridalHairMakeup',
    category: 'Services',
    description: 'Service 06: Bridal Hair & Makeup package image.',
  },
  {
    id: 'services-makeup',
    label: 'SERVICES — PROFESSIONAL MAKEUP',
    targetPath: '/uploads/services/professional-makeup.jpg',
    section: 'services',
    slot: 'professionalMakeup',
    category: 'Services',
    description: 'Service 07: Professional Makeup image.',
  },
  {
    id: 'services-treatments',
    label: 'SERVICES — HAIR TREATMENTS',
    targetPath: '/uploads/services/hair-treatments.jpg',
    section: 'services',
    slot: 'hairTreatments',
    category: 'Services',
    description: 'Service 08: Hair Treatments image.',
  },
  {
    id: 'services-beauty',
    label: 'SERVICES — BEAUTY & AESTHETICS',
    targetPath: '/uploads/services/beauty.jpg',
    section: 'services',
    slot: 'beauty',
    category: 'Services',
    description: 'Service 09: Beauty & Aesthetics image.',
  },

  // 6. AWARDS (HERO SLOT ONLY - GALLERY IS MANAGED DYNAMICALLY)
  {
    id: 'awards-hero',
    label: 'AWARDS HERO BANNER',
    targetPath: '/uploads/awards/hero.jpg',
    section: 'awards',
    slot: 'hero',
    category: 'Awards',
    description: 'Header background for Awards & Honours page.',
  },

  // 6b. GALLERY
  {
    id: 'gallery-hero',
    label: 'GALLERY HERO IMAGE',
    targetPath: '/uploads/gallery/hero.jpg',
    section: 'gallery',
    slot: 'hero',
    category: 'Gallery',
    description: 'Header hero background for the Gallery collection page.',
  },

  // 7. REVIEWS
  {
    id: 'reviews-hero',
    label: 'REVIEWS HERO IMAGE',
    targetPath: '/uploads/reviews/hero.jpg',
    section: 'reviews',
    slot: 'hero',
    category: 'Reviews',
    description: 'Top header image on Reviews & Testimonials page.',
  },
  {
    id: 'reviews-1',
    label: 'CLIENT TESTIMONIAL 01',
    targetPath: '/uploads/reviews/review-01.jpg',
    section: 'reviews',
    slot: 'review1',
    category: 'Reviews',
    description: 'Client review 01 portrait.',
  },
  {
    id: 'reviews-2',
    label: 'CLIENT TESTIMONIAL 02',
    targetPath: '/uploads/reviews/review-02.jpg',
    section: 'reviews',
    slot: 'review2',
    category: 'Reviews',
    description: 'Client review 02 portrait.',
  },
  {
    id: 'reviews-3',
    label: 'CLIENT TESTIMONIAL 03',
    targetPath: '/uploads/reviews/review-03.jpg',
    section: 'reviews',
    slot: 'review3',
    category: 'Reviews',
    description: 'Client review 03 portrait.',
  },
  {
    id: 'reviews-4',
    label: 'CLIENT TESTIMONIAL 04',
    targetPath: '/uploads/reviews/review-04.jpg',
    section: 'reviews',
    slot: 'review4',
    category: 'Reviews',
    description: 'Client review 04 portrait.',
  },

  // 9. JOURNAL
  {
    id: 'journal-1',
    label: 'JOURNAL COVER 01',
    targetPath: '/uploads/journal/journal-01.jpg',
    section: 'journal',
    slot: 'journal1',
    category: 'Journal',
    description: 'Cover image for Journal post 01.',
  },
  {
    id: 'journal-2',
    label: 'JOURNAL COVER 02',
    targetPath: '/uploads/journal/journal-02.jpg',
    section: 'journal',
    slot: 'journal2',
    category: 'Journal',
    description: 'Cover image for Journal post 02.',
  },
  {
    id: 'journal-3',
    label: 'JOURNAL COVER 03',
    targetPath: '/uploads/journal/journal-03.jpg',
    section: 'journal',
    slot: 'journal3',
    category: 'Journal',
    description: 'Cover image for Journal post 03.',
  },

  // 10. BOOKING
  {
    id: 'booking-hero',
    label: 'BOOKING HERO BANNER',
    targetPath: '/uploads/booking/hero.jpg',
    section: 'booking',
    slot: 'hero',
    category: 'Booking',
    description: 'Header background on Appointment Booking screen.',
  },
  {
    id: 'booking-1',
    label: 'BOOKING SUITE PREVIEW',
    targetPath: '/uploads/booking/booking-01.jpg',
    section: 'booking',
    slot: 'booking1',
    category: 'Booking',
    description: 'Appointment feature detail visual.',
  },

  // 11. CONTACT
  {
    id: 'contact-hero',
    label: 'CONTACT HERO BANNER',
    targetPath: '/uploads/contact/hero.jpg',
    section: 'contact',
    slot: 'hero',
    category: 'Contact',
    description: 'Header background for Contact & Concierge.',
  },
  {
    id: 'contact-1',
    label: 'CONTACT LOCATION DETAIL',
    targetPath: '/uploads/contact/contact-01.jpg',
    section: 'contact',
    slot: 'contact1',
    category: 'Contact',
    description: 'Salon exterior and entrance image.',
  },

  // 12. COMMON
  {
    id: 'common-logo',
    label: 'BRAND WEBSITE LOGO',
    targetPath: '/uploads/common/logo.jpg',
    section: 'common',
    slot: 'logo',
    category: 'Common',
    description: "Shiny's Hair & Beauty official brand logo symbol.",
  },
  {
    id: 'common-bg',
    label: 'GLOBAL LUXURY BACKGROUND',
    targetPath: '/uploads/common/background.jpg',
    section: 'common',
    slot: 'background',
    category: 'Common',
    description: 'Default dark subtle luxury background texture.',
  },
];

export type CategoryTab =
  | 'ALL'
  | 'Home'
  | 'Hero'
  | 'About'
  | 'Meet Shiny'
  | 'Services'
  | 'Awards'
  | 'Reviews'
  | 'Instagram'
  | 'Journal'
  | 'Booking'
  | 'Contact'
  | 'Common'
  | 'Editorial Gallery';

const CATEGORIES: CategoryTab[] = [
  'ALL',
  'Home',
  'Hero',
  'About',
  'Meet Shiny',
  'Services',
  'Awards',
  'Reviews',
  'Instagram',
  'Journal',
  'Booking',
  'Contact',
  'Common',
  'Editorial Gallery',
];

interface AdminImageManagerPageProps {
  onLogout: () => void;
  onNavigate?: (path: string) => void;
}

export const AdminImageManagerPage: React.FC<AdminImageManagerPageProps> = ({
  onLogout,
  onNavigate,
}) => {
  const { siteImages, refreshSiteImages, updateImageSlot } = useSiteImages();
  const [activeTab, setActiveTab] = useState<CategoryTab>('Home');
  const [searchQuery, setSearchQuery] = useState('');
  const [cacheBuster, setCacheBuster] = useState<Record<string, number>>({});
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  // Fixed slot upload states
  const [pendingFiles, setPendingFiles] = useState<Record<string, { file: File; previewUrl: string }>>({});
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  const [slotStatusMsg, setSlotStatusMsg] = useState<{ id: string; type: 'success' | 'error'; msg: string } | null>(null);
  const [confirmResetSlot, setConfirmResetSlot] = useState<ImageSlot | null>(null);

  // Crop / Edit modal state
  const [cropperState, setCropperState] = useState<{
    isOpen: boolean;
    slot?: ImageSlot;
    rawFile?: File;
    rawPreviewUrl?: string;
  }>({ isOpen: false });

  // Dynamic Award Gallery state
  const [awardList, setAwardList] = useState<AwardItem[]>([]);
  const [isLoadingAwards, setIsLoadingAwards] = useState(false);
  const [selectedAwardFiles, setSelectedAwardFiles] = useState<File[]>([]);
  const [awardTitleUpload, setAwardTitleUpload] = useState('');
  const [awardYearUpload, setAwardYearUpload] = useState('');
  const [awardOrgUpload, setAwardOrgUpload] = useState('');
  const [isUploadingAward, setIsUploadingAward] = useState(false);
  const [awardSuccessMsg, setAwardSuccessMsg] = useState<string | null>(null);
  const [awardUploadError, setAwardUploadError] = useState<string | null>(null);
  const [confirmDeleteAwardId, setConfirmDeleteAwardId] = useState<string | null>(null);

  // Editorial Gallery state
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isLoadingGallery, setIsLoadingGallery] = useState(false);
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState('ALL');
  const [selectedGalleryFiles, setSelectedGalleryFiles] = useState<File[]>([]);
  const [galleryCategoryUpload, setGalleryCategoryUpload] = useState('HAIR');
  const [galleryTitleUpload, setGalleryTitleUpload] = useState('');
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [gallerySuccessMsg, setGallerySuccessMsg] = useState<string | null>(null);
  const [galleryUploadError, setGalleryUploadError] = useState<string | null>(null);
  const [confirmDeleteGalleryId, setConfirmDeleteGalleryId] = useState<string | null>(null);

  // Dynamic Instagram Gallery state
  const [instagramGallery, setInstagramGallery] = useState<Array<{ id: string; url: string; filename?: string; uploadedAt?: string }>>([]);
  const [isLoadingInstagram, setIsLoadingInstagram] = useState(false);
  const [selectedInstagramFiles, setSelectedInstagramFiles] = useState<File[]>([]);
  const [isUploadingInstagram, setIsUploadingInstagram] = useState(false);
  const [instagramSuccessMsg, setInstagramSuccessMsg] = useState<string | null>(null);
  const [instagramUploadError, setInstagramUploadError] = useState<string | null>(null);
  const [confirmDeleteInstagramId, setConfirmDeleteInstagramId] = useState<string | null>(null);

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Auth helper
  const getAuthHeaders = (): Record<string, string> => {
    const token = localStorage.getItem('shiny_admin_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Fetch dynamic award gallery photos
  const fetchAwardImages = async () => {
    setIsLoadingAwards(true);
    try {
      const res = await fetch('/api/awards');
      const data = await res.json();
      if (data.success && Array.isArray(data.awards)) {
        setAwardList(data.awards);
      }
    } catch (err) {
      console.error('Error fetching award images:', err);
    } finally {
      setIsLoadingAwards(false);
    }
  };

  // Fetch editorial gallery photos
  const fetchGalleryImages = async () => {
    setIsLoadingGallery(true);
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (data.success && Array.isArray(data.images)) {
        setGalleryImages(data.images);
      }
    } catch (err) {
      console.error('Error fetching gallery images:', err);
    } finally {
      setIsLoadingGallery(false);
    }
  };

  // Fetch Instagram gallery photos
  const fetchInstagramGallery = async () => {
    setIsLoadingInstagram(true);
    try {
      const res = await fetch('/api/instagram');
      const data = await res.json();
      if (data.success && Array.isArray(data.images)) {
        setInstagramGallery(data.images);
      }
    } catch (err) {
      console.error('Error fetching instagram gallery:', err);
    } finally {
      setIsLoadingInstagram(false);
    }
  };

  useEffect(() => {
    fetchAwardImages();
    fetchGalleryImages();
    fetchInstagramGallery();
  }, []);

  // Sync server handler
  const handleSyncServer = async () => {
    setSyncFeedback('Syncing with server...');
    await refreshSiteImages();
    await fetchAwardImages();
    await fetchGalleryImages();
    await fetchInstagramGallery();
    setSyncFeedback('Server images fully synchronized!');
    setTimeout(() => setSyncFeedback(null), 4000);
  };

  // Helper to retrieve live image URL for a slot
  const getSlotImageUrl = (slot: ImageSlot): string => {
    const cb = cacheBuster[slot.id] ? `?t=${cacheBuster[slot.id]}` : '';
    const pending = pendingFiles[slot.id];
    if (pending) return pending.previewUrl;

    const sec = slot.section;
    const slt = slot.slot;

    let dynamicUrl = slot.targetPath;
    if (sec === 'home') dynamicUrl = (siteImages.home as any)?.[slt] || slot.targetPath;
    else if (sec === 'hero') dynamicUrl = (siteImages.hero as any)?.[slt] || slot.targetPath;
    else if (sec === 'artist') dynamicUrl = (siteImages.artist as any)?.[slt] || slot.targetPath;
    else if (sec === 'about') dynamicUrl = (siteImages.about as any)?.[slt] || slot.targetPath;
    else if (sec === 'services') {
      const serviceAliasMap: Record<string, string> = {
        ladiesHair: 'hair',
        hairColour: 'colour',
        bridalHairMakeup: 'bridal',
        professionalMakeup: 'makeup',
        hairTreatments: 'treatments',
      };
      const alias = serviceAliasMap[slt];
      const val = (siteImages.services as any)?.[slt] || (alias ? (siteImages.services as any)?.[alias] : null);
      dynamicUrl = val || slot.targetPath;
    }

    else if (sec === 'awards') dynamicUrl = (siteImages.awards as any)?.[slt] || slot.targetPath;
    else if (sec === 'gallery') dynamicUrl = (siteImages as any).gallery?.[slt] || slot.targetPath;
    else if (sec === 'reviews') dynamicUrl = (siteImages.reviews as any)?.[slt] || slot.targetPath;
    else if (sec === 'contact') dynamicUrl = (siteImages.contact as any)?.[slt] || slot.targetPath;
    else if (sec === 'booking') dynamicUrl = (siteImages.booking as any)?.[slt] || slot.targetPath;
    else if (sec === 'instagram') {
      const match = slt.match(/post(\d+)/);
      if (match && match[1]) {
        const idx = parseInt(match[1], 10) - 1;
        dynamicUrl = siteImages.instagram?.posts?.[idx] || slot.targetPath;
      }
    } else if (sec === 'journal') {
      const match = slt.match(/journal(\d+)/);
      if (match && match[1]) {
        const idx = parseInt(match[1], 10) - 1;
        dynamicUrl = siteImages.journal?.[idx] || slot.targetPath;
      }
    } else if (sec === 'common') dynamicUrl = (siteImages.common as any)?.[slt] || slot.targetPath;

    return `${dynamicUrl}${cb}`;
  };

  // Select file for a slot -> Opens crop editor first!
  const handleFileSelectForSlot = (slot: ImageSlot, file: File) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!validTypes.includes(file.type) && !['jpg', 'jpeg', 'png', 'webp'].includes(ext || '')) {
      setSlotStatusMsg({
        id: slot.id,
        type: 'error',
        msg: 'Invalid file format. Please upload JPG, JPEG, PNG, or WebP.',
      });
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setSlotStatusMsg({
        id: slot.id,
        type: 'error',
        msg: 'File exceeds 15MB size limit.',
      });
      return;
    }

    const rawPreviewUrl = URL.createObjectURL(file);
    setCropperState({
      isOpen: true,
      slot,
      rawFile: file,
      rawPreviewUrl,
    });
    setSlotStatusMsg(null);
  };

  // Crop completion handler
  const handleCropComplete = (croppedFile: File, croppedPreviewUrl: string) => {
    if (!cropperState.slot) return;
    const slotId = cropperState.slot.id;

    setPendingFiles((prev) => ({
      ...prev,
      [slotId]: { file: croppedFile, previewUrl: croppedPreviewUrl },
    }));

    if (cropperState.rawPreviewUrl) {
      URL.revokeObjectURL(cropperState.rawPreviewUrl);
    }

    setCropperState({ isOpen: false });
    setSlotStatusMsg({
      id: slotId,
      type: 'success',
      msg: 'Image cropped & ready! Click "Save / Replace" to publish to live website.',
    });
  };

  const handleCropCancel = () => {
    if (cropperState.rawPreviewUrl) {
      URL.revokeObjectURL(cropperState.rawPreviewUrl);
    }
    setCropperState({ isOpen: false });
  };

  // Cancel selected pending upload
  const handleCancelPending = (slotId: string) => {
    setPendingFiles((prev) => {
      const updated = { ...prev };
      if (updated[slotId]?.previewUrl) {
        URL.revokeObjectURL(updated[slotId].previewUrl);
      }
      delete updated[slotId];
      return updated;
    });
    setSlotStatusMsg(null);
  };

  // Save / Replace Image on Server for fixed slots
  const handleSaveSlotImage = async (slot: ImageSlot) => {
    const pending = pendingFiles[slot.id];
    if (!pending) return;

    setUploadingSlot(slot.id);
    setSlotStatusMsg(null);

    try {
      const formData = new FormData();
      formData.append('image', pending.file);
      formData.append('section', slot.section);
      formData.append('slot', slot.slot);
      formData.append('targetPath', slot.targetPath);

      const res = await fetch(`/api/images/upload`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        const timestamp = Date.now();
        setCacheBuster((prev) => ({ ...prev, [slot.id]: timestamp }));
        if (data.url) {
          updateImageSlot(slot.section, slot.slot, data.url);
        }
        await refreshSiteImages();

        handleCancelPending(slot.id);
        setSlotStatusMsg({
          id: slot.id,
          type: 'success',
          msg: 'Image uploaded & synchronized with website!',
        });

        setTimeout(() => {
          setSlotStatusMsg((curr) => (curr?.id === slot.id ? null : curr));
        }, 5000);
      } else {
        setSlotStatusMsg({
          id: slot.id,
          type: 'error',
          msg: data.error || 'Failed to upload image.',
        });
      }
    } catch (err: any) {
      setSlotStatusMsg({
        id: slot.id,
        type: 'error',
        msg: 'Network or server error during image upload.',
      });
    } finally {
      setUploadingSlot(null);
    }
  };

  // Reset / Delete custom image mapping for slot
  const handleResetSlot = async (slot: ImageSlot) => {
    setUploadingSlot(slot.id);
    try {
      const res = await fetch(`/api/images/${slot.section}/${slot.slot}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        const timestamp = Date.now();
        setCacheBuster((prev) => ({ ...prev, [slot.id]: timestamp }));
        await refreshSiteImages();
        setSlotStatusMsg({
          id: slot.id,
          type: 'success',
          msg: 'Slot reset to original default image.',
        });
      }
    } catch (err) {
      console.error('Reset error:', err);
    } finally {
      setUploadingSlot(null);
      setConfirmResetSlot(null);
    }
  };

  // Submit Upload for Award Gallery
  const handleAwardUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAwardFiles.length === 0) return;

    setIsUploadingAward(true);
    setAwardUploadError(null);
    setAwardSuccessMsg(null);

    try {
      const formData = new FormData();
      selectedAwardFiles.forEach((f) => formData.append('images', f));
      if (awardTitleUpload.trim()) formData.append('title', awardTitleUpload.trim());
      if (awardYearUpload.trim()) formData.append('year', awardYearUpload.trim());
      if (awardOrgUpload.trim()) formData.append('organisation', awardOrgUpload.trim());

      const res = await fetch('/api/awards/upload', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setAwardSuccessMsg(`Successfully uploaded ${selectedAwardFiles.length} award photo(s).`);
        setSelectedAwardFiles([]);
        setAwardTitleUpload('');
        setAwardYearUpload('');
        setAwardOrgUpload('');
        fetchAwardImages();
      } else {
        setAwardUploadError(data.error || 'Failed to upload award image(s).');
      }
    } catch (err) {
      setAwardUploadError('Network error uploading award image.');
    } finally {
      setIsUploadingAward(false);
    }
  };

  // Delete Award Gallery item
  const handleDeleteAwardItem = async (id: string) => {
    try {
      const res = await fetch(`/api/awards/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        setAwardList((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error('Error deleting award image:', err);
    } finally {
      setConfirmDeleteAwardId(null);
    }
  };

  // Gallery Upload Submit for Editorial Showcase
  const handleGalleryUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGalleryFiles.length === 0) return;

    setIsUploadingGallery(true);
    setGalleryUploadError(null);
    setGallerySuccessMsg(null);

    try {
      const formData = new FormData();
      selectedGalleryFiles.forEach((f) => formData.append('images', f));
      formData.append('category', galleryCategoryUpload);
      if (galleryTitleUpload.trim()) {
        formData.append('title', galleryTitleUpload.trim());
      }

      const res = await fetch('/api/gallery/upload', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setGallerySuccessMsg(`Successfully uploaded ${selectedGalleryFiles.length} gallery image(s).`);
        setSelectedGalleryFiles([]);
        setGalleryTitleUpload('');
        fetchGalleryImages();
      } else {
        setGalleryUploadError(data.error || 'Failed to upload gallery images.');
      }
    } catch (err) {
      setGalleryUploadError('Network error uploading to gallery.');
    } finally {
      setIsUploadingGallery(false);
    }
  };

  // Delete Editorial Gallery Item
  const handleDeleteGalleryItem = async (id: string) => {
    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        setGalleryImages((prev) => prev.filter((img) => img.id !== id));
      }
    } catch (err) {
      console.error('Error deleting gallery image:', err);
    } finally {
      setConfirmDeleteGalleryId(null);
    }
  };

  // Upload Instagram Gallery Images
  const handleInstagramUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedInstagramFiles.length === 0) return;

    setIsUploadingInstagram(true);
    setInstagramSuccessMsg(null);
    setInstagramUploadError(null);

    try {
      const formData = new FormData();
      selectedInstagramFiles.forEach((file) => formData.append('images', file));

      const res = await fetch('/api/instagram/upload', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setInstagramSuccessMsg(
          `Successfully uploaded ${data.uploaded?.length || selectedInstagramFiles.length} image(s) to Instagram Gallery!`
        );
        setSelectedInstagramFiles([]);
        if (Array.isArray(data.images)) {
          setInstagramGallery(data.images);
        } else {
          await fetchInstagramGallery();
        }
        await refreshSiteImages();
      } else {
        setInstagramUploadError(data.error || 'Failed to upload Instagram images.');
      }
    } catch (err: any) {
      setInstagramUploadError(err.message || 'Upload error occurred.');
    } finally {
      setIsUploadingInstagram(false);
    }
  };

  // Delete Instagram Gallery Item
  const handleDeleteInstagramItem = async (id: string | null) => {
    if (!id) return;
    try {
      const res = await fetch(`/api/instagram/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        if (Array.isArray(data.images)) {
          setInstagramGallery(data.images);
        } else {
          await fetchInstagramGallery();
        }
        await refreshSiteImages();
      } else {
        alert(data.error || 'Failed to delete Instagram image.');
      }
    } catch (err) {
      console.error('Error deleting instagram image:', err);
    } finally {
      setConfirmDeleteInstagramId(null);
    }
  };

  // Filter slots
  const filteredSlots = ALL_IMAGE_SLOTS.filter((s) => {
    if (activeTab === 'Editorial Gallery' || activeTab === 'Instagram') return false;
    const matchesTab = activeTab === 'ALL' ? true : s.category === activeTab;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesTab;
    const matchesQuery =
      s.label.toLowerCase().includes(q) ||
      s.targetPath.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.section.toLowerCase().includes(q);
    return matchesTab && matchesQuery;
  });

  // Filter awards by search query
  const filteredAwards = awardList.filter((award) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      (award.title && award.title.toLowerCase().includes(q)) ||
      (award.filename && award.filename.toLowerCase().includes(q)) ||
      (award.organisation && award.organisation.toLowerCase().includes(q)) ||
      (award.description && award.description.toLowerCase().includes(q)) ||
      (award.year && award.year.toLowerCase().includes(q)) ||
      award.url.toLowerCase().includes(q)
    );
  });

  // Filter gallery images
  const filteredGallery = galleryImages.filter((img) => {
    const matchesCat =
      galleryCategoryFilter === 'ALL' ||
      img.category.toUpperCase() === galleryCategoryFilter.toUpperCase();
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCat;
    const matchesQ =
      (img.title && img.title.toLowerCase().includes(q)) ||
      img.filename.toLowerCase().includes(q) ||
      img.category.toLowerCase().includes(q);
    return matchesCat && matchesQ;
  });

  const showAwardGallerySection =
    activeTab === 'Awards' || activeTab === 'ALL';
  const showEditorialGallerySection =
    activeTab === 'Editorial Gallery' || activeTab === 'ALL';
  const showInstagramGallerySection =
    activeTab === 'Instagram' || activeTab === 'ALL';

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F1E8] font-sans selection:bg-[#D4AF37] selection:text-[#080808] pb-24">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0E0E0E]/90 backdrop-blur-xl border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#AA7C11] flex items-center justify-between p-2 shadow-lg shadow-[#D4AF37]/10">
              <ImageIcon className="w-6 h-6 text-[#080808]" />
            </div>
            <div>
              <h1 className="font-serif text-xl sm:text-2xl font-light tracking-wide text-[#F5F1E8]">
                Shiny's <span className="text-[#D4AF37] italic font-normal">Image Manager</span>
              </h1>
              <p className="text-xs text-[#A0A0A0] hidden sm:block">
                Direct Admin Upload Dashboard & Dynamic Server Image Synchronization
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSyncServer}
              className="p-2.5 rounded-lg bg-[#181818] hover:bg-[#222] border border-[#2A2A2A] text-[#D4AF37] transition-all flex items-center gap-2 text-xs font-medium cursor-pointer"
              title="Sync Server Images"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Sync Server</span>
            </button>

            {onNavigate && (
              <button
                onClick={() => onNavigate('/')}
                className="px-3 py-2 rounded-lg bg-[#181818] hover:bg-[#222] border border-[#2A2A2A] text-[#F5F1E8] hover:text-[#D4AF37] transition-all text-xs font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <span>Live Site</span>
                <Eye className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={onLogout}
              className="px-3.5 py-2 rounded-lg bg-red-950/30 hover:bg-red-900/40 border border-red-800/40 text-red-300 transition-all text-xs font-medium flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Sync Feedback Toast */}
        {syncFeedback && (
          <div className="mb-6 p-4 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>{syncFeedback}</span>
          </div>
        )}

        {/* Top Intro Banner */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-[#141414] via-[#111111] to-[#181818] border border-[#2A2A2A] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Synchronized Website Image Engine
              </div>
              <h2 className="text-xl sm:text-2xl font-serif text-[#F5F1E8]">
                Upload and replace website media instantly
              </h2>
              <p className="text-xs sm:text-sm text-[#A0A0A0] mt-1 max-w-2xl">
                Select fixed section image slots or upload new photos to the <strong className="text-[#D4AF37]">Dynamic Award Gallery</strong>. Uploaded media automatically updates the live website with no code editing required.
              </p>
            </div>

            {/* Quick Search across section, label, filename, awards */}
            <div className="w-full sm:w-72 relative">
              <Search className="w-4 h-4 text-[#888] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search slot, label, or award..."
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#080808] border border-[#2A2A2A] text-xs text-[#F5F1E8] placeholder-[#666] focus:outline-none focus:border-[#D4AF37]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#FFF]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Categories Tab Navigation */}
        <div className="mb-8 border-b border-[#2A2A2A] overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 min-w-max pb-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat;
              let badgeCount = 0;
              if (cat === 'ALL') {
                badgeCount = ALL_IMAGE_SLOTS.length + awardList.length + galleryImages.length + instagramGallery.length;
              } else if (cat === 'Awards') {
                badgeCount = awardList.length + ALL_IMAGE_SLOTS.filter((s) => s.category === 'Awards').length;
              } else if (cat === 'Editorial Gallery') {
                badgeCount = galleryImages.length;
              } else if (cat === 'Instagram') {
                badgeCount = instagramGallery.length;
              } else {
                badgeCount = ALL_IMAGE_SLOTS.filter((s) => s.category === cat).length;
              }

              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#D4AF37] text-[#080808] font-bold shadow-lg shadow-[#D4AF37]/20 scale-[1.02]'
                      : 'bg-[#121212] hover:bg-[#1C1C1C] text-[#A0A0A0] hover:text-[#F5F1E8] border border-[#222]'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                      isActive ? 'bg-[#080808] text-[#D4AF37]' : 'bg-[#222] text-[#888]'
                    }`}
                  >
                    {badgeCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ==================================================
            1. DYNAMIC AWARD GALLERY SECTION
            ================================================== */}
        {showAwardGallerySection && (
          <div className="mb-12 space-y-6">
            <div className="p-6 rounded-2xl bg-[#111111] border border-[#D4AF37]/40 shadow-xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-[#222] pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#F5F1E8] flex items-center gap-2">
                      AWARD GALLERY
                    </h3>
                    <p className="text-xs text-[#888] mt-0.5 font-mono">
                      Dynamic Award Showcase — Managed separately from fixed website slots
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#080808] border border-[#D4AF37]/30 text-xs font-mono text-[#D4AF37]">
                  <span>{awardList.length} RECOGNITIONS SHOWCASED</span>
                </div>
              </div>

              {/* Upload Award Form */}
              <form onSubmit={handleAwardUploadSubmit} className="space-y-4 bg-[#080808] p-5 rounded-xl border border-[#222]">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider flex items-center gap-2 font-bold">
                    <Plus className="w-4 h-4" /> UPLOAD AWARD IMAGE
                  </h4>
                  <span className="text-[11px] font-mono text-[#666]">
                    Storage: /public/images/awards/
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-[#AAA] mb-1">
                      AWARD TITLE (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      value={awardTitleUpload}
                      onChange={(e) => setAwardTitleUpload(e.target.value)}
                      placeholder="e.g. Master Bridal Hair Stylist"
                      className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-[#2A2A2A] text-xs text-[#F5F1E8] placeholder-[#555] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#AAA] mb-1">
                      ORGANISATION / JOURNAL
                    </label>
                    <input
                      type="text"
                      value={awardOrgUpload}
                      onChange={(e) => setAwardOrgUpload(e.target.value)}
                      placeholder="e.g. London Beauty Honours"
                      className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-[#2A2A2A] text-xs text-[#F5F1E8] placeholder-[#555] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#AAA] mb-1">
                      YEAR
                    </label>
                    <input
                      type="text"
                      value={awardYearUpload}
                      onChange={(e) => setAwardYearUpload(e.target.value)}
                      placeholder="e.g. 2026"
                      className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-[#2A2A2A] text-xs text-[#F5F1E8] placeholder-[#555] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Dropzone */}
                <div
                  className="border-2 border-dashed border-[#333] hover:border-[#D4AF37] rounded-xl p-5 text-center cursor-pointer transition-all bg-[#0E0E0E]"
                  onClick={() => fileInputRefs.current['award']?.click()}
                >
                  <input
                    ref={(el) => (fileInputRefs.current['award'] = el)}
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files) {
                        setSelectedAwardFiles(Array.from(e.target.files));
                      }
                    }}
                  />
                  <FileImage className="w-7 h-7 text-[#D4AF37] mx-auto mb-2 opacity-80" />
                  <p className="text-xs font-medium text-[#F5F1E8]">
                    {selectedAwardFiles.length > 0
                      ? `${selectedAwardFiles.length} award photo(s) selected`
                      : 'Click or drag award photos here to select for Award Gallery'}
                  </p>
                  <p className="text-[11px] text-[#666] mt-1">
                    Auto-saves to /public/images/awards/ as award-timestamp.jpg
                  </p>
                </div>

                {awardSuccessMsg && (
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{awardSuccessMsg}</span>
                  </div>
                )}

                {awardUploadError && (
                  <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{awardUploadError}</span>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-1">
                  {selectedAwardFiles.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSelectedAwardFiles([])}
                      className="px-4 py-2 rounded-xl bg-[#181818] hover:bg-[#222] text-[#AAA] text-xs font-mono cursor-pointer"
                    >
                      Clear Selection
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={selectedAwardFiles.length === 0 || isUploadingAward}
                    className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#AA7C11] disabled:opacity-50 text-[#080808] font-bold text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 shadow-lg shadow-[#D4AF37]/20 cursor-pointer"
                  >
                    {isUploadingAward ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Uploading Award...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>+ UPLOAD AWARD IMAGE</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Display Dynamic Award Cards */}
              <div className="pt-4">
                <h4 className="text-sm font-mono text-[#F5F1E8] uppercase tracking-wider mb-4 flex items-center justify-between">
                  <span>SHOWCASED AWARDS ({filteredAwards.length})</span>
                  <span className="text-xs text-[#777] font-normal">
                    Appears automatically on Awards page
                  </span>
                </h4>

                {isLoadingAwards ? (
                  <div className="py-12 text-center text-[#888] flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-[#D4AF37]" />
                    <span>Loading award gallery...</span>
                  </div>
                ) : filteredAwards.length === 0 ? (
                  <div className="p-8 rounded-xl bg-[#080808] border border-[#222] text-center text-[#666] text-xs font-mono">
                    No award images uploaded yet. Upload award images above.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAwards.map((item) => {
                      const displayFilename = item.filename || item.url.split('/').pop() || 'award.jpg';
                      const formattedDate = item.uploadedAt
                        ? new Date(item.uploadedAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })
                        : 'Stored';

                      return (
                        <div
                          key={item.id}
                          className="rounded-xl bg-[#080808] border border-[#222] overflow-hidden group hover:border-[#D4AF37] transition-all flex flex-col justify-between shadow-lg"
                        >
                          {/* Image Thumbnail */}
                          <div className="relative aspect-[4/3] bg-[#000] overflow-hidden">
                            <img
                              src={item.url}
                              alt={item.title || displayFilename}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop';
                              }}
                            />
                            {item.year && (
                              <div className="absolute top-2.5 left-2.5">
                                <span className="px-2 py-0.5 rounded bg-[#080808]/85 backdrop-blur-md text-[10px] font-mono font-bold text-[#D4AF37] border border-[#D4AF37]/30">
                                  {item.year}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Details & Delete */}
                          <div className="p-4 bg-[#0C0C0C] flex flex-col justify-between flex-1 gap-3 border-t border-[#181818]">
                            <div>
                              <h5 className="text-xs font-bold text-[#F5F1E8] truncate font-serif">
                                {item.title || 'Award Recognition'}
                              </h5>
                              <p className="text-[10px] text-[#D4AF37] truncate font-mono mt-0.5">
                                {item.organisation || displayFilename}
                              </p>
                              <div className="flex items-center justify-between text-[10px] font-mono text-[#666] mt-2 pt-2 border-t border-[#181818]">
                                <span className="truncate max-w-[150px]">{displayFilename}</span>
                                <span>{formattedDate}</span>
                              </div>
                            </div>

                            <button
                              onClick={() => setConfirmDeleteAwardId(item.id)}
                              className="w-full py-2 rounded-lg bg-red-950/30 hover:bg-red-900/50 border border-red-800/40 text-red-300 text-xs font-mono transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete Award Image</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================
            2. FIXED SECTION IMAGE SLOTS GRID
            ================================================== */}
        {!showEditorialGallerySection && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl text-[#F5F1E8]">
                {activeTab === 'ALL' ? 'Website Section Image Slots' : `${activeTab} Section Image Slots`}{' '}
                ({filteredSlots.length})
              </h3>
              <p className="text-xs text-[#888] font-mono">
                Changes persist automatically on server
              </p>
            </div>

            {filteredSlots.length === 0 ? (
              <div className="p-12 rounded-2xl bg-[#111] border border-[#222] text-center text-[#666] font-mono text-xs">
                No fixed image slots found matching your tab/search query.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSlots.map((slot) => {
                  const currentUrl = getSlotImageUrl(slot);
                  const isPending = !!pendingFiles[slot.id];
                  const isUploading = uploadingSlot === slot.id;
                  const status = slotStatusMsg?.id === slot.id ? slotStatusMsg : null;

                  return (
                    <div
                      key={slot.id}
                      className={`rounded-2xl bg-[#111111] border transition-all overflow-hidden flex flex-col justify-between shadow-xl ${
                        isPending
                          ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/30 shadow-[#D4AF37]/5'
                          : 'border-[#222] hover:border-[#333]'
                      }`}
                    >
                      {/* Slot Header */}
                      <div className="p-4 border-b border-[#1C1C1C] flex items-center justify-between bg-[#141414]/50">
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-mono font-bold tracking-wider uppercase">
                              {slot.category}
                            </span>
                            <h4 className="text-xs font-bold font-mono tracking-wide text-[#F5F1E8] truncate">
                              {slot.label}
                            </h4>
                          </div>
                          <p className="text-[11px] text-[#777] truncate mt-1">
                            {slot.description}
                          </p>
                        </div>

                        <span className="text-[10px] font-mono text-[#555] bg-[#0A0A0A] px-2 py-1 rounded border border-[#222] shrink-0">
                          {slot.slot}
                        </span>
                      </div>

                      {/* Image Preview & Upload Zone */}
                      <div className="p-4 space-y-4">
                        <div className="relative aspect-[16/9] rounded-xl bg-[#080808] border border-[#222] overflow-hidden group">
                          <img
                            src={currentUrl}
                            alt={slot.label}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop';
                            }}
                          />

                          {/* Badge Overlay */}
                          <div className="absolute top-2.5 left-2.5 flex items-center gap-2">
                            {isPending ? (
                              <span className="px-2 py-1 rounded-md bg-[#D4AF37] text-[#080808] text-[10px] font-mono font-bold shadow-md">
                                PREVIEWING NEW IMAGE
                              </span>
                            ) : (
                              <span className="px-2 py-1 rounded-md bg-[#080808]/80 backdrop-blur-md text-[#4ADE80] text-[10px] font-mono border border-[#4ADE80]/30 flex items-center gap-1">
                                <Check className="w-3 h-3" /> ACTIVE ON WEBSITE
                              </span>
                            )}
                          </div>

                          {/* Dropzone overlay button */}
                          <button
                            type="button"
                            onClick={() => fileInputRefs.current[slot.id]?.click()}
                            className="absolute inset-0 bg-[#080808]/60 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm flex flex-col items-center justify-center gap-2 text-[#F5F1E8] p-4 text-center cursor-pointer"
                          >
                            <Upload className="w-6 h-6 text-[#D4AF37]" />
                            <span className="text-xs font-mono font-bold">
                              Click or Drag Image to Replace
                            </span>
                          </button>
                        </div>

                        {/* Target Path Info */}
                        <div className="bg-[#0A0A0A] p-3 rounded-xl border border-[#1A1A1A] text-[11px] font-mono space-y-1">
                          <div className="flex items-center justify-between text-[#888]">
                            <span>Target Path:</span>
                            <span className="text-[#D4AF37] truncate max-w-[220px]">
                              {slot.targetPath}
                            </span>
                          </div>
                        </div>

                        {/* File Input */}
                        <input
                          ref={(el) => (fileInputRefs.current[slot.id] = el)}
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileSelectForSlot(slot, e.target.files[0]);
                            }
                          }}
                        />

                        {/* Status Messages */}
                        {status && (
                          <div
                            className={`p-3 rounded-xl text-xs flex items-center gap-2 font-medium ${
                              status.type === 'success'
                                ? 'bg-emerald-950/40 border border-emerald-800/50 text-emerald-300'
                                : 'bg-rose-950/40 border border-rose-800/50 text-rose-300'
                            }`}
                          >
                            {status.type === 'success' ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                            )}
                            <span className="truncate">{status.msg}</span>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="pt-2 flex items-center justify-between gap-3 border-t border-[#1C1C1C]">
                          <button
                            type="button"
                            onClick={() => setConfirmResetSlot(slot)}
                            className="p-2 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] border border-[#222] text-[#888] hover:text-[#FFF] text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                            title="Reset slot to default"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline font-mono text-[11px]">Reset</span>
                          </button>

                          {isPending ? (
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  if (pendingFiles[slot.id]) {
                                    setCropperState({
                                      isOpen: true,
                                      slot,
                                      rawFile: pendingFiles[slot.id].file,
                                      rawPreviewUrl: pendingFiles[slot.id].previewUrl,
                                    });
                                  }
                                }}
                                className="px-2.5 py-1.5 rounded-xl bg-[#1A1A1A] hover:bg-[#252525] border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono cursor-pointer flex items-center gap-1"
                                title="Re-crop or adjust crop frame"
                              >
                                <Crop className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Crop</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleCancelPending(slot.id)}
                                className="px-3 py-1.5 rounded-xl bg-[#1A1A1A] hover:bg-[#252525] text-[#AAA] text-xs font-mono cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSaveSlotImage(slot)}
                                disabled={isUploading}
                                className="px-4 py-1.5 rounded-xl bg-[#D4AF37] hover:bg-[#AA7C11] text-[#080808] font-bold text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-md shadow-[#D4AF37]/20 cursor-pointer"
                              >
                                {isUploading ? (
                                  <>
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    <span>Saving...</span>
                                  </>
                                ) : (
                                  <>
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Save / Replace</span>
                                  </>
                                )}
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => fileInputRefs.current[slot.id]?.click()}
                              className="px-4 py-1.5 rounded-xl bg-[#1A1A1A] hover:bg-[#252525] border border-[#333] text-[#F5F1E8] hover:text-[#D4AF37] hover:border-[#D4AF37]/50 text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>Replace Image</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ==================================================
            3. EDITORIAL GALLERY TAB
            ================================================== */}
        {showEditorialGallerySection && (
          <div className="space-y-8 mt-8">
            {/* Gallery Upload Card */}
            <div className="p-6 rounded-2xl bg-[#111111] border border-[#2A2A2A]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#F5F1E8]">Upload Editorial Gallery Showcase Images</h3>
                  <p className="text-xs text-[#888]">
                    Add new photos to the dynamic editorial gallery collection.
                  </p>
                </div>
              </div>

              <form onSubmit={handleGalleryUploadSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#AAA] mb-1">
                      SELECT CATEGORY
                    </label>
                    <select
                      value={galleryCategoryUpload}
                      onChange={(e) => setGalleryCategoryUpload(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#181818] border border-[#2A2A2A] text-xs text-[#F5F1E8] focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="HAIR">HAIR STYLING</option>
                      <option value="BRIDAL">BRIDAL GLAM</option>
                      <option value="BEAUTY">SKIN & AESTHETICS</option>
                      <option value="MAKEUP">MAKEUP ARTISTRY</option>
                      <option value="TRANSFORMATION">TRANSFORMATION</option>
                      <option value="SALON">SALON SUITE</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#AAA] mb-1">
                      IMAGE TITLE (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      value={galleryTitleUpload}
                      onChange={(e) => setGalleryTitleUpload(e.target.value)}
                      placeholder="e.g. Silk Press & Dimensional Balayage"
                      className="w-full px-3 py-2 rounded-xl bg-[#181818] border border-[#2A2A2A] text-xs text-[#F5F1E8] placeholder-[#555] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* File Dropzone */}
                <div
                  className="border-2 border-dashed border-[#333] hover:border-[#D4AF37] rounded-2xl p-6 text-center cursor-pointer transition-all bg-[#0A0A0A]"
                  onClick={() => fileInputRefs.current['gallery']?.click()}
                >
                  <input
                    ref={(el) => (fileInputRefs.current['gallery'] = el)}
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files) {
                        setSelectedGalleryFiles(Array.from(e.target.files));
                      }
                    }}
                  />
                  <FileImage className="w-8 h-8 text-[#D4AF37] mx-auto mb-2 opacity-80" />
                  <p className="text-xs font-medium text-[#F5F1E8]">
                    {selectedGalleryFiles.length > 0
                      ? `${selectedGalleryFiles.length} file(s) selected`
                      : 'Click or drag images here to select for Editorial Gallery'}
                  </p>
                  <p className="text-[11px] text-[#666] mt-1">
                    Supports JPG, PNG, WEBP up to 15MB each
                  </p>
                </div>

                {gallerySuccessMsg && (
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{gallerySuccessMsg}</span>
                  </div>
                )}

                {galleryUploadError && (
                  <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                    <span>{galleryUploadError}</span>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-2">
                  {selectedGalleryFiles.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSelectedGalleryFiles([])}
                      className="px-4 py-2 rounded-xl bg-[#181818] hover:bg-[#222] text-[#AAA] text-xs font-mono cursor-pointer"
                    >
                      Clear Selection
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={selectedGalleryFiles.length === 0 || isUploadingGallery}
                    className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#AA7C11] disabled:opacity-50 text-[#080808] font-bold text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 shadow-lg shadow-[#D4AF37]/20 cursor-pointer"
                  >
                    {isUploadingGallery ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>Upload to Gallery</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Gallery Filter & Grid */}
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h3 className="font-serif text-xl text-[#F5F1E8]">
                  Existing Editorial Gallery Items ({filteredGallery.length})
                </h3>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                  {['ALL', 'HAIR', 'BRIDAL', 'BEAUTY', 'MAKEUP', 'TRANSFORMATION', 'SALON'].map(
                    (cat) => (
                      <button
                        key={cat}
                        onClick={() => setGalleryCategoryFilter(cat)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-mono tracking-wider transition-all cursor-pointer ${
                          galleryCategoryFilter === cat
                            ? 'bg-[#D4AF37] text-[#080808] font-bold'
                            : 'bg-[#141414] text-[#888] hover:text-[#FFF]'
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  )}
                </div>
              </div>

              {isLoadingGallery ? (
                <div className="py-20 text-center text-[#888] flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-[#D4AF37]" />
                  <span>Loading gallery items...</span>
                </div>
              ) : filteredGallery.length === 0 ? (
                <div className="p-12 rounded-2xl bg-[#111] border border-[#222] text-center text-[#666] font-mono text-xs">
                  No editorial gallery items found.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGallery.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl bg-[#111111] border border-[#222] overflow-hidden group hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between"
                    >
                      <div className="relative aspect-square bg-[#080808] overflow-hidden">
                        <img
                          src={item.url}
                          alt={item.title || 'Gallery Item'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop';
                          }}
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-md bg-[#080808]/80 backdrop-blur-md text-[10px] font-mono font-bold text-[#D4AF37] border border-[#D4AF37]/30">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 flex items-center justify-between gap-3 bg-[#111]">
                        <div className="min-w-0">
                          <h4 className="text-xs font-medium text-[#F5F1E8] truncate">
                            {item.title || item.filename}
                          </h4>
                          <p className="text-[10px] text-[#666] truncate font-mono mt-0.5">
                            {item.filename}
                          </p>
                        </div>

                        <button
                          onClick={() => setConfirmDeleteGalleryId(item.id)}
                          className="p-2 rounded-lg bg-red-950/30 hover:bg-red-900/50 border border-red-800/40 text-red-300 transition-all cursor-pointer"
                          title="Delete Gallery Image"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================================================
            3. DYNAMIC INSTAGRAM GALLERY SECTION
            ================================================== */}
        {showInstagramGallerySection && (
          <div className="mt-12 space-y-6">
            <div className="p-6 rounded-2xl bg-[#111111] border border-[#D4AF37]/40 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-3 pb-4 border-b border-[#222]">
                <div className="p-2.5 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-[#F5F1E8]">Instagram Gallery</h3>
                  <p className="text-xs text-[#888]">
                    Upload photos directly to the website Instagram gallery. Supports unlimited images with persistent storage.
                  </p>
                </div>
              </div>

              <form onSubmit={handleInstagramUploadSubmit} className="mt-6 space-y-4">
                {/* File Dropzone - Simple Upload without Title/Category fields */}
                <div
                  className="border-2 border-dashed border-[#333] hover:border-[#D4AF37] rounded-2xl p-8 text-center cursor-pointer transition-all bg-[#0A0A0A]"
                  onClick={() => fileInputRefs.current['instagram']?.click()}
                >
                  <input
                    ref={(el) => (fileInputRefs.current['instagram'] = el)}
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files) {
                        setSelectedInstagramFiles(Array.from(e.target.files));
                      }
                    }}
                  />
                  <FileImage className="w-10 h-10 text-[#D4AF37] mx-auto mb-3 opacity-80" />
                  <p className="text-sm font-medium text-[#F5F1E8]">
                    {selectedInstagramFiles.length > 0
                      ? `${selectedInstagramFiles.length} file(s) selected`
                      : 'Click or drag images here to select for Instagram Gallery'}
                  </p>
                  <p className="text-xs text-[#666] mt-1">
                    Supports JPG, PNG, WEBP up to 10MB each (Batch or single upload)
                  </p>
                </div>

                {instagramSuccessMsg && (
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{instagramSuccessMsg}</span>
                  </div>
                )}

                {instagramUploadError && (
                  <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                    <span>{instagramUploadError}</span>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-2">
                  {selectedInstagramFiles.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSelectedInstagramFiles([])}
                      className="px-4 py-2 rounded-xl bg-[#181818] hover:bg-[#222] text-[#AAA] text-xs font-mono cursor-pointer"
                    >
                      Clear Selection
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={selectedInstagramFiles.length === 0 || isUploadingInstagram}
                    className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#AA7C11] disabled:opacity-50 text-[#080808] font-bold text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 shadow-lg shadow-[#D4AF37]/20 cursor-pointer"
                  >
                    {isUploadingInstagram ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>Upload to Instagram Gallery</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Instagram Gallery Items Grid */}
            <div className="pt-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-xl text-[#F5F1E8]">
                  Existing Instagram Gallery Items ({instagramGallery.length})
                </h3>
              </div>

              {isLoadingInstagram ? (
                <div className="py-12 text-center text-[#888] flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-[#D4AF37]" />
                  <span>Loading Instagram items...</span>
                </div>
              ) : instagramGallery.length === 0 ? (
                <div className="p-10 rounded-2xl bg-[#111111] border border-[#222] text-center text-[#666] font-mono text-xs">
                  No Instagram gallery images found. Upload your first image above.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {instagramGallery.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="group relative aspect-[4/5] rounded-2xl bg-[#111111] border border-[#222] overflow-hidden hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between"
                    >
                      <img
                        src={item.url}
                        alt="Instagram Gallery Photo"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Delete button overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3">
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteInstagramId(item.id)}
                          className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Confirmation Modal for Resetting Slot */}
      <AnimatePresence>
        {confirmResetSlot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-3 text-amber-400">
                <RotateCcw className="w-6 h-6" />
                <h3 className="font-serif text-lg text-[#F5F1E8]">Reset Image Slot?</h3>
              </div>

              <p className="text-xs text-[#AAA] leading-relaxed">
                Are you sure you want to reset <strong className="text-[#F5F1E8]">{confirmResetSlot.label}</strong> back to its default image?
              </p>

              <div className="p-3 bg-[#080808] border border-[#222] rounded-xl text-xs font-mono text-[#777]">
                Target: {confirmResetSlot.targetPath}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setConfirmResetSlot(null)}
                  className="px-4 py-2 rounded-xl bg-[#1C1C1C] hover:bg-[#282828] text-[#AAA] text-xs font-mono cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleResetSlot(confirmResetSlot)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-[#080808] font-bold text-xs font-mono cursor-pointer"
                >
                  Confirm Reset
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal for Deleting Award Image */}
      <AnimatePresence>
        {confirmDeleteAwardId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#111111] border border-rose-900/40 rounded-2xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-3 text-rose-400">
                <Trash2 className="w-6 h-6" />
                <h3 className="font-serif text-lg text-[#F5F1E8]">Delete Award Image?</h3>
              </div>

              <p className="text-xs text-[#AAA] leading-relaxed">
                Are you sure you want to permanently delete this item from the Award Gallery?
              </p>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setConfirmDeleteAwardId(null)}
                  className="px-4 py-2 rounded-xl bg-[#1C1C1C] hover:bg-[#282828] text-[#AAA] text-xs font-mono cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteAwardItem(confirmDeleteAwardId)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-[#FFF] font-bold text-xs font-mono cursor-pointer"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal for Deleting Editorial Gallery Image */}
      <AnimatePresence>
        {confirmDeleteGalleryId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#111111] border border-rose-900/40 rounded-2xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-3 text-rose-400">
                <Trash2 className="w-6 h-6" />
                <h3 className="font-serif text-lg text-[#F5F1E8]">Delete Gallery Image?</h3>
              </div>

              <p className="text-xs text-[#AAA] leading-relaxed">
                Are you sure you want to permanently delete this item from the editorial showcase gallery?
              </p>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setConfirmDeleteGalleryId(null)}
                  className="px-4 py-2 rounded-xl bg-[#1C1C1C] hover:bg-[#282828] text-[#AAA] text-xs font-mono cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteGalleryItem(confirmDeleteGalleryId)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-[#FFF] font-bold text-xs font-mono cursor-pointer"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal for Deleting Instagram Gallery Image */}
      <AnimatePresence>
        {confirmDeleteInstagramId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#111111] border border-rose-900/40 rounded-2xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-3 text-rose-400">
                <Trash2 className="w-6 h-6" />
                <h3 className="font-serif text-lg text-[#F5F1E8]">Delete Instagram Image?</h3>
              </div>

              <p className="text-xs text-[#AAA] leading-relaxed">
                Are you sure you want to permanently delete this image from the Instagram gallery?
              </p>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setConfirmDeleteInstagramId(null)}
                  className="px-4 py-2 rounded-xl bg-[#1C1C1C] hover:bg-[#282828] text-[#AAA] text-xs font-mono cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteInstagramItem(confirmDeleteInstagramId)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-[#FFF] font-bold text-xs font-mono cursor-pointer"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Image Crop & Edit Modal */}
      <ImageCropModal
        isOpen={cropperState.isOpen}
        imageSrc={cropperState.rawPreviewUrl || ''}
        slotLabel={cropperState.slot?.label || 'Crop & Adjust Image'}
        originalFileName={cropperState.rawFile?.name || 'service-image.jpg'}
        originalFileType={cropperState.rawFile?.type || 'image/jpeg'}
        onCancel={handleCropCancel}
        onCropComplete={handleCropComplete}
      />
    </div>
  );
};
