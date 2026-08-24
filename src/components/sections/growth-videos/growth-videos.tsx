"use client";

import { useRef, useState } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { VideoDialog } from "@/components/ui/video-dialog-portal";
import type { GrowthVideoData, IGrowthVideosData } from "@/sanity/types";
import { GrowthVideoCard } from "./growth-video-card";

interface GrowthVideosProps {
  data: IGrowthVideosData;
}

export default function GrowthVideos({ data }: GrowthVideosProps) {
  const { title, subtitle, videos } = data;

  /* One id rather than a flag per card: the cards that recede are "every card
   * that is not this one", so the row only ever needs to know which is live. */
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<GrowthVideoData | null>(
    null,
  );
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const handleSelect = (video: GrowthVideoData, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setSelectedVideo(video);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedVideo(null);
    }
  };

  /* The dialog is portalled out of this subtree, so Radix has no trigger to
   * hand focus back to — send it to the card that opened the clip. */
  const handleCloseAutoFocus = (event: Event) => {
    event.preventDefault();
    triggerRef.current?.focus();
  };

  return (
    <section className="reveal mt-[80px] md:mt-[100px]">
      <div className="generic-container">
        <SectionHeader
          title={title}
          titleClassName="heading-h2-extrabold text-neutral-white-base"
          subtitle={
            subtitle ? (
              <p className="body1-regular text-neutral-white-base">
                {subtitle}
              </p>
            ) : undefined
          }
        />

        {/* justify-between rather than fixed columns: the cards keep their
            design width and spread across the row, so three sit as evenly as
            the four the schema allows. */}
        <div className="flex flex-wrap gap-x-8 gap-y-12 max-md:flex-col md:justify-between">
          {videos.map((video) => (
            <GrowthVideoCard
              key={video.id}
              video={video}
              isActive={activeId === video.id}
              isDimmed={activeId !== null && activeId !== video.id}
              onActivate={() => setActiveId(video.id)}
              onDeactivate={() => setActiveId(null)}
              onSelect={(trigger) => handleSelect(video, trigger)}
            />
          ))}
        </div>
      </div>

      <VideoDialog
        open={selectedVideo !== null}
        title={selectedVideo?.title ?? "Growth video"}
        videoSrc={selectedVideo?.videoSrc}
        onOpenChange={handleOpenChange}
        onCloseAutoFocus={handleCloseAutoFocus}
      />
    </section>
  );
}
