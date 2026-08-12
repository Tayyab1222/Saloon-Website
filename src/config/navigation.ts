export interface NavLink {
  label: string;
  path: string;
}

export const MAIN_NAV_LINKS: NavLink[] = [
  { label: "HOME", path: "/" },
  { label: "SERVICES", path: "/services" },
  { label: "GALLERY", path: "/gallery" },
  { label: "AWARDS", path: "/awards" },
  { label: "REVIEWS", path: "/reviews" },
  { label: "ABOUT", path: "/about" },
  { label: "CONTACT", path: "/contact" },
];

export const FOOTER_QUICK_LINKS: NavLink[] = [
  { label: "Our Philosophy", path: "/about" },
  { label: "Signature Services", path: "/services" },
  { label: "Editorial Gallery", path: "/gallery" },
  { label: "Awards & Recognition", path: "/awards" },
  { label: "Client Love", path: "/reviews" },
  { label: "Book Appointment", path: "/book" },
];

export const FOOTER_LEGAL_LINKS: NavLink[] = [
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Terms & Conditions", path: "/terms-and-conditions" },
  { label: "Cookie Policy", path: "/cookie-policy" },
];
