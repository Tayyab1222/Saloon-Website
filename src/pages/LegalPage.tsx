import React from 'react';
import { BUSINESS_INFO } from '../config/business';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'cookies';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const titles = {
    privacy: 'PRIVACY POLICY',
    terms: 'TERMS & CONDITIONS',
    cookies: 'COOKIE POLICY',
  };

  return (
    <div className="pt-28 pb-24 bg-[#080808] text-[#F5F1E8]">
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        <div className="border-b border-[#111111] pb-6">
          <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-mono">LEGAL INFORMATION</p>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#F5F1E8] font-light mt-2">
            {titles[type]}
          </h1>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-[#A9A39A] font-light leading-relaxed">
          <p>
            This document sets out the policies for Shiny's Hair & Beauty ("we", "us", "our") in relation to the website {BUSINESS_INFO.websiteUrl} and our London salon services.
          </p>

          <h2 className="font-serif text-xl text-[#F5F1E8] pt-4">1. Information Collection</h2>
          <p>
            When you request an appointment or inquire about our bridal services, we collect your name, email address, phone number, and service preferences strictly for booking fulfillment.
          </p>

          <h2 className="font-serif text-xl text-[#F5F1E8] pt-4">2. Data Confidentiality</h2>
          <p>
            We respect client privacy. Your personal information will never be sold, rented, or shared with third parties for commercial marketing purposes.
          </p>

          <h2 className="font-serif text-xl text-[#F5F1E8] pt-4">3. Appointment Cancellations</h2>
          <p>
            Please provide at least 48 hours notice for cancellations or rescheduling of private salon appointments to allow other clients to access our specialists.
          </p>
        </div>
      </div>
    </div>
  );
};
