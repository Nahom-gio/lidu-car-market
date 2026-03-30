import type { Car } from "@/data/cars";

export interface SocialLink {
  label: string;
  href: string;
}

export interface SiteSettingsContent {
  name: string;
  shortName: string;
  logoUrl: string;
  city: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappHref: string;
  address: string;
  directionsHref: string;
  mapEmbedHref: string;
  socialLinks?: SocialLink[];
  seo: {
    title: string;
    description: string;
  };
}

export interface HomePageContent {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    image: string;
    imageAlt: string;
  };
  categories: {
    eyebrow: string;
    title: string;
    items: Array<{
      name: string;
      filterValue: string;
      image: string;
    }>;
  };
}

export interface AboutPageContent {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  whoWeAreTitle: string;
  whoWeAre: string[];
  snapshotTitle: string;
  snapshotItems: Array<{
    label: string;
    value: string;
  }>;
  pillars: Array<{
    title: string;
    description: string;
  }>;
}

export interface TestimonialContent {
  name: string;
  role: string;
  text: string;
  rating: number;
  car: string;
}

export function getCarSeoDescription(car: Car) {
  return `${car.year} ${car.brand} ${car.name} for sale in ${car.cityLocation}. ${car.priceBirr}, ${car.fuelType}, ${car.transmission}, ${car.mileage}.`;
}
