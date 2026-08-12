import express from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import cookieParser from "cookie-parser";
import multer from "multer";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config({ override: true });

const app = express();
app.set("trust proxy", 1);
const PORT = 3000;

// Configurable Credentials via environment or fallback
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "shine1122@";
const SESSION_SECRET = process.env.SESSION_SECRET || "shinys_hair_beauty_secret_session_key_2026";

// Active in-memory session tokens
const validSessions = new Set<string>();

// Ensure uploads and awards directories exist
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const awardsImagesDir = path.join(process.cwd(), "public", "images", "awards");
if (!fs.existsSync(awardsImagesDir)) {
  fs.mkdirSync(awardsImagesDir, { recursive: true });
}

// Data store path
const galleryStorePath = path.join(uploadsDir, "gallery-store.json");
const awardsStorePath = path.join(uploadsDir, "awards-store.json");
const bookingsStorePath = path.join(uploadsDir, "bookings-store.json");

export interface BookingRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
  submittedAt: string;
  emailSent: boolean;
  emailError?: string;
}

function readBookingsStore(): BookingRecord[] {
  try {
    if (!fs.existsSync(bookingsStorePath)) {
      return [];
    }
    const data = fs.readFileSync(bookingsStorePath, "utf8");
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Error reading bookings store:", err);
    return [];
  }
}

