"use client";

import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { TechMarqueeRowData } from "@/sanity/types";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Resting speed, in px/s, for a row the CMS leaves blank. */
const DEFAULT_SPEED = 45;

/** px/s of marquee speed gained per px/s of page scroll. */
const SCROLL_BOOST = 0.4;

/** Ceiling on the combined speed, so a flicked wheel cannot smear the logos. */
const MAX_SPEED = 1400;

/**
 * Seconds the speed takes to close ~63% of the gap to its target. This is what
 * turns a direction change into a decelerate-and-turn rather than a jump: it is
 * the *signed* speed that gets eased, so every reversal passes through zero.
 */
const EASE_TIME = 0.3;

/**
 * `getVelocity()` only refreshes while the page is actually moving, so a stale
 * reading would keep the rows racing after the scroll stopped. A reading older
 * than this counts as standing still.
 */
const SCROLL_IDLE = 0.1;

/** A frame-rate independent `current += (target - current) * t`. */
const easeTowards = (current: number, target: number, dt: number) =>
  current + (target - current) * (1 - Math.exp(-dt / EASE_TIME));

/**
 * Drives every belt in the card from one ticker and one ScrollTrigger.
 *
 * Each row keeps its own resting speed, so the belts never line up. Scrolling
 * takes over both speed and direction for all of them at once: down drives the
 * logos left and up drives them right, faster the harder the page is flung.
 * Once the page settles, each row eases back to its own resting drift.
 */
export function useTechMarquee(rows: TechMarqueeRowData[]) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);

  // The ticker is set up once but reads the current row config every frame.
  const rowsRef = useRef(rows);
  useEffect(() => {
    rowsRef.current = rows;
  }, [rows]);

  const registerTrack = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      trackRefs.current[index] = el;
    },
    [],
  );

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tracks = trackRefs.current.filter((track) => track !== null);
      if (!tracks.length) return;

      // A track holds several identical copies of the row, so shifting it by
      // exactly one copy lands on a pixel-identical arrangement. That copy
      // width — not the track width — is the wrap distance.
      const copyWidth = (track: HTMLDivElement) =>
        (
          track.firstElementChild as HTMLElement | null
        )?.getBoundingClientRect().width ?? 0;

      const spans = tracks.map(copyWidth);
      const offsets = tracks.map(() => 0);
      const speeds = tracks.map(() => 0);
      const setX = tracks.map(
        (track) => gsap.quickSetter(track, "x", "px") as (value: number) => void,
      );

      // Logos land asynchronously and the row reflows on resize; either way the
      // wrap distance moves under us.
      const resizeObserver = new ResizeObserver(() => {
        tracks.forEach((track, index) => {
          spans[index] = copyWidth(track);
        });
      });
      tracks.forEach((track) => resizeObserver.observe(track));

      /** Page scroll speed, unsigned, in px/s. */
      let scrollSpeed = 0;
      /** Which way the scroll is currently pushing the belts. */
      let scrollSign = -1;
      let lastScrollAt = -Infinity;

      const scrollWatcher = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          scrollSpeed = Math.abs(self.getVelocity());
          // Scrolling down (direction 1) sends the logos left, and up right.
          if (self.direction) scrollSign = -self.direction;
          lastScrollAt = gsap.ticker.time;
        },
      });

      const tick = (time: number, deltaTime: number) => {
        // Nothing to move while the card is off screen.
        if (!scrollWatcher.isActive) return;

        // A backgrounded tab hands back one huge delta; clamp it so no row
        // teleports halfway down the belt on the first frame back.
        const dt = Math.min(deltaTime, 50) / 1000;
        if (time - lastScrollAt > SCROLL_IDLE) scrollSpeed = 0;

        tracks.forEach((_, index) => {
          const span = spans[index];
          if (!span) return;

          const row = rowsRef.current[index];
          const resting = row?.speed ?? DEFAULT_SPEED;
          // While the page moves every row follows the scroll; standing still,
          // each row falls back to drifting its own way.
          const sign =
            scrollSpeed > 0 ? scrollSign : row?.direction === "right" ? 1 : -1;

          const target =
            sign * Math.min(resting + scrollSpeed * SCROLL_BOOST, MAX_SPEED);

          speeds[index] = easeTowards(speeds[index], target, dt);
          offsets[index] = gsap.utils.wrap(
            -span,
            0,
            offsets[index] + speeds[index] * dt,
          );
          setX[index](offsets[index]);
        });
      };

      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        resizeObserver.disconnect();
        scrollWatcher.kill();
      };
    },
    { scope: sectionRef },
  );

  return { sectionRef, registerTrack };
}
