"use client";

import cx from "clsx";
import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { SectionHeader } from "@/components/ui/section-header";
import { VideoDialog } from "@/components/ui/video-dialog-portal";
import type { GrowthCardData } from "@/sanity/types";
import { GrowthCard } from "./growth-card";
import { useCarouselActive } from "@/hooks/use-carousel-active";

interface GrowthSpurtsProps {
  cards: GrowthCardData[];
}

export default function GrowthSpurts({ cards }: GrowthSpurtsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
    skipSnaps: false,
    breakpoints: {
      "(min-width: 768px)": { active: false },
    },
  });
  const activeIndex = useCarouselActive(emblaApi);

  const [selectedCard, setSelectedCard] = useState<GrowthCardData | null>(
    null,
  );

  const handleClose = (open: boolean) => {
    if (!open) {
      setSelectedCard(null);
    }
  };

  const handleCloseAutoFocus = (event: Event) => {
    event.preventDefault();

    if (!selectedCard) {
      return;
    }

    const index = cards.findIndex((card) => card.id === selectedCard.id);

    emblaApi?.slideNodes()[index]?.focus();
  };

  return (
    <section className="reveal mt-[80px] md:mt-[100px]">
      <div className="generic-container">
        <SectionHeader
          title="Growth Spurts"
          titleClassName="heading-h2-extrabold text-neutral-white-base"
          subtitle={<p className="body1-regular text-neutral-white-base" />}
          link="https://www.growthops.asia/work"
        />

        <div className="relative">
          <div
            ref={emblaRef}
            className="overflow-hidden md:overflow-visible"
          >
            <div className={cx("group/cards flex gap-5", "md:justify-between")}>
              {cards.map((card, index) => (
                <GrowthCard
                  key={card.id}
                  card={card}
                  isActive={index === activeIndex}
                  onClick={() => setSelectedCard(card)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <VideoDialog
        open={selectedCard !== null}
        title={selectedCard?.label ?? "Growth spurt video"}
        videoSrc={selectedCard?.videoSrc}
        onOpenChange={handleClose}
        onCloseAutoFocus={handleCloseAutoFocus}
      />
    </section>
  );
}
