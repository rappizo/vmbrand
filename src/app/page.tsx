import { HomePageClient } from "@/components/home-page-client";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getSiteContent();

  return <HomePageClient content={content} />;
}
