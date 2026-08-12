import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { LoadingScreen } from './components/common/LoadingScreen';
import { ScrollProgress } from './components/common/ScrollProgress';
import { GlobalNav } from './components/common/GlobalNav';
import { Footer } from './components/common/Footer';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { BookingModal } from './components/booking/BookingModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { GalleryPage } from './pages/GalleryPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { RecognitionPage } from './pages/RecognitionPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminGalleryPage } from './pages/AdminGalleryPage';
import { AwardsPage } from './pages/AwardsPage';
import { AdminAwardsPage } from './pages/AdminAwardsPage';
import { AdminImageManagerPage } from './pages/AdminImageManagerPage';
import { SiteImagesProvider } from './context/SiteImagesContext';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname || '/');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>();

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    // Disable on touch devices to maintain native high-speed mobile scrolling
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Sync window browser history
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (path === '/book') {
      setIsBookingOpen(true);
      return;
    }
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBookingWithService = (serviceId: string) => {
    setBookingServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const isAdminRoute =
    currentPath === '/admin/login' ||
    currentPath === '/admin' ||
    currentPath === '/admin/gallery' ||
    currentPath === '/admin/media' ||
    currentPath === '/admin/images' ||
    currentPath === '/admin/awards';

  // Render active page view based on path
  const renderActivePage = () => {
    if (currentPath === '/' || currentPath === '') {
      return <HomePage onNavigate={navigateTo} onOpenBooking={() => setIsBookingOpen(true)} />;
    }
    if (currentPath === '/about') {
      return <AboutPage onOpenBooking={() => setIsBookingOpen(true)} onNavigate={navigateTo} />;
    }
    if (currentPath === '/services' || currentPath.startsWith('/services/')) {
      const categoryFromPath = currentPath.replace('/services/', '').replace('/services', '') || 'all';
      return (
        <ServicesPage
          initialCategory={categoryFromPath}
          onNavigate={navigateTo}
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenBookingWithService={handleOpenBookingWithService}
        />
      );
    }
    if (currentPath === '/gallery') {
      return <GalleryPage onNavigate={navigateTo} />;
    }
    if (currentPath === '/awards' || currentPath === '/recognition') {
      return <AwardsPage onNavigate={navigateTo} onOpenBooking={() => setIsBookingOpen(true)} />;
    }
    if (currentPath === '/admin/login') {
      return (
        <AdminLoginPage
          onLoginSuccess={() => navigateTo('/admin/gallery')}
          onNavigate={navigateTo}
        />
      );
    }
    if (
      currentPath === '/admin' ||
      currentPath === '/admin/gallery' ||
      currentPath === '/admin/media' ||
      currentPath === '/admin/images'
    ) {
      return (
        <AdminImageManagerPage
          onLogout={() => navigateTo('/admin/login')}
          onNavigate={navigateTo}
        />
      );
    }
    if (currentPath === '/admin/awards') {
      return (
        <AdminAwardsPage
          onLogout={() => navigateTo('/admin/login')}
          onNavigate={navigateTo}
        />
      );
    }
    if (currentPath === '/reviews') {
      return <ReviewsPage onOpenBooking={() => setIsBookingOpen(true)} />;
    }
    if (currentPath === '/contact') {
      return <ContactPage onOpenBooking={() => setIsBookingOpen(true)} />;
    }
    if (currentPath === '/privacy-policy') {
      return <LegalPage type="privacy" />;
    }
    if (currentPath === '/terms-and-conditions') {
      return <LegalPage type="terms" />;
    }
    if (currentPath === '/cookie-policy') {
      return <LegalPage type="cookies" />;
    }

    return <NotFoundPage onGoHome={() => navigateTo('/')} />;
  };

  return (
    <SiteImagesProvider>
      <div className="relative min-h-screen bg-[#080808] text-[#F5F1E8] font-sans selection:bg-[#D4AF37] selection:text-[#080808]">
        {/* Loading Screen Overlay */}
        <LoadingScreen />

        {/* Top Scroll Progress Indicator */}
        {!isAdminRoute && <ScrollProgress />}

        {/* Header Global Navigation */}
        {!isAdminRoute && (
          <GlobalNav
            currentPath={currentPath}
            onNavigate={navigateTo}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        )}

        {/* Active Route Content */}
        <main className="w-full min-h-screen">
          {renderActivePage()}
        </main>

        {/* Footer */}
        {!isAdminRoute && (
          <Footer onNavigate={navigateTo} onOpenBooking={() => setIsBookingOpen(true)} />
        )}

        {/* Floating WhatsApp Chat Button */}
        {!isAdminRoute && <FloatingWhatsApp />}

        {/* Appointment Booking Modal */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          preselectedServiceId={bookingServiceId}
        />
      </div>
    </SiteImagesProvider>
  );
}
