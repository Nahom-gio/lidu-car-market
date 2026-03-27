"use client";

import {Suspense, useEffect} from "react";

import {CategoriesSection} from "@/components/CategoriesSection";
import {ContactSection} from "@/components/ContactSection";
import {FeaturedCars} from "@/components/FeaturedCars";
import {Footer} from "@/components/Footer";
import {HeroSection} from "@/components/HeroSection";
import {Navbar} from "@/components/Navbar";
import {PageTransition} from "@/components/PageTransition";
import {TestimonialsSection} from "@/components/TestimonialsSection";
import {WhatsAppButton} from "@/components/WhatsAppButton";
import {WhyChooseUs} from "@/components/WhyChooseUs";
import type {Car} from "@/data/cars";
import type {HomePageContent, SiteSettingsContent, TestimonialContent} from "@/data/site-content";

interface HomePageClientProps {
  siteSettings: SiteSettingsContent;
  homePage: HomePageContent;
  testimonials: TestimonialContent[];
  cars: Car[];
}

export function HomePageClient({siteSettings, homePage, testimonials, cars}: HomePageClientProps) {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const element = document.getElementById(hash);
    if (!element) return;

    requestAnimationFrame(() => {
      element.scrollIntoView({behavior: "smooth"});
    });
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen overflow-x-hidden bg-background">
        <Navbar siteSettings={siteSettings} />
        <HeroSection hero={homePage.hero} />
        <CategoriesSection categoriesContent={homePage.categories} />
        <Suspense fallback={<div id="cars" className="bg-secondary/50 py-20 lg:py-28" />}>
          <FeaturedCars carsData={cars} />
        </Suspense>
        <WhyChooseUs />
        <TestimonialsSection testimonials={testimonials} />
        <ContactSection siteSettings={siteSettings} />
        <Footer siteSettings={siteSettings} />
        <WhatsAppButton whatsappHref={siteSettings.whatsappHref} />
      </div>
    </PageTransition>
  );
}
