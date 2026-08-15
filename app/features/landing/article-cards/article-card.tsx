"use client";

import cx from "clsx";
import Image from "next/image";
import { ArticleData } from "./article-cards.types";

interface ArticleCardProps {
  article: ArticleData;
  isActive: boolean;
  cardRef?: (element: HTMLAnchorElement | null) => void;
}

export function ArticleCard({ article, isActive, cardRef }: ArticleCardProps) {
  return (
    <a
      ref={cardRef}
      href={article.href}
      target="_self"
      className={cx(
        "w-80 shrink-0 snap-center transition duration-500 ease-out md:w-[272px]",
        isActive
          ? "max-md:scale-100 max-md:opacity-100 max-md:blur-none"
          : "max-md:scale-90 max-md:opacity-50 max-md:blur-[1px]",
      )}
    >
      {/* OUTER CARD */}
      <div className="group h-full cursor-pointer rounded-xl bg-transparent p-[1.5px] transition duration-300 ease-out hover:bg-gradient-to-r hover:from-pink-600 hover:to-pink-400">
        {/* INNER CARD */}
        <div className="h-full rounded-xl bg-[#111315]">
          <div className="flex h-full flex-col gap-2 rounded-xl bg-white/[0.04] p-2.5 pb-4 transition duration-300 ease-out group-hover:bg-white/[0.08] md:gap-1">
            {/* IMAGE */}
            <div className="relative h-[240px] overflow-hidden rounded-xl md:h-[260px]">
              {/* TAG */}
              <div className="absolute bottom-0 left-0 z-20 rounded-tr-lg bg-[#FA3C6F]">
                <p className="px-3 py-1 text-xs font-bold text-white md:text-sm">
                  {article.tag}
                </p>
              </div>

              <Image
                src={article.imgSrc}
                alt={article.alt}
                fill
                priority
                className="object-cover transition duration-300 ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>

            {/* TITLE */}
            <p className="text-left text-base font-semibold text-white md:text-lg">
              {article.title}
            </p>

            {/* DATE */}
            <p className="text-xs text-white/70 md:text-sm">{article.date}</p>
          </div>
        </div>
      </div>
    </a>
  );
}
