// lib/data/static/events.data.ts
import type { Event } from "@/types/entities";

const SHARED_DATES = [
  {
    id: "date_1",
    date: "2026-07-18",
    start_time: "09:00",
    end_time: "18:00",
    label: null,
  },
];

const SHARED_CONTACTS = [
  { type: "email" as const, value: "Info.fmt@web.de", label: null },
  { type: "phone" as const, value: "+49 176 43831595", label: null },
];

const SHARED_PARTNERS = [
  { name: "FMT e.V.", logo_url: "/images/events/mentale-gesundheit-2026/logo-fmt.png" },
  { name: "SOCABEL", logo_url: "/images/events/mentale-gesundheit-2026/logo-socabel.png" },
  { name: "EXELL-AFRIKA e.V. / AiDO", logo_url: "/images/events/mentale-gesundheit-2026/logo-exell-afrika.png" },
];

const SHARED_MEDIA = [
  {
    id: "media_1",
    type: "image" as const,
    url: "/images/events/mentale-gesundheit-2026/affiche.jpeg",
    alt: "Affiche de la conférence sur la santé mentale, 18 juillet 2026",
    is_cover: true,
    order: 1,
  },
  {
    id: "media_2",
    type: "image" as const,
    url: "/images/events/mentale-gesundheit-2026/programme.jpeg",
    alt: "Programme détaillé de la conférence",
    is_cover: false,
    order: 2,
  },
];

export const staticEvents: Event[] = [
  // ---------- FR ----------
  {
    id: "evt_mentale_gesundheit_2026",
    slug: "conference-sante-mentale-2026",
    locale: "fr",
    is_online: false,
    is_free: true,
    registration_url: null,
    title: "Santé mentale dans la communauté afrodescendante",
    theme: "Comprendre, connecter, renforcer",
    description:
      "Une journée de conférences et d'ateliers consacrée à la santé mentale au sein de la communauté afrodiasporique, avec un focus sur les tensions intergénérationnelles, la charge parentale et les enfants incompris.",
    location_name: "VMDO Dortmund",
    location_address: "Zur Vielfalt 21, 44147 Dortmund",
    dates: SHARED_DATES,
    schedule: [
      {
        id: "sch_1",
        order: 1,
        part_label: "Partie 1 — Panel 1",
        time_range: "10:30 – 15:00",
        title: "Santé mentale : un sujet tabou",
        description: "La santé mentale des Afro-allemands, un problème urgent.",
      },
      {
        id: "sch_2",
        order: 2,
        part_label: "Partie 2 — Panel 2",
        time_range: "10:30 – 15:00",
        title: "Baby blues et santé mentale",
        description: "Burn-out parental et santé mentale.",
      },
      {
        id: "sch_3",
        order: 3,
        part_label: "Partie 3 — Ateliers",
        time_range: "15:00 – 19:00",
        title: "Neurosciences · Ergothérapie · Lach-Yoga",
        description: "Atelier créatif autour de la parentalité.",
      },
    ],
    contacts: SHARED_CONTACTS,
    partners: SHARED_PARTNERS,
    media: SHARED_MEDIA,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },

  // ---------- DE ----------
  {
    id: "evt_mentale_gesundheit_2026",
    slug: "conference-sante-mentale-2026",
    locale: "de",
    is_online: false,
    is_free: true,
    registration_url: null,
    title: "Mentale Gesundheit in der afrodiasporischen Community",
    theme: "Verstehen, Verbinden, Stärken",
    description:
      "Ein Konferenztag rund um die mentale Gesundheit in der afrodiasporischen Community, mit Fokus auf Spannungen zwischen den Generationen, elterliche Belastung und unverstandene Kinder.",
    location_name: "VMDO Dortmund",
    location_address: "Zur Vielfalt 21, 44147 Dortmund",
    dates: SHARED_DATES,
    schedule: [
      {
        id: "sch_1",
        order: 1,
        part_label: "Teil 1 — Panel 1",
        time_range: "10:30 – 15:00",
        title: "Psychische Gesundheit: Ein Tabuthema",
        description: "Psychische Gesundheit der Afrodeutschen: Ein dringendes Problem.",
      },
      {
        id: "sch_2",
        order: 2,
        part_label: "Teil 2 — Panel 2",
        time_range: "10:30 – 15:00",
        title: "Baby Blues und psychische Gesundheit",
        description: "Burnout und psychische Gesundheit.",
      },
      {
        id: "sch_3",
        order: 3,
        part_label: "Teil 3 — Workshops",
        time_range: "15:00 – 19:00",
        title: "Neurowissenschaften · Ergotherapie · Lach-Yoga",
        description: "Kreativworkshop rund um die Elternschaft.",
      },
    ],
    contacts: SHARED_CONTACTS,
    partners: SHARED_PARTNERS,
    media: SHARED_MEDIA,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },

  // ---------- EN ----------
  {
    id: "evt_mentale_gesundheit_2026",
    slug: "conference-sante-mentale-2026",
    locale: "en",
    is_online: false,
    is_free: true,
    registration_url: null,
    title: "Mental Health in the Afro-diaspora Community",
    theme: "Understand, Connect, Empower",
    description:
      "A full day of talks and workshops on mental health within the Afro-diaspora community, focusing on intergenerational tension, parental strain, and misunderstood children.",
    location_name: "VMDO Dortmund",
    location_address: "Zur Vielfalt 21, 44147 Dortmund, Germany",
    dates: SHARED_DATES,
    schedule: [
      {
        id: "sch_1",
        order: 1,
        part_label: "Part 1 — Panel 1",
        time_range: "10:30am – 3:00pm",
        title: "Mental health: a taboo subject",
        description: "Mental health among Afro-Germans: an urgent issue.",
      },
      {
        id: "sch_2",
        order: 2,
        part_label: "Part 2 — Panel 2",
        time_range: "10:30am – 3:00pm",
        title: "Baby blues and mental health",
        description: "Parental burnout and mental health.",
      },
      {
        id: "sch_3",
        order: 3,
        part_label: "Part 3 — Workshops",
        time_range: "3:00pm – 7:00pm",
        title: "Neuroscience · Occupational therapy · Laughter yoga",
        description: "Creative workshop around parenting.",
      },
    ],
    contacts: SHARED_CONTACTS,
    partners: SHARED_PARTNERS,
    media: SHARED_MEDIA,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
];