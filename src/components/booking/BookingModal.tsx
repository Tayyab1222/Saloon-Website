import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Calendar, Clock, User, Phone, Mail } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { BrandLogo } from '../common/BrandLogo';
import { CONTACT_CONFIG } from '../../config/contact';
import { SERVICES_LIST } from '../../data/services';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: preselectedServiceId || SERVICES_LIST[0].id,
    date: '',
    time: '11:00 AM',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Valid email is required';
    }
    if (!formData.date) errs.date = 'Preferred date is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const selectedSrv = SERVICES_LIST.find((s) => s.id === formData.service);
      const serviceName = selectedSrv ? selectedSrv.name : formData.service;
      const envKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      const accessKey = (envKey && envKey !== 'YOUR_ACCESS_KEY') ? envKey : 'b5e3e6a3-c161-4db0-9c1e-aa65b432a767';

      const web3FormsPayload = {
        access_key: accessKey,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        service: serviceName,
        preferred_date: formData.date,
        preferred_time: formData.time,
        message: formData.notes.trim(),
        subject: "New Booking Request — Shiny's Hair & Beauty",
        from_name: "Shiny's Hair & Beauty",
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(web3FormsPayload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Record in local store asynchronously
        fetch('/api/booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim(),
            service: serviceName,
            date: formData.date,
            time: formData.time,
            notes: formData.notes.trim(),
          }),
        }).catch(() => {});

        setIsSubmitted(true);
      } else {
        setSubmitError(
          data.message || 'Unable to submit booking request via Web3Forms. Please try again.'
        );
      }
    } catch (err) {
      console.error('Web3Forms submission error:', err);
      setSubmitError('Connection error. Please check your network and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmitError(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: SERVICES_LIST[0].id,
      date: '',
      time: '11:00 AM',
      notes: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl bg-[#080808] border border-[#D4AF37]/30 p-8 sm:p-12 text-[#F5F1E8] shadow-2xl my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-[#A9A39A] hover:text-[#D4AF37] transition-colors"
            aria-label="Close Booking Dialog"
          >
            <X className="w-6 h-6" />
          </button>

          {!isSubmitted ? (
            <div className="space-y-8">
              {/* Header */}
              <div className="text-center space-y-2 flex flex-col items-center">
                <BrandLogo size="md" className="justify-center mb-1 pointer-events-none" />
                <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-mono">
                  LONDON SALON APPOINTMENT
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl tracking-wider font-light uppercase">
                  BOOK YOUR <span className="italic text-[#D4AF37]">MOMENT</span>
                </h2>
                <p className="text-xs text-[#A9A39A] font-light">
                  Select your requested service and preferred date. Our concierge will confirm your private session.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Eleanor Smith"
                      className="w-full bg-[#111111] border border-[#D4AF37]/20 focus:border-[#D4AF37] px-4 py-3 text-sm text-[#F5F1E8] focus:outline-none transition-colors"
                    />
                    {errors.name && <p className="text-[10px] text-red-400 font-mono">{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      PHONE NUMBER *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+44 7000 000000"
                      className="w-full bg-[#111111] border border-[#D4AF37]/20 focus:border-[#D4AF37] px-4 py-3 text-sm text-[#F5F1E8] focus:outline-none transition-colors"
                    />
                    {errors.phone && <p className="text-[10px] text-red-400 font-mono">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="eleanor@example.com"
                      className="w-full bg-[#111111] border border-[#D4AF37]/20 focus:border-[#D4AF37] px-4 py-3 text-sm text-[#F5F1E8] focus:outline-none transition-colors"
                    />
                    {errors.email && <p className="text-[10px] text-red-400 font-mono">{errors.email}</p>}
                  </div>

                  {/* Service Selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium">
                      REQUESTED SERVICE *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#111111] border border-[#D4AF37]/20 focus:border-[#D4AF37] px-4 py-3 text-sm text-[#F5F1E8] focus:outline-none transition-colors"
                    >
                      {SERVICES_LIST.map((srv) => (
                        <option key={srv.id} value={srv.id} className="bg-[#080808]">
                          {srv.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Preferred Date */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      PREFERRED DATE *
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#111111] border border-[#D4AF37]/20 focus:border-[#D4AF37] px-4 py-3 text-sm text-[#F5F1E8] focus:outline-none transition-colors"
                    />
                    {errors.date && <p className="text-[10px] text-red-400 font-mono">{errors.date}</p>}
                  </div>

                  {/* Preferred Time */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      PREFERRED TIME
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-[#111111] border border-[#D4AF37]/20 focus:border-[#D4AF37] px-4 py-3 text-sm text-[#F5F1E8] focus:outline-none transition-colors"
                    >
                      <option value="10:00 AM" className="bg-[#080808]">10:00 AM</option>
                      <option value="11:30 AM" className="bg-[#080808]">11:30 AM</option>
                      <option value="01:30 PM" className="bg-[#080808]">01:30 PM</option>
                      <option value="03:00 PM" className="bg-[#080808]">03:00 PM</option>
                      <option value="05:00 PM" className="bg-[#080808]">05:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-medium">
                    ADDITIONAL NOTES / BRIDAL DETAILS
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Tell us about your event, hair length, or specific bridal requirements..."
                    className="w-full bg-[#111111] border border-[#D4AF37]/20 focus:border-[#D4AF37] px-4 py-3 text-sm text-[#F5F1E8] focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit Error banner if any */}
                {submitError && (
                  <div className="p-3 bg-red-950/60 border border-red-500/40 text-red-200 text-xs font-mono text-center">
                    {submitError}
                  </div>
                )}

                {/* Submit button & WhatsApp option */}
                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 text-xs uppercase tracking-[0.25em] font-semibold text-[#080808] bg-[#D4AF37] hover:bg-[#F5C542] disabled:opacity-60 transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>SENDING REQUEST...</span>
                      </>
                    ) : (
                      <span>CONFIRM REQUEST</span>
                    )}
                  </button>

                  <div className="text-center">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#A9A39A]">OR</span>
                  </div>

                  <a
                    href={CONTACT_CONFIG.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 text-xs uppercase tracking-[0.2em] font-semibold text-[#25D366] border border-[#25D366]/40 hover:border-[#25D366] hover:bg-[#25D366]/10 flex items-center justify-center gap-2.5 transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                    <span>BOOK VIA INSTANT WHATSAPP</span>
                  </a>
                </div>
              </form>
            </div>
          ) : (
            /* Success State */
            <div className="text-center py-8 space-y-6">
              <CheckCircle className="w-16 h-16 text-[#D4AF37] mx-auto" />
              <p className="text-base sm:text-lg tracking-wider text-[#F5F1E8] font-serif font-light uppercase border-b border-[#D4AF37]/20 pb-4 max-w-md mx-auto">
                Thank you. Your booking request has been received.
              </p>
              <p className="text-xs text-[#A9A39A] max-w-md mx-auto font-light leading-relaxed">
                A copy of your booking request has been sent to <span className="text-[#D4AF37]">shinyglow52@gmail.com</span>. Our concierge team will contact you shortly to confirm availability.
              </p>

              <button
                onClick={handleReset}
                className="mt-6 px-8 py-3 text-xs uppercase tracking-[0.2em] font-semibold text-[#080808] bg-[#D4AF37] hover:bg-[#F5C542] transition-colors cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
