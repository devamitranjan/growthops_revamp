"use client";

import { useState } from "react";
import Image from "next/image";

interface PostImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

/**
 * Post artwork lives in /public/post and is still being migrated, so a missing
 * file must not render as a broken-image icon in the middle of the grid.
 * Falling back to the brand gradient keeps the card's shape and rhythm intact.
 */
export function PostImage({
  src,
  alt,
  priority = false,
  className,
  sizes,
}: PostImageProps) {
  const [hasFailed, setHasFailed] = useState(false);

  if (hasFailed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="h-full w-full bg-gradient-to-br from-primary-pink-extradark via-primary-pink-light to-primary-blue-extradark"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      // `priority` is deprecated in Next 16; eager + high fetch priority is the
      // recommended replacement for an image that may be the LCP element.
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      onError={() => setHasFailed(true)}
      className={className}
      sizes={sizes}
    />
  );
}
