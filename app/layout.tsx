import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import type { ReactNode } from "react";

import "@/app/globals.css";
import { getSiteSettingsContent } from "@/lib/content";
import { getSiteUrl } from "@/lib/site";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettingsContent();
  const logoSrc = siteSettings.logoUrl;

  return {
    metadataBase: new URL(getSiteUrl()),
    icons: logoSrc
      ? {
          icon: logoSrc,
          shortcut: logoSrc,
          apple: logoSrc,
        }
      : undefined,
    title: {
      default: `${siteSettings.name} | Curated Showroom Vehicles`,
      template: `%s | ${siteSettings.name}`,
    },
    description: siteSettings.seo.description,
    applicationName: siteSettings.name,
    openGraph: {
      type: "website",
      title: siteSettings.name,
      description: siteSettings.seo.description,
      siteName: siteSettings.name,
      images: logoSrc
        ? [
            {
              url: logoSrc,
              alt: `${siteSettings.name} logo`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: siteSettings.name,
      description: siteSettings.seo.description,
      images: logoSrc ? [logoSrc] : undefined,
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans`}>{children}</body>
    </html>
  );
}
