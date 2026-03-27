"use client";

import { Eye } from "lucide-react";

import type { HomePageContent } from "@/data/site-content";
import { Button } from "@/components/ui/button";

export function HeroSection({ hero }: { hero: HomePageContent["hero"] }) {
  return (
    <section id="home" className="relative flex min-h-screen items-end overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-primary">
          <img
            src={hero.image}
            alt=""
            aria-hidden="true"
            className="h-full w-full scale-110 object-cover opacity-30 blur-sm"
          />
        </div>
        <img
          src={hero.image}
          alt={hero.imageAlt}
          className="h-full w-full object-contain object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl pb-20 pt-32 section-padding lg:pb-28">
        <div className="max-w-2xl">
          <p className="mb-4 animate-fade-up text-sm font-medium uppercase tracking-widest text-accent">
            {hero.eyebrow}
          </p>
          <h1
            className="mb-6 whitespace-pre-line text-4xl font-bold leading-[0.95] text-primary-foreground animate-fade-up sm:text-5xl lg:text-7xl"
            style={{ animationDelay: "100ms" }}
          >
            {hero.title}
          </h1>
          <p
            className="mb-8 max-w-lg text-base text-primary-foreground/70 animate-fade-up sm:text-lg"
            style={{ animationDelay: "200ms" }}
          >
            {hero.description}
          </p>
          <div className="flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "300ms" }}>
            <Button
              size="lg"
              className="gap-2 rounded-full bg-accent px-6 text-accent-foreground hover:bg-accent/90"
              onClick={() => document.getElementById("cars")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Eye className="h-4 w-4" />
              {hero.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
