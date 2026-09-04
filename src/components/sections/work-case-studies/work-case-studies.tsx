"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { WorkCaseStudyItem } from "@/content/types";

interface WorkCaseStudiesProps {
  items: WorkCaseStudyItem[];
  categories?: string[];
  itemsPerPage?: number | null;
}

export default function WorkCaseStudies({
  items,
  categories: definedCategories,
  itemsPerPage,
}: WorkCaseStudiesProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const pageSize = itemsPerPage && itemsPerPage > 0 ? itemsPerPage : 6;
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const categories = useMemo(() => {
    if (definedCategories?.length) {
      return ["All", ...definedCategories];
    }
    const cats = new Set(items.map((item) => item.category));
    return ["All", ...Array.from(cats).sort()];
  }, [items, definedCategories]);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMoreItems = visibleCount < filteredItems.length;

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(pageSize);
  };

  return (
    <section className="reveal work-case-studies-wrapper bg-background">
      <div className="generic-container py-16 md:py-24">
        {/* Filter */}
        <div className="mb-12 md:mb-16">
          <div className="flex flex-wrap gap-2 md:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={[
                  "body2-semibold md:body1-semibold px-4 py-2 md:px-6 md:py-3 rounded transition-colors duration-200",
                  activeCategory === category
                    ? "text-white bg-primary-pink-base"
                    : "text-neutral-gray-light border border-neutral-gray-light hover:text-white hover:border-primary-pink-base",
                ].join(" ")}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {visibleItems.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-lg bg-neutral-black-darker transition-transform duration-300 hover:scale-105"
            >
              <Link href={item.href ?? "#"}>
                <div className="relative overflow-hidden bg-neutral-gray-dark aspect-video">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div>
                  <h6 className="body2-regular md:body1-regular text-neutral-gray-light py-2">
                    {item.description?.toUpperCase()}
                  </h6>
                  <h3 className="heading-h4-bold md:heading-h3-bold mb-2 text-white">
                    {item.title}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {hasMoreItems && (
          <div className="mt-12 flex justify-center md:mt-16">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + pageSize)}
              className="flex aspect-square w-44 items-center justify-center rounded-full bg-white px-8 text-center body1-bold text-neutral-black-base transition-transform duration-300 hover:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-pink-base md:w-56"
            >
              VIEW MORE
            </button>
          </div>
        )}

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="py-12 text-center">
            <p className="body1-regular text-neutral-gray-light">
              No case studies found for this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
