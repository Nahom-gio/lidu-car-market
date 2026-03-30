"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";

import type { SiteSettingsContent } from "@/data/site-content";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", type: "section", target: "home" },
  { label: "Cars", type: "section", target: "cars" },
  { label: "About", type: "page", target: "/about" },
  { label: "Contact", type: "section", target: "contact" },
] as const;

export function Navbar({ siteSettings }: { siteSettings: SiteSettingsContent }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const logoSrc = siteSettings.logoUrl;

  const scrollTo = (id: string) => {
    const normalizedId = id.toLowerCase();
    if (pathname !== "/") {
      router.push(`/#${normalizedId}`);
      setOpen(false);
      return;
    }

    document.getElementById(normalizedId)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
      <div className="mx-auto max-w-7xl section-padding">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/60 bg-[rgba(250,247,242,0.82)] px-4 py-3 shadow-[0_18px_60px_rgba(60,41,19,0.12)] backdrop-blur-2xl sm:px-5 lg:px-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.4),transparent_45%)]" />

          <div className="relative flex items-center justify-between gap-4">
            <button onClick={() => scrollTo("home")} className="flex items-center gap-3 text-left">
              <div className="rounded-2xl bg-white/95 px-3 py-2 shadow-lg shadow-black/10">
                {logoSrc ? <img src={logoSrc} alt="LIDU logo" className="h-12 w-auto object-contain sm:h-14" /> : null}
              </div>
              <div className="hidden sm:block">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/45">
                  {siteSettings.city}
                </p>
                <p className="text-sm font-semibold text-foreground">{siteSettings.name}</p>
              </div>
            </button>

            <div className="absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full border border-black/5 bg-white/55 p-1.5 shadow-inner shadow-white/40 lg:flex">
              {navLinks.map((link) =>
                link.type === "page" ? (
                  <Link
                    key={link.label}
                    href={link.target}
                    className="rounded-full px-4 py-2 text-sm font-medium text-foreground/68 transition-all duration-200 hover:bg-accent/10 hover:text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.target)}
                    className="rounded-full px-4 py-2 text-sm font-medium text-foreground/68 transition-all duration-200 hover:bg-accent/10 hover:text-foreground"
                  >
                    {link.label}
                  </button>
                ),
              )}
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <a
                href={siteSettings.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/55 px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-white hover:text-foreground"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/12 text-accent">
                  <Phone className="h-4 w-4" />
                </span>
                <span className="text-xs uppercase tracking-[0.12em] text-foreground/55">Call</span>
              </a>
              <Button
                size="sm"
                className="rounded-full bg-accent px-5 text-accent-foreground hover:bg-accent/90"
                onClick={() => scrollTo("cars")}
              >
                View Cars
              </Button>
            </div>

            <button
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/5 bg-white/55 text-foreground transition-colors hover:bg-white lg:hidden"
              onClick={() => setOpen((current) => !current)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {open ? (
            <div className="relative mt-4 animate-fade-up rounded-[1.5rem] border border-black/5 bg-[rgba(255,255,255,0.72)] p-4 lg:hidden">
              <div className="grid gap-2">
                {navLinks.map((link) =>
                  link.type === "page" ? (
                    <Link
                      key={link.label}
                      href={link.target}
                      onClick={() => setOpen(false)}
                      className="rounded-2xl px-4 py-3 text-left text-sm font-medium text-foreground/80 transition-colors hover:bg-accent/10 hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      key={link.label}
                      onClick={() => scrollTo(link.target)}
                      className="rounded-2xl px-4 py-3 text-left text-sm font-medium text-foreground/80 transition-colors hover:bg-accent/10 hover:text-foreground"
                    >
                      {link.label}
                    </button>
                  ),
                )}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-black/10 bg-white/60 text-foreground hover:bg-white hover:text-foreground"
                  asChild
                >
                  <a href={siteSettings.phoneHref}>
                    <Phone className="mr-2 h-3.5 w-3.5" />
                    Call
                  </a>
                </Button>
                <Button
                  size="sm"
                  className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={() => scrollTo("cars")}
                >
                  View Cars
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
