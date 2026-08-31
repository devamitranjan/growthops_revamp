import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa6";
import RichTextSection from "@/components/sections/rich-text/rich-text-section";
import { PostImage } from "@/components/ui/post-image";
import { PostDetailData } from "@/content/types";

interface PostDetailProps {
  post: PostDetailData;
}

export default function PostDetail({ post }: PostDetailProps) {
  return (
    <article>
      <header className="relative pb-40 pt-32 md:pb-80 md:pt-36">
        {/* The back control hugs the viewport edge rather than the container
            gutter, so on mobile the eyebrow is indented to clear it instead. */}
        <Link
          href="/post"
          aria-label="Back to what we’re thinking"
          className="absolute left-6 top-32 flex size-9 items-center justify-center rounded-full border border-neutral-white-base/40 text-neutral-white-base transition duration-300 ease-out hover:border-primary-pink-base hover:text-primary-pink-base md:top-36"
        >
          <FaAngleLeft aria-hidden className="text-sm" />
        </Link>

        <div className="generic-container">
          <p className="body1-semibold flex min-h-9 items-center pl-14 uppercase tracking-wide text-primary-pink-base md:pl-0">
            {post.category}
          </p>

          {/* The title breaks a line short of the container so it never runs
              the full measure at display size. */}
          <h1 className="mt-12 text-[2.5rem] font-light leading-[125%] text-neutral-white-base md:mt-20 md:max-w-[64rem] md:text-[4rem]">
            {post.title}
          </h1>

          <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-base font-medium uppercase leading-[130%] text-neutral-white-base md:mt-14">
            <span>{post.authorName}</span>
            <span aria-hidden>&bull;</span>
            <time className="text-[#bbbdbf]">{post.publishDate}</time>
          </div>
        </div>
      </header>

      {/* The body opens a white panel, and the featured image straddles its
          top edge so the artwork breaks out into the dark hero above it.
          flow-root is what keeps that pull-up local to the image: without it
          the figure's negative margin collapses out and drags the whole panel
          up with it. The image keeps its own white block rather than living
          inside the copy, because the copy below is a `richTextSection` — the
          same section an editor can drop on any page — and the two white blocks
          meet seamlessly. */}
      <div className="flow-root bg-white">
        <figure className="-mt-10 px-6 md:-mt-20">
          <div className="relative mx-auto aspect-[16/9] w-full max-w-[1200px] overflow-hidden md:aspect-[2/1]">
            <PostImage
              src={post.featuredImage}
              alt={post.title}
              priority
              className="object-cover"
              sizes="(max-width: 1248px) 100vw, 1200px"
            />
          </div>
        </figure>
      </div>

      {/* The body itself. Rendering it through the section rather than through
          a layout of its own is what keeps an article's copy and copy authored
          as a `richTextSection` the same thing: one measure, one set of margin
          rules, no drift. The article's own title lives in the dark header
          above, so no section heading is passed. */}
      <RichTextSection data={{ content: post.content }} />
    </article>
  );
}