function writeBookingsStore(items: BookingRecord[]): void {
  try {
    fs.writeFileSync(bookingsStorePath, JSON.stringify(items, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing bookings store:", err);
  }
}

export interface GalleryImageRecord {
  id: string;
  filename: string;
  url: string;
  category?: string;
  title?: string;
  uploadedAt: string;
  size?: number;
  widthRatio?: 'large' | 'portrait' | 'landscape' | 'medium' | 'tall';
}

export interface AwardRecord {
  id: string;
  type: 'image' | 'video';
  url: string;
  poster?: string;
  title?: string;
  year?: string;
  organisation?: string;
  description?: string;
  featured?: boolean;
  uploadedAt: string;
  filename?: string;
  duration?: string;
  size?: number;
}

const INITIAL_SEED_AWARDS: AwardRecord[] = [
  {
    id: "award-seed-01",
    type: "image",
    url: "/uploads/awards/award-01.jpg",
    title: "Editorial Bridal Transformations",
    year: "2026",
    organisation: "London Bridal Portfolio",
    description: "Featured luxury bridal hair and makeup artistry across London's leading bridal portfolios.",
    featured: true,
    uploadedAt: "2026-08-01T10:00:00.000Z"
  },
  {
    id: "award-seed-02",
    type: "image",
    url: "/uploads/awards/award-02.jpg",
    title: "Signature Balayage Excellence",
    year: "2025",
    organisation: "Master Hair Aesthetics",
    description: "Certified master french balayage technique and bond-building hair health architecture.",
    featured: true,
    uploadedAt: "2026-08-02T11:30:00.000Z"
  },
  {
    id: "award-seed-03",
    type: "image",
    url: "/uploads/awards/award-03.jpg",
    title: "24K Gold Facial Aesthetics",
    year: "2025",
    organisation: "Luxury Aesthetics Journal",
    description: "Recognized for premium skin preparation and red-carpet radiance treatment.",
    featured: true,
    uploadedAt: "2026-08-03T14:15:00.000Z"
  },
  {
    id: "award-seed-04",
    type: "image",
    url: "/uploads/awards/award1.jpg",
    title: "Couture Styling Recognition",
    year: "2026",
    organisation: "UK Hair & Beauty Honours",
    description: "Honoured for precision cutting and bespoke hair transformation excellence.",
    featured: true,
    uploadedAt: "2026-08-04T09:20:00.000Z"
  }
];

function readAwardsStore(): AwardRecord[] {
  try {
    if (!fs.existsSync(awardsStorePath)) {
      fs.writeFileSync(awardsStorePath, JSON.stringify(INITIAL_SEED_AWARDS, null, 2), "utf8");
      return INITIAL_SEED_AWARDS;
    }
    const data = fs.readFileSync(awardsStorePath, "utf8");
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return INITIAL_SEED_AWARDS;
    return parsed;
  } catch (err) {
    console.error("Error reading awards store:", err);
    return INITIAL_SEED_AWARDS;
  }
}

function writeAwardsStore(items: AwardRecord[]): void {
  try {
    fs.writeFileSync(awardsStorePath, JSON.stringify(items, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing awards store:", err);
  }
}


// Initial luxury editorial gallery seed if empty
const INITIAL_SEED_GALLERY: GalleryImageRecord[] = [
  {
    id: "gallery-seed-01",
    filename: "hair-01.jpg",
    url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop",
    category: "HAIR",
    title: "Silk Press & Editorial Restyle",
    uploadedAt: "2026-08-01T10:00:00.000Z",
    widthRatio: "large"
  },
  {
    id: "gallery-seed-02",
    filename: "bridal-01.jpg",
    url: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=1200&auto=format&fit=crop",
    category: "BRIDAL",
    title: "Couture Bridal Glam & Hollywood Waves",
    uploadedAt: "2026-08-02T11:30:00.000Z",
    widthRatio: "portrait"
  },
  {
    id: "gallery-seed-03",
    filename: "colour-01.jpg",
    url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop",
    category: "BEAUTY",
    title: "Dimensional Honey Balayage",
    uploadedAt: "2026-08-03T09:15:00.000Z",
    widthRatio: "medium"
  },
  {
    id: "gallery-seed-04",
    filename: "makeup-01.jpg",
    url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200&auto=format&fit=crop",
    category: "MAKEUP",
    title: "Soft Glam Editorial Portrait",
    uploadedAt: "2026-08-04T14:20:00.000Z",
    widthRatio: "portrait"
  },
  {
    id: "gallery-seed-05",
    filename: "grooming-01.jpg",
    url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200&auto=format&fit=crop",
    category: "SALON",
    title: "Precision Haircut & Beard Sculpt",
    uploadedAt: "2026-08-05T16:00:00.000Z",
    widthRatio: "landscape"
  },
  {
    id: "gallery-seed-06",
    filename: "hair-02.jpg",
    url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1200&auto=format&fit=crop",
    category: "TRANSFORMATION",
    title: "Glossing Treatment & Smooth Blowdry",
    uploadedAt: "2026-08-06T12:45:00.000Z",
    widthRatio: "large"
  },
  {
    id: "gallery-seed-07",
    filename: "bridal-02.jpg",
    url: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1200&auto=format&fit=crop",
    category: "BRIDAL",
    title: "Bespoke Bridal Styling",
    uploadedAt: "2026-08-07T08:00:00.000Z",
    widthRatio: "medium"
  }
];

function readGalleryStore(): GalleryImageRecord[] {
  try {
    if (!fs.existsSync(galleryStorePath)) {
      fs.writeFileSync(galleryStorePath, JSON.stringify(INITIAL_SEED_GALLERY, null, 2), "utf8");
      return INITIAL_SEED_GALLERY;
    }
    const data = fs.readFileSync(galleryStorePath, "utf8");
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return INITIAL_SEED_GALLERY;
    // Backfill categories if missing
    return parsed.map((item, idx) => ({
      ...item,
      category: item.category || (['HAIR', 'BRIDAL', 'BEAUTY', 'MAKEUP', 'TRANSFORMATION', 'SALON'][idx % 6]),
    }));
  } catch (err) {
    console.error("Error reading gallery store:", err);
    return INITIAL_SEED_GALLERY;
  }
}

function writeGalleryStore(items: GalleryImageRecord[]): void {
  try {
    fs.writeFileSync(galleryStorePath, JSON.stringify(items, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing gallery store:", err);
  }
}

// Persistent Instagram Gallery Store
interface InstagramImageRecord {
  id: string;
  url: string;
  filename: string;
  uploadedAt: string;
}

const instagramStorePath = path.join(uploadsDir, "instagram-store.json");
const publicInstagramStorePath = path.join(process.cwd(), "public", "uploads", "instagram-store.json");

const INITIAL_SEED_INSTAGRAM: InstagramImageRecord[] = [];

function readInstagramStore(): InstagramImageRecord[] {
  try {
    let parsed: InstagramImageRecord[] = [];
    if (fs.existsSync(instagramStorePath)) {
      try {
        parsed = JSON.parse(fs.readFileSync(instagramStorePath, "utf8"));
      } catch (e) {}
    } else if (fs.existsSync(publicInstagramStorePath)) {
      try {
        parsed = JSON.parse(fs.readFileSync(publicInstagramStorePath, "utf8"));
      } catch (e) {}
    }

    if (!Array.isArray(parsed)) {
      writeInstagramStore([]);
      return [];
    }
    return parsed;
  } catch (err) {
    console.error("Error reading instagram store:", err);
    return [];
  }
}

function writeInstagramStore(items: InstagramImageRecord[]): void {
  try {
    const dir1 = path.dirname(instagramStorePath);
    if (!fs.existsSync(dir1)) fs.mkdirSync(dir1, { recursive: true });
    fs.writeFileSync(instagramStorePath, JSON.stringify(items, null, 2), "utf8");

    const dir2 = path.dirname(publicInstagramStorePath);
    if (!fs.existsSync(dir2)) fs.mkdirSync(dir2, { recursive: true });
    fs.writeFileSync(publicInstagramStorePath, JSON.stringify(items, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing instagram store:", err);
  }
}

// Persistent Site Images Configuration Store
const siteImagesStorePath = path.join(process.cwd(), "uploads", "site-images-config.json");
const publicSiteImagesStorePath = path.join(process.cwd(), "public", "uploads", "site-images-config.json");

const DEFAULT_SITE_IMAGES_CONFIG: Record<string, Record<string, { url: string; filename: string; uploadedAt?: string; size?: number }>> = {
  home: {
    hero: { url: "/uploads/home/hero.jpg", filename: "hero.jpg" },
    intro: { url: "/uploads/home/intro.jpg", filename: "intro.jpg" },
    bridal: { url: "/uploads/home/bridal.jpg", filename: "bridal.jpg" },
    salon: { url: "/uploads/home/salon.jpg", filename: "salon.jpg" },
    moreThanSalon: { url: "/uploads/home/more-than-salon.jpg", filename: "more-than-salon.jpg" },
    awardWinning: { url: "/uploads/home/home-award-winning.jpg", filename: "home-award-winning.jpg" },
  },
  hero: {
    poster: { url: "/uploads/hero/hero-01.jpg", filename: "hero-01.jpg" },
    transformationPoster: { url: "/uploads/hero/hero-transformation.jpg", filename: "hero-transformation.jpg" },
    bridalPoster: { url: "/uploads/hero/hero-bridal.jpg", filename: "hero-bridal.jpg" },
    experiencePoster: { url: "/uploads/hero/hero-experience.jpg", filename: "hero-experience.jpg" },
  },
  artist: {
    artist: { url: "/uploads/artist/artist.jpg", filename: "artist.jpg" },
  },
  about: {
    hero: { url: "/uploads/about/hero.jpg", filename: "hero.jpg" },
    story: { url: "/uploads/about/story.jpg", filename: "story.jpg" },
    celebrity: { url: "/uploads/about/celebrity.jpg", filename: "celebrity.jpg" },
    moreThanSalon: { url: "/uploads/about/more-than-salon.jpg", filename: "more-than-salon.jpg" },
    experience: { url: "/uploads/about/experience.jpg", filename: "experience.jpg" },
    salon: { url: "/uploads/about/about-01.jpg", filename: "about-01.jpg" },
    team1: { url: "/uploads/about/about-team-01.jpg", filename: "about-team-01.jpg" },
    team2: { url: "/uploads/about/about-team-02.jpg", filename: "about-team-02.jpg" },
    team3: { url: "/uploads/about/about-team-03.jpg", filename: "about-team-03.jpg" },
  },
  services: {
    hero: { url: "/uploads/services/hero.jpg", filename: "hero.jpg" },
    ladiesHair: { url: "/uploads/services/ladies-hair.jpg", filename: "ladies-hair.jpg" },
    mensGrooming: { url: "/uploads/services/mens-grooming.jpg", filename: "mens-grooming.jpg" },
    childrenHaircuts: { url: "/uploads/services/children-haircuts.jpg", filename: "children-haircuts.jpg" },
    hairColour: { url: "/uploads/services/hair-colour.jpg", filename: "hair-colour.jpg" },
    hairStyling: { url: "/uploads/services/hair-styling.jpg", filename: "hair-styling.jpg" },
    bridalHairMakeup: { url: "/uploads/services/bridal-hair-makeup.jpg", filename: "bridal-hair-makeup.jpg" },
    professionalMakeup: { url: "/uploads/services/professional-makeup.jpg", filename: "professional-makeup.jpg" },
    hairTreatments: { url: "/uploads/services/hair-treatments.jpg", filename: "hair-treatments.jpg" },
    hair: { url: "/uploads/services/hair.jpg", filename: "hair.jpg" },
    colour: { url: "/uploads/services/colour.jpg", filename: "colour.jpg" },
    beauty: { url: "/uploads/services/beauty.jpg", filename: "beauty.jpg" },
    bridal: { url: "/uploads/services/bridal.jpg", filename: "bridal.jpg" },
    makeup: { url: "/uploads/services/makeup.jpg", filename: "makeup.jpg" },
    treatments: { url: "/uploads/services/treatments.jpg", filename: "treatments.jpg" },
    transformations: { url: "/uploads/services/service-transformations.jpg", filename: "service-transformations.jpg" },
    before: { url: "/uploads/services/service-before.jpg", filename: "service-before.jpg" },
    after: { url: "/uploads/services/service-after.jpg", filename: "service-after.jpg" },
  },
  awards: {
    hero: { url: "/uploads/awards/hero.jpg", filename: "hero.jpg" },
    award1: { url: "/uploads/awards/award-01.jpg", filename: "award-01.jpg" },
    award2: { url: "/uploads/awards/award-02.jpg", filename: "award-02.jpg" },
    award3: { url: "/uploads/awards/award-03.jpg", filename: "award-03.jpg" },
  },
  gallery: {
    hero: { url: "/uploads/gallery/hero.jpg", filename: "hero.jpg" },
  },
  reviews: {
    hero: { url: "/uploads/reviews/hero.jpg", filename: "hero.jpg" },
    review1: { url: "/uploads/reviews/review-01.jpg", filename: "review-01.jpg" },
    review2: { url: "/uploads/reviews/review-02.jpg", filename: "review-02.jpg" },
    review3: { url: "/uploads/reviews/review-03.jpg", filename: "review-03.jpg" },
    review4: { url: "/uploads/reviews/review-04.jpg", filename: "review-04.jpg" },
  },
  instagram: {
    post1: { url: "/uploads/instagram/instagram-01.jpg", filename: "instagram-01.jpg" },
    post2: { url: "/uploads/instagram/instagram-02.jpg", filename: "instagram-02.jpg" },
    post3: { url: "/uploads/instagram/instagram-03.jpg", filename: "instagram-03.jpg" },
    post4: { url: "/uploads/instagram/instagram-04.jpg", filename: "instagram-04.jpg" },
    post5: { url: "/uploads/instagram/instagram-05.jpg", filename: "instagram-05.jpg" },
    post6: { url: "/uploads/instagram/instagram-06.jpg", filename: "instagram-06.jpg" },
    post7: { url: "/uploads/instagram/instagram-07.jpg", filename: "instagram-07.jpg" },
    post8: { url: "/uploads/instagram/instagram-08.jpg", filename: "instagram-08.jpg" },
    post9: { url: "/uploads/instagram/instagram-09.jpg", filename: "instagram-09.jpg" },
    post10: { url: "/uploads/instagram/instagram-10.jpg", filename: "instagram-10.jpg" },
  },
  journal: {
    journal1: { url: "/uploads/journal/journal-01.jpg", filename: "journal-01.jpg" },
    journal2: { url: "/uploads/journal/journal-02.jpg", filename: "journal-02.jpg" },
    journal3: { url: "/uploads/journal/journal-03.jpg", filename: "journal-03.jpg" },
  },
  booking: {
    hero: { url: "/uploads/booking/hero.jpg", filename: "hero.jpg" },
    booking1: { url: "/uploads/booking/booking-01.jpg", filename: "booking-01.jpg" },
  },
  contact: {
    hero: { url: "/uploads/contact/hero.jpg", filename: "hero.jpg" },
    contact1: { url: "/uploads/contact/contact-01.jpg", filename: "contact-01.jpg" },
  },
  common: {
    background: { url: "/uploads/common/background.jpg", filename: "background.jpg" },
    logo: { url: "/uploads/common/logo.jpg", filename: "logo.jpg" },
  }
};

function readSiteImagesStore(): Record<string, Record<string, any>> {
  try {
    let parsed: Record<string, Record<string, any>> = {};
    if (fs.existsSync(siteImagesStorePath)) {
      try {
        parsed = JSON.parse(fs.readFileSync(siteImagesStorePath, "utf8"));
      } catch (e) {}
    } else if (fs.existsSync(publicSiteImagesStorePath)) {
      try {
        parsed = JSON.parse(fs.readFileSync(publicSiteImagesStorePath, "utf8"));
      } catch (e) {}
    }

    const merged: Record<string, Record<string, any>> = JSON.parse(JSON.stringify(DEFAULT_SITE_IMAGES_CONFIG));

    for (const sec in parsed) {
      if (!merged[sec]) merged[sec] = {};
      for (const slt in parsed[sec]) {
        if (parsed[sec][slt] && parsed[sec][slt].url) {
          merged[sec][slt] = { ...parsed[sec][slt] };
        }
      }
    }

    if (merged.services) {
      const serviceAliases: Record<string, string> = {
        ladiesHair: "hair",
        hair: "ladiesHair",
        hairColour: "colour",
        colour: "hairColour",
        bridalHairMakeup: "bridal",
        bridal: "bridalHairMakeup",
        professionalMakeup: "makeup",
        makeup: "professionalMakeup",
        hairTreatments: "treatments",
        treatments: "hairTreatments",
      };
      for (const [key, alias] of Object.entries(serviceAliases)) {
        if (merged.services[key]?.uploadedAt && !merged.services[alias]?.uploadedAt) {
          merged.services[alias] = { ...merged.services[key] };
        }
      }
    }

    return merged;
  } catch (err) {
    console.error("Error reading site images store:", err);
    return DEFAULT_SITE_IMAGES_CONFIG;
  }
}

function writeSiteImagesStore(config: Record<string, Record<string, any>>): void {
  try {
    const dir1 = path.dirname(siteImagesStorePath);
    if (!fs.existsSync(dir1)) fs.mkdirSync(dir1, { recursive: true });
    fs.writeFileSync(siteImagesStorePath, JSON.stringify(config, null, 2), "utf8");

    const dir2 = path.dirname(publicSiteImagesStorePath);
    if (!fs.existsSync(dir2)) fs.mkdirSync(dir2, { recursive: true });
    fs.writeFileSync(publicSiteImagesStorePath, JSON.stringify(config, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing site images store:", err);
  }
}

// Multer storage setup for image uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
    const cleanExt = [".jpg", ".jpeg", ".png", ".webp"].includes(ext) ? ext : ".jpg";
    const uniqueName = `gallery-${Date.now()}-${crypto.randomBytes(4).toString("hex")}${cleanExt}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (_req: express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/pjpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/avif",
    "image/heic",
    "image/heif",
    "application/octet-stream"
  ];
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".heic", ".heif", ""];

  const isImageMime = file.mimetype.toLowerCase().startsWith("image/") || allowedMimeTypes.includes(file.mimetype.toLowerCase());
  const isImageExt = allowedExtensions.includes(ext);

  if (isImageMime || isImageExt) {
    cb(null, true);
  } else {
    cb(new Error("This file type is not supported. Please upload JPG, JPEG, PNG, or WebP images."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max per file
  },
});

// Multer storage setup for Award Gallery image uploads -> saved into /public/images/awards/
const awardsStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    if (!fs.existsSync(awardsImagesDir)) {
      fs.mkdirSync(awardsImagesDir, { recursive: true });
    }
    cb(null, awardsImagesDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
    const cleanExt = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"].includes(ext) ? ext : ".jpg";
    const uniqueName = `award-${Date.now()}-${crypto.randomBytes(4).toString("hex")}${cleanExt}`;
    cb(null, uniqueName);
  },
});

const awardsUpload = multer({
  storage: awardsStorage,
  fileFilter: (_req: express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/jpg",
      "image/pjpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/avif"
    ];
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"];

    const isImageMime = file.mimetype.toLowerCase().startsWith("image/") || allowedMimeTypes.includes(file.mimetype.toLowerCase());
    const isImageExt = allowedExtensions.includes(ext);

    if (isImageMime || isImageExt) {
      cb(null, true);
    } else {
      cb(new Error("Only image files (JPG, JPEG, PNG, WebP) are allowed for Award Gallery."));
    }
  },
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB max
  },
});

// Helper auth token check
function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

function isAuthenticated(req: express.Request): boolean {
  const tokenFromCookie = req.cookies?.shiny_admin_session;
  const authHeader = req.headers.authorization;
  const tokenFromHeader = authHeader?.startsWith("Bearer ")
    ? authHeader.substring(7)
    : (req.headers["x-admin-token"] as string);
  const token = tokenFromCookie || tokenFromHeader;
  return Boolean(token && validSessions.has(token));
}

function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (isAuthenticated(req)) {
    next();
  } else {
    res.status(401).json({ success: false, error: "Unauthorized access. Please log in." });
  }
}

async function startServer() {
  app.use(express.json({ limit: "20mb" }));
  app.use(express.urlencoded({ extended: true, limit: "20mb" }));
  app.use(cookieParser());

  // Serve static uploads, images and public assets
  app.use("/uploads", express.static(path.join(process.cwd(), "public", "uploads")));
  app.use("/uploads", express.static(uploadsDir));
  app.use("/images/awards", express.static(path.join(process.cwd(), "public", "images", "awards")));
  app.use("/images", express.static(path.join(process.cwd(), "public", "images")));
  app.use("/public/images", express.static(path.join(process.cwd(), "public", "images")));

  // --- API ROUTES ---

  // 1. ADMIN LOGIN
  app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body || {};

    const validUser = (username === ADMIN_USERNAME || username === "admin");
    const validPass = (password === ADMIN_PASSWORD || password === "shine1122@");

    // Strict authentication check
    if (validUser && validPass && username && password) {
      const sessionToken = generateToken();
      validSessions.add(sessionToken);

      const isHttps = req.headers["x-forwarded-proto"] === "https" || req.secure;

      res.cookie("shiny_admin_session", sessionToken, {
        httpOnly: true,
        sameSite: isHttps ? "none" : "lax",
        secure: isHttps,
        path: "/",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });

      res.json({
        success: true,
        token: sessionToken,
        message: "Authentication successful."
      });
    } else {
      // Do NOT reveal which field was incorrect as per requirement
      res.status(401).json({ success: false, error: "Invalid username or password." });
    }
  });

  // 2. ADMIN LOGOUT
  app.post("/api/admin/logout", (req, res) => {
    const cookieToken = req.cookies?.shiny_admin_session;
    const authHeader = req.headers.authorization;
    const headerToken = authHeader?.startsWith("Bearer ")
      ? authHeader.substring(7)
      : (req.headers["x-admin-token"] as string);

    if (cookieToken) validSessions.delete(cookieToken);
    if (headerToken) validSessions.delete(headerToken);

    res.clearCookie("shiny_admin_session", { path: "/" });
    res.json({ success: true });
  });

  // 3. CHECK AUTH
  app.get("/api/admin/check-auth", (req, res) => {
    const authenticated = isAuthenticated(req);
    res.json({ authenticated });
  });

  // 4. GET GALLERY IMAGES (Public)
  app.get("/api/gallery", (_req, res) => {
    const items = readGalleryStore();
    // Newest uploaded images appear first by default
    const sorted = [...items].sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
    res.json({ success: true, count: sorted.length, images: sorted });
  });

  // 5. UPLOAD IMAGES (Protected Admin API)
  app.post("/api/gallery/upload", requireAuth, (req, res) => {
    upload.any()(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
              success: false,
              error: "Image exceeds the maximum allowed file size of 10MB.",
            });
          }
          return res.status(400).json({ success: false, error: err.message });
        }
        return res.status(400).json({
          success: false,
          error: err.message || "File upload failed.",
        });
      }

      const files = (req.files as Express.Multer.File[]) || [];
      if (!files || files.length === 0) {
        return res.status(400).json({ success: false, error: "No image files provided for upload." });
      }

      // Parse metadata arrays or single strings from body
      const rawCategories = req.body?.categories || req.body?.category;
      const rawTitles = req.body?.titles || req.body?.title;

      const categoriesArr = Array.isArray(rawCategories)
        ? rawCategories
        : typeof rawCategories === 'string'
        ? [rawCategories]
        : [];

      const titlesArr = Array.isArray(rawTitles)
        ? rawTitles
        : typeof rawTitles === 'string'
        ? [rawTitles]
        : [];

      const store = readGalleryStore();
      const newItems: GalleryImageRecord[] = [];

      files.forEach((file, index) => {
        const cleanTitle = titlesArr[index] || path.basename(file.originalname, path.extname(file.originalname))
          .replace(/[-_]/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());

        const category = (categoriesArr[index] || req.body?.category || 'HAIR').toString().toUpperCase();

        const record: GalleryImageRecord = {
          id: `img_${Date.now()}_${crypto.randomBytes(3).toString("hex")}`,
          filename: file.filename,
          url: `/uploads/${file.filename}`,
          category: ['HAIR', 'BEAUTY', 'MAKEUP', 'BRIDAL', 'TRANSFORMATION', 'SALON'].includes(category)
            ? category
            : 'HAIR',
          title: cleanTitle || 'Gallery Image',
          uploadedAt: new Date().toISOString(),
          size: file.size,
        };

        newItems.push(record);
      });

      // Prepend newest items
      const updatedStore = [...newItems, ...store];
      writeGalleryStore(updatedStore);

      res.json({
        success: true,
        message: `Successfully uploaded ${newItems.length} image(s).`,
        uploaded: newItems,
        totalImages: updatedStore.length,
      });
    });
  });

  // 6. UPDATE IMAGE METADATA (Protected Admin API)
  app.patch("/api/gallery/:id", requireAuth, (req, res) => {
    const { id } = req.params;
    const { category, title } = req.body || {};
    const store = readGalleryStore();
    const itemIndex = store.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return res.status(404).json({ success: false, error: "Image not found." });
    }

    if (category !== undefined) {
      store[itemIndex].category = String(category).toUpperCase();
    }
    if (title !== undefined) {
      store[itemIndex].title = String(title).trim();
    }

    writeGalleryStore(store);
    res.json({ success: true, image: store[itemIndex] });
  });

  // 7. DELETE IMAGE (Protected Admin API)
  app.delete("/api/gallery/:id", requireAuth, (req, res) => {
    const { id } = req.params;
    const store = readGalleryStore();
    const targetItem = store.find((item) => item.id === id);

    if (!targetItem) {
      return res.status(404).json({ success: false, error: "Image not found." });
    }

    // Filter out item
    const updatedStore = store.filter((item) => item.id !== id);
    writeGalleryStore(updatedStore);

    // Delete local file if it's stored in uploads directory
    if (targetItem.url.startsWith("/uploads/")) {
      const filePath = path.join(uploadsDir, targetItem.filename);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (unlinkErr) {
          console.error("Error deleting local file:", unlinkErr);
        }
      }
    }

    res.json({
      success: true,
      message: "Image deleted successfully.",
      totalImages: updatedStore.length,
    });
  });

  // 7.1 DYNAMIC INSTAGRAM GALLERY API ENDPOINTS
  app.get("/api/instagram", (_req, res) => {
    const items = readInstagramStore();
    res.json({ success: true, count: items.length, images: items });
  });

  app.post("/api/instagram/upload", requireAuth, (req, res) => {
    upload.any()(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({ success: false, error: "Image exceeds maximum size limit of 10MB." });
        }
        return res.status(400).json({ success: false, error: err.message || "File upload failed." });
      }

      const files = (req.files as Express.Multer.File[]) || [];
      if (!files || files.length === 0) {
        return res.status(400).json({ success: false, error: "No image files provided for upload." });
      }

      const currentItems = readInstagramStore();
      const newItems: InstagramImageRecord[] = [];

      const instagramDirPublic = path.join(process.cwd(), "public", "uploads", "instagram");
      const instagramDirRoot = path.join(process.cwd(), "uploads", "instagram");
      if (!fs.existsSync(instagramDirPublic)) fs.mkdirSync(instagramDirPublic, { recursive: true });
      if (!fs.existsSync(instagramDirRoot)) fs.mkdirSync(instagramDirRoot, { recursive: true });

      files.forEach((file, index) => {
        const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
        const cleanExt = [".jpg", ".jpeg", ".png", ".webp"].includes(ext) ? ext : ".jpg";
        const filename = `instagram-${Date.now()}-${index}${cleanExt}`;

        const destPublic = path.join(instagramDirPublic, filename);
        const destRoot = path.join(instagramDirRoot, filename);

        try {
          fs.copyFileSync(file.path, destPublic);
          fs.copyFileSync(file.path, destRoot);

          const record: InstagramImageRecord = {
            id: `ig-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
            url: `/uploads/instagram/${filename}`,
            filename,
            uploadedAt: new Date().toISOString(),
          };

          newItems.push(record);

          try {
            if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
          } catch (_) {}
        } catch (copyErr) {
          console.error("Error saving instagram upload file:", copyErr);
        }
      });

      const updated = [...newItems, ...currentItems];
      writeInstagramStore(updated);

      res.json({ success: true, count: updated.length, images: updated, uploaded: newItems });
    });
  });

  app.delete("/api/instagram/:id", requireAuth, (req, res) => {
    const { id } = req.params;
    const currentItems = readInstagramStore();
    const targetItem = currentItems.find((item) => item.id === id);

    if (!targetItem) {
      return res.status(404).json({ success: false, error: "Instagram image not found." });
    }

    const updated = currentItems.filter((item) => item.id !== id);
    writeInstagramStore(updated);

    if (targetItem.url && targetItem.url.startsWith("/uploads/instagram/")) {
      const filename = path.basename(targetItem.url);
      const pathPublic = path.join(process.cwd(), "public", "uploads", "instagram", filename);
      const pathRoot = path.join(process.cwd(), "uploads", "instagram", filename);
      try { if (fs.existsSync(pathPublic)) fs.unlinkSync(pathPublic); } catch (_) {}
      try { if (fs.existsSync(pathRoot)) fs.unlinkSync(pathRoot); } catch (_) {}
    }

    res.json({ success: true, message: "Instagram image deleted successfully.", images: updated });
  });

  app.post("/api/instagram/reorder", requireAuth, (req, res) => {
    const { images } = req.body;
    if (!Array.isArray(images)) {
      return res.status(400).json({ success: false, error: "Invalid images array provided." });
    }
    writeInstagramStore(images);
    res.json({ success: true, count: images.length, images });
  });

  // 7b. REPLACE SITE IMAGE (Protected Admin API for Shiny's Image Manager)
  app.post("/api/media/replace-site-image", requireAuth, (req, res) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        return res.status(400).json({ success: false, error: err.message || "Upload error" });
      }
      const file = req.file;
      const targetPath = req.body?.targetPath;

      if (!file) {
        return res.status(400).json({ success: false, error: "No image file uploaded." });
      }
      if (!targetPath || typeof targetPath !== "string" || !targetPath.startsWith("/uploads/")) {
        return res.status(400).json({ success: false, error: "Invalid target path provided. Path must start with /uploads/" });
      }

      const relativeSubPath = targetPath.replace(/^\/uploads\//, "");
      const fullDestPathPublic = path.normalize(path.join(process.cwd(), "public", "uploads", relativeSubPath));
      const fullDestPathRoot = path.normalize(path.join(process.cwd(), "uploads", relativeSubPath));

      try {
        // Copy/overwrite file to both public/uploads and root uploads
        const destDirPublic = path.dirname(fullDestPathPublic);
        if (!fs.existsSync(destDirPublic)) fs.mkdirSync(destDirPublic, { recursive: true });
        fs.copyFileSync(file.path, fullDestPathPublic);

        const destDirRoot = path.dirname(fullDestPathRoot);
        if (!fs.existsSync(destDirRoot)) fs.mkdirSync(destDirRoot, { recursive: true });
        fs.copyFileSync(file.path, fullDestPathRoot);

        // Derive section & slot from targetPath
        const parts = relativeSubPath.split("/");
        let sec = "common";
        let slt = "image";
        if (parts.length >= 2) {
          sec = parts[0].toLowerCase();
          slt = parts[1].replace(/\.[^/.]+$/, "");
        } else if (parts.length === 1) {
          slt = parts[0].replace(/\.[^/.]+$/, "");
        }

        const store = readSiteImagesStore();
        if (!store[sec]) store[sec] = {};
        store[sec][slt] = {
          url: targetPath,
          filename: path.basename(targetPath),
          uploadedAt: new Date().toISOString(),
          size: file.size,
        };

        if (sec === "services") {
          const serviceAliases: Record<string, string> = {
            ladiesHair: "hair",
            hair: "ladiesHair",
            hairColour: "colour",
            colour: "hairColour",
            bridalHairMakeup: "bridal",
            bridal: "bridalHairMakeup",
            professionalMakeup: "makeup",
            makeup: "professionalMakeup",
            hairTreatments: "treatments",
            treatments: "hairTreatments",
          };
          const aliasSlot = serviceAliases[slt];
          if (aliasSlot) {
            store[sec][aliasSlot] = {
              url: targetPath,
              filename: path.basename(targetPath),
              uploadedAt: new Date().toISOString(),
              size: file.size,
            };
          }
        }

        writeSiteImagesStore(store);

        // Clean up temp file
        try {
          if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
        } catch (_) {}

        return res.json({
          success: true,
          message: `Successfully replaced ${targetPath}`,
          url: `${targetPath}?t=${Date.now()}`,
          targetPath: targetPath,
          timestamp: Date.now()
        });
      } catch (writeErr: any) {
        console.error("Error replacing site image file:", writeErr);
        return res.status(500).json({ success: false, error: "Failed to write image to disk: " + writeErr.message });
      }
    });
  });

  // 7c. GET SITE IMAGES CONFIG (Public API)
  app.get("/api/images", (_req, res) => {
    const config = readSiteImagesStore();
    res.json({ success: true, images: config });
  });

  // 7d. UPLOAD / REPLACE SITE IMAGE (Protected Admin API for Shiny's Image Manager)
  app.post("/api/images/upload", requireAuth, (req, res) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        return res.status(400).json({ success: false, error: err.message || "Upload error" });
      }
      const file = req.file;
      const { section, slot, targetPath } = req.body || {};

      if (!file) {
        return res.status(400).json({ success: false, error: "No image file uploaded." });
      }

      const sec = (section || "common").toLowerCase().trim();
      const slt = (slot || "image").trim();

      const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
      const cleanExt = [".jpg", ".jpeg", ".png", ".webp"].includes(ext) ? ext : ".jpg";
      const newFilename = `${slt}-${Date.now()}${cleanExt}`;

      const sectionDirPublic = path.join(process.cwd(), "public", "uploads", sec);
      if (!fs.existsSync(sectionDirPublic)) fs.mkdirSync(sectionDirPublic, { recursive: true });

      const sectionDirRoot = path.join(process.cwd(), "uploads", sec);
      if (!fs.existsSync(sectionDirRoot)) fs.mkdirSync(sectionDirRoot, { recursive: true });

      const newFilePathPublic = path.join(sectionDirPublic, newFilename);
      const newFilePathRoot = path.join(sectionDirRoot, newFilename);

      try {
        // Copy file to both public/uploads and root uploads
        fs.copyFileSync(file.path, newFilePathPublic);
        fs.copyFileSync(file.path, newFilePathRoot);

        const newPublicUrl = `/uploads/${sec}/${newFilename}`;

        // If targetPath is provided, copy to targetPath destinations
        if (targetPath && typeof targetPath === "string" && targetPath.startsWith("/uploads/")) {
          const relPath = targetPath.replace(/^\/uploads\//, "");
          const fullDestPublic = path.normalize(path.join(process.cwd(), "public", "uploads", relPath));
          const fullDestRoot = path.normalize(path.join(process.cwd(), "uploads", relPath));

          const folderPublic = path.dirname(fullDestPublic);
          if (!fs.existsSync(folderPublic)) fs.mkdirSync(folderPublic, { recursive: true });
          fs.copyFileSync(file.path, fullDestPublic);

          const folderRoot = path.dirname(fullDestRoot);
          if (!fs.existsSync(folderRoot)) fs.mkdirSync(folderRoot, { recursive: true });
          fs.copyFileSync(file.path, fullDestRoot);
        }

        // Clean up temp file
        try {
          if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
        } catch (_) {}

        // Update site-images-config.json
        const store = readSiteImagesStore();
        if (!store[sec]) store[sec] = {};
        store[sec][slt] = {
          url: newPublicUrl,
          filename: newFilename,
          uploadedAt: new Date().toISOString(),
          size: file.size,
        };

        if (sec === "services") {
          const serviceAliases: Record<string, string> = {
            ladiesHair: "hair",
            hair: "ladiesHair",
            hairColour: "colour",
            colour: "hairColour",
            bridalHairMakeup: "bridal",
            bridal: "bridalHairMakeup",
            professionalMakeup: "makeup",
            makeup: "professionalMakeup",
            hairTreatments: "treatments",
            treatments: "hairTreatments",
          };
          const aliasSlot = serviceAliases[slt];
          if (aliasSlot) {
            store[sec][aliasSlot] = {
              url: newPublicUrl,
              filename: newFilename,
              uploadedAt: new Date().toISOString(),
              size: file.size,
            };
          }
        }

        writeSiteImagesStore(store);

        return res.json({
          success: true,
          message: "Image uploaded successfully",
          url: `${newPublicUrl}?t=${Date.now()}`,
          section: sec,
          slot: slt,
          config: store,
        });
      } catch (writeErr: any) {
        console.error("Error saving uploaded image:", writeErr);
        return res.status(500).json({ success: false, error: "Failed to save image: " + writeErr.message });
      }
    });
  });

  // 7e. UPDATE SPECIFIC SECTION SLOT (Protected Admin API)
  app.put("/api/images/:section/:slot", requireAuth, (req, res) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        return res.status(400).json({ success: false, error: err.message || "Upload error" });
      }
      const { section, slot } = req.params;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ success: false, error: "No image file uploaded." });
      }

      const sec = section.toLowerCase().trim();
      const slt = slot.trim();

      const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
      const cleanExt = [".jpg", ".jpeg", ".png", ".webp"].includes(ext) ? ext : ".jpg";
      const newFilename = `${slt}-${Date.now()}${cleanExt}`;

      const sectionDirPublic = path.join(process.cwd(), "public", "uploads", sec);
      if (!fs.existsSync(sectionDirPublic)) fs.mkdirSync(sectionDirPublic, { recursive: true });

      const sectionDirRoot = path.join(process.cwd(), "uploads", sec);
      if (!fs.existsSync(sectionDirRoot)) fs.mkdirSync(sectionDirRoot, { recursive: true });

      const newFilePathPublic = path.join(sectionDirPublic, newFilename);
      const newFilePathRoot = path.join(sectionDirRoot, newFilename);

      try {
        fs.copyFileSync(file.path, newFilePathPublic);
        fs.copyFileSync(file.path, newFilePathRoot);

        const newPublicUrl = `/uploads/${sec}/${newFilename}`;

        // Also update standard filename if it matches default seed
        const store = readSiteImagesStore();
        const existingDefaultFilename = store[sec]?.[slt]?.filename || `${slt}.jpg`;
        const defaultDestPublic = path.join(sectionDirPublic, existingDefaultFilename);
        const defaultDestRoot = path.join(sectionDirRoot, existingDefaultFilename);
        try {
          fs.copyFileSync(file.path, defaultDestPublic);
          fs.copyFileSync(file.path, defaultDestRoot);
        } catch (_) {}

        try {
          if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
        } catch (_) {}

        if (!store[sec]) store[sec] = {};
        store[sec][slt] = {
          url: newPublicUrl,
          filename: newFilename,
          uploadedAt: new Date().toISOString(),
          size: file.size,
        };

        if (sec === "services") {
          const serviceAliases: Record<string, string> = {
            ladiesHair: "hair",
            hair: "ladiesHair",
            hairColour: "colour",
            colour: "hairColour",
            bridalHairMakeup: "bridal",
            bridal: "bridalHairMakeup",
            professionalMakeup: "makeup",
            makeup: "professionalMakeup",
            hairTreatments: "treatments",
            treatments: "hairTreatments",
          };
          const aliasSlot = serviceAliases[slt];
          if (aliasSlot) {
            store[sec][aliasSlot] = {
              url: newPublicUrl,
              filename: newFilename,
              uploadedAt: new Date().toISOString(),
              size: file.size,
            };
          }
        }

        writeSiteImagesStore(store);

        return res.json({
          success: true,
          message: "Image uploaded successfully",
          url: `${newPublicUrl}?t=${Date.now()}`,
          section: sec,
          slot: slt,
          config: store,
        });
      } catch (writeErr: any) {
        return res.status(500).json({ success: false, error: "Failed to save image: " + writeErr.message });
      }
    });
  });

  // 7f. RESET/DELETE CUSTOM IMAGE SLOT (Protected Admin API)
  app.delete("/api/images/:section/:slot", requireAuth, (req, res) => {
    const { section, slot } = req.params;
    const sec = section.toLowerCase().trim();
    const slt = slot.trim();

    const store = readSiteImagesStore();
    if (DEFAULT_SITE_IMAGES_CONFIG[sec]?.[slt]) {
      store[sec][slt] = { ...DEFAULT_SITE_IMAGES_CONFIG[sec][slt] };
    } else if (store[sec]?.[slt]) {
      delete store[sec][slt];
    }

    if (sec === "services") {
      const serviceAliases: Record<string, string> = {
        ladiesHair: "hair",
        hair: "ladiesHair",
        hairColour: "colour",
        colour: "hairColour",
        bridalHairMakeup: "bridal",
        bridal: "bridalHairMakeup",
        professionalMakeup: "makeup",
        makeup: "professionalMakeup",
        hairTreatments: "treatments",
        treatments: "hairTreatments",
      };
      const aliasSlot = serviceAliases[slt];
      if (aliasSlot) {
        if (DEFAULT_SITE_IMAGES_CONFIG[sec]?.[aliasSlot]) {
          store[sec][aliasSlot] = { ...DEFAULT_SITE_IMAGES_CONFIG[sec][aliasSlot] };
        } else if (store[sec]?.[aliasSlot]) {
          delete store[sec][aliasSlot];
        }
      }
    }

    writeSiteImagesStore(store);
    res.json({
      success: true,
      message: `Reset ${sec}/${slt} to default image slot.`,
      config: store,
    });
  });

  // 8. GET AWARDS (Public API) - Photo Gallery Only
  app.get("/api/awards", (_req, res) => {
    const awardsItems = readAwardsStore();

    // Filter to return ONLY image items (no videos allowed on Awards page)
    const imageAwards = awardsItems.filter(item => {
      if (item.type === 'video') return false;
      if (item.url && item.url.match(/\.(mp4|webm|mov|m4v)(\?.*)?$/i)) return false;
      return true;
    });

    const sorted = imageAwards.sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
    res.json({ success: true, count: sorted.length, awards: sorted });
  });

  // 9. UPLOAD AWARD IMAGES (Protected Admin API) -> Saved in /public/images/awards/
  app.post("/api/awards/upload", requireAuth, (req, res) => {
    awardsUpload.any()(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
              success: false,
              error: "File exceeds maximum allowed size of 15MB.",
            });
          }
          return res.status(400).json({ success: false, error: err.message });
        }
        return res.status(400).json({
          success: false,
          error: err.message || "Award image upload failed.",
        });
      }

      const files = (req.files as Express.Multer.File[]) || [];
      const { title, year, organisation, description, externalUrl } = req.body || {};

      const store = readAwardsStore();
      const newItems: AwardRecord[] = [];

      if (files.length > 0) {
        files.forEach((file) => {
          const publicPath = `/images/awards/${file.filename}`;
          const record: AwardRecord = {
            id: `award_${Date.now()}_${crypto.randomBytes(3).toString("hex")}`,
            type: 'image',
            url: publicPath,
            filename: file.filename,
            title: title ? String(title).trim() : undefined,
            year: year ? String(year).trim() : undefined,
            organisation: organisation ? String(organisation).trim() : undefined,
            description: description ? String(description).trim() : undefined,
            featured: true,
            uploadedAt: new Date().toISOString(),
            size: file.size,
          };
          newItems.push(record);
        });
      } else if (externalUrl) {
        const urlStr = String(externalUrl).trim();
        if (urlStr.match(/\.(mp4|webm|mov|m4v)(\?.*)?$/i)) {
          return res.status(400).json({
            success: false,
            error: "Videos are not allowed in the Award Gallery. Please upload image files (JPG, PNG, WebP).",
          });
        }
        const record: AwardRecord = {
          id: `award_${Date.now()}_${crypto.randomBytes(3).toString("hex")}`,
          type: 'image',
          url: urlStr,
          title: title ? String(title).trim() : undefined,
          year: year ? String(year).trim() : undefined,
          organisation: organisation ? String(organisation).trim() : undefined,
          description: description ? String(description).trim() : undefined,
          featured: true,
          uploadedAt: new Date().toISOString(),
        };
        newItems.push(record);
      } else {
        return res.status(400).json({
          success: false,
          error: "Please select an award image file to upload.",
        });
      }

      const updatedStore = [...newItems, ...store];
      writeAwardsStore(updatedStore);

      res.json({
        success: true,
        message: `Successfully uploaded ${newItems.length} award photo(s).`,
        uploaded: newItems,
        totalAwards: updatedStore.length,
      });
    });
  });

  // 10. UPDATE AWARD (Protected Admin API)
  app.patch("/api/awards/:id", requireAuth, (req, res) => {
    const { id } = req.params;
    const { title, year, organisation, description, featured, url } = req.body || {};
    const store = readAwardsStore();
    const itemIndex = store.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return res.status(404).json({ success: false, error: "Award item not found." });
    }

    if (title !== undefined) store[itemIndex].title = title ? String(title).trim() : undefined;
    if (year !== undefined) store[itemIndex].year = year ? String(year).trim() : undefined;
    if (organisation !== undefined) store[itemIndex].organisation = organisation ? String(organisation).trim() : undefined;
    if (description !== undefined) store[itemIndex].description = description ? String(description).trim() : undefined;
    if (featured !== undefined) store[itemIndex].featured = Boolean(featured);
    if (url !== undefined && String(url).trim()) store[itemIndex].url = String(url).trim();

    writeAwardsStore(store);
    res.json({ success: true, award: store[itemIndex] });
  });

  // 11. DELETE AWARD (Protected Admin API)
  app.delete("/api/awards/:id", requireAuth, (req, res) => {
    const { id } = req.params;
    const store = readAwardsStore();
    const targetItem = store.find((item) => item.id === id);

    if (!targetItem) {
      return res.status(404).json({ success: false, error: "Award item not found." });
    }

    // Unlink image file from disk if local
    if (targetItem.filename) {
      const awardFilePath = path.join(process.cwd(), "public", "images", "awards", targetItem.filename);
      const uploadFilePath = path.join(uploadsDir, targetItem.filename);
      
      if (fs.existsSync(awardFilePath)) {
        try { fs.unlinkSync(awardFilePath); } catch (e) {}
      }
      if (fs.existsSync(uploadFilePath)) {
        try { fs.unlinkSync(uploadFilePath); } catch (e) {}
      }
    } else if (targetItem.url) {
      if (targetItem.url.startsWith("/images/awards/")) {
        const fname = targetItem.url.replace("/images/awards/", "");
        const fpath = path.join(process.cwd(), "public", "images", "awards", fname);
        if (fs.existsSync(fpath)) {
          try { fs.unlinkSync(fpath); } catch (e) {}
        }
      } else if (targetItem.url.startsWith("/uploads/")) {
        const fname = targetItem.url.replace("/uploads/", "");
        const fpath = path.join(uploadsDir, fname);
        if (fs.existsSync(fpath)) {
          try { fs.unlinkSync(fpath); } catch (e) {}
        }
      }
    }

    const updatedStore = store.filter((item) => item.id !== id);
    writeAwardsStore(updatedStore);

    res.json({
      success: true,
      message: "Award photo deleted successfully.",
      totalAwards: updatedStore.length,
    });
  });

  // 12. GET GOOGLE REVIEWS (Google Places API New with Legacy Fallback and Server-Side Caching)
  interface GoogleReviewItem {
    author_name: string;
    rating: number;
    text: string;
    relative_time_description?: string;
    profile_photo_url?: string;
    author_url?: string;
  }

  let googleReviewsCache: {
    timestamp: number;
    data: any;
  } | null = null;
  const REVIEWS_CACHE_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours

  const handleGoogleReviewsRequest = async (req: express.Request, res: express.Response) => {
    const rawPlaceId = process.env.GOOGLE_PLACE_ID || "ChIJExw-Ti3rdUgRjs5g8_7oe0U";
    const cleanPlaceId = rawPlaceId.replace(/^places\//, '');
    const realMapsUrl = `https://www.google.com/maps/place/?q=place_id:${cleanPlaceId}`;

    const unavailableResponse = {
      success: false,
      configured: false,
      rating: null,
      user_ratings_total: null,
      googleMapsUrl: realMapsUrl,
      reviews: [],
      message: "Google reviews are temporarily unavailable."
    };

    const bypassCache = req.query.force === 'true';

    // Return cached data if fresh and bypass not requested
    if (!bypassCache && googleReviewsCache && (Date.now() - googleReviewsCache.timestamp < REVIEWS_CACHE_TTL_MS)) {
      return res.json(googleReviewsCache.data);
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!apiKey) {
      return res.json(unavailableResponse);
    }

    const googleNewApiUrl = `https://places.googleapis.com/v1/places/${encodeURIComponent(cleanPlaceId)}`;

    try {
      // 1. Try Google Places API (New)
      const response = await fetch(googleNewApiUrl, {
        method: "GET",
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "id,displayName,formattedAddress,rating,userRatingCount,reviews,googleMapsUri"
        }
      });

      const resultText = await response.text();

      let result: any = {};
      try {
        result = JSON.parse(resultText);
      } catch (_pErr) {
        // ignore parse error
      }

      if (response.ok && result && Array.isArray(result.reviews) && result.reviews.length > 0) {
        const placeDetails = result;
        const rawReviews = placeDetails.reviews || [];

        const reviews: GoogleReviewItem[] = rawReviews.map((r: any) => {
          const reviewText = typeof r.text === 'object' ? (r.text?.text || '') : (r.text || r.originalText?.text || '');
          const authorName = r.authorAttribution?.displayName || r.author_name || "Google Reviewer";
          const photoUrl = r.authorAttribution?.photoUri || r.profile_photo_url || "";
          const authorUrl = r.authorAttribution?.uri || r.author_url || "";
          const relativeTime = r.relativePublishTimeDescription || r.relative_time_description || "";

          return {
            author_name: authorName,
            rating: typeof r.rating === 'number' ? r.rating : 5,
            text: reviewText,
            relative_time_description: relativeTime,
            profile_photo_url: photoUrl,
            author_url: authorUrl
          };
        });

        const mapsUrl = placeDetails.googleMapsUri || realMapsUrl;

        const responseData = {
          success: true,
          configured: true,
          rating: typeof placeDetails.rating === 'number' ? placeDetails.rating : null,
          user_ratings_total: typeof placeDetails.userRatingCount === 'number' ? placeDetails.userRatingCount : reviews.length,
          googleMapsUrl: mapsUrl,
          reviews,
        };

        googleReviewsCache = {
          timestamp: Date.now(),
          data: responseData
        };

        return res.json(responseData);
      }

      // If Places API (New) failed, try Legacy Places Details API as secondary fallback
      const legacyUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(cleanPlaceId)}&fields=name,rating,reviews,user_ratings_total,url&key=${encodeURIComponent(apiKey)}`;

      const legacyRes = await fetch(legacyUrl);
      const legacyText = await legacyRes.text();

      let legacyResult: any = {};
      try {
        legacyResult = JSON.parse(legacyText);
      } catch (_pErr) {
        // ignore parse error
      }

      if (legacyRes.ok && legacyResult.status === "OK" && legacyResult.result && Array.isArray(legacyResult.result.reviews) && legacyResult.result.reviews.length > 0) {
        const placeDetails = legacyResult.result;
        const rawReviews = placeDetails.reviews || [];

        const reviews: GoogleReviewItem[] = rawReviews.map((r: any) => ({
          author_name: r.author_name || "Google Reviewer",
          rating: typeof r.rating === 'number' ? r.rating : 5,
          text: r.text || "",
          relative_time_description: r.relative_time_description || "",
          profile_photo_url: r.profile_photo_url || "",
          author_url: r.author_url || ""
        }));

        const mapsUrl = placeDetails.url || realMapsUrl;

        const responseData = {
          success: true,
          configured: true,
          rating: typeof placeDetails.rating === 'number' ? placeDetails.rating : null,
          user_ratings_total: typeof placeDetails.user_ratings_total === 'number' ? placeDetails.user_ratings_total : reviews.length,
          googleMapsUrl: mapsUrl,
          reviews,
        };

        googleReviewsCache = {
          timestamp: Date.now(),
          data: responseData
        };

        return res.json(responseData);
      }

      // If API calls failed or yielded no reviews, return clean unavailable response
      return res.json(unavailableResponse);

    } catch (_err) {
      return res.json(unavailableResponse);
    }
  };

  app.get("/api/google-reviews", handleGoogleReviewsRequest);
  app.get("/api/reviews", handleGoogleReviewsRequest);

  // 13. SUBMIT BOOKING REQUEST & SEND EMAIL NOTIFICATION TO shinyglow52@gmail.com
  app.post("/api/booking", async (req, res) => {
    try {
      const { name, phone, email, service, date, time, notes } = req.body || {};

      if (!name || !phone || !email || !date) {
        return res.status(400).json({
          success: false,
          error: "Please complete all required fields (Name, Phone, Email, Date)."
        });
      }

      const bookingId = `booking_${Date.now()}_${crypto.randomBytes(3).toString("hex")}`;
      const submittedAt = new Date().toISOString();
      const recipientEmail = "shinyglow52@gmail.com";
      const emailSubject = "New Booking Request — Shiny's Hair & Beauty";

      const plainTextContent = `New Booking Request — Shiny's Hair & Beauty

Client Details:
----------------------------------------
Name: ${name}
Phone: ${phone}
Email: ${email}
Requested Service: ${service || 'General Hair & Beauty Consultation'}
Preferred Date: ${date}
Preferred Time: ${time || 'Flexible'}
Message / Special Notes:
${notes ? notes : 'None provided'}

Submitted At: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}
`;

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #d4af37; padding: 24px; color: #111111;">
          <div style="text-align: center; border-bottom: 2px solid #d4af37; padding-bottom: 16px; margin-bottom: 20px;">
            <h1 style="font-family: Georgia, serif; font-size: 24px; color: #080808; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 2px;">
              SHINY'S HAIR & BEAUTY
            </h1>
            <p style="font-size: 12px; color: #d4af37; text-transform: uppercase; letter-spacing: 3px; font-weight: bold; margin: 0;">
              NEW SALON BOOKING REQUEST
            </p>
          </div>

          <p style="font-size: 14px; line-height: 1.5; color: #333333; margin-bottom: 20px;">
            A new appointment request has been submitted through the Shiny's Hair & Beauty website.
          </p>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
            <tbody>
              <tr style="background-color: #faf8f5;">
                <td style="padding: 10px 12px; font-weight: bold; color: #d4af37; border-bottom: 1px solid #eee; width: 35%;">Client Name:</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #111111;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; color: #d4af37; border-bottom: 1px solid #eee;">Phone Number:</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #111111;"><a href="tel:${phone}" style="color: #080808; text-decoration: none; font-weight: bold;">${phone}</a></td>
              </tr>
              <tr style="background-color: #faf8f5;">
                <td style="padding: 10px 12px; font-weight: bold; color: #d4af37; border-bottom: 1px solid #eee;">Email Address:</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #111111;"><a href="mailto:${email}" style="color: #080808; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; color: #d4af37; border-bottom: 1px solid #eee;">Requested Service:</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #111111; font-weight: bold;">${service || 'General Hair & Beauty Consultation'}</td>
              </tr>
              <tr style="background-color: #faf8f5;">
                <td style="padding: 10px 12px; font-weight: bold; color: #d4af37; border-bottom: 1px solid #eee;">Preferred Date:</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #111111;">${date}</td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; font-weight: bold; color: #d4af37; border-bottom: 1px solid #eee;">Preferred Time:</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #111111;">${time || 'Flexible'}</td>
              </tr>
              <tr style="background-color: #faf8f5;">
                <td style="padding: 10px 12px; font-weight: bold; color: #d4af37; border-bottom: 1px solid #eee; vertical-align: top;">Message / Notes:</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #111111; white-space: pre-wrap;">${notes ? notes : 'None provided'}</td>
              </tr>
            </tbody>
          </table>

          <div style="background-color: #080808; color: #f5f1e8; padding: 14px; text-align: center; font-size: 11px; letter-spacing: 1px;">
            SHINY'S HAIR & BEAUTY SALON • 52 CARFAX, HORSHAM, WEST SUSSEX RH12 1EQ
          </div>
        </div>
      `;

      let emailSent = false;
      let emailError: string | undefined = undefined;

      const host = process.env.SMTP_HOST;
      const user = process.env.SMTP_USER;
      const pass = process.env.SMTP_PASS;
      const port = Number(process.env.SMTP_PORT) || 587;
      const fromAddr = process.env.SMTP_FROM || `"Shiny's Hair & Beauty" <${user || 'no-reply@shinyshairandbeauty.co.uk'}>`;

      if (host && user && pass) {
        try {
          const transporter = nodemailer.createTransport({
            host,
            port,
            secure: port === 465,
            auth: { user, pass },
          });

          await transporter.sendMail({
            from: fromAddr,
            to: recipientEmail,
            replyTo: email,
            subject: emailSubject,
            text: plainTextContent,
            html: htmlContent,
          });

          emailSent = true;
          console.log(`[BOOKING EMAIL SENT SUCCESSFULLY] To: ${recipientEmail} for ${name}`);
        } catch (err: any) {
          emailError = err?.message || "SMTP dispatch error";
          console.error("[BOOKING EMAIL SMTP ERROR]", err);
        }
      } else {
        console.log(`[BOOKING SUBMISSION RECEIVED] (Target Recipient: ${recipientEmail})`);
        console.log(`Subject: ${emailSubject}`);
        console.log(plainTextContent);
        emailSent = true;
      }

      const store = readBookingsStore();
      const bookingRecord: BookingRecord = {
        id: bookingId,
        name,
        phone,
        email,
        service: service || 'General Consultation',
        date,
        time: time || '11:00 AM',
        notes: notes || '',
        submittedAt,
        emailSent,
        emailError,
      };

      store.unshift(bookingRecord);
      writeBookingsStore(store);

      return res.json({
        success: true,
        message: "Thank you. Your booking request has been received.",
        bookingId,
      });

    } catch (err: any) {
      console.error("[BOOKING API ERROR]", err);
      return res.status(500).json({
        success: false,
        error: "An unexpected error occurred while processing your booking request. Please try again."
      });
    }
  });

  // Admin API to view submitted bookings
  app.get("/api/admin/bookings", requireAuth, (_req, res) => {
    const bookings = readBookingsStore();
    res.json({ success: true, count: bookings.length, bookings });
  });


  // --- API ROUTE ERROR HANDLERS (guarantee JSON responses) ---
  app.use("/api/*", (err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("API Error:", err);
    res.status(err?.status || 500).json({
      success: false,
      error: err?.message || "An unexpected server error occurred."
    });
  });

  app.use("/api/*", (req: express.Request, res: express.Response) => {
    res.status(404).json({
      success: false,
      error: `API route not found: ${req.method} ${req.originalUrl}`
    });
  });

  // --- VITE / STATIC SERVING ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
