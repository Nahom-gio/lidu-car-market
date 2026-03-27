import {groq} from "next-sanity";

import {cars, getCarById, type Car} from "@/data/cars";
import {
  aboutPage as localAboutPage,
  homePage as localHomePage,
  siteSettings as localSiteSettings,
  testimonials as localTestimonials,
  type AboutPageContent,
  type HomePageContent,
  type SiteSettingsContent,
  type TestimonialContent,
} from "@/data/site-content";
import {sanityClient} from "@/sanity/lib/client";

const siteSettingsQuery = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    "name": coalesce(siteName, ""),
    shortName,
    city,
    phoneDisplay,
    phoneHref,
    "whatsappHref": whatsAppHref,
    address,
    directionsHref,
    mapEmbedHref,
    socialLinks[]{
      label,
      href
    },
    "seo": {
      "title": seoTitle,
      "description": seoDescription
    }
  }
`;

const homePageQuery = groq`
  *[_type == "homePage" && _id == "homePage"][0]{
    "hero": {
      "eyebrow": heroEyebrow,
      "title": heroTitle,
      "description": heroDescription,
      "cta": heroCtaLabel,
      "image": heroImage.asset->url,
      "imageAlt": heroImageAlt
    },
    "categories": {
      "eyebrow": categoriesEyebrow,
      "title": categoriesTitle,
      "items": categories[]{
        name,
        filterValue,
        "image": image.asset->url
      }
    }
  }
`;

const aboutPageQuery = groq`
  *[_type == "aboutPage" && _id == "aboutPage"][0]{
    heroEyebrow,
    heroTitle,
    heroDescription,
    whoWeAreTitle,
    whoWeAre,
    snapshotTitle,
    snapshotItems[]{
      label,
      value
    },
    pillars[]{
      title,
      description
    }
  }
`;

const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(_createdAt asc){
    name,
    role,
    text,
    rating,
    car
  }
`;

const carsQuery = groq`
  *[_type == "car"] | order(year desc, _createdAt desc){
    "id": slug.current,
    "name": coalesce(title, model, name, ""),
    "brand": coalesce(make, brand, ""),
    "make": coalesce(make, brand, ""),
    "model": coalesce(model, name, ""),
    trim,
    variant,
    packageNote,
    category,
    year,
    bodyType,
    bodyStructure,
    dimensions,
    wheelbase,
    engine,
    condition,
    powerOutput,
    "hp": coalesce(powerOutput, ""),
    torque,
    mileage,
    transmission,
    "drivetrain": coalesce(driveType, drivetrain, ""),
    fuelType,
    batteryType,
    batteryCapacity,
    rangeKm,
    chargingTime,
    fuelConsumption,
    topSpeed,
    acceleration,
    "seats": 5,
    color,
    "interior": "",
    optionNote,
    batteryStatus,
    plateNumber,
    commissionNote,
    contactPhone,
    description,
    "images": images[].asset->url,
    "highlights": [],
    priceBirr,
    cashPriceBirr,
    bankPriceBirr,
    downPaymentBirr,
    monthlyPaymentBirr,
    financingAvailable,
    "importYear": year,
    "dutyPaid": false,
    "kmDriven": null,
    "cityLocation": coalesce(location, ""),
    "marketNote": coalesce(optionNote, description, ""),
    inventoryStatus
  }
`;

async function safeFetch<T>(query: string, params?: Record<string, unknown>) {
  try {
    if (params) {
      return await sanityClient.fetch<T>(query, params as any);
    }

    return await sanityClient.fetch<T>(query);
  } catch {
    return null;
  }
}

function coalesceSiteSettings(input: Partial<SiteSettingsContent> | null | undefined): SiteSettingsContent {
  return {
    ...localSiteSettings,
    ...input,
    seo: {
      ...localSiteSettings.seo,
      ...(input?.seo ?? {}),
    },
    socialLinks: input?.socialLinks?.length ? input.socialLinks : localSiteSettings.socialLinks,
  };
}

function coalesceHomePage(input: Partial<HomePageContent> | null | undefined): HomePageContent {
  return {
    hero: {
      ...localHomePage.hero,
      ...(input?.hero ?? {}),
    },
    categories: {
      ...localHomePage.categories,
      ...(input?.categories ?? {}),
      items: input?.categories?.items?.length ? input.categories.items : localHomePage.categories.items,
    },
  };
}

