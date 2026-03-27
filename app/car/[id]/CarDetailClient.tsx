"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Expand,
  Fuel,
  Gauge,
  MapPin,
  MessageCircle,
  Palette,
  Phone,
  Settings2,
  Wallet,
} from "lucide-react";

import type { Car as CarType } from "@/data/cars";
import type { SiteSettingsContent } from "@/data/site-content";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { ImageLightbox } from "@/components/ImageLightbox";
import { InventoryBadge } from "@/components/InventoryBadge";
import { Navbar } from "@/components/Navbar";
import { PageTransition } from "@/components/PageTransition";
import { WhatsAppButton } from "@/components/WhatsAppButton";

function formatMoneyLabel(value?: string) {
  if (!value?.trim()) return "";

  const normalized = value.trim();
  return /birr|etb/i.test(normalized) ? normalized : `${normalized} Birr`;
}

function getMileageLabel(car: CarType) {
  if (car.mileage?.trim()) return car.mileage;
  if (car.kmDriven > 0) return `${car.kmDriven.toLocaleString("en-US")} km`;
  return "Not specified";
}

function getFinanceCards(car: CarType) {
  return [
    car.cashPriceBirr ? { label: "Cash", value: formatMoneyLabel(car.cashPriceBirr) } : null,
    car.bankPriceBirr ? { label: "Bank", value: formatMoneyLabel(car.bankPriceBirr) } : null,
    car.downPaymentBirr ? { label: "Down Payment", value: formatMoneyLabel(car.downPaymentBirr) } : null,
    car.monthlyPaymentBirr ? { label: "Monthly", value: formatMoneyLabel(car.monthlyPaymentBirr) } : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>;
}

function getOverviewSpecs(car: CarType) {
  return [
    { icon: Wallet, label: "Price", value: formatMoneyLabel(car.priceBirr) },
    { icon: Calendar, label: "Year", value: String(car.year) },
    { icon: Fuel, label: "Fuel", value: car.fuelType || "Not specified" },
    { icon: Settings2, label: "Transmission", value: car.transmission || "Not specified" },
    { icon: Gauge, label: "Mileage", value: getMileageLabel(car) },
    { icon: MapPin, label: "Location", value: car.cityLocation || "Not specified" },
    { icon: Palette, label: "Color", value: car.color || "Not specified" },
    { icon: BadgeCheck, label: "Condition", value: car.condition || "Not specified" },
    car.variant ? { icon: BadgeCheck, label: "Variant", value: car.variant } : null,
    car.packageNote ? { icon: BadgeCheck, label: "Package", value: car.packageNote } : null,
    car.bodyType ? { icon: BadgeCheck, label: "Body Type", value: car.bodyType } : null,
    car.bodyStructure ? { icon: BadgeCheck, label: "Body Structure", value: car.bodyStructure } : null,
    car.engine ? { icon: Fuel, label: "Engine", value: car.engine } : null,
    car.powerOutput ? { icon: Gauge, label: "Power Output", value: car.powerOutput } : null,
    car.torque ? { icon: Gauge, label: "Torque", value: car.torque } : null,
    car.drivetrain ? { icon: Settings2, label: "Drive Type", value: car.drivetrain } : null,
    car.fuelConsumption ? { icon: Gauge, label: "Fuel Consumption", value: car.fuelConsumption } : null,
    car.batteryStatus ? { icon: BadgeCheck, label: "Battery", value: car.batteryStatus } : null,
    car.batteryType ? { icon: BadgeCheck, label: "Battery Type", value: car.batteryType } : null,
    car.batteryCapacity ? { icon: Gauge, label: "Battery Capacity", value: car.batteryCapacity } : null,
    car.rangeKm ? { icon: Gauge, label: "Range", value: car.rangeKm } : null,
    car.chargingTime ? { icon: Gauge, label: "Charging Time", value: car.chargingTime } : null,
    car.dimensions ? { icon: Gauge, label: "Dimensions", value: car.dimensions } : null,
    car.wheelbase ? { icon: Gauge, label: "Wheelbase", value: car.wheelbase } : null,
    car.topSpeed ? { icon: Gauge, label: "Top Speed", value: car.topSpeed } : null,
    car.acceleration ? { icon: Gauge, label: "Acceleration", value: car.acceleration } : null,
    car.plateNumber ? { icon: BadgeCheck, label: "Plate Number", value: car.plateNumber } : null,
    car.contactPhone ? { icon: Phone, label: "Contact Phone", value: car.contactPhone } : null,
    car.commissionNote ? { icon: BadgeCheck, label: "Commission", value: car.commissionNote } : null,
  ].filter(Boolean) as Array<{ icon: typeof Wallet; label: string; value: string }>;
}

export function CarDetailClient({
  car,
  siteSettings,
}: {
  car: CarType;
  siteSettings: SiteSettingsContent;
}) {
  const [activeImg, setActiveImg] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const imgCount = car.images.length;
  const nextImg = useCallback(() => setActiveImg((current) => (current + 1) % imgCount), [imgCount]);
  const prevImg = useCallback(() => setActiveImg((current) => (current - 1 + imgCount) % imgCount), [imgCount]);

  const financeCards = getFinanceCards(car);
  const overviewSpecs = getOverviewSpecs(car);
  const carInquiryHref = `https://wa.me/251944119907?text=Hello%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(
    car.name,
  )}%20listed%20for%20${encodeURIComponent(formatMoneyLabel(car.priceBirr))}.`;

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar siteSettings={siteSettings} />

        <div className="mx-auto max-w-7xl pb-0 pt-24 section-padding lg:pt-28">
          <Link
            href="/#cars"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Collection
          </Link>
        </div>

        <div className="mx-auto max-w-7xl pb-12 section-padding">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-3 animate-fade-up">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary shadow-xl">
                <img
                  src={car.images[activeImg]}
                  alt={`${car.name} - view ${activeImg + 1}`}
                  className="h-full w-full cursor-zoom-in object-cover transition-opacity duration-300"
                  onClick={() => setLightboxOpen(true)}
                />
                {car.images.length > 1 ? (
                  <>
                    <button
                      onClick={prevImg}
                      className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/80 shadow-md backdrop-blur-sm transition-colors hover:bg-card active:scale-95"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImg}
                      className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/80 shadow-md backdrop-blur-sm transition-colors hover:bg-card active:scale-95"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                ) : null}
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/80 shadow-md backdrop-blur-sm transition-colors hover:bg-card active:scale-95"
                  aria-label="Open fullscreen"
                >
                  <Expand className="h-4 w-4" />
                </button>
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                  {car.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImg(index)}
                      className={`h-2 rounded-full transition-all ${index === activeImg ? "w-6 bg-accent" : "w-2 bg-card/60"}`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImg(index)}
                    className={`aspect-[4/3] flex-1 overflow-hidden rounded-lg border-2 transition-all ${
                      index === activeImg ? "border-accent shadow-md" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="animate-fade-up" style={{ animationDelay: "150ms" }}>
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">{car.category}</span>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">{car.year}</span>
                {car.condition ? (
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">{car.condition}</span>
                ) : null}
                <InventoryBadge status={car.inventoryStatus} />
              </div>
              <h1 className="mb-1 text-3xl font-bold leading-tight text-foreground lg:text-5xl">{car.name}</h1>
              <p className="mb-5 text-lg text-muted-foreground">
                by {car.brand}
                {car.trim ? ` • ${car.trim}` : ""}
              </p>

              <div className="mb-6">
                <p className="text-3xl font-bold text-foreground">{formatMoneyLabel(car.priceBirr)}</p>
                <p className="mt-1 text-sm text-muted-foreground">Available from {car.cityLocation || "Addis Ababa"}</p>
              </div>

              <div className="mb-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-secondary/60 p-4">
                  <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">Mileage</p>
                  <p className="text-lg font-semibold text-foreground">{getMileageLabel(car)}</p>
                </div>
                <div className="rounded-xl bg-secondary/60 p-4">
                  <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">Fuel / Transmission</p>
                  <p className="text-lg font-semibold text-foreground">
                    {car.fuelType || "N/A"} / {car.transmission || "N/A"}
                  </p>
                </div>
                <div className="rounded-xl bg-secondary/60 p-4">
                  <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">Location</p>
                  <p className="text-lg font-semibold text-foreground">{car.cityLocation || "Not specified"}</p>
                </div>
                <div className="rounded-xl bg-secondary/60 p-4">
                  <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">Color</p>
                  <p className="text-lg font-semibold text-foreground">{car.color || "Not specified"}</p>
                </div>
              </div>

              {financeCards.length ? (
                <div className="mb-8 rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <div className="mb-3 flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-accent" />
                    <h3 className="font-semibold text-foreground">Pricing & Finance</h3>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {financeCards.map((item) => (
                      <div key={item.label} className="rounded-xl bg-secondary/60 p-4">
                        <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">{item.label}</p>
                        <p className="text-lg font-semibold text-foreground">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <p className="mb-8 leading-relaxed text-muted-foreground">{car.description}</p>

              {car.optionNote || car.marketNote ? (
                <div className="mb-8 rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <div className="mb-2 flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-accent" />
                    <h3 className="font-semibold text-foreground">Selling Notes</h3>
                  </div>
                  <p className="text-muted-foreground">{car.optionNote || car.marketNote}</p>
                </div>
              ) : null}

              {car.commissionNote ? (
                <div className="mb-8 rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <div className="mb-2 flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-accent" />
                    <h3 className="font-semibold text-foreground">Commission Note</h3>
                  </div>
                  <p className="text-muted-foreground">{car.commissionNote}</p>
                </div>
              ) : null}

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
                  <a href={carInquiryHref} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-secondary/50 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl section-padding">
            <h2 className="mb-10 text-2xl font-bold text-foreground lg:text-3xl">Vehicle Overview</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {overviewSpecs.map((spec) => (
                <div key={spec.label} className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-sm">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <spec.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{spec.label}</p>
                    <p className="truncate text-sm font-semibold text-foreground">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="py-16 lg:py-20">
          <div className="mx-auto max-w-3xl text-center section-padding">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">See It in Person</p>
            <h2 className="mb-4 text-2xl font-bold text-foreground lg:text-3xl">Visit Our Showroom</h2>
            <p className="mb-6 text-muted-foreground">
              This {car.name} is available for in-person viewing. Contact us before visiting to confirm current availability.
            </p>
            <div className="mb-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-accent" />
              {siteSettings.address}
            </div>
            <Button size="lg" className="gap-2 rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90" asChild>
              <a href={siteSettings.directionsHref} target="_blank" rel="noopener noreferrer">
                Get Directions
              </a>
            </Button>
          </div>
        </div>

        <Footer siteSettings={siteSettings} />
        <WhatsAppButton whatsappHref={siteSettings.whatsappHref} />
        <ImageLightbox
          images={car.images}
          activeIndex={activeImg}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNext={nextImg}
          onPrev={prevImg}
          altPrefix={car.name}
        />
      </div>
    </PageTransition>
  );
}
