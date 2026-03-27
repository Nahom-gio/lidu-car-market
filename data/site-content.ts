import type { Car } from "@/data/cars";

export interface SocialLink {
  label: string;
  href: string;
}

export interface SiteSettingsContent {
  name: string;
  shortName: string;
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

export const siteSettings: SiteSettingsContent = {
  name: "LIDU CAR MARKET",
  shortName: "LIDU",
  city: "Addis Ababa",
  phoneDisplay: "0944 119 907",
  phoneHref: "tel:0944119907",
  whatsappHref:
    "https://wa.me/251944119907?text=Hello%2C%20I%20am%20interested%20in%20your%20vehicles.",
  address: "Meskel Flower, Behind Tulip Hotel",
  directionsHref: "https://maps.google.com/?q=Meskel+Flower+Addis+Ababa",
  mapEmbedHref:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d38.76!3d9.01!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDAnMzYuMCJOIDM4wrA0NScwMC4wIkU!5e0!3m2!1sen!2set!4v1",
  seo: {
    title: "LIDU CAR MARKET",
    description:
      "Browse curated showroom vehicles for the Addis market, including SUVs, sedans, pickups, luxury models, and emerging EVs.",
  },
  socialLinks: [
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "TikTok", href: "https://tiktok.com" },
    { label: "Telegram", href: "https://t.me/liducarmarket" },
  ],
};

export const homePage: HomePageContent = {
  hero: {
    eyebrow: "Car Market",
    title: "Browse our current\nvehicle listings.",
    description: "See them in person at our Meskel Flower location.",
    cta: "View Cars",
    image: "/images/car-suv.jpg",
    imageAlt: "Premium SUV in showroom",
  },
  categories: {
    eyebrow: "Browse",
    title: "Car Categories",
    items: [
      { name: "Sedan", filterValue: "Sedan", image: "/images/car-sedan.jpg" },
      { name: "SUV", filterValue: "SUV", image: "/images/car-suv.jpg" },
      { name: "Pickup", filterValue: "Pickup", image: "/images/car-sports.jpg" },
      { name: "Electric", filterValue: "Electric", image: "/images/car-electric.jpg" },
      { name: "Luxury", filterValue: "Luxury", image: "/images/car-coupe.jpg" },
    ],
  },
};

export const aboutPage: AboutPageContent = {
  heroEyebrow: "About LIDU",
  heroTitle: "A curated automotive showroom established for the Addis market.",
  heroDescription:
    "LIDU CAR MARKET is dedicated to presenting credible showroom inventory for buyers in Ethiopia, supported by practical market data, transparent vehicle information, and a direct in-person experience at Meskel Flower.",
  whoWeAreTitle:
    "We present vehicles that reflect how clients in Ethiopia evaluate and acquire automobiles.",
  whoWeAre: [
    "Our focus is not speculative inventory. We prioritize Land Cruiser, Prado, Lexus, Mercedes-Benz, Toyota, Range Rover, and other vehicles that clients in Addis Ababa actively search for, inspect, finance, and retain.",
    "This requires practical filters, realistic price positioning in Ethiopian Birr, transparent duty information, and a showroom-led experience that supports disciplined vehicle comparison.",
    "Whether a client is selecting a family SUV, an executive sedan, or a high-specification pickup, our objective is to make the decision process clearer, more structured, and more credible.",
  ],
  snapshotTitle: "Showroom Snapshot",
  snapshotItems: [
    {
      label: "Location",
      value: "Meskel Flower, Addis Ababa",
    },
    {
      label: "Inventory Focus",
      value: "SUVs, sedans, pickups, luxury, and emerging EVs",
    },
    {
      label: "Customer Fit",
      value: "Executives, families, fleet buyers, and clients seeking a structured showroom process",
    },
  ],
  pillars: [
    {
      title: "Curated Showroom Inventory",
      description:
        "We present vehicles aligned with Ethiopian market demand, documented condition standards, and credible long-term ownership value.",
    },
    {
      title: "Transparent Market Positioning",
      description:
        "Our listings are presented with Addis-relevant pricing, import-year context, duty status, and practical purchase guidance.",
    },
    {
      title: "Showroom Experience",
      description:
        "Clients may inspect vehicles in person, compare options directly, and receive clear guidance before proceeding.",
    },
  ],
};

export const testimonials: TestimonialContent[] = [
  {
    name: "Abebe Tesfaye",
    role: "Business Owner",
    text:
      "Purchased a Land Cruiser V8 from them - the car was exactly as described. Duty paid, clean paperwork, and they even helped with the transfer process. Best experience buying a car in Addis.",
    rating: 5,
    car: "Toyota Land Cruiser V8",
  },
  {
    name: "Sara Mengistu",
    role: "Diplomat",
    text:
      "I was looking for a reliable SUV for my family. They showed me several options within my budget and never pressured me. Ended up with a Prado TXL and could not be happier.",
    rating: 5,
    car: "Toyota Prado TXL",
  },
  {
    name: "Daniel Kebede",
    role: "NGO Director",
    text:
      "Professional, transparent, and trustworthy. They provided full vehicle history and inspection reports. The after-sale support was exceptional - they followed up weeks after the purchase.",
    rating: 5,
    car: "Lexus RX350",
  },
  {
    name: "Meron Hailu",
    role: "Tech Entrepreneur",
    text:
      "Bought a Mercedes E350 for my daily commute. The showroom experience felt premium, and the price was fair compared to other dealers. Highly recommend for anyone looking for quality vehicles.",
    rating: 4,
    car: "Mercedes-Benz E350",
  },
];

export function getCarSeoDescription(car: Car) {
  return `${car.year} ${car.brand} ${car.name} for sale in ${car.cityLocation}. ${car.priceBirr}, ${car.fuelType}, ${car.transmission}, ${car.mileage}.`;
}
