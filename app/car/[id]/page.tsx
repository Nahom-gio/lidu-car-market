import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CarDetailClient } from "@/app/car/[id]/CarDetailClient";
import { getCarSeoDescription } from "@/data/site-content";
import { getCarContentById, getCarsContent, getSiteSettingsContent } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 60;

export async function generateStaticParams() {
  const cars = await getCarsContent();
  return cars.map((car) => ({ id: car.id }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const [car, siteSettings] = await Promise.all([getCarContentById(params.id), getSiteSettingsContent()]);
  if (!car) {
    return {
      title: "Vehicle Not Found",
      description: "The requested vehicle listing could not be found.",
    };
  }

  const description = getCarSeoDescription(car);
  const logoSrc = siteSettings.logoUrl ? absoluteUrl(siteSettings.logoUrl) : "";

  return {
    title: `${car.year} ${car.brand} ${car.name}`,
    description,
    openGraph: {
      title: `${car.year} ${car.brand} ${car.name}`,
      description,
      type: "article",
      url: absoluteUrl(`/car/${car.id}`),
      images: logoSrc
        ? [
            {
              url: logoSrc,
              alt: `${car.brand} ${car.name} logo preview`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${car.year} ${car.brand} ${car.name}`,
      description,
      images: logoSrc ? [logoSrc] : undefined,
    },
  };
}

export default async function CarDetailPage({ params }: { params: { id: string } }) {
  const [car, siteSettings] = await Promise.all([getCarContentById(params.id), getSiteSettingsContent()]);

  if (!car) {
    notFound();
  }

  return <CarDetailClient car={car} siteSettings={siteSettings} />;
}
