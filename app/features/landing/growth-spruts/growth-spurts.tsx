"use client";

import cx from "clsx";
import { useState } from "react";
import { SectionHeader } from "../../../shared/components/section-header";
import { VideoDialog } from "../../../shared/components/video-dialog-portal";
import { GrowthCard } from "./growth-card";
import { growthCards } from "./growth-spurts.data";
import { useHorizontalCarousel } from "../../../shared/hooks/use-horizontal-carousel";

export default function GrowthSpurts() {
  const { scrollRef, itemRefs, registerItem, activeIndex } =
    useHorizontalCarousel<HTMLDivElement>({ trackActiveItem: true });

  const [selectedCard, setSelectedCard] = useState<
    (typeof growthCards)[number] | null
  >(null);

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

    const index = growthCards.findIndex((card) => card.id === selectedCard.id);

    itemRefs.current[index]?.focus();
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
            ref={scrollRef}
            className={cx(
              "flex gap-5 overflow-x-auto snap-x snap-mandatory",
              "md:justify-between md:overflow-visible md:snap-none",
            )}
          >
            {growthCards.map((card, index) => (
              <GrowthCard
                key={card.id}
                card={card}
                isActive={index === activeIndex}
                cardRef={registerItem(index)}
                onClick={() => setSelectedCard(card)}
              />
            ))}
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
