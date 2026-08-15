"use client";

import { useHorizontalCarousel } from "../../../shared/hooks/use-horizontal-carousel";
import { SectionHeader } from "../../../shared/components/section-header";
import { ScrollArrowButton } from "../../../shared/components/scroll-arrow-button";
import { ArticleCard } from "./article-card";
import { articles } from "./article-cards.data";

export default function ArticleCards() {
  const {
    scrollRef,
    registerItem,
    canScrollLeft,
    canScrollRight,
    scroll,
    activeIndex,
  } = useHorizontalCarousel<HTMLDivElement>({ trackActiveItem: true });

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
        {canScrollLeft && (
          <ScrollArrowButton direction="left" onClick={() => scroll("left")} />
        )}

        {canScrollRight && (
          <ScrollArrowButton
            direction="right"
            onClick={() => scroll("right")}
          />
        )}

        {/* CARDS */}
        <div
          ref={scrollRef}
          className="flex gap-[18px] overflow-x-auto scroll-smooth snap-x snap-mandatory pl-5 pr-5 md:gap-8 md:pl-0 md:pr-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {articles.map((article, index) => (
            <ArticleCard
              key={article.href}
              article={article}
              isActive={index === activeIndex}
              cardRef={registerItem(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
