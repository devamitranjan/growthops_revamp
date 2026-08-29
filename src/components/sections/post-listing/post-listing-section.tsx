import { articleRepository } from "@/content/repositories";

import PostListing from "./post-listing";

/**
 * The listing section's server half: the cards are every `article` document,
 * so they are fetched here rather than carried on the section.
 *
 * `page` comes from the URL and is validated by the route before it gets here
 * — see `src/app/(site)/post/page.tsx`. `postsPerPage` comes from the section
 * itself, so two pages carrying this section can list at different sizes.
 */
export default async function PostListingSection({
  heading,
  page,
  postsPerPage,
}: {
  heading: string;
  page: number;
  postsPerPage?: number | null;
}) {
  const [listing, migratedSlugs] = await Promise.all([
    articleRepository.getListing(page, postsPerPage),
    articleRepository.getSlugs(),
  ]);

  return (
    <PostListing
      heading={heading}
      listing={listing}
      migratedSlugs={migratedSlugs}
    />
  );
}
