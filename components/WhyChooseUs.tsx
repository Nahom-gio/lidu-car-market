"use client";

import { Award, FileCheck, Headphones, ShieldCheck, TrendingUp, Wrench } from "lucide-react";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Verified Inspections",
    description:
      "Every vehicle undergoes a thorough multi-point inspection before listing. We verify condition, paperwork, and mileage accuracy.",
  },
  {
    icon: FileCheck,
    title: "Transparent Documentation",
    description:
      "Full duty status, import records, and ownership history provided upfront - no hidden surprises after purchase.",
  },
  {
    icon: Wrench,
    title: "After-Sale Support",
    description:
      "We do not disappear after the sale. Our team assists with registration, insurance, and any post-purchase needs.",
  },
  {
    icon: Headphones,
    title: "Dedicated Advisors",
    description:
      "Get a personal vehicle advisor who understands the Ethiopian market and helps you find the right car for your needs.",
  },
  {
    icon: Award,
    title: "Premium Selection Only",
    description:
      "We curate only the best - no flood-damaged or accident vehicles. Every car meets our strict quality standards.",
  },
  {
    icon: TrendingUp,
    title: "Fair Market Pricing",
    description:
      "Our prices reflect real Addis Ababa market conditions. No inflated markups - just honest, competitive pricing.",
  },
];

export function WhyChooseUs() {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-20 lg:py-28" ref={sectionRef}>
      <div className="mx-auto max-w-7xl section-padding">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">Why Us</p>
          <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">why choose us</h2>
          <p className="mx-auto max-w-lg text-muted-foreground">
            We set the standard for trust, quality, and service in Ethiopia&apos;s car market.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className={`group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-lg lg:p-8 reveal reveal-delay-${(index % 5) + 1}`}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 transition-colors group-hover:bg-accent/20">
                <reason.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">{reason.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
