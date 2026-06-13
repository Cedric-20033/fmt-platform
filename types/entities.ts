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
  event_date: string;
  end_date: string | null;
  location: string | null;
  is_online: boolean;
  registration_url: string | null;
  cover_image_url: string | null;
  locale: "fr" | "en" | "de";
  title: string;
  description: string;
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
