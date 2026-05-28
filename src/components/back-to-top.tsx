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
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={cn(
        "group fixed bottom-6 right-6 z-40 hidden h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-paper/95 text-ink shadow-lift backdrop-blur-lg transition-all duration-300 hover:border-tomato hover:text-tomato hover:shadow-soft active:scale-95 md:flex",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      )}
    >
      <ArrowUp className="h-4 w-4 transition group-hover:-translate-y-0.5" />
    </button>
  );
}
