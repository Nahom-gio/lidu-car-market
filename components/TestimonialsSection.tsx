"use client";

import { Quote, Star } from "lucide-react";

import type { TestimonialContent } from "@/data/site-content";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function TestimonialsSection({ testimonials }: { testimonials: TestimonialContent[] }) {
  const sectionRef = useScrollReveal();

  return (
    <section className="bg-secondary/40 py-20 lg:py-28" ref={sectionRef}>
      <div className="mx-auto max-w-7xl section-padding">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">Testimonials</p>
          <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">What Our Clients Say</h2>
          <p className="mx-auto max-w-lg text-muted-foreground">
            Trusted by business owners, diplomats, and families across Addis Ababa.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md lg:p-8 reveal reveal-delay-${(index % 4) + 1}`}
            >
              <Quote className="mb-4 h-8 w-8 text-accent/30" />
              <p className="mb-6 leading-relaxed text-foreground">&quot;{testimonial.text}&quot;</p>
              <div className="mb-4 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className={`h-4 w-4 ${starIndex < testimonial.rating ? "fill-accent text-accent" : "text-border"}`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                  {testimonial.car}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
