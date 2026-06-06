"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type CountUpProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
};

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

// Animates an integer from 0 up to `value` the first time it scrolls into view.
// Renders the final value during SSR (and for reduced-motion / no-JS) so the
// markup is correct and hydration-safe.
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  durationMs = 1200,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      return;
    }

    let raf = 0;
    let start = 0;

    function step(now: number) {
      if (!start) start = now;
      const progress = Math.min(1, (now - start) / durationMs);
      setDisplay(Math.round(easeOutCubic(progress) * value));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setDisplay(0);
            raf = requestAnimationFrame(step);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value, durationMs]);

  return (
    <span ref={ref} className={cn("tabular", className)} aria-live="off">
      {prefix}
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
