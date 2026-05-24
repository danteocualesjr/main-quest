"use client";

import { ArrowUp } from "lucide-react";

type ScrollToFormBarProps = {
  label: string;
  targetId?: string;
};

export function ScrollToFormBar({ label, targetId = "page-form" }: ScrollToFormBarProps) {
  return (
    <div
      className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 animate-fade-in"
      role="complementary"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => {
          document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper/95 px-5 py-2.5 text-sm font-medium text-ink shadow-lift backdrop-blur-md transition hover:border-tomato hover:text-tomato"
      >
        <ArrowUp className="h-4 w-4" />
        {label}
      </button>
    </div>
  );
}
