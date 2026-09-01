"use client";

import { clsx } from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";

interface HeroMediaProps {
  videoSrc?: string;
  videoType?: string;
  posterSrc: string;
}

/** `requestIdleCallback` where it exists, a short timer where it doesn't. */
const whenIdle = (run: () => void) =>
  typeof window.requestIdleCallback === "function"
    ? window.requestIdleCallback(run, { timeout: 2000 })
    : window.setTimeout(run, 200);

const cancelIdle = (handle: number) =>
  typeof window.cancelIdleCallback === "function"
    ? window.cancelIdleCallback(handle)
    : window.clearTimeout(handle);

/**
 * The hero's background layer.
 *
 * The poster is the LCP candidate, so when there is one it gets the first
 * paint to itself: the video element is not mounted until the page has
 * finished loading and the browser goes idle, and it fades in over the poster
 * once it can actually play. Both layers fill the same fixed-height parent and
 * the poster stays underneath for the life of the page, so the swap costs
 * neither a layout shift nor a flash of black.
 *
 * With no poster there is nothing to defer to, so the video loads eagerly.
 */
export const HeroMedia = ({ videoSrc, videoType, posterSrc }: HeroMediaProps) => {
  const deferVideo = Boolean(videoSrc && posterSrc);
  const [mountVideo, setMountVideo] = useState(!deferVideo);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (!deferVideo) return;

    let handle: number | undefined;
    const scheduleLoad = () => {
      handle = whenIdle(() => setMountVideo(true));
    };

    if (document.readyState === "complete") {
      scheduleLoad();
    } else {
      window.addEventListener("load", scheduleLoad, { once: true });
    }

    return () => {
      window.removeEventListener("load", scheduleLoad);
      if (handle !== undefined) cancelIdle(handle);
    };
  }, [deferVideo]);

  return (
    <>
      {posterSrc && (
        <Image
          src={posterSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      {videoSrc && mountVideo && (
        <video
          preload="auto"
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
          className={clsx(
            "absolute inset-0 h-full w-full object-cover",
            "transition-opacity duration-500 ease-out",
            videoReady ? "opacity-100" : "opacity-0",
          )}
        >
          <source src={videoSrc} type={videoType} />
        </video>
      )}
    </>
  );
};
