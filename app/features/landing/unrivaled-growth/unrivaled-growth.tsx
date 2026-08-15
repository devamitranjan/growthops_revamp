"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const statsData = [
  {
    id: 1,
    value: "817%",
    label: "increase in organic traffic with SEO services",
  },
  {
    id: 2,
    value: "100%",
    label: "increase in conversion with paid media services",
  },
  {
    id: 3,
    value: "180%",
    label: "improvement in brand sentiment with creative services",
  },
  {
    id: 4,
    value: "71%",
    label: "reduction in Cost Per Lead with performance marketing services",
  },
  {
    id: 5,
    isFinal: true,
    value: "96%",
    label: "faster campaign launches with platform development services",
  },
];

export default function UnrivaledGrowthSection() {
  const containerRef = useRef(null);

  // Track overall scroll progress inside the 400vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Header diagonal trajectory (Center -> Left Dock) during initial 0% - 15% scroll
  const headerX = useTransform(scrollYProgress, [0, 0.15], ["20vw", "0vw"]);
  const headerY = useTransform(scrollYProgress, [0, 0.15], ["-15vh", "0vh"]);
  const headerScale = useTransform(scrollYProgress, [0, 0.15], [1.3, 1]);

  // Metrics crossfade one at a time: each item's exit window is the same
  // scroll range as the next item's enter window, so for a moment both are
  // dimly visible together, then the new one settles ("docks") at full opacity.
  const slide1Opacity = useTransform(
    scrollYProgress,
    [0.15, 0.19, 0.28, 0.32],
    [0, 1, 1, 0],
  );
  const slide1Y = useTransform(
    scrollYProgress,
    [0.15, 0.19, 0.28, 0.32],
    [28, 0, 0, -28],
  );

  const slide2Opacity = useTransform(
    scrollYProgress,
    [0.28, 0.32, 0.41, 0.45],
    [0, 1, 1, 0],
  );
  const slide2Y = useTransform(
    scrollYProgress,
    [0.28, 0.32, 0.41, 0.45],
    [28, 0, 0, -28],
  );

  const slide3Opacity = useTransform(
    scrollYProgress,
    [0.41, 0.45, 0.54, 0.58],
    [0, 1, 1, 0],
  );
  const slide3Y = useTransform(
    scrollYProgress,
    [0.41, 0.45, 0.54, 0.58],
    [28, 0, 0, -28],
  );

  const slide4Opacity = useTransform(
    scrollYProgress,
    [0.54, 0.58, 0.67, 0.71],
    [0, 1, 1, 0],
  );
  const slide4Y = useTransform(
    scrollYProgress,
    [0.54, 0.58, 0.67, 0.71],
    [28, 0, 0, -28],
  );

  const slide5Opacity = useTransform(
    scrollYProgress,
    [0.67, 0.71, 1.0],
    [0, 1, 1],
  );
  const slide5Y = useTransform(scrollYProgress, [0.67, 0.71, 1.0], [28, 0, 0]);

  // "View more results" docks below the last metric only once it has been
  // settled for a while — a clean gap after 0.71 so the two never overlap.
  // The hold segment must reach all the way to 1.0 (not stop at 0.88):
  // scroll-linked transforms here compile to native scroll-timeline
  // animations, and a range that ends before the scroll domain's end
  // reverts to its base value once scrolled past — which made the button
  // flash in and then fade back out.
  const buttonOpacity = useTransform(
    scrollYProgress,
    [0.8, 0.88, 1.0],
    [0, 1, 1],
  );
  const buttonY = useTransform(scrollYProgress, [0.8, 0.88, 1.0], [24, 0, 0]);

  // Red panel is already full-bleed; it fades in once, then stays fully opaque
  // (explicit flat keyframes through 1.0 so it can never dim again mid-scroll)
  const bgOpacity = useTransform(scrollYProgress, [0, 0.15, 1], [0, 1, 1]);

  // Once "View more results" has docked, the panel shrinks inward into a
  // rounded card (stays fully opaque — only its edges pull in, revealing
  // black behind it)
  const bgInset = useTransform(scrollYProgress, [0.62, 1.0], ["0px", "5.25%"]);
  const bgRadius = useTransform(scrollYProgress, [0.62, 1.0], ["0px", "40px"]);
  // Heading gradient fades out as metrics appear (from 0.15 to 0.28)
  const headingGradientOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.28, 1],
    [1, 0, 0],
  );
  const headingWhiteOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.28, 1],
    [0, 1, 1],
  );

  const slideMotionStyles = [
    { opacity: slide1Opacity, y: slide1Y },
    { opacity: slide2Opacity, y: slide2Y },
    { opacity: slide3Opacity, y: slide3Y },
    { opacity: slide4Opacity, y: slide4Y },
    { opacity: slide5Opacity, y: slide5Y },
  ];

  return (
    <div ref={containerRef} className="relative h-[400vh] text-white">
      {/* Pinned Sticky Viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Red Panel Background */}
        <motion.div
          style={{
            opacity: bgOpacity,
            inset: bgInset,
            borderRadius: bgRadius,
          }}
          className="absolute z-0 bg-[#C4003E]"
        />

        {/* Content (constrained to the site's max-width container) */}
        <div className="generic-container relative z-10 flex h-full items-center justify-between px-12 md:px-24">
          {/* Animated Diagonal Heading */}
          <div className="relative">
            <motion.h2
              style={{
                x: headerX,
                y: headerY,
                scale: headerScale,
                opacity: headingGradientOpacity,
              }}
              className="heading-h1-bold text-center gradient-text"
            >
              Unrivaled Growth
            </motion.h2>
            <motion.h2
              style={{
                x: headerX,
                y: headerY,
                scale: headerScale,
                opacity: headingWhiteOpacity,
              }}
              className="heading-h1-bold text-center text-white absolute inset-0"
            >
              Unrivaled Growth
            </motion.h2>
          </div>

          {/* Content Container for Metrics */}
          <div className="relative w-full max-w-lg h-72 flex flex-col justify-center">
            {statsData.map((metric, index) => (
              <motion.div
                key={metric.id}
                style={{
                  opacity: slideMotionStyles[index].opacity,
                  y: slideMotionStyles[index].y,
                }}
                className="absolute inset-0 flex flex-col justify-center pointer-events-none"
              >
                <div className="relative">
                  <div className="flex items-center space-x-6">
                    <span className="text-5xl md:text-6xl font-extrabold tracking-tight min-w-[160px]">
                      {metric.value}
                    </span>
                    <p className="text-sm md:text-base font-medium opacity-90 leading-snug max-w-xs">
                      {metric.label}
                    </p>
                  </div>

                  {/* Final Metric Action Button — docks below once 96% has settled */}
                  {metric.isFinal && (
                    <motion.div
                      style={{ opacity: buttonOpacity, y: buttonY }}
                      className="absolute left-0 top-full mt-8 pointer-events-auto"
                    >
                      <button className="px-6 py-2.5 border border-white rounded-full text-xs font-semibold tracking-wide hover:bg-white hover:text-[#C4003E] transition-all duration-300">
                        View more results
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
