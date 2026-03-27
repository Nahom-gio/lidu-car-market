"use client";

import { MapPin, MessageCircle, Phone } from "lucide-react";

import type { SiteSettingsContent } from "@/data/site-content";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";

export function ContactSection({ siteSettings }: { siteSettings: SiteSettingsContent }) {
  const sectionRef = useScrollReveal();

  return (
    <section id="contact" className="py-20 lg:py-28" ref={sectionRef}>
      <div className="mx-auto max-w-7xl section-padding">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">Get in Touch</p>
            <h2 className="mb-6 text-3xl font-bold text-foreground lg:text-4xl">Contact Us</h2>
            <p className="mb-8 max-w-md text-muted-foreground">
              Have questions about a vehicle or want to schedule a private viewing? Reach out to us anytime.
            </p>

            <div className="mb-8 space-y-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
                  <Phone className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a
                    href={siteSettings.phoneHref}
                    className="font-semibold text-foreground transition-colors hover:text-accent"
                  >
                    {siteSettings.phoneDisplay}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-semibold text-foreground">{siteSettings.address}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="gap-2 rounded-full bg-accent px-6 text-accent-foreground hover:bg-accent/90"
                asChild
              >
                <a href={siteSettings.phoneHref}>
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 rounded-full px-6" asChild>
                <a href={siteSettings.whatsappHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>

          <div className="aspect-square overflow-hidden rounded-2xl bg-secondary shadow-lg lg:aspect-auto">
            <iframe
              src={siteSettings.mapEmbedHref}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Showroom location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
