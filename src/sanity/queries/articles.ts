/** Listing query for /post. Pagination is done in GROQ so the CMS never ships
 *  the whole archive to render one page. */
export const ARTICLES_QUERY = `*[_type == "article"] | order(publishDate desc) [$start...$end]{
  "slug": slug.current,
  href,
  "imgSrc": featuredImage.asset->url,
  title,
  subtitle,
  authorName
}`;

export const ARTICLES_COUNT_QUERY = `count(*[_type == "article"])`;

/** Every published slug — feeds `generateStaticParams` for /post/[slug]. */
export const ARTICLE_SLUGS_QUERY = `*[_type == "article" && defined(slug.current)].slug.current`;
