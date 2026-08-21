"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCarouselButtons } from "@/hooks/use-carousel-buttons";
import { useCarouselActive } from "@/hooks/use-carousel-active";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollArrowButton } from "@/components/ui/scroll-arrow-button";
import type { ArticleData } from "@/sanity/types";
import { ArticleCard } from "./article-card";

interface ArticleCardsProps {
  articles: ArticleData[];
}

export default function ArticleCards({ articles }: ArticleCardsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
    skipSnaps: false,
  });
  const activeIndex = useCarouselActive(emblaApi);
  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } =
    useCarouselButtons(emblaApi);

  return (
    <section className="reveal mt-[80px] md:mt-[100px]">
      <div className="mx-auto w-full max-w-[1366px] px-5 md:px-20">
        <SectionHeader
          title="Accelerate Your Learning Curve"
          titleClassName="heading-h2-bold max-w-[300px] text-4xl font-extrabold leading-[1.05] text-white max-md:text-[22px] md:max-w-none md:text-5xl"
          link="https://www.growthops.asia/post"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1366px] md:px-20">
        {canScrollPrev && (
          <ScrollArrowButton direction="left" onClick={scrollPrev} />
        )}

        {canScrollNext && (
          <ScrollArrowButton direction="right" onClick={scrollNext} />
        )}

        {/* CARDS */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-[18px] pl-5 pr-5 md:gap-8 md:pl-0 md:pr-0">
            {articles.map((article, index) => (
              <ArticleCard
                key={article.href}
                article={article}
                isActive={index === activeIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
