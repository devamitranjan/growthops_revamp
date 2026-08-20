import { PostCard } from "./post-card";
import { PostPagination } from "./post-pagination";
import { pageHeading, posts, POSTS_PER_PAGE } from "./post.data";

export const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

interface PostListingProps {
  currentPage: number;
}

export default function PostListing({ currentPage }: PostListingProps) {
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const visiblePosts = posts.slice(start, start + POSTS_PER_PAGE);

  return (
    <section className="pt-40 md:pt-56">
      {/* The heading sits in the standard container, but the card grid runs
          near full-bleed — the two are deliberately not flush. */}
      <div className="generic-container">
        <p className="body1-semibold uppercase text-primary-pink-base">
          What we&rsquo;re thinking
        </p>

        <h1 className="mt-[2.6667rem] text-[4rem] font-light leading-[125%] text-neutral-white-base max-sm:mb-12 max-sm:text-[3.16667rem]">
          {pageHeading}
        </h1>
      </div>

      {/* px-6 keeps the cards flush with the heading on mobile; from md the
          grid pulls out to px-5 while the heading stays in its container. */}
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-5">
        <div className="grid grid-cols-1 gap-x-5 gap-y-16 md:mt-20 md:grid-cols-2 md:gap-y-20">
          {visiblePosts.map((post, index) => (
            <PostCard
              key={post.slug}
              post={post}
              // Only the first row is above the fold on any given page.
              priority={index < 2}
            />
          ))}
        </div>

        <PostPagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </section>
  );
}
