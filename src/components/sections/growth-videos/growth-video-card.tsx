"use client";

import cx from "clsx";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { FaPlay } from "react-icons/fa6";
import type { GrowthVideoData } from "@/sanity/types";

interface GrowthVideoCardProps {
  video: GrowthVideoData;
  /** This card is the one being hovered or focused. */
  isActive: boolean;
  /** Another card is active, so this one recedes. */
  isDimmed: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  /** Hands the parent the trigger so focus can return here when the dialog
   *  closes — the dialog lives outside this subtree, so Radix cannot do it. */
  onSelect: (trigger: HTMLButtonElement) => void;
}

export function GrowthVideoCard({
  video,
  isActive,
  isDimmed,
  onActivate,
  onDeactivate,
  onSelect,
}: GrowthVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  /* The preview follows `isActive` rather than the pointer, so a card reached
   * by keyboard plays the same way a hovered one does. A rejected play() is
   * expected — autoplay policies, or the pointer leaving before the clip is
   * ready — and leaves the thumbnail in place, which is the resting state
   * anyway. */
  useEffect(() => {
    const element = videoRef.current;

    if (!element) {
      return;
    }

    if (isActive) {
      element.currentTime = 0;
      element.play().catch(() => {});
      return;
    }

    element.pause();
    element.currentTime = 0;
  }, [isActive]);

  return (
    <button
      type="button"
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      onClick={(event) => onSelect(event.currentTarget)}
      aria-label={`Play video: ${video.title}`}
      className={cx(
        "group flex cursor-pointer flex-col text-left",
        "w-full max-md:mx-auto max-md:max-w-[320px] md:w-[277px]",
        "transition duration-500 ease-out",
        "focus-visible:outline-none",
        isDimmed && "opacity-40 blur-[3px]",
        isActive && "md:scale-[1.02]",
      )}
    >
      <div
        className={cx(
          "relative aspect-[9/16] w-full overflow-hidden rounded-[22px] bg-neutral-black-light",
          "transition duration-300 ease-out",
          "group-focus-visible:ring-2 group-focus-visible:ring-primary-pink-base",
        )}
      >
        <Image
          src={video.thumbnail}
          alt={video.alt}
          fill
          sizes="(max-width: 768px) 320px, 277px"
          className={cx(
            "object-cover transition-opacity duration-500",
            isActive ? "opacity-0" : "opacity-100",
          )}
        />

        {/* A card with no clip yet is a half-filled draft — it still shows its
            thumbnail rather than mounting an empty <video>. */}
        {video.videoSrc && (
          <video
            ref={videoRef}
            src={video.videoSrc}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
            className={cx(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
              isActive ? "opacity-100" : "opacity-0",
            )}
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-black-light via-neutral-black-light/20 to-transparent" />

        <div
          aria-hidden="true"
          className={cx(
            "pointer-events-none absolute left-1/2 top-1/2 flex h-14 w-14",
            "-translate-x-1/2 -translate-y-1/2 items-center justify-center",
            "rounded-full bg-neutral-white-base text-neutral-black-base",
            "transition-transform duration-300 ease-out",
            isActive && "scale-110",
          )}
        >
          <FaPlay className="ml-1 text-lg" />
        </div>
      </div>

      <p className="mt-6 body1-regular text-neutral-white-base">
        {video.description}
      </p>
    </button>
  );
}
