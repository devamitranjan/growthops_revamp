"use client";

import Image from "next/image";
import clsx from "clsx";

import { LogoData } from "@/content/types";

/**
 * How many logos a belt needs before it is guaranteed to overrun the widest
 * viewport. A short row is simply repeated more often, so the wrap point never
 * shows up as a gap.
 */
const MIN_LOGOS_PER_TRACK = 14;

interface TechMarqueeRowProps {
  logos: LogoData[];
  /** Attaches the belt to the shared ticker in `useTechMarquee`. */
  trackRef: (el: HTMLDivElement | null) => void;
  className?: string;
}

export function TechMarqueeRow({
  logos,
  trackRef,
  className,
}: TechMarqueeRowProps) {
  const copies = Math.max(2, Math.ceil(MIN_LOGOS_PER_TRACK / logos.length));

  return (
    <div className={clsx("h-[104px] overflow-hidden md:h-[106px]", className)}>
      <div
        ref={trackRef}
        className="flex h-full w-max items-center will-change-transform"
      >
        {Array.from({ length: copies }, (_, copy) => (
          <ul
            key={copy}
            className="flex h-full shrink-0 items-center"
            // Only the first copy is real content; the rest exist to keep the
            // belt seamless and would otherwise be read out over and over.
            aria-hidden={copy > 0}
          >
            {logos.map((logo) => (
              <li
                key={logo.id}
                className="relative mx-8 h-[48px] w-[175px] shrink-0 md:mx-14 md:h-[74px] md:w-[260px]"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="(min-width: 768px) 260px, 175px"
                  loading={copy === 0 ? "eager" : "lazy"}
                  className="object-contain"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
