"use client";

import { useState } from "react";
import { VideoDialog } from "@/components/ui/video-dialog-portal";
import { GrowthVideoCard } from "./growth-video-card";

interface GrowthVideoCardData {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  videoSrc: string;
  alt: string;
}

interface GrowthVideoProps {
  title: string;
  subtitle: string;
  cards: GrowthVideoCardData[];
}

export function GrowthVideo({ title, subtitle, cards }: GrowthVideoProps) {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<GrowthVideoCardData | null>(
    null,
  );

  const desktopColumns = Math.min(cards.length, 4);

  return (
    <>
      <section className="bg-background px-6 py-16">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white md:text-5xl">
              {title}
            </h2>

            {subtitle && (
              <p className="mt-4 max-w-4xl text-base text-white md:text-lg">
                {subtitle}
              </p>
            )}
          </div>

          <div
            className="grid gap-x-12 gap-y-12 sm:grid-cols-2"
            style={{
              gridTemplateColumns: `repeat(${desktopColumns}, minmax(0, 1fr))`,
            }}
          >
            {cards.map((card) => (
              <GrowthVideoCard
                key={card.id}
                card={card}
                isHovered={hoveredCardId === card.id}
                hasHoveredCard={hoveredCardId !== null}
                onHover={() => setHoveredCardId(card.id)}
                onLeave={() => setHoveredCardId(null)}
                onClick={() => setSelectedCard(card)}
              />
            ))}
          </div>
        </div>
      </section>

      {selectedCard && (
        <VideoDialog
          open={true}
          title={selectedCard.title}
          videoSrc={selectedCard.videoSrc}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedCard(null);
            }
          }}
        />
      )}
    </>
  );
}
