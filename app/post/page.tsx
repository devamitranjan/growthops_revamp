import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "../features/landing/header";
import PostListing, { totalPages } from "./post";
import SiteFooter from "../shared/components/site-footer";

const DESCRIPTION =
  "New perspectives, intelligent insight and fresh thinking from the GrowthOps Asia thought leaders.";

/** Returns null for anything that is not a real page in [1, totalPages]. */
function parsePage(value: string | string[] | undefined) {
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
  const page = parsePage((await props.searchParams).page);
  const suffix = page && page > 1 ? ` (Page ${page})` : "";

  return {
    title: `What We're Thinking${suffix}`,
    description: DESCRIPTION,
    alternates: {
      canonical: page && page > 1 ? `/post?page=${page}` : "/post",
    },
  };
}

export default async function PostPage(props: PageProps<"/post">) {
  const page = parsePage((await props.searchParams).page);

  if (page === null) notFound();

  return (
    <div className="body-wrapper hs-site-page page">
      <Header />
      <PostListing currentPage={page} />
      <SiteFooter />
    </div>
  );
}
