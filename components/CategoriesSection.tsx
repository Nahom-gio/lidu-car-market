"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { HomePageContent } from "@/data/site-content";

interface CategoriesSectionProps {
  categoriesContent: HomePageContent["categories"];
}

export function CategoriesSection({ categoriesContent }: CategoriesSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useScrollReveal();
  const router = useRouter();

  const scroll = (direction: number) => {
    scrollRef.current?.scrollBy({ left: direction * 300, behavior: "smooth" });
  };

  const selectCategory = (category: string) => {
    router.replace(`/?body=${encodeURIComponent(category)}`, { scroll: false });
    requestAnimationFrame(() => {
      document.getElementById("cars")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <section className="py-20 lg:py-28" ref={sectionRef}>
      <div className="mx-auto max-w-7xl section-padding">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
              {categoriesContent.eyebrow}
            </p>
            <h2 className="text-3xl font-bold text-foreground lg:text-4xl">{categoriesContent.title}</h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => scroll(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary active:scale-95"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary active:scale-95"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide">
          {categoriesContent.items.map((category, index) => (
            <button
              key={`${category.name}-${category.filterValue}`}
              type="button"
              onClick={() => selectCategory(category.filterValue)}
              className="group w-52 flex-shrink-0 cursor-pointer snap-start sm:w-60"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-xl bg-secondary">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/10" />
              </div>
              <h3 className="text-center font-semibold text-foreground">{category.name}</h3>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
