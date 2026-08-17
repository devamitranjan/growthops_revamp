"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithRef,
  type MouseEvent,
} from "react";

// Only one clip should be audible at a time, across every player on the page.
let playingAudio: HTMLAudioElement | null = null;

export function useAudioPlayer(src: string) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);

  // `timeupdate` only fires ~4x/second, which reads as a stuttering bar. The
  // fill is written straight to the DOM on every animation frame instead, so
  // it stays smooth without re-rendering the consumer at 60fps — only the
  // seconds counter goes through state, and just once per second.
  const paint = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const total = Number.isFinite(audio.duration) ? audio.duration : 0;
    const ratio = total > 0 ? audio.currentTime / total : 0;

    if (fillRef.current) {
      fillRef.current.style.width = `${ratio * 100}%`;
    }
    setElapsed(Math.floor(audio.currentTime));
    setDuration(total);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    let frame = requestAnimationFrame(function tick() {
      paint();
      frame = requestAnimationFrame(tick);
    });

    return () => cancelAnimationFrame(frame);
  }, [isPlaying, paint]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // `loadedmetadata` fires once and can beat React to attaching its handler
    // on a cached file, so paint from the element's live values on mount too.
    paint();

    return () => {
      audio.pause();
      if (playingAudio === audio) {
        playingAudio = null;
      }
    };
  }, [src, paint]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      if (playingAudio && playingAudio !== audio) {
        playingAudio.pause();
      }
      playingAudio = audio;
      void audio.play();
    } else {
      audio.pause();
    }
  }, []);

  const seek = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const audio = audioRef.current;
      if (!audio || !Number.isFinite(audio.duration) || !audio.duration) return;

      const { left, width } = event.currentTarget.getBoundingClientRect();
      const ratio = (event.clientX - left) / width;

      audio.currentTime = Math.min(Math.max(ratio, 0), 1) * audio.duration;
      paint();
    },
    [paint],
  );

  // Spread onto an `<audio>` element; `fillRef` goes on the progress fill.
  const audioProps: ComponentPropsWithRef<"audio"> = {
    ref: audioRef,
    src,
    preload: "metadata",
    onLoadedMetadata: paint,
    onDurationChange: paint,
    onTimeUpdate: paint,
    onPlay: () => setIsPlaying(true),
    onPause: () => {
      setIsPlaying(false);
      paint();
    },
    onEnded: (event) => {
      setIsPlaying(false);
      event.currentTarget.currentTime = 0;
      paint();
    },
  };

  return { audioProps, fillRef, isPlaying, elapsed, duration, toggle, seek };
}
