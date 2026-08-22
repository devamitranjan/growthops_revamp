import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/site/header";
import SiteFooter from "@/components/site/site-footer";
import PostDetail from "@/components/sections/post-detail/post-detail";
import { getArticle } from "@/sanity/repositories/article";
import { getArticleSlugs } from "@/sanity/repositories/articles";

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/post/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getArticle(slug);

  if (!post) return {};

  return {
    title: post.title,
    alternates: { canonical: `/post/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      images: post.featuredImage ? [{ url: post.featuredImage }] : undefined,
      publishedTime: post.publishDate,
      authors: [post.authorName],
    },
  };
}

export default async function PostDetailPage(
  props: PageProps<"/post/[slug]">,
) {
  const { slug } = await props.params;
  const post = await getArticle(slug);

  if (!post) notFound();

  return (
    <div className="body-wrapper hs-site-page page">
      <Header />
      <PostDetail post={post} />
      <SiteFooter />
    </div>
  );
}
