"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 720);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        const reduceMotion =
          typeof window.matchMedia === "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      }}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={visible ? 0 : -1}
      className={cn(
        "group fixed bottom-[calc(5.25rem+env(safe-area-inset-bottom))] right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-paper/95 text-ink shadow-lift backdrop-blur-lg transition-all duration-300 hover:border-tomato hover:text-tomato hover:shadow-soft focus-visible:ring-2 focus-visible:ring-tomato/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:scale-95 sm:right-5 md:bottom-6 md:right-6 md:h-11 md:w-11",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      )}
    >
      <ArrowUp className="h-4 w-4 transition group-hover:-translate-y-0.5" />
    </button>
  );
}
