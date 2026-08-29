"use client";

import { useEffect, useMemo, useState } from "react";

import { ITeamSectionData } from "@/content/types";

/** How long a batch of members holds before the next one slides in. */
const ROTATION_INTERVAL_MS = 4000;

/**
 * Advances the member columns through the batches on a timer. The column count
 * follows the data, so the grid stretches to however many members a batch has.
 */
export function useTeamRotation(batches: ITeamSectionData["batches"]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(-1);

  // Running the batches twice lets the last batch slide out to the left while
  // the first slides back in, instead of snapping backwards to the start.
  const continuousBatches = useMemo(() => [...batches, ...batches], [batches]);

  const columnIndexes = useMemo(
    () => (batches[0] ?? []).map((_, index) => index),
    [batches],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((current) => {
        setPrevIndex(current);
        return (current + 1) % continuousBatches.length;
      });
    }, ROTATION_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [continuousBatches.length]);

  return { currentIndex, prevIndex, continuousBatches, columnIndexes };
}