function coalesceAboutPage(input: Partial<AboutPageContent> | null | undefined): AboutPageContent {
  return {
    ...localAboutPage,
    ...input,
    whoWeAre: input?.whoWeAre?.length ? input.whoWeAre : localAboutPage.whoWeAre,
    snapshotItems: input?.snapshotItems?.length ? input.snapshotItems : localAboutPage.snapshotItems,
    pillars: input?.pillars?.length ? input.pillars : localAboutPage.pillars,
  };
}

function coalesceCars(input: Partial<Car>[] | null | undefined): Car[] {
  if (!input?.length) return cars;

  return input
    .filter((car): car is Partial<Car> & {id: string; name: string; brand: string} => Boolean(car?.id && car?.name && car?.brand))
    .map((car) => {
      const fallback = getCarById(car.id);
      return {
        ...(fallback ?? localCarDefaults(car.id)),
        ...car,
        images: car.images?.filter(Boolean).length ? (car.images as string[]) : fallback?.images ?? [],
        highlights: car.highlights?.length ? car.highlights : fallback?.highlights ?? [],
        mileage:
          car.mileage && car.mileage.trim().length
            ? car.mileage
            : fallback?.mileage ?? formatKilometers(car.kmDriven),
        kmDriven:
          typeof car.kmDriven === "number" && Number.isFinite(car.kmDriven)
            ? car.kmDriven
            : fallback?.kmDriven ?? parseMileageLabel(car.mileage ?? ""),
        financingAvailable:
          typeof car.financingAvailable === "boolean"
            ? car.financingAvailable
            : Boolean(car.cashPriceBirr || car.bankPriceBirr || car.downPaymentBirr || car.monthlyPaymentBirr),
      };
    });
}

function parseMileageLabel(mileage: string) {
  const parsed = Number(String(mileage).replace(/[^\d]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatKilometers(kmDriven: number | null | undefined) {
  if (typeof kmDriven !== "number" || !Number.isFinite(kmDriven) || kmDriven <= 0) return "";
  return `${kmDriven.toLocaleString("en-US")} km`;
}

function localCarDefaults(id: string): Car {
  return {
    id,
    name: "",
    brand: "",
    make: "",
    model: "",
    trim: "",
    variant: "",
    packageNote: "",
    category: "SUV",
    year: 2024,
    bodyType: "",
    bodyStructure: "",
    dimensions: "",
    wheelbase: "",
    engine: "",
    condition: "",
    powerOutput: "",
    hp: "",
    torque: "",
    mileage: "",
    transmission: "",
    drivetrain: "",
    fuelType: "",
    batteryType: "",
    batteryCapacity: "",
    rangeKm: "",
    chargingTime: "",
    fuelConsumption: "",
    topSpeed: "",
    acceleration: "",
    seats: 5,
    color: "",
    interior: "",
    optionNote: "",
    batteryStatus: "",
    plateNumber: "",
    commissionNote: "",
    contactPhone: "",
    description: "",
    images: [],
    highlights: [],
    priceBirr: "",
    cashPriceBirr: "",
    bankPriceBirr: "",
    downPaymentBirr: "",
    monthlyPaymentBirr: "",
    financingAvailable: false,
    importYear: 2024,
    dutyPaid: false,
    kmDriven: 0,
    cityLocation: "",
    marketNote: "",
    inventoryStatus: "available",
  };
}

export async function getSiteSettingsContent(): Promise<SiteSettingsContent> {
  const content = await safeFetch<Partial<SiteSettingsContent>>(siteSettingsQuery);
  return coalesceSiteSettings(content);
}

export async function getHomePageContent(): Promise<HomePageContent> {
  const content = await safeFetch<Partial<HomePageContent>>(homePageQuery);
  return coalesceHomePage(content);
}

export async function getAboutPageContent(): Promise<AboutPageContent> {
  const content = await safeFetch<Partial<AboutPageContent>>(aboutPageQuery);
  return coalesceAboutPage(content);
}

export async function getTestimonialsContent(): Promise<TestimonialContent[]> {
  const content = await safeFetch<TestimonialContent[]>(testimonialsQuery);
  return content?.length ? content : localTestimonials;
}

export async function getCarsContent(): Promise<Car[]> {
  const content = await safeFetch<Partial<Car>[]>(carsQuery);
  return coalesceCars(content);
}

export async function getCarContentById(id: string): Promise<Car | undefined> {
  const allCars = await getCarsContent();
  return allCars.find((car) => car.id === id) ?? getCarById(id);
}
