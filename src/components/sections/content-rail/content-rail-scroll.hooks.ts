"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import type { ContentRailCardData } from "@/content/types";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PINNED_MEDIA_QUERY =
  "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

/** Where the title comes to rest, as a fraction of the viewport height. */
const TITLE_DOCK = 0.5;

export function useContentRailScroll(cards: ContentRailCardData[]) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(PINNED_MEDIA_QUERY, () => {
        const pin = pinRef.current;
        const header = headerRef.current;
        const viewport = viewportRef.current;
        const track = trackRef.current;

        if (!pin || !header || !viewport || !track) return;

        const visibleWidth = () => {
          const styles = getComputedStyle(viewport);

          return (
            viewport.clientWidth -
            parseFloat(styles.paddingLeft) -
            parseFloat(styles.paddingRight)
          );
        };

        const distance = () => Math.max(1, track.scrollWidth - visibleWidth());

        const dockTop = () => {
          const headerBox = header.getBoundingClientRect();
          const railBelowTitle =
            pin.getBoundingClientRect().bottom -
            (headerBox.top + headerBox.height / 2);

          return Math.max(
            0,
            Math.min(
              window.innerHeight * TITLE_DOCK,
              window.innerHeight - railBelowTitle,
            ),
          );
        };

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            // The title is what docks, so the title is what the start is
            // measured from — the pin then holds the whole rail with it. The
            // cards share that start, which is what keeps their travel from
            // beginning while the title is still rising up the screen.
            trigger: header,
            start: () => "center " + dockTop() + "px",
            end: () => "+=" + distance(),
            pin,
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

  return { rootRef, pinRef, headerRef, viewportRef, trackRef };
}
