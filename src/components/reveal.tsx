"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  /** Extra delay (ms) before the element animates in once it enters view. */
  delay?: number;
  /** Translate distance/direction for the entrance. */
  direction?: "up" | "down" | "none";
  className?: string;
  as?: "div" | "section" | "li" | "ul";
};

const HIDDEN: Record<NonNullable<RevealProps["direction"]>, string> = {
  up: "translate-y-5",
  down: "-translate-y-5",
  none: "translate-y-0",
};

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  // Start shown so SSR / no-JS / reduced-motion always render visible content.
  const [shown, setShown] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      return;
    }

    setShown(false);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0",
        shown ? "opacity-100 translate-y-0" : cn("opacity-0", HIDDEN[direction]),
        className
      )}
    >
      {children}
    </Tag>
  );
}
