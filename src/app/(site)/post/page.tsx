import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/site/header";
import SiteFooter from "@/components/site/site-footer";
import PostListing from "@/components/sections/post-listing/post-listing";
import {
  getArticleSlugs,
  getArticles,
  getTotalArticlePages,
} from "@/sanity/repositories/articles";
import { getSiteSettings } from "@/sanity/repositories/site-settings";

/** Returns null for anything that is not a real page in [1, totalPages]. */
function parsePage(value: string | string[] | undefined, totalPages: number) {
  if (value === undefined) return 1;
  if (Array.isArray(value)) return null;

  // Number() would happily accept "1.5", " 2" and "0x2".
  if (!/^\d+$/.test(value)) return null;

  const page = Number(value);
  return page >= 1 && page <= totalPages ? page : null;
}

export async function generateMetadata(
  props: PageProps<"/post">,
): Promise<Metadata> {
  const [totalPages, settings] = await Promise.all([
    getTotalArticlePages(),
    getSiteSettings(),
  ]);
  const page = parsePage((await props.searchParams).page, totalPages);
  const suffix = page && page > 1 ? ` (Page ${page})` : "";

  return {
    title: `${settings.postListingTitle}${suffix}`,
    description: settings.postListingDescription,
    alternates: {
      canonical: page && page > 1 ? `/post?page=${page}` : "/post",
    },
  };
}

export default async function PostPage(props: PageProps<"/post">) {
  const totalPages = await getTotalArticlePages();
  const page = parsePage((await props.searchParams).page, totalPages);

  if (page === null) notFound();

  const [listing, migratedSlugs] = await Promise.all([
    getArticles(page),
    getArticleSlugs(),
  ]);

  return (
    <div className="body-wrapper hs-site-page page">
      <Header />
      <PostListing listing={listing} migratedSlugs={migratedSlugs} />
      <SiteFooter />
    </div>
  );
}
