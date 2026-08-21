export const ARTICLE_QUERY = `*[_type == "article" && slug.current == $slug][0]{
  "slug": slug.current,
  category,
  title,
  authorName,
  publishDate,
  "featuredImage": featuredImage.asset->url,
  content
}`;
