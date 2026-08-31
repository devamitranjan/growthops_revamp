"use client";

import type { ReactNode } from "react";

import type { ContentRailCardData } from "@/content/types";

import { ContentRailCard } from "./content-rail-card";
import { useContentRailScroll } from "./content-rail-scroll.hooks";

interface ContentRailScrollProps {
  cards: ContentRailCardData[];
  children: ReactNode;
}

export function ContentRailScroll({ cards, children }: ContentRailScrollProps) {
  const { rootRef, pinRef, headerRef, viewportRef, trackRef } =
    useContentRailScroll(cards);

  return (
    <div ref={rootRef}>
      <div ref={pinRef} className="flex flex-col">
        <div ref={headerRef} className="generic-container">
          {children}
        </div>

        <div
          ref={viewportRef}
          className="content-rail-viewport generic-container mt-6 md:mt-10 md:py-2"
        >
          <ul
            ref={trackRef}
            className="content-rail-track flex flex-col gap-6 md:w-max md:flex-row md:items-stretch md:gap-8"
          >
            {cards.map((card, index) => (
              <ContentRailCard key={card.id} card={card} index={index} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
