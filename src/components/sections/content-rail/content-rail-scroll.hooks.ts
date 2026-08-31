"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import type { ContentRailCardData } from "@/content/types";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PINNED_MEDIA_QUERY =
  "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

export function useContentRailScroll(cards: ContentRailCardData[]) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(PINNED_MEDIA_QUERY, () => {
        const pin = pinRef.current;
        const viewport = viewportRef.current;
        const track = trackRef.current;

        if (!pin || !viewport || !track) return;

        const visibleWidth = () => {
          const styles = getComputedStyle(viewport);

          return (
            viewport.clientWidth -
            parseFloat(styles.paddingLeft) -
            parseFloat(styles.paddingRight)
          );
        };

        const distance = () => Math.max(1, track.scrollWidth - visibleWidth());

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: () =>
              pin.offsetHeight >= window.innerHeight
                ? "bottom bottom"
                : "top top",
            end: () => "+=" + distance(),
            pin: true,
            anticipatePin: 1,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        let lastWidth = track.scrollWidth;

        const resizeObserver = new ResizeObserver(() => {
          if (track.scrollWidth === lastWidth) return;

          lastWidth = track.scrollWidth;
          ScrollTrigger.refresh();
        });

        resizeObserver.observe(track);

        const pinScrollLeft = () => {
          if (viewport.scrollLeft !== 0) viewport.scrollLeft = 0;
        };

        const revealFocusedCard = (event: FocusEvent) => {
          const card = (
            event.target as HTMLElement | null
          )?.closest<HTMLElement>("[data-content-rail-card]");

          const trigger = tween.scrollTrigger;
          if (!card || !trigger) return;

          const travel = distance();
          const offset = Math.min(
            card.getBoundingClientRect().left -
              track.getBoundingClientRect().left,
            travel,
          );
          const progress = offset / travel;

          pinScrollLeft();
          window.scrollTo({
            top: trigger.start + progress * (trigger.end - trigger.start),
          });
        };

        viewport.addEventListener("scroll", pinScrollLeft);
        track.addEventListener("focusin", revealFocusedCard);

        return () => {
          resizeObserver.disconnect();
          viewport.removeEventListener("scroll", pinScrollLeft);
          track.removeEventListener("focusin", revealFocusedCard);
        };
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [cards] },
  );

  return { rootRef, pinRef, viewportRef, trackRef };
}
