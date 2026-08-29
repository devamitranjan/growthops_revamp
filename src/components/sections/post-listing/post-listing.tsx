import type { ArticleListing } from "@/content/types";
import { PostCard } from "./post-card";
import { PostPagination } from "./post-pagination";

interface PostListingProps {
  /** The section's own heading. */
  heading: string;
  listing: ArticleListing;
  /** Slugs with a body in the CMS — these open in-site rather than handing
   *  off to growthops.asia. */
  migratedSlugs: string[];
}

export default function PostListing({
  heading,
  listing,
  migratedSlugs,
}: PostListingProps) {
  const { articles, page, totalPages } = listing;
  const migrated = new Set(migratedSlugs);

  return (
    <section className="pt-40 md:pt-56">
      {/* The heading sits in the standard container, but the card grid runs
          near full-bleed — the two are deliberately not flush. */}
      <div className="generic-container">
        <p className="body1-semibold uppercase text-primary-pink-base">
          What we&rsquo;re thinking
        </p>

        <h1 className="mt-[2.6667rem] text-[4rem] font-light leading-[125%] text-neutral-white-base max-sm:mb-12 max-sm:text-[3.16667rem]">
          {heading}
        </h1>
      </div>

      {/* px-6 keeps the cards flush with the heading on mobile; from md the
          grid pulls out to px-5 while the heading stays in its container. */}
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-5">
        <div className="grid grid-cols-1 gap-x-5 gap-y-16 md:mt-20 md:grid-cols-2 md:gap-y-20">
          {articles.map((post, index) => (
            <PostCard
              key={post.slug}
              post={post}
              isMigrated={migrated.has(post.slug)}
              // Only the first row is above the fold on any given page.
              priority={index < 2}
            />
          ))}
        </div>

        <PostPagination currentPage={page} totalPages={totalPages} />
      </div>
    </section>
  );
}
