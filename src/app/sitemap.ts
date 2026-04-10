import type { MetadataRoute } from "next";

import { getSiteContent } from "@/lib/site-content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vmbrands.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getSiteContent();

  return [
    {
      url: siteUrl,
      lastModified: content.updatedAt,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
