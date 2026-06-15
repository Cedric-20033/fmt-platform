import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/animations/Reveal";
import { Typewriter } from "@/components/animations/TypeWriter";

/** SVG brand icons — lucide-react does not include social platform icons. */
const IconFacebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const IconLinkedin = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

/** X (formerly Twitter) */
const IconX = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const IconYoutube = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const SOCIAL_LINKS = [
  { key: "facebook",  href: "https://facebook.com/fmtev",            Icon: IconFacebook  },
  { key: "instagram", href: "https://instagram.com/fmtev",           Icon: IconInstagram },
  { key: "linkedin",  href: "https://linkedin.com/company/fmtev",    Icon: IconLinkedin  },
  { key: "x",         href: "https://x.com/fmtev",                   Icon: IconX         },
  { key: "youtube",   href: "https://youtube.com/@fmtev",            Icon: IconYoutube   },
] as const;

export function ContactSection() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="py-24 bg-[#f9f7f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-14">
          <Badge variant="default" className="mb-4">{t("label")}</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            <Typewriter text={t("title")}  speed={50} />
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl">{t("description")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Info cards — 2 columns on the left */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">

            <Reveal from="up" delay={0.1}>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#e6f4f4] flex items-center justify-center mb-4">
                <MapPin size={20} className="text-[#2b8a8a]" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{t("address_label")}</h3>
              <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">
                {t("address_value")}
              </p>
            </div>
            </Reveal>

            <Reveal from="up" delay={0.1}>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#e6f4f4] flex items-center justify-center mb-4">
                <Phone size={20} className="text-[#2b8a8a]" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{t("phone_label")}</h3>
              <a
                href={`tel:${t("phone_value").replace(/\s/g, "")}`}
                className="text-sm text-[#2b8a8a] font-medium hover:underline block"
              >
                {t("phone_value")}
              </a>
              <a
                href={`tel:${t("phone_value_2").replace(/\s/g, "")}`}
                className="text-sm text-gray-500 hover:text-[#2b8a8a] transition-colors block mt-1"
              >
                {t("phone_value_2")}
              </a>
            </div>
            </Reveal>

            <Reveal from="up" delay={0.1}>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#fff4e6] flex items-center justify-center mb-4">
                <Mail size={20} className="text-[#f39237]" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{t("email_label")}</h3>
              <a
                href={`mailto:${t("email_value")}`}
                className="text-sm text-[#2b8a8a] font-medium hover:underline block"
              >
                {t("email_value")}
              </a>
              <a
                href={`mailto:${t("email_value_2")}`}
                className="text-sm text-gray-500 hover:text-[#2b8a8a] transition-colors block mt-1"
              >
                {t("email_value_2")}
              </a>
            </div>
            </Reveal>

            <Reveal from="up" delay={0.1}>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#e6f4f4] flex items-center justify-center mb-4">
                <Clock size={20} className="text-[#2b8a8a]" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{t("hours_label")}</h3>
              <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">
                {t("hours_value")}
              </p>
            </div>
            </Reveal>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">

            <div className="bg-[#1a5c5c] rounded-2xl p-6 text-white">
              <h3 className="text-sm font-semibold mb-1">{t("social_label")}</h3>
              <p className="text-xs text-white/60 mb-5">{t("social_description")}</p>
              <div className="flex flex-wrap gap-3">
                {SOCIAL_LINKS.map(({ key, href, Icon }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={key}
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#f39237] flex items-center justify-center transition-colors duration-200"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex-1">
              <p className="text-xs text-gray-400 leading-relaxed">{t("legal_note")}</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}