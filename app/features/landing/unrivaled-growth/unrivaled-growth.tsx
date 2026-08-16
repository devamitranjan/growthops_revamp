"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { GrowthStatItem } from "./growth-stat-item";
import { stats } from "./unrivaled-growth.data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FADED = "rgba(245, 245, 245, 0.2)";
const SOLID = "rgba(245, 245, 245, 1)";
const GONE = "rgba(245, 245, 245, 0)";

const MOBILE_BREAKPOINT = 768;
const RED_PANEL_SHRINK_SCALE = 0.9125;
const RED_PANEL_BORDER_RADIUS = 50;

/** Fraction of the viewport width the heading's left edge docks at. */
const HEADING_DOCK_LEFT = 0.1;

export default function UnrivaledGrowth() {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gradientHeadingRef = useRef<HTMLHeadingElement>(null);
  const solidHeadingRef = useRef<HTMLHeadingElement>(null);
  const statRefs = useRef<(HTMLLIElement | null)[]>([]);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const isMobile = () => window.innerWidth < MOBILE_BREAKPOINT;

      // The heading sits at the middle of row 1, i.e. 25vh into the section.
      // The section's vertical middle is 50vh in, so it travels down 25vh and
      // left far enough to dock its left edge 10% in from the viewport edge.
      // On mobile there is no room to move sideways, so it drops straight
      // down instead and the stats stack underneath it.
      const tl = gsap.timeline({
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

      tl.to(
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
      gsap.set(cards, { y: enterY, color: GONE });
      gsap.set(ctaRef.current, { y: enterY, autoAlpha: 0 });

      const statsTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          // picks up exactly where the heading's tween finished
          start: "bottom bottom",
          // cards.length beats for the stats, one for the CTA, and half a
          // beat of hold so the docked CTA rests before the next section
          end: () => "+=" + window.innerHeight * (cards.length + 1.5) * 0.6,
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
            // it's created, stacking all five cards on top of each other.
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
      statsTl.fromTo(
        ctaRef.current,
        { y: enterY, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, immediateRender: false },
        cards.length,
      );

      // After the CTA has docked, the red background collapses inward while the
      // page background becomes visible around the shrinking panel.
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
        cards.length + 1.2,
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-background"
    >
      <div
        ref={backgroundRef}
        className="absolute inset-x-0 bottom-0 top-0 z-0 overflow-hidden rounded-[0px] bg-gradient-to-r from-primary-pink-extradark to-primary-pink-light"
      />

      <div className="relative z-10 grid min-h-screen grid-rows-2 text-white">
        <div className="flex items-center justify-center">
          <div ref={headingRef} className="relative z-20">
            <h2
              ref={gradientHeadingRef}
              className="heading-h2-bold gradient-text z-10 text-center"
            >
              Unrivaled Growth
            </h2>
            <h2
              ref={solidHeadingRef}
              className="heading-h2-bold absolute inset-0 z-20 text-center text-white"
            >
              Unrivaled Growth
            </h2>
          </div>
        </div>
        <div />

        <ul className="pointer-events-none absolute inset-0 z-10">
          {stats.map((item, i) => (
            <GrowthStatItem
              key={item.stat}
              item={item}
              ref={(el) => {
                statRefs.current[i] = el;
              }}
            />
          ))}
        </ul>

        <a
          ref={ctaRef}
          href="https://www.growthops.asia/work"
          className="body2-bold absolute z-10 rounded-[40px] border border-neutral-white-base bg-transparent px-10 py-3 text-white transition-colors duration-300 ease-out hover:bg-neutral-white-base hover:text-primary-pink-base max-md:top-[calc(50%+224px)] max-md:left-1/2 max-md:w-max max-md:-translate-x-1/2 md:top-[calc(50%+80px)] md:left-1/2"
        >
          View more results
        </a>
      </div>
    </section>
  );
}
