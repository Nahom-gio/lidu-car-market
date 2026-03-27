export const fallbackSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function getSiteUrl() {
  return fallbackSiteUrl.replace(/\/$/, "");
}

export function absoluteUrl(path = "/") {
  return `${getSiteUrl()}${path}`;
}
