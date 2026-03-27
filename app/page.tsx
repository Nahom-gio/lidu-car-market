import {HomePageClient} from "@/components/HomePageClient";
import {
  getCarsContent,
  getHomePageContent,
  getSiteSettingsContent,
  getTestimonialsContent,
} from "@/lib/content";

export const revalidate = 60;

export default async function HomePage() {
  const [siteSettings, homePage, testimonials, cars] = await Promise.all([
    getSiteSettingsContent(),
    getHomePageContent(),
    getTestimonialsContent(),
    getCarsContent(),
  ]);

  return (
    <HomePageClient
      siteSettings={siteSettings}
      homePage={homePage}
      testimonials={testimonials}
      cars={cars}
    />
  );
}
