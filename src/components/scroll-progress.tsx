"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

// Thin reading-progress bar pinned to the top edge plus a back-to-top control
// that surfaces once you've scrolled past the first viewport. The button mirrors
// the editorial progress-ring motif used elsewhere (e.g. the match-score ring).
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const next = scrollable > 0 ? doc.scrollTop / scrollable : 0;
      setProgress(Math.min(1, Math.max(0, next)));
    }

    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const visible = progress > 0.04;

  const radius = 15;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]"
      >
        <div
          className="h-full origin-left bg-gradient-to-r from-tomato via-tomato to-ember transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <button
        type="button"
        onClick={() =>
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
        aria-label="Back to top"
        className={`group fixed bottom-6 right-6 z-40 hidden h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-paper/95 text-ink shadow-lift backdrop-blur-lg transition-all duration-300 hover:border-tomato hover:text-tomato active:scale-95 md:inline-flex ${
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          className="absolute -rotate-90"
          aria-hidden
        >
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-ink/10"
            strokeWidth="2"
          />
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-tomato transition-[stroke-dashoffset] duration-150 ease-out"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <ArrowUp className="h-4 w-4 transition group-hover:-translate-y-0.5" />
      </button>
    </>
  );
}
