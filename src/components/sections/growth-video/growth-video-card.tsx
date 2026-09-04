"use client";

import { useRef, useState } from "react";

interface GrowthVideoCardData {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  videoSrc: string;
  alt: string;
}

interface GrowthVideoCardProps {
  card: GrowthVideoCardData;
  isHovered: boolean;
  hasHoveredCard: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

export function GrowthVideoCard({
  card,
  isHovered,
  hasHoveredCard,
  onHover,
  onLeave,
  onClick,
}: GrowthVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handleMouseEnter = async () => {
    onHover();

    if (!videoRef.current) return;

    try {
      await videoRef.current.play();
      setPlaying(true);
    } catch (error) {
      console.error("Video playback failed:", error);
    }
  };

  const handleMouseLeave = () => {
    onLeave();

    if (!videoRef.current) return;

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setPlaying(false);
  };

  const handleClick = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    setPlaying(false);
    onClick();
  };

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={[
        "cursor-pointer transition-all duration-300",
        hasHoveredCard && !isHovered
          ? "opacity-40 blur-[3px]"
          : "opacity-100 blur-0",
      ].join(" ")}
    >
      <div className="relative aspect-[3/5] overflow-hidden rounded-2xl bg-black">
        <video
          ref={videoRef}
          src={card.videoSrc}
          poster={card.imageSrc}
          className="h-full w-full object-cover"
          playsInline
          preload="metadata"
          muted
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />

        <div className="pointer-events-none absolute inset-0 bg-black/20" />

        {!playing && !isHovered && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
              <span className="ml-1 text-2xl text-black">▶</span>
            </span>
          </div>
        )}
      </div>

      {card.description && (
        <p className="mt-8 text-base leading-relaxed text-white">
          {card.description}
        </p>
      )}
    </article>
  );
}
