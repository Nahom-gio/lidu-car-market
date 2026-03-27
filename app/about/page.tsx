import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, CarFront, MapPin } from "lucide-react";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { getAboutPageContent, getSiteSettingsContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about LIDU CAR MARKET, its Addis showroom focus, inventory approach, and transparent vehicle positioning for the Ethiopian market.",
};

export const revalidate = 60;

export default async function AboutPage() {
  const [aboutPage, siteSettings] = await Promise.all([getAboutPageContent(), getSiteSettingsContent()]);
  const pillarIcons = [CarFront, BadgeCheck, Building2];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar siteSettings={siteSettings} />

        <main className="pt-28 sm:pt-32">
          <section className="pb-12">
            <div className="mx-auto max-w-7xl section-padding">
              <div className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-12 text-primary-foreground shadow-[0_24px_80px_rgba(15,23,42,0.22)] sm:px-8 lg:px-12 lg:py-16">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.18),transparent_30%)]" />
                <div className="relative max-w-3xl">
                  <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-primary-foreground/60">
                    {aboutPage.heroEyebrow}
                  </p>
                  <h1 className="mb-6 text-4xl font-bold leading-[0.95] sm:text-5xl lg:text-6xl">
                    {aboutPage.heroTitle}
                  </h1>
                  <p className="mb-8 max-w-2xl text-base text-primary-foreground/72 sm:text-lg">
                    {aboutPage.heroDescription}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      className="rounded-full bg-accent px-6 text-accent-foreground hover:bg-accent/90"
                      asChild
                    >
                      <Link href="/#cars">Browse Inventory</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full border-white/20 bg-white/5 px-6 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
                      asChild
                    >
                      <Link href="/#contact">
                        Contact Us
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-8 lg:py-12">
            <div className="mx-auto max-w-7xl section-padding">
              <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
                <div>
                  <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">Who We Are</p>
                  <h2 className="mb-6 text-3xl font-bold text-foreground lg:text-4xl">
                    {aboutPage.whoWeAreTitle}
                  </h2>
                  <div className="space-y-4 leading-relaxed text-muted-foreground">
                    {aboutPage.whoWeAre.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-border bg-card p-6 shadow-sm">
                  <p className="mb-4 text-sm font-semibold text-foreground">{aboutPage.snapshotTitle}</p>
                  <div className="space-y-4">
                    {aboutPage.snapshotItems.map((item, index) => (
                      <div key={`${item.label}-${index}`} className="rounded-2xl bg-secondary/70 p-4">
                        <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">{item.label}</p>
                        <p className="flex items-center gap-2 font-semibold text-foreground">
                          {index === 0 ? <MapPin className="h-4 w-4 shrink-0 text-accent" /> : null}
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-12 lg:py-16">
            <div className="mx-auto max-w-7xl section-padding">
              <div className="grid gap-6 md:grid-cols-3">
                {aboutPage.pillars.map((pillar, index) => {
                  const Icon = pillarIcons[index] ?? Building2;

                  return (
                  <div key={pillar.title} className="rounded-[1.5rem] border border-border bg-card p-6 shadow-sm">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-foreground">{pillar.title}</h3>
                    <p className="text-muted-foreground">{pillar.description}</p>
                  </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>

        <Footer siteSettings={siteSettings} />
      </div>
    </PageTransition>
  );
}
