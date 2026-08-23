import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/site/header";
import SiteFooter from "@/components/site/site-footer";
import NewsroomListing from "@/components/sections/newsroom-listing";
import { getNewsroom } from "@/sanity/repositories/newsroom";

export async function generateMetadata(): Promise<Metadata> {
  const newsroom = await getNewsroom();

  if (!newsroom) return {};

  return {
    title: newsroom.seoTitle ?? newsroom.heading,
    description: newsroom.seoDescription,
    alternates: { canonical: "/newsroom" },
  };
}

/** The route exists only once the `newsroomPage` singleton is published — see
 *  `getNewsroom`. */
export default async function NewsroomPage() {
  const newsroom = await getNewsroom();

  if (!newsroom) notFound();

  return (
    <div className="body-wrapper hs-site-page page">
      <Header />
      <NewsroomListing data={newsroom} />
      <SiteFooter />
    </div>
  );
}
