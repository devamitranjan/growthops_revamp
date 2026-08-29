"use client";

import { useCallback, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { IUnrivaledGrowthData } from "@/content/types";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FADED = "rgba(245, 245, 245, 0.2)";
const SOLID = "rgba(245, 245, 245, 1)";
const GONE = "rgba(245, 245, 245, 0)";

const MOBILE_BREAKPOINT = 768;
const RED_PANEL_SHRINK_SCALE = 0.9125;
const RED_PANEL_BORDER_RADIUS = 50;

/** Fraction of the viewport width the heading's left edge docks at. */
const HEADING_DOCK_LEFT = 0.1;

/** Scroll distance, in viewports, that one stat takes to enter and dock. */
const BEAT_LENGTH = 0.6;

/**
 * Drives the section's scroll choreography and hands back the refs the markup
 * has to attach. Everything is derived from the data, so the timeline stretches
 * to however many stats there are and drops a beat when there is no CTA.
 */
export function useUnrivaledGrowthAnimation({
  stats,
  cta,
}: Pick<IUnrivaledGrowthData, "stats" | "cta">) {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const solidHeadingRef = useRef<HTMLHeadingElement>(null);
  const statRefs = useRef<(HTMLLIElement | null)[]>([]);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const registerStat = useCallback(
    (index: number) => (el: HTMLLIElement | null) => {
      statRefs.current[index] = el;
    },
    [],
  );

  useGSAP(
    () => {
      const isMobile = () => window.innerWidth < MOBILE_BREAKPOINT;

      // The heading sits at the middle of row 1, i.e. 25vh into the section.
      // The section's vertical middle is 50vh in, so it travels down 25vh and
      // left far enough to dock its left edge 10% in from the viewport edge.
      // On mobile there is no room to move sideways, so it drops straight
      // down instead and the stats stack underneath it.
      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          // starts the moment the section's second half begins to load...
          start: "center bottom",
          // ...and finishes once the section is entirely on screen.
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });

      headingTl
        .to(
          headingRef.current,
          {
            x: () => {
              if (isMobile()) return 0;
              const width = headingRef.current?.offsetWidth ?? 0;
              return (
                window.innerWidth * HEADING_DOCK_LEFT -
                (window.innerWidth - width) / 2
              );
            },
            y: () => window.innerHeight * 0.25,
          },
          0,
        )
        .fromTo(
          backgroundRef.current,
          { opacity: 0, top: "80px" },
          { opacity: 1, top: 0 },
          0,
        )
        .fromTo(solidHeadingRef.current, { autoAlpha: 0 }, { autoAlpha: 1 }, 0);

      // Stats enter from the middle of the section's second half, dock on the
      // heading's line, then leave through the middle of the first half.
      const enterY = () => window.innerHeight * 0.125;
      const exitY = () => -window.innerHeight * 0.125;

      const cards = statRefs.current.filter(Boolean) as HTMLLIElement[];
      const ctaEl = ctaRef.current;

      gsap.set(cards, { y: enterY, color: GONE });
      if (ctaEl) gsap.set(ctaEl, { y: enterY, autoAlpha: 0 });

      // One beat per stat, one more for the CTA when there is one, and half a
      // beat of hold so whatever docked last rests before the next section.
      const beats = cards.length + (ctaEl ? 1 : 0) + 0.5;

      const statsTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          // picks up exactly where the heading's tween finished
          start: "bottom bottom",
          end: () => "+=" + window.innerHeight * beats * BEAT_LENGTH,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });

      cards.forEach((card, i) => {
        statsTl.fromTo(
          card,
          { y: enterY, color: FADED },
          {
            y: 0,
            color: SOLID,
            duration: 1,
            // Without this every fromTo paints its "from" state the moment
            // it's created, stacking all the cards on top of each other.
            immediateRender: i === 0,
          },
          i,
        );
        // Each card clears out as the next one arrives — except the last,
        // which stays docked.
        if (i < cards.length - 1) {
          statsTl.to(card, { y: exitY, color: GONE, duration: 1 }, i + 1);
        }
      });

      // Once the last stat has settled, the CTA rises into place under it.
      if (ctaEl) {
        statsTl.fromTo(
          ctaEl,
          { y: enterY, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1, immediateRender: false },
          cards.length,
        );
      }

      // After the last element has docked, the red background collapses inward
      // while the page background becomes visible around the shrinking panel.
      gsap.set(backgroundRef.current, {
        borderRadius: 0,
        transformOrigin: "center center",
      });
      statsTl.to(
        backgroundRef.current,
        {
          scale: RED_PANEL_SHRINK_SCALE,
          borderRadius: RED_PANEL_BORDER_RADIUS,
          duration: 1.2,
          ease: "none",
        },
        beats - 0.3,
      );
    },
    { scope: sectionRef, dependencies: [stats, cta] },
  );

  return {
    sectionRef,
    backgroundRef,
    headingRef,
    solidHeadingRef,
    ctaRef,
    registerStat,
  };
}
