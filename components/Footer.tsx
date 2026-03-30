import type { ReactNode } from "react";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";

import type { SiteSettingsContent } from "@/data/site-content";

const socials = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.77 1.52V6.84a4.84 4.84 0 01-1-.15z" />
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "https://t.me/liducarmarket",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
];

const iconByLabel: Record<string, ReactNode> = Object.fromEntries(
  socials.map((social) => [social.label.toLowerCase(), social.icon]),
);

export function Footer({ siteSettings }: { siteSettings: SiteSettingsContent }) {
  const resolvedSocials =
    siteSettings.socialLinks?.map((social) => ({
      ...social,
      icon: iconByLabel[social.label.toLowerCase()] ?? iconByLabel.facebook,
    })) ?? socials;
  const currentYear = new Date().getFullYear();
  const logoSrc = siteSettings.logoUrl;

  return (
    <footer className="relative overflow-hidden border-t border-black/5 bg-[linear-gradient(180deg,rgba(248,244,238,0.96),rgba(239,232,220,0.96))] py-16 text-foreground">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(191,141,72,0.18),transparent_60%)]" />
      <div className="mx-auto max-w-7xl section-padding">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-[rgba(255,252,248,0.8)] p-6 shadow-[0_25px_80px_rgba(66,45,20,0.12)] backdrop-blur md:p-8">
          <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,rgba(191,141,72,0.14),transparent_68%)] lg:block" />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] lg:gap-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-4 rounded-[1.5rem] border border-black/5 bg-white px-4 py-3 shadow-[0_14px_40px_rgba(45,31,15,0.08)]">
                <div className="flex h-20 items-center justify-center rounded-[1.2rem] bg-[linear-gradient(180deg,#fffdf8,#f2eadf)] px-4 shadow-inner shadow-black/5">
                  {logoSrc ? <img src={logoSrc} alt="LIDU logo" className="h-12 w-auto object-contain" /> : null}
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/45">
                    {siteSettings.city}
                  </p>
                  <p className="mt-1 text-xl font-semibold text-foreground">{siteSettings.name}</p>
                </div>
              </div>

              <div className="max-w-xl space-y-3">
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-accent">Lidu Car Market</p>
                <p className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                  Curated vehicles, direct contact, and a showroom that feels easy to trust.
                </p>
                <p className="max-w-lg text-sm leading-7 text-foreground/65">
                  Reach the team, check directions, or follow current listings on social platforms without digging
                  through the site.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 text-sm">
                <a
                  href={siteSettings.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 font-medium text-background transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <Phone className="h-4 w-4" />
                  Call {siteSettings.phoneDisplay}
                </a>
                <a
                  href={siteSettings.directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-5 py-3 font-medium text-foreground transition-colors hover:border-accent/40 hover:text-accent"
                >
                  <MapPin className="h-4 w-4" />
                  Get directions
                </a>
              </div>
            </div>

            <div className="grid gap-5 self-start">
              <div className="rounded-[1.5rem] border border-black/6 bg-[rgba(255,255,255,0.72)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/45">Visit or call</p>
                <div className="mt-4 grid gap-4 text-sm">
                  <div className="rounded-2xl bg-white/80 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-foreground/40">Phone</p>
                    <a
                      href={siteSettings.phoneHref}
                      className="mt-2 inline-block text-base font-semibold text-foreground transition-colors hover:text-accent"
                    >
                      {siteSettings.phoneDisplay}
                    </a>
                  </div>
                  <div className="rounded-2xl bg-white/80 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-foreground/40">Address</p>
                    <p className="mt-2 text-base font-semibold leading-7 text-foreground">{siteSettings.address}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-black/6 bg-[rgba(255,255,255,0.72)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/45">Social</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {resolvedSocials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-2.5 text-sm font-medium text-foreground/72 transition-colors hover:border-accent/40 hover:text-accent"
                    >
                      <span className="text-foreground/75">{social.icon}</span>
                      <span>{social.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-8 flex flex-col gap-3 border-t border-black/8 pt-5 text-sm text-foreground/55 md:flex-row md:items-center md:justify-between">
            <p>&copy; {currentYear} {siteSettings.shortName || siteSettings.name}. All rights reserved.</p>
            <p>Showroom based in {siteSettings.city}.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
