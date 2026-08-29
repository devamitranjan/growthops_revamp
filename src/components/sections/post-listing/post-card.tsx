import Link from "next/link";
import { PostImage } from "@/components/ui/post-image";
import { PostData } from "@/content/types";

interface PostCardProps {
  post: PostData;
  /** Posts whose body has been migrated open in-site; the rest still hand off
   *  to growthops.asia, so those stay plain anchors. */
  isMigrated: boolean;
  priority: boolean;
}

export function PostCard({ post, isMigrated, priority }: PostCardProps) {
  const CardLink = isMigrated ? Link : "a";

  return (
    <article>
      <CardLink
        href={isMigrated ? `/post/${post.slug}` : post.href}
        target="_self"
        className="block outline-none"
      >
        {/* The right gutter only exists to seat the rotated author label, so it
            starts at lg alongside it. */}
        <div className="lg:pr-8">
          <div className="relative">
            <div className="relative aspect-[16/9] overflow-hidden md:aspect-[2/1]">
              <PostImage
                src={post.imgSrc}
                alt={post.title}
                priority={priority}
                className="object-cover grayscale transition duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Tablet keeps the two-column grid but stacks the author under the
                image; the rotated side label is a desktop-only treatment. */}
            <p className="mt-1.5 text-base font-medium uppercase leading-[130%] text-[#bbbdbf] lg:absolute lg:bottom-0 lg:left-full lg:ml-2.5 lg:mt-0 lg:origin-left lg:translate-y-1/2 lg:-rotate-90 lg:whitespace-nowrap">
              {post.authorName}
            </p>
          </div>
        </div>

        {/* The title drives the highlight and the subtitle follows it via
            peer-hover — hovering the subtitle itself highlights nothing. */}
        <h2 className="peer mt-10 text-[28px] font-normal leading-tight text-neutral-white-base transition duration-300 ease-out hover:text-primary-pink-base md:mt-9 md:text-[32px] md:leading-[1.2]">
          {post.title}
        </h2>

        {post.subtitle && (
          <p className="body1-regular mt-5 leading-8 text-neutral-white-base/70 transition duration-300 ease-out peer-hover:text-primary-pink-base md:mt-7">
            {post.subtitle}
          </p>
        )}
      </CardLink>
    </article>
  );
}
