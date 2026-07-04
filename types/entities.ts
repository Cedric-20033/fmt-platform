// types/entities.ts

import type { Role } from "./rbac";

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: Role;
  locale: "fr" | "en" | "de";
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  slug: string;
  status: "active" | "completed" | "planned";
  cover_image_url: string | null;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  beneficiaries_count: number | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  translations?: ProjectTranslation[];
}

export interface ProjectTranslation {
  id: string;
  project_id: string;
  locale: "fr" | "en" | "de";
  title: string;
  description: string;
  objectives: string | null;
}

export interface NewsArticle {
  id: string;
  slug: string;
  cover_image_url: string | null;
  published_at: string | null;
  is_published: boolean;
  author_id: string | null;
  locale: "fr" | "en" | "de";
  title: string;
  excerpt: string;
  body: string;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  slug: string;
  locale: "fr" | "en" | "de";
  is_online: boolean;
  is_free: boolean;
  registration_url: string | null;

  title: string;
  theme: string | null;        // sous-titre / thématique
  description: string;

  location_name: string | null;   // "VMDO Dortmund"
  location_address: string | null; // "Zur Vielfalt 21, 44147 Dortmund"

  dates: EventDateSlot[];
  schedule: EventScheduleItem[];
  contacts: EventContact[];
  partners: EventPartner[];
  media: MediaAsset[];

  created_at: string;
  updated_at: string;
}

export interface Donation {
  id: string;
  donor_id: string | null;
  amount_cents: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded";
  payment_provider: string | null;
  payment_reference: string | null;
  is_anonymous: boolean;
  message: string | null;
  created_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  resource_type: string;
  resource_id: string | null;
  metadata: Record<string, unknown> | null;
  ip_address: string | null;
  created_at: string;
}

export type MediaProvider = "cloudinary" | "s3" | "other";

export interface MediaAsset {
  id: string;
  type: "image" | "video";
  provider: MediaProvider;
  storage_ref: string;   // identifiant chez le prestataire (public_id Cloudinary, clé S3...)
  alt: string;
  caption?: string | null;
  is_cover: boolean;
  order: number;
  width: number | null;
  height: number | null;
  duration_seconds: number | null;
}

export interface EventDateSlot {
  id: string;
  date: string;        // ISO date, ex: "2026-07-18"
  start_time: string;  // "09:00"
  end_time: string;    // "18:00"
  label: string | null; // ex: "Jour 1" si événement multi-jours
}

export interface EventScheduleItem {
  id: string;
  order: number;
  part_label: string;   // "Panel 1", "Atelier"...
  time_range: string;   // "10:30 – 15:00"
  title: string;
  description: string | null;
}

export interface EventContact {
  type: "email" | "phone";
  value: string;
  label: string | null; // ex: "Inscriptions"
}

export interface EventPartner {
  name: string;
  logo: MediaAsset | null; // pas de vocabulaire Cloudinary ici — juste une référence générique
}


export interface GalleryMediaItem {
  id: string;
  type: "image" | "video";
  provider: MediaProvider;
  storage_ref: string;
  alt: string;
  caption: string | null;
  width: number | null;
  height: number | null;
  duration_seconds: number | null;
  created_at: string; // date d'upload — sert au tri
}